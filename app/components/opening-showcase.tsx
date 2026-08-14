"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo } from "./logo";

const leaders = [
  {
    image: "/images/leaders/muhammad-ali-jinnah-sketch-v2.webp",
    name: "Muhammad Ali Jinnah",
    title: "Quaid-e-Azam · Founder",
    note: "Unity · Faith · Discipline",
  },
  {
    image: "/images/leaders/fatima-jinnah-sketch-v2.webp",
    name: "Fatima Jinnah",
    title: "Madar-e-Millat",
    note: "Courage carried forward",
  },
  {
    image: "/images/leaders/allama-iqbal-sketch-v2.webp",
    name: "Allama Muhammad Iqbal",
    title: "Poet · Philosopher",
    note: "A dream given language",
  },
  {
    image: "/images/leaders/liaquat-ali-khan-sketch-v2.webp",
    name: "Liaquat Ali Khan",
    title: "Architect of a young nation",
    note: "Service before self",
  },
];

function FlagMark() {
  return (
    <svg viewBox="0 0 120 80" role="img" aria-label="Flag of Pakistan">
      <rect width="120" height="80" fill="#01411c" />
      <rect width="30" height="80" fill="#fff" />
      <circle cx="78" cy="39" r="23" fill="#fff" />
      <circle cx="86" cy="34" r="20" fill="#01411c" />
      <path fill="#fff" d="m91 15 3.4 10.2 10.8.1-8.7 6.3 3.2 10.3-8.7-6.2-8.8 6.2 3.3-10.3-8.7-6.3 10.8-.1z" />
    </svg>
  );
}

