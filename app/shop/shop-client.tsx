"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ProductCard } from "../components/product-card";
import { categories, products } from "../data";

export function ShopClient({ initialFilter }: { initialFilter: (typeof categories)[number] }) {
  const [filter, setFilter] = useState(initialFilter);
  const reduceMotion = useReducedMotion();
  const shown = filter === "All pieces" ? products : products.filter((product) => product.category === filter);

  function choose(item: (typeof categories)[number]) {
    if (item === filter) return;
    setFilter(item);
    const url = item === "All pieces" ? "/shop" : `/shop?category=${encodeURIComponent(item)}`;
    window.history.pushState(null, "", url);
  }

  return <>
    <div className="filter-row" role="group" aria-label="Filter collection">
      {categories.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => choose(item)} aria-pressed={filter === item}>{item}<span>{item === "All pieces" ? products.length : products.filter((product) => product.category === item).length}</span></button>)}
    </div>
    <p className="filter-note" aria-live="polite"><span>{shown.length}</span> pieces · made in numbered editions</p>
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div key={filter} className="product-grid shop-grid" initial={reduceMotion ? false : { opacity: 0, transform: "translateY(10px)" }} animate={{ opacity: 1, transform: "translateY(0px)" }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(-6px)" }} transition={{ duration: reduceMotion ? 0.12 : 0.24, ease: [0.23, 1, 0.32, 1] }}>
        {shown.map((product, index) => <ProductCard key={product.slug} product={product} index={index} />)}
      </motion.div>
    </AnimatePresence>
  </>;
}
