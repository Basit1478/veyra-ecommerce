"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import type { Product } from "../../data";
import { money } from "../../data";
import { ProductActions } from "./product-actions";

export function ProductExperience({ product, objectNumber }: { product: Product; objectNumber: string }) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: galleryRef, offset: ["start start", "end start"] });
  const heroTransform = useTransform(scrollYProgress, [0, 1], ["scale(1) translateY(0px)", "scale(1.055) translateY(22px)"]);
  const detailTransform = useTransform(scrollYProgress, [0.25, 1], ["scale(1.035) translateY(-16px)", "scale(1) translateY(10px)"]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.82], [1, 0.88]);

  const accordionItems = [
    ["Materials", product.material],
    ["Dimensions & fit", product.dimensions],
    ["Delivery & returns", "Complimentary atelier delivery and returns within 30 days. Every order is wrapped by hand in 1–2 working days."],
    ["Lifetime care", "Repairs, conditioning and hardware care remain available for the life of every numbered piece."],
  ] as const;
  const [active, setActive] = useState<string>("Materials");

  return <section className="pdp">
    <div className="pdp-gallery" ref={galleryRef}>
      <figure className={`pdp-image product-image-${product.slug}`}>
        <motion.div className="absolute inset-0 will-change-transform" style={{ transform: reduceMotion ? "none" : heroTransform, opacity: reduceMotion ? 1 : imageOpacity }}>
          <Image src={product.image} alt={`${product.name} in ${product.tone}, shown in an editorial setting`} fill priority sizes="(max-width: 900px) 100vw, 62vw" />
        </motion.div>
        <figcaption className="tracking-[0.18em]">Azadi Edition / Made in 64 pieces</figcaption>
      </figure>
      <figure className={`pdp-detail-image product-image-${product.slug}`}>
        <motion.div className="absolute inset-0 will-change-transform" style={{ transform: reduceMotion ? "none" : detailTransform }}>
          <Image src={product.image} alt={`Close-up view of ${product.name} in ${product.tone}`} fill sizes="(max-width: 900px) 100vw, 31vw" />
        </motion.div>
        <figcaption className="tracking-[0.18em]">Made slowly / Finished by hand</figcaption>
      </figure>
      <div className="pdp-object-note">
        <span className="tracking-[0.2em]">OBJECT {objectNumber} / 16</span>
        <blockquote>“{product.note}”</blockquote>
        <p>Designed to become less perfect,<br />and more yours.</p>
      </div>
    </div>

    <motion.div className="pdp-info" initial={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(18px)" }} animate={{ opacity: 1, transform: "translateY(0px)" }} transition={{ duration: .65, ease: [.23, 1, .32, 1] }}>
      <p className="tracking-[0.2em]">{product.category} · {product.tone}</p>
      <h1>{product.name}</h1>
      <strong className="pdp-price">{money(product.price)}</strong>
      <blockquote className="pdp-headline">{product.note}</blockquote>
      <div className="pdp-description"><p>{product.description}</p><span>Hand-finished in small runs and made to develop a personal patina.</span></div>
      <ProductActions product={product} />
      <div className="accordions motion-accordions">
        {accordionItems.map(([title, copy]) => {
          const open = active === title;
          return <div className="motion-accordion" key={title}>
            <button type="button" onClick={() => setActive(open ? "" : title)} aria-expanded={open} aria-controls={`accordion-${title.replaceAll(" ", "-")}`}>
              <span>{title}</span><motion.i animate={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }} transition={{ duration: .2, ease: [.23, 1, .32, 1] }}>+</motion.i>
            </button>
            <AnimatePresence initial={false}>
              {open && <motion.div id={`accordion-${title.replaceAll(" ", "-")}`} initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }} transition={{ height: { duration: .34, ease: [.32, .72, 0, 1] }, opacity: { duration: .2 } }}><p>{copy}</p></motion.div>}
            </AnimatePresence>
          </div>;
        })}
      </div>
    </motion.div>
  </section>;
}
