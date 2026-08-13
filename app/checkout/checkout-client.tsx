"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { money } from "../data";
import { useCart } from "../components/cart-context";

export function CheckoutClient() {
  const cart = useCart();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [shipping, setShipping] = useState<"atelier" | "express">("atelier");
  const subtotal = useMemo(() => cart.lines.reduce((sum, line) => sum + line.price * line.quantity, 0), [cart.lines]);
  const delivery = shipping === "express" ? 38 : 0;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + delivery + tax;

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity() || !cart.lines.length) return;
    setProcessing(true);
    const reference = `VYR-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    window.sessionStorage.setItem("veyra-last-order", JSON.stringify({ reference, lines: cart.lines, subtotal, delivery, tax, total, placedAt: new Date().toISOString() }));
    window.setTimeout(() => { cart.clear(); router.push(`/order/success?ref=${reference}`); }, 650);
  }

  if (cart.hydrated && !cart.lines.length) return <section className="checkout-empty"><span>YOUR BAG / 00</span><h1>Nothing chosen.<br /><em>Nothing rushed.</em></h1><p>Take your time. The right object should feel familiar before it is yours.</p><Link className="button dark" href="/shop">Return to the collection</Link></section>;

  return <>
    <header className="checkout-heading"><Link href="/shop">← Continue collecting</Link><span>SECURE CHECKOUT / VEYRA ATELIER</span><p>Every order is prepared by one pair of hands.</p></header>
    <form className="checkout-layout" onSubmit={submitOrder}>
      <div className="checkout-form">
        <div className="checkout-intro"><span>01 · YOUR DETAILS</span><h1>Where should this<br /><em>story begin?</em></h1></div>
        <fieldset><legend>Contact</legend><label className="full"><span>Email address</span><input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label><label><span>First name</span><input name="given-name" autoComplete="given-name" required /></label><label><span>Last name</span><input name="family-name" autoComplete="family-name" required /></label></fieldset>
        <fieldset><legend>Delivery address</legend><label className="full"><span>Address</span><input name="address" autoComplete="street-address" required /></label><label><span>City</span><input name="city" autoComplete="address-level2" required /></label><label><span>Postal code</span><input name="postal-code" autoComplete="postal-code" required /></label><label className="full"><span>Country / region</span><select name="country" autoComplete="country-name" defaultValue="United States"><option>United States</option><option>United Kingdom</option><option>France</option><option>Pakistan</option><option>United Arab Emirates</option></select></label></fieldset>
        <fieldset><legend>Delivery</legend><label className={`shipping-choice ${shipping === "atelier" ? "active" : ""}`}><input type="radio" name="shipping" checked={shipping === "atelier"} onChange={() => setShipping("atelier")} /><span><b>Atelier delivery</b><small>Complimentary · 3–5 working days</small></span><strong>Included</strong></label><label className={`shipping-choice ${shipping === "express" ? "active" : ""}`}><input type="radio" name="shipping" checked={shipping === "express"} onChange={() => setShipping("express")} /><span><b>Express delivery</b><small>1–2 working days</small></span><strong>$38</strong></label></fieldset>
        <fieldset><legend>Payment <small>Demo only — no charge will be made</small></legend><label className="full"><span>Card number</span><input name="card" inputMode="numeric" autoComplete="cc-number" placeholder="4242 4242 4242 4242" pattern="[0-9 ]{15,19}" required /></label><label><span>Expiry</span><input name="expiry" inputMode="numeric" autoComplete="cc-exp" placeholder="12 / 30" minLength={5} maxLength={7} required /></label><label><span>Security code</span><input name="cvc" inputMode="numeric" autoComplete="cc-csc" placeholder="123" pattern="[0-9]{3,4}" required /></label></fieldset>
      </div>
      <aside className="order-summary">
        <div className="summary-title"><span>02 · YOUR SELECTION</span><p>{cart.count} {cart.count === 1 ? "piece" : "pieces"}</p></div>
        <div className="summary-lines">{cart.lines.map((line) => <div className="summary-line" key={`${line.slug}-${line.tone}`}><div><Image src={line.image} alt="" fill sizes="90px" /><i>{line.quantity}</i></div><span><b>{line.name}</b><small>{line.tone}</small></span><strong>{money(line.price * line.quantity)}</strong></div>)}</div>
        <dl><div><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div><div><dt>Delivery</dt><dd>{delivery ? money(delivery) : "Complimentary"}</dd></div><div><dt>Estimated tax</dt><dd>{money(tax)}</dd></div><div className="summary-total"><dt>Total</dt><dd>{money(total)}</dd></div></dl>
        <button className="button dark place-order" type="submit" disabled={processing || !cart.lines.length}><span className={processing ? "is-processing" : ""}>{processing ? "Preparing your order…" : `Place order · ${money(total)}`}</span></button>
        <p className="checkout-assurance">Protected checkout · 30-day returns · lifetime atelier care</p>
      </aside>
    </form>
  </>;
}
