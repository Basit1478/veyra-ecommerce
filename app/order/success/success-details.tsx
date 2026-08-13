"use client";

import { useEffect, useState } from "react";
import { money } from "../../data";

type SavedOrder = { total: number; lines: { quantity: number }[] };

export function SuccessDetails({ reference }: { reference: string }) {
  const [order, setOrder] = useState<SavedOrder | null>(null);
  useEffect(() => {
    let active = true;
    let restored: SavedOrder | null = null;
    try {
      const saved = window.sessionStorage.getItem("veyra-last-order");
      if (saved) restored = JSON.parse(saved) as SavedOrder;
    } catch { /* The confirmation remains meaningful without session storage. */ }
    queueMicrotask(() => { if (active) setOrder(restored); });
    return () => { active = false; };
  }, []);
  const count = order?.lines.reduce((sum, line) => sum + line.quantity, 0);
  return <dl className="success-details"><div><dt>Order</dt><dd>{reference}</dd></div><div><dt>Selection</dt><dd>{count ? `${count} ${count === 1 ? "piece" : "pieces"}` : "Confirmed"}</dd></div><div><dt>Total</dt><dd>{order ? money(order.total) : "Confirmed"}</dd></div><div><dt>Delivery</dt><dd>3–5 working days</dd></div></dl>;
}
