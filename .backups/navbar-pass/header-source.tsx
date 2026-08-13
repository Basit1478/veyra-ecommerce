"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import { products } from "../data";
import { Logo } from "./logo";
import { useCart } from "./cart-context";
import { useDialogFocus } from "./use-dialog-focus";

const nav = [["Bags", "/shop?category=Bags"], ["Watches", "/shop?category=Watches"], ["Footwear", "/shop?category=Footwear"], ["The house", "/story"]] as const;

export function Header() {
  const [menu, setMenu] = useState(false), [search, setSearch] = useState(false), [query, setQuery] = useState("");
  const menuRef = useRef<HTMLElement>(null), searchRef = useRef<HTMLElement>(null);
  const closeMenu = useCallback(() => setMenu(false), []), closeSearch = useCallback(() => setSearch(false), []);
  useDialogFocus(menu, menuRef, closeMenu); useDialogFocus(search, searchRef, closeSearch);
  const cart = useCart();
  const matches = useMemo(() => products.filter((p) => `${p.name} ${p.category} ${p.tone}`.toLowerCase().includes(query.toLowerCase())).slice(0, 4), [query]);
  return <>
    <header className={`site-header ${menu ? "menu-open" : ""}`}>
      <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="main-menu" aria-label={menu ? "Close menu" : "Open menu"}><span /><span /></button>
      <nav ref={menuRef} id="main-menu" className={`main-nav ${menu ? "is-open" : ""}`} aria-label="Main navigation" aria-hidden={!menu} role={menu ? "dialog" : undefined} aria-modal={menu || undefined}>
        {nav.map(([label, href]) => <Link href={href} onClick={closeMenu} key={label}>{label}</Link>)}
      </nav>
      <Logo />
      <div className="header-actions"><button className="search-link" onClick={() => setSearch(true)}>Search</button><button onClick={() => cart.setOpen(true)}>Bag <span>({cart.count})</span></button></div>
    </header>
    <button className={`search-scrim ${search ? "is-open" : ""}`} onClick={closeSearch} aria-label="Close search" tabIndex={search ? 0 : -1} />
    <aside ref={searchRef} className={`search-panel ${search ? "is-open" : ""}`} aria-hidden={!search} role="dialog" aria-modal="true" aria-label="Search the collection">
      <div className="search-head"><span>Search the collection</span><button onClick={closeSearch} aria-label="Close search">×</button></div>
      <label><span className="sr-only">Search products</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="What are you looking for?" /><b>↗</b></label>
      <p>{query ? `${matches.length} results` : "Suggested pieces"}</p>
      <div className="search-results">{matches.map((p) => <Link href={`/product/${p.slug}`} key={p.slug} onClick={closeSearch}><div><Image src={p.image} alt="" fill sizes="90px" /></div><span><b>{p.name}</b><small>{p.tone} · ${p.price}</small></span><i>↗</i></Link>)}</div>
    </aside>
  </>;
}
