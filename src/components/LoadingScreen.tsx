"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Skip loading screen on mobile for faster LCP
    const isMobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;

    if (prefersReducedMotion || isMobile) {
      setVisible(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => setVisible(false),
        });
      },
    });

    tl.fromTo(
      logoRef.current,
      { scale: 0.5, opacity: 0, filter: "blur(10px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.45, ease: "back.out(1.7)" }
    )
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: "power2.inOut" },
        "-=0.15"
      )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.2 },
        "-=0.25"
      )
      .to({}, { duration: 0.15 });
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#0A0A0F] flex items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      <div className="text-center">
        <div
          ref={logoRef}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl border border-accent/30 bg-accent/5 mb-6"
          style={{ opacity: 0 }}
        >
          <span className="text-3xl font-bold text-gradient">IH</span>
        </div>

        <div
          ref={lineRef}
          className="w-32 h-[2px] bg-gradient-to-r from-accent via-accent-light to-accent mx-auto mb-4"
          style={{ transform: "scaleX(0)" }}
        />

        <p
          ref={textRef}
          className="text-[11px] font-mono text-gray-600 uppercase tracking-[0.3em]"
          style={{ opacity: 0 }}
        >
          Loading
        </p>
      </div>
    </div>
  );
}
