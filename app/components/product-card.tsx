"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "../data";
import { money } from "../data";
import { useCart } from "./cart-context";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const cart = useCart();
  const [added, setAdded] = useState(false);
  function add() { cart.add(product, false); setAdded(true); setTimeout(() => setAdded(false), 1100); }
  return <article className="product-card reveal" style={{ "--delay": `${Math.min(index * 45, 135)}ms` } as React.CSSProperties}><Link href={`/product/${product.slug}`} className={`product-image product-image-${product.slug}`}><Image src={product.image} alt={`${product.name} in ${product.tone}`} fill sizes="(max-width: 600px) 92vw, (max-width: 900px) 50vw, 33vw" /><span className="view-label">View piece ↗</span></Link><div className="product-info"><Link href={`/product/${product.slug}`}><h3>{product.name}</h3><p>{product.tone}</p></Link><div><span>{money(product.price)}</span><button className={added ? "is-added" : ""} onClick={add} aria-label={`Add ${product.name} to bag`}>{added ? "✓" : "+"}</button></div></div></article>;
}
