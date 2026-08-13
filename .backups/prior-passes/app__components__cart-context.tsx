"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "../data";

export type CartLine = Product & { quantity: number };
type CartValue = { lines: CartLine[]; open: boolean; count: number; hydrated: boolean; setOpen: (open: boolean) => void; add: (product: Product) => void; change: (slug: string, delta: number) => void; clear: () => void; };
const CartContext = createContext<CartValue | null>(null);
const STORAGE_KEY = "veyra-atelier-bag";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    let restored: CartLine[] = [];
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) restored = JSON.parse(saved) as CartLine[];
    } catch { /* A private browser can deny storage; the bag still works in memory. */ }
    queueMicrotask(() => {
      if (!active) return;
      setLines(restored);
      setHydrated(true);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [hydrated, lines]);

  const value = useMemo<CartValue>(() => ({
    lines, open, hydrated, setOpen,
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
    add(product) {
      setLines((current) => {
        const found = current.find((line) => line.slug === product.slug && line.tone === product.tone);
        return found ? current.map((line) => line.slug === product.slug && line.tone === product.tone ? { ...line, quantity: line.quantity + 1 } : line) : [...current, { ...product, quantity: 1 }];
      });
      setOpen(true);
    },
    change(slug, delta) { setLines((current) => current.map((line) => line.slug === slug ? { ...line, quantity: line.quantity + delta } : line).filter((line) => line.quantity > 0)); },
    clear() { setLines([]); setOpen(false); },
  }), [lines, open, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used within CartProvider");
  return value;
}
