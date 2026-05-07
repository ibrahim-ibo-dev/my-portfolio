"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";
const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

const trustItems = [
  { value: "2nd", label: "Coding Competition" },
  { value: "HITEX", label: "2025 Showcase" },
  { value: "10+", label: "Projects Shipped" },
  { value: "30+", label: "Hardware Builds" },
];

export default function Hero() {
  const overlineRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const allRefs = [overlineRef, nameRef, subtitleRef, ctaRef, trustRef, scrollRef];

    if (prefersReducedMotion) {
      allRefs.forEach((ref) => {
        if (ref.current) {
          ref.current.style.opacity = "1";
          ref.current.style.transform = "none";
          ref.current.style.filter = "none";
        }
      });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.2 });

    tl.fromTo(
      overlineRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    )
      .fromTo(
        nameRef.current,
        { y: 50, opacity: 0, filter: "blur(12px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1 },
        "-=0.3"
      )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        trustRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.1"
      );
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <Scene3D />

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/80 to-transparent z-10" aria-hidden="true" />
      {/* Top gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0A0A0F]/50 to-transparent z-10" aria-hidden="true" />

      <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
        {/* Overline */}
        <p
          ref={overlineRef}
          className="overline text-accent/80 mb-6"
          style={{ opacity: 0 }}
        >
          Computer Engineer &bull; AI Developer &bull; Innovator
        </p>

        {/* Name */}
        <h1
          id="hero-heading"
          ref={nameRef}
          className="text-display text-gradient mb-6"
          style={{ opacity: 0 }}
        >
          Ibrahim Hussein
        </h1>

        {/* Value proposition */}
        <p
          ref={subtitleRef}
          className="text-body-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ opacity: 0 }}
        >
          I engineer <span className="text-white font-medium">software systems</span> and{" "}
          <span className="text-white font-medium">AI platforms</span> that actually work in the real world. 
          From building localized tech showcased at <span className="text-accent">HITEX 2025</span>, 
          to leading development teams and winning national hackathons.
        </p>

        {/* CTA buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14"
          style={{ opacity: 0 }}
        >
          <a
            href="#projects"
            className="btn-primary focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            View My Work
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#contact"
            className="btn-secondary focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            Get in Touch
          </a>
        </div>

        {/* Trust bar */}
        <div
          ref={trustRef}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8"
          style={{ opacity: 0 }}
        >
          {trustItems.map((item, i) => (
            <div key={item.label} className="flex items-center gap-3 text-left">
              {i > 0 && (
                <div className="hidden sm:block w-px h-8 bg-white/[0.06]" aria-hidden="true" />
              )}
              <div className={i > 0 ? "sm:pl-3" : ""}>
                <div className="text-sm sm:text-base font-bold text-gradient">{item.value}</div>
                <div className="text-[10px] sm:text-[11px] text-gray-500 font-mono uppercase tracking-wider">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-accent/40 to-transparent" />
      </div>
    </section>
  );
}
