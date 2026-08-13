"use client";

import { useState } from "react";
import { categories, products } from "../data";
import { ProductCard } from "../components/product-card";

export function ShopClient() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All pieces");
  const shown = filter === "All pieces" ? products : products.filter((product) => product.category === filter);
  return <>
    <div className="filter-row" role="group" aria-label="Filter collection">
      {categories.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}<span>{item === "All pieces" ? products.length : products.filter((p) => p.category === item).length}</span></button>)}
    </div>
    <p className="filter-note" aria-live="polite">{shown.length} pieces · made in numbered editions</p>
    <div className="product-grid shop-grid">{shown.map((product, index) => <ProductCard key={product.slug} product={product} index={index} />)}</div>
  </>;
}
