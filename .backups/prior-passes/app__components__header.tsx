"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { products } from "../data";
import { Logo } from "./logo";
import { useCart } from "./cart-context";

export function Header() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const cart = useCart();
  const matches = useMemo(() => products.filter((product) => `${product.name} ${product.category} ${product.tone}`.toLowerCase().includes(query.toLowerCase())).slice(0, 4), [query]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenu(false); setSearch(false); } };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = previous; };
  }, [menu]);

  return <>
    <header className={`site-header ${menu ? "menu-open" : ""}`}>
      <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Toggle menu"><span /><span /></button>
      <nav className={`main-nav ${menu ? "is-open" : ""}`} aria-label="Main navigation" aria-hidden={!menu}><Link href="/shop" onClick={() => setMenu(false)}>Collection</Link><Link href="/story" onClick={() => setMenu(false)}>The house</Link></nav>
      <Logo />
      <div className="header-actions"><button className="search-link" onClick={() => setSearch(true)}>Search</button><button onClick={() => cart.setOpen(true)}>Bag <span>({cart.count})</span></button></div>
    </header>
    <button className={`search-scrim ${search ? "is-open" : ""}`} onClick={() => setSearch(false)} aria-label="Close search" />
    <aside className={`search-panel ${search ? "is-open" : ""}`} aria-hidden={!search}>
      <div className="search-head"><span>Search the collection</span><button onClick={() => setSearch(false)} aria-label="Close search">×</button></div>
      <label><span className="sr-only">Search products</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="What are you looking for?" autoFocus={search} /><b>↗</b></label>
      <p>{query ? `${matches.length} results` : "Suggested pieces"}</p>
      <div className="search-results">{matches.map((product) => <Link href={`/product/${product.slug}`} key={product.slug} onClick={() => setSearch(false)}><div><Image src={product.image} alt="" fill sizes="90px" /></div><span><b>{product.name}</b><small>{product.tone} · ${product.price}</small></span><i>↗</i></Link>)}</div>
    </aside>
  </>;
}



