"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  lines: string[];
  className?: string;
}

export default function ScrollTypography({ lines, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const textLines = section.querySelectorAll<HTMLElement>(".scroll-line");
    const triggers: ScrollTrigger[] = [];

    textLines.forEach((line, i) => {
      const direction = i % 2 === 0 ? -1 : 1;
      const scaleTargets = [1, 1.05, 0.97];
      const scaleTarget = scaleTargets[i % scaleTargets.length];

      const anim = gsap.fromTo(
        line,
        { x: direction * -150 },
        {
          x: direction * 250,
          scale: scaleTarget,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, [lines]);

  return (
    <div
      ref={ref}
      className={`py-4 overflow-hidden select-none pointer-events-none ${className}`}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          className="scroll-line whitespace-nowrap text-[clamp(2.5rem,7vw,6.5rem)] font-black tracking-tight leading-[1.1] mb-1"
          style={{
            color: "transparent",
            WebkitTextStroke: `1px rgba(212, 165, 116, ${0.15 + i * 0.07})`,
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}
