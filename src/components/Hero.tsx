"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Scene3D from "./Scene3D";

export default function Hero() {
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8 }
    )
      .fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(
        headlineRef.current,
        { y: 60, opacity: 0, filter: "blur(16px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2 },
        "-=0.2"
      )
      .fromTo(
        nameRef.current,
        { y: 40, opacity: 0, filter: "blur(12px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
        "-=0.7"
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
        "-=0.3"
      );
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <Scene3D />

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/70 to-transparent z-10" />

      <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
        {/* Decorative line */}
        <div
          ref={lineRef}
          className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"
          style={{ transform: "scaleX(0)" }}
        />

        <p
          ref={labelRef}
          className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-accent/60 mb-4 font-medium"
          style={{ opacity: 0 }}
        >
          Computer Engineer &bull; AI Developer &bull; Full web Stack Developer &bull; Robotics Enthusiast
        </p>

        <h1
          ref={headlineRef}
          className="text-xs sm:text-sm md:text-base text-gray-500 font-light mb-2 tracking-wide"
          style={{ opacity: 0 }}
        >
          Hello, I&apos;m
        </h1>

        <span
          ref={nameRef}
          className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient leading-[1.1] mb-6"
          style={{ opacity: 0 }}
        >
          Ibrahim Hussein
        </span>

        <p
          ref={subtitleRef}
          className="text-sm md:text-base text-gray-400 max-w-lg mx-auto leading-relaxed mb-10"
          style={{ opacity: 0 }}
        >
          Innovative Computer Engineering student with expertise in AI-powered applications, full-stack development, and digital content creation. Award-winning technical specialist.
        </p>

        {/* CTA buttons */}
        <div
          ref={ctaRef}
          className="flex items-center justify-center gap-3 sm:gap-4"
          style={{ opacity: 0 }}
        >
          <a
            href="#projects"
            className="group relative rounded-full px-5 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-medium bg-gradient-to-r from-accent to-accent-light text-primary transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:scale-105"
          >
            View Projects
          </a>
          <a
            href="#about"
            className="rounded-full px-5 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-medium text-gray-300 border border-white/10 hover:border-accent/30 hover:text-white hover:bg-white/[0.04] transition-all duration-300"
          >
            About Me
          </a>
        </div>
      </div>
    </section>
  );
}
