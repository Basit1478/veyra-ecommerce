import type { Metadata } from "next";
import Image from "next/image";
import { ShopClient } from "./shop-client";

export const metadata: Metadata = { title: "Collection" };

export default function ShopPage() {
  return <main className="shop-page"><header className="page-title collection-title"><span>THE COLLECTION / EDITION 02</span><h1>Objects for<br /><em>the life between.</em></h1><p>Sixteen considered forms across bags, purses, watches, footwear and small leather. Each made slowly enough to become personal.</p><div className="collection-portrait"><Image src="/images/campaign-pli.png" alt="Woman wearing the Pli Mini outside a bookshop" fill priority sizes="(max-width: 700px) 42vw, 22vw" /></div></header><ShopClient /></main>;
}
