"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "../data";
import { money } from "../data";
import { useCart } from "./cart-context";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const cart = useCart();
  return (
    <article className="product-card reveal" style={{ "--delay": `${Math.min(index * 50, 150)}ms` } as React.CSSProperties}>
      <Link href={`/product/${product.slug}`} className={`product-image product-image-${product.slug}`}>
        <Image src={product.image} alt={`${product.name} in ${product.tone}`} fill sizes="(max-width: 700px) 50vw, 33vw" />
        <span className="view-label">View piece ↗</span>
      </Link>
      <div className="product-info"><Link href={`/product/${product.slug}`}><h3>{product.name}</h3><p>{product.tone}</p></Link><div><span>{money(product.price)}</span><button onClick={() => cart.add(product)} aria-label={`Add ${product.name} to bag`}>+</button></div></div>
    </article>
  );
}

