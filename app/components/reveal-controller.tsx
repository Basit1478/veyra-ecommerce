"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function RevealController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => gsap.fromTo(element, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, delay: Number.parseInt(element.style.getPropertyValue("--delay") || "0") / 1000, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } }));
      gsap.utils.toArray<HTMLElement>(".image-reveal").forEach((element) => gsap.fromTo(element, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "power4.inOut", scrollTrigger: { trigger: element, start: "top 84%", once: true } }));
    });
    return () => context.revert();
  }, []);
  return null;
}

