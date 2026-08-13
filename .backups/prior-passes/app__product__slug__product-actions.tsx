"use client";

import { useState } from "react";
import type { Product } from "../../data";
import { useCart } from "../../components/cart-context";

export function ProductActions({ product }: { product: Product }) {
  const cart = useCart();
  const [tone, setTone] = useState(product.tone);
  const [size, setSize] = useState("EU 39");
  const colours = [product.tone, "Noir", "Chalk"].filter((value, index, values) => values.indexOf(value) === index);
  const selectedTone = product.category === "Footwear" ? `${tone} · ${size}` : tone;
  return <>
    <div className="choice"><div><span>Colour</span><b>{tone}</b></div><div className="swatches">{colours.map((value) => <button key={value} onClick={() => setTone(value)} className={tone === value ? "active" : ""} aria-label={value} title={value} />)}</div></div>
    {product.category === "Footwear" && <div className="size-choice"><label htmlFor="product-size">Size</label><select id="product-size" value={size} onChange={(event) => setSize(event.target.value)}>{[36,37,38,39,40,41,42,43,44,45,46].map((value) => <option key={value}>EU {value}</option>)}</select><span>Fits true to size</span></div>}
    <button className="button dark add-button" onClick={() => cart.add({ ...product, tone: selectedTone })}>Add to bag <span>+</span></button>
  </>;
}
