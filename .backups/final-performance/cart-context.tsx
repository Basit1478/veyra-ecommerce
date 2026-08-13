"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "../data";

export type CartLine = Product & { quantity: number };
type CartValue = { lines: CartLine[]; open: boolean; count: number; hydrated: boolean; announcement: string; setOpen: (v: boolean) => void; add: (p: Product, reveal?: boolean) => void; change: (s: string, d: number) => void; clear: () => void };
const CartContext = createContext<CartValue | null>(null), KEY = "veyra-atelier-bag";
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]), [open, setOpen] = useState(false), [hydrated, setHydrated] = useState(false), [announcement, setAnnouncement] = useState("");
  useEffect(() => { let restored: CartLine[] = []; try { restored = JSON.parse(localStorage.getItem(KEY) || "[]") as CartLine[]; } catch {} queueMicrotask(() => { setLines(restored); setHydrated(true); }); }, []);
  useEffect(() => { if (hydrated) localStorage.setItem(KEY, JSON.stringify(lines)); }, [hydrated, lines]);
  const value = useMemo<CartValue>(() => ({ lines, open, hydrated, announcement, setOpen, count: lines.reduce((s,l)=>s+l.quantity,0),
    add(product, reveal=true) { setLines((c)=>{const f=c.find((l)=>l.slug===product.slug&&l.tone===product.tone); return f?c.map((l)=>l===f?{...l,quantity:l.quantity+1}:l):[...c,{...product,quantity:1}]}); setAnnouncement(`${product.name} added to your bag`); if(reveal)setOpen(true); },
    change(slug,delta){setLines((c)=>c.map((l)=>l.slug===slug?{...l,quantity:l.quantity+delta}:l).filter((l)=>l.quantity>0));}, clear(){setLines([]);setOpen(false);} }), [lines,open,hydrated,announcement]);
  return <CartContext.Provider value={value}>{children}<span className="sr-only" aria-live="polite">{announcement}</span></CartContext.Provider>;
}
export function useCart(){const v=useContext(CartContext);if(!v)throw new Error("useCart must be used within CartProvider");return v;}
