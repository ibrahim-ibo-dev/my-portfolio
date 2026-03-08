"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  text?: string;
  className?: string;
}

export default function CurvedText({
  text = "Welcome ✦ here ✦ to ✦ my ✦ portfolio ✦ and ✦ enjoy ✦ my ✦ work ✦ ",
  className = "",
}: Props) {
  const textRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const textElement = textRef.current;
    const textPathElement = textElement.querySelector("textPath");
    if (!textPathElement) return;

    // Get the total width of the text content
    const textLength = textPathElement.getComputedTextLength();

    // Set initial position
    gsap.set(textPathElement, {
      attr: { startOffset: 0 },
    });

    // Create infinite loop animation
    gsap.to(textPathElement, {
      attr: { startOffset: -textLength / 3 }, // divide by 3 because we repeat text 3 times
      duration: 25,
      ease: "none",
      repeat: -1,
    });
  }, []);

  // Repeat the text 3 times for seamless looping
  const repeatedText = text + text + text;

  return (
    <section className={`mt-4 bg-gradient-to-b from-transparent via-[#0A0A0F] to-[#0A0A0F] ${className}`}>
      <div className="w-full flex items-center justify-center py-8">
        <div className="relative w-full max-w-3xl px-4 sm:px-0">
          <svg
            className="select-none w-full overflow-visible block aspect-[100/12] text-[5rem] sm:text-[4rem] md:text-[3rem] lg:text-[3.75rem] font-bold uppercase leading-none"
            viewBox="0 0 1440 120"
          >
            {/* Hidden text for accessibility */}
            <text
              xmlSpace="preserve"
              className="invisible opacity-0 pointer-events-none"
            >
              {text}
            </text>

            {/* Curved path definition */}
            <defs>
              <path
                id="curve-path"
                d="M80,40 Q720,440 1360,40"
                fill="none"
                stroke="transparent"
              />
            </defs>

            {/* Animated text along the curve */}
            <text ref={textRef} xmlSpace="preserve" className="fill-white/60">
              <textPath href="#curve-path" startOffset="0" xmlSpace="preserve">
                {repeatedText}
              </textPath>
            </text>
          </svg>

          {/* Left gradient fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-[#0A0A0F] via-[#0A0A0F] to-transparent" />

          {/* Right gradient fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-[#0A0A0F] via-[#0A0A0F] to-transparent" />
        </div>
      </div>
    </section>
  );
}