export function OpeningShowcase() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;

    history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      section.classList.add("is-reduced");
      return;
    }

    document.body.classList.add("gateway-active");
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".gateway-leader");
      const progress = gsap.utils.toArray<HTMLElement>(".gateway-progress i");
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.55,
          invalidateOnRefresh: true,
          onUpdate: (self) => document.body.classList.toggle("gateway-unlocked", self.progress >= 0.95),
        },
      });

      gsap.set(cards, { autoAlpha: 0, scale: 0.86 });
      gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".gateway-flag", { autoAlpha: 0, scale: 0.94 });
      gsap.set(".gateway-brand-reveal", { autoAlpha: 0 });
      gsap.set(".gateway-brand-reveal .logo", { scale: 0.82, yPercent: 4, transformOrigin: "center center" });
      gsap.set(".gateway-reveal-copy > *", { autoAlpha: 0, y: 28 });

      timeline
        .fromTo(".gateway-opening-copy", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" })
        .to(".gateway-opening-copy", { autoAlpha: 0, y: -18, duration: 0.22 }, 0.72);

      cards.forEach((card, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        const at = 0.88 + index * 0.9;
        timeline
          .fromTo(
            card,
            { autoAlpha: 0, xPercent: direction * 32, yPercent: 5, scale: 0.86, rotate: direction * 0.8 },
            { autoAlpha: 1, xPercent: 0, yPercent: 0, scale: 1, rotate: 0, duration: 0.38, ease: "power3.out" },
            at,
          )
          .fromTo(card.querySelector("img"), { yPercent: -2.5, scale: 1.025 }, { yPercent: 2.5, scale: 1.01, duration: 0.82 }, at)
          .to(card, { xPercent: direction * -5, yPercent: -1, scale: 1.02, duration: 0.34 }, at + 0.34)
          .to(card, { autoAlpha: 0, xPercent: direction * -32, yPercent: -4, scale: 1.055, duration: 0.25, ease: "power2.in" }, at + 0.66)
          .to(progress[index], { scaleX: 1, duration: 0.82 }, at);
      });

      timeline
        .to(".gateway-heritage", { autoAlpha: 0, duration: 0.18 }, 4.48)
        .to(".gateway-flag", { autoAlpha: 1, scale: 1, duration: 0.36, ease: "power3.out" }, 4.52)
        .fromTo(".gateway-independence", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power3.out" }, 4.58)
        .to(".gateway-flag, .gateway-independence", { autoAlpha: 0, scale: 0.98, duration: 0.24 }, 5.2)
        .to(".cabinet-panel--left", { xPercent: -101, duration: 0.92, ease: "power3.inOut" }, 5.35)
        .to(".cabinet-panel--right", { xPercent: 101, duration: 0.92, ease: "power3.inOut" }, 5.35)
        .to(".gateway-rail", { autoAlpha: 0, duration: 0.2 }, 5.45)
        .to(".gateway-brand-reveal", { autoAlpha: 1, duration: 0.18, ease: "power3.out" }, 5.35)
        .to(".gateway-brand-reveal .logo", { scale: 1, yPercent: 0, duration: 0.34, ease: "power3.out" }, 5.35)
        .to(".gateway-brand-reveal .logo", { scale: 1.06, yPercent: -2, duration: 0.2, ease: "power2.in" }, 5.7)
        .to(".gateway-brand-reveal", { autoAlpha: 0, duration: 0.18, ease: "power2.in" }, 5.74)
        .to(".gateway-reveal-copy > *", { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.08, ease: "power3.out" }, 5.9)
        .to(".gateway-enter-line i", { scaleX: 1, duration: 0.55 }, 5.96);
    }, section);

    return () => {
      document.body.classList.remove("gateway-active", "gateway-unlocked");
      context.revert();
    };
  }, []);

  return (
    <section className="azadi-gateway-scroll" ref={root} aria-label="A scroll-led tribute to Pakistan's founders">
      <div className="azadi-gateway">
        <div className="gateway-reveal" aria-hidden="true">
          <Image className="gateway-reveal-image" src="/images/campaign-azadi-hero-v2.webp" alt="" fill priority sizes="100vw" />
          <div className="gateway-reveal-shade" />
          <div className="gateway-reveal-copy">
            <span>VEYRA ATELIER · AZADI EDITION</span>
            <h2>Carry what<br /><em>endures.</em></h2>
            <p>Freedom, craft and the stories we pass forward.</p>
            <div className="gateway-enter-line"><i /><b>THE HOUSE AWAITS BELOW</b></div>
          </div>
        </div>

        <div className="gateway-brand-reveal" aria-hidden="true">
          <Logo light decorative />
        </div>

        <div className="cabinet-panel cabinet-panel--left"><span className="cabinet-grain" /><b className="cabinet-handle" /></div>
        <div className="cabinet-panel cabinet-panel--right"><span className="cabinet-grain" /><b className="cabinet-handle" /></div>

        <div className="gateway-heritage">
          <div className="gateway-opening-copy">
            <span>14 · VIII · 1947</span>
            <h1>Before the <br className="gateway-mobile-break" />objects,<br />there was a <br className="gateway-mobile-break" /><em>dream.</em></h1>
            <p>Scroll through the people who carried it forward.</p>
          </div>

          {leaders.map((leader, index) => (
            <figure className={`gateway-leader gateway-leader--${index + 1}`} key={leader.name}>
              <div className="gateway-leader-image">
                <Image src={leader.image} alt={`Illustrated sketch portrait of ${leader.name}`} fill priority={index === 0} sizes="(max-width: 700px) 54vw, 22vw" />
              </div>
              <figcaption>
                <span>0{index + 1} / 04 · {leader.title}</span>
                <h2>{leader.name}</h2>
                <p>{leader.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="gateway-flag"><FlagMark /></div>
        <div className="gateway-independence"><span>PAKISTAN · 1947—FOREVER</span><h2>Built from courage.<br />Carried with <em>grace.</em></h2></div>

        <div className="gateway-rail gateway-rail--top"><span>VEYRA / AZADI EDITION</span><span>A tribute in four portraits</span><span>PAKISTAN</span></div>
        <div className="gateway-rail gateway-rail--bottom">
          <div className="gateway-progress">{leaders.map((leader, index) => <span key={leader.name}><b>0{index + 1}</b><em><i /></em></span>)}</div>
          <div className="gateway-scroll-cue"><span>Scroll to open</span><b>↓</b></div>
        </div>
      </div>
    </section>
  );
}
