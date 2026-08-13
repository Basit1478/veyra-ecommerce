"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const frames = [
  { image: "/images/veyra-hero.png", number: "01", title: "The Serein", line: "A curve held in leather.", position: "68% center" },
  { image: "/images/atelier-tote.png", number: "02", title: "The Atelier", line: "Structure for every day.", position: "center 58%" },
  { image: "/images/fold-mini.png", number: "03", title: "The Pli", line: "Softness, folded with intent.", position: "center 62%" },
];

export function OpeningShowcase() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>(".overture-frame");
      const meters = gsap.utils.toArray<HTMLElement>(".overture-meter i");
      const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: .7, invalidateOnRefresh: true } });
      gsap.set(slides.slice(1), { autoAlpha: 0, scale: 1.055 });
      gsap.set(meters, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(slides[0].querySelector(".overture-copy"), { y: 0, autoAlpha: 1 });
      frames.forEach((_, index) => {
        const slide = slides[index];
        const copy = slide.querySelector(".overture-copy");
        timeline.to(meters[index], { scaleX: 1, duration: 1, ease: "none" }, index).to(slide, { scale: 1.035, duration: 1, ease: "none" }, index);
        if (index > 0) timeline.fromTo(copy, { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .32, ease: "power3.out" }, index);
        if (index < slides.length - 1) timeline.to(slide, { autoAlpha: 0, scale: 1.075, duration: .22, ease: "power2.inOut" }, index + .78).to(slides[index + 1], { autoAlpha: 1, scale: 1, duration: .28, ease: "power2.out" }, index + .78);
      });
    }, section);
    return () => context.revert();
  }, []);
  return <section className="overture-scroll" ref={root} aria-label="Veyra collection introduction"><div className="overture"><div className="overture-top"><span>VEYRA / EDITION 02</span><span className="overture-center">A study of form</span></div>{frames.map((frame,index)=><div className={`overture-frame ${index===0?"is-active":""}`} key={frame.title}><Image src={frame.image} alt="" fill priority={index===0} sizes="100vw" style={{objectPosition:frame.position}}/><div className="overture-shade"/><div className="overture-copy"><p>{frame.number} / 03 · {frame.title}</p><h2>{frame.line}</h2></div></div>)}<div className="overture-bottom"><div className="overture-meter">{frames.map(frame=><span key={frame.number}><b>{frame.number}</b><em><i/></em></span>)}</div><div className="scroll-cue"><span>Scroll to unfold</span><b>↓</b></div></div></div></section>;
}


