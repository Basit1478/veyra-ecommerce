"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "../../data";
import { useCart } from "../../components/cart-context";

export function ProductActions({ product }: { product: Product }) {
  const cart = useCart();
  const [tone, setTone] = useState(product.tone), [size, setSize] = useState("EU 39"), [added, setAdded] = useState(false);
  const colours = [product.tone, "Noir", "Chalk"].filter((value, index, all) => all.indexOf(value) === index);
  function add() {
    cart.add({ ...product, tone: product.category === "Footwear" ? `${tone} · ${size}` : tone });
    setAdded(true); window.setTimeout(() => setAdded(false), 1400);
  }
  return <>
    <div className="choice"><div><span>Colour</span><b>{tone}</b></div><div className="swatches">{colours.map((value) => <button key={value} onClick={() => setTone(value)} className={tone === value ? "active" : ""} aria-label={value} title={value} />)}</div></div>
    {product.category === "Footwear" && <div className="size-choice"><label htmlFor="product-size">Size</label><select id="product-size" value={size} onChange={(event) => setSize(event.target.value)}>{[36,37,38,39,40,41,42,43,44,45,46].map((value)=><option key={value}>EU {value}</option>)}</select><span>Fits true to size</span></div>}
    <motion.button className={`button dark add-button ${added ? "added" : ""}`} onClick={add} whileTap={{ scale: .975 }} transition={{ type: "spring", bounce: 0, duration: .28 }}>
      <span>{added ? "Added to your bag" : "Add to bag"}</span><motion.i animate={{ transform: added ? "rotate(0deg)" : "rotate(90deg)" }} transition={{ duration: .22 }}>{added ? "✓" : "+"}</motion.i>
    </motion.button>
  </>;
}
