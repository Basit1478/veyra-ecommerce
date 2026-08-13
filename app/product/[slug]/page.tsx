import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "../../data";
import { ProductCard } from "../../components/product-card";
import { ProductExperience } from "./product-experience";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const related = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 3);
  const objectNumber = String(products.indexOf(product) + 1).padStart(2, "0");
  return <main className="product-page">
    <div className="breadcrumbs"><Link href="/shop">Collection</Link><span>/</span><span>{product.category}</span><span>/</span><span>{product.name}</span></div>
    <ProductExperience product={product} objectNumber={objectNumber} />
    <section className="pdp-note"><span>THE MATERIAL</span><h2>Chosen for how<br />it will <em>live.</em></h2><p>Not coated into perfection. Made to soften, darken, crease and record the years.</p></section>
    {!!related.length && <section className="related-products section-pad"><div className="section-head"><div><span>YOU MAY ALSO KEEP</span><p>From the same family</p></div><h2>Objects that speak<br /><em>the same language.</em></h2></div><div className="product-grid">{related.map((item, index) => <ProductCard product={item} index={index} key={item.slug} />)}</div></section>}
  </main>;
}
