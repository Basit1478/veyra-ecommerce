import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { money, products } from "../../data";
import { ProductCard } from "../../components/product-card";
import { ProductActions } from "./product-actions";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const related = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 3);
  return <main className="product-page">
    <div className="breadcrumbs"><Link href="/shop">Collection</Link><span>/</span><span>{product.category}</span><span>/</span><span>{product.name}</span></div>
    <section className="pdp"><div className={`pdp-image product-image-${product.slug}`}><Image src={product.image} alt={`${product.name} in ${product.tone}, worn in daily life`} fill priority sizes="(max-width: 900px) 100vw, 62vw" /><span>Edition 02 / Made in 64 pieces</span></div><div className="pdp-info"><p>{product.category} · {product.tone}</p><h1>{product.name}</h1><strong>{money(product.price)}</strong><blockquote>{product.note}</blockquote><div className="pdp-description"><p>{product.description}</p><span>Hand-finished in small runs and made to develop a personal patina.</span></div><ProductActions product={product} /><div className="accordions"><details open><summary>Materials <span>+</span></summary><p>{product.material}</p></details><details><summary>Dimensions & fit <span>+</span></summary><p>{product.dimensions}</p></details><details><summary>Delivery & returns <span>+</span></summary><p>Complimentary atelier delivery and returns within 30 days. Every order is wrapped by hand in 1–2 working days.</p></details><details><summary>Lifetime care <span>+</span></summary><p>Wear is part of the story. Repairs, conditioning and hardware care remain available for the life of every numbered piece.</p></details></div></div></section>
    <section className="pdp-note"><span>THE MATERIAL</span><h2>Chosen for how<br />it will <em>live.</em></h2><p>Not coated into perfection. Made to soften, darken, crease and record the years.</p></section>
    {related.length > 0 && <section className="related-products section-pad"><div className="section-head"><div><span>YOU MAY ALSO KEEP</span><p>From the same family</p></div><h2>Objects that speak<br /><em>the same language.</em></h2></div><div className="product-grid">{related.map((item, index) => <ProductCard product={item} index={index} key={item.slug} />)}</div></section>}
  </main>;
}
