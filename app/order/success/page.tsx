import type { Metadata } from "next";
import Link from "next/link";
import { SuccessDetails } from "./success-details";

export const metadata: Metadata = { title: "Order received" };

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref = "VYR-2026-000001" } = await searchParams;
  return <main className="success-page">
    <section className="success-portrait"><div className="success-image" /><span>VEYRA ATELIER · ORDER {ref}</span></section>
    <section className="success-copy"><div className="success-mark" aria-hidden="true">V</div><span>ORDER RECEIVED</span><h1>It begins<br /><em>with you.</em></h1><p className="success-lead">Your piece will leave the atelier carrying almost no history. The first real mark, journey and memory will be yours.</p><SuccessDetails reference={ref} /><p className="success-letter">A confirmation has been sent to your email. When your order is wrapped, you’ll receive a note from the person who prepared it.</p><div className="success-actions"><Link className="button dark" href="/shop">Continue exploring</Link><Link className="text-link" href="/story">Read our story <span>↗</span></Link></div></section>
  </main>;
}
