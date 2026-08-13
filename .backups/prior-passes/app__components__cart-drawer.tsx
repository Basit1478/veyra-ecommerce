"use client";

import Image from "next/image";
import Link from "next/link";
import { money } from "../data";
import { useCart } from "./cart-context";

export function CartDrawer() {
  const cart = useCart();
  const subtotal = cart.lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  return (
    <>
      <button className={`cart-scrim ${cart.open ? "is-open" : ""}`} onClick={() => cart.setOpen(false)} aria-label="Close bag" />
      <aside className={`cart-drawer ${cart.open ? "is-open" : ""}`} aria-hidden={!cart.open} aria-label="Shopping bag">
        <div className="cart-head"><p>Your bag <span>{cart.count}</span></p><button onClick={() => cart.setOpen(false)} aria-label="Close bag">×</button></div>
        {cart.lines.length === 0 ? (
          <div className="cart-empty"><p>Your selection is waiting.</p><span>Discover pieces made to stay with you.</span><Link href="/shop" onClick={() => cart.setOpen(false)} className="button dark">Explore collection</Link></div>
        ) : (
          <div className="cart-filled">
            <div className="cart-lines">{cart.lines.map((line) => (
              <div className="cart-line" key={`${line.slug}-${line.tone}`}>
                <Link href={`/product/${line.slug}`} onClick={() => cart.setOpen(false)} className="cart-thumb"><Image src={line.image} alt="" fill sizes="96px" /></Link>
                <div><p>{line.name}</p><span>{line.tone}</span><div className="quantity"><button onClick={() => cart.change(line.slug, -1)} aria-label={`Remove one ${line.name}`}>−</button><span>{line.quantity}</span><button onClick={() => cart.change(line.slug, 1)} aria-label={`Add one ${line.name}`}>+</button></div></div>
                <strong>{money(line.price * line.quantity)}</strong>
              </div>
            ))}</div>
            <div className="cart-total"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><small>Complimentary delivery. Taxes calculated at checkout.</small><Link href="/checkout" onClick={() => cart.setOpen(false)} className="button dark">Proceed to checkout <span>↗</span></Link></div>
          </div>
        )}
      </aside>
    </>
  );
}
