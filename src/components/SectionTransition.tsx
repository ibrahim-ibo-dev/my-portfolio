"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Cinematic section transition divider.
 * Sits between sections and creates a parallax fade-in/out effect
 * with a glowing horizontal line and warm radial gradient halo.
 */
interface Props {
  variant?: "default" | "warm" | "cool" | "minimal";
  height?: string;
}

export default function SectionTransition({ variant = "default", height = "h-32 md:h-40" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Line scales horizontally as user scrolls through
  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  // Halo opacity peaks in the middle of the transition
  const haloOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  // Subtle vertical parallax for the halo
  const haloY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const colorMap = {
    default: { line: "rgba(212,165,116,0.6)", halo: "rgba(212,165,116,0.08)" },
    warm: { line: "rgba(220,140,70,0.7)", halo: "rgba(220,140,70,0.10)" },
    cool: { line: "rgba(140,170,212,0.5)", halo: "rgba(140,170,212,0.06)" },
    minimal: { line: "rgba(255,255,255,0.15)", halo: "rgba(255,255,255,0.02)" },
  };
  const colors = colorMap[variant];

  return (
    <div
      ref={ref}
      className={`relative w-full ${height} flex items-center justify-center overflow-hidden pointer-events-none`}
      aria-hidden="true"
    >
      {/* Radial halo */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: haloOpacity,
          y: haloY,
          background: `radial-gradient(ellipse 60% 80% at 50% 50%, ${colors.halo} 0%, transparent 70%)`,
        }}
      />

      {/* Center glowing line */}
      <motion.div
        className="relative w-full max-w-md h-px origin-center"
        style={{
          scaleX,
          background: `linear-gradient(to right, transparent 0%, ${colors.line} 50%, transparent 100%)`,
          boxShadow: `0 0 12px ${colors.line}`,
        }}
      />

      {/* Tiny center dot */}
      <motion.div
        className="absolute w-1 h-1 rounded-full"
        style={{
          opacity: haloOpacity,
          background: colors.line,
          boxShadow: `0 0 8px ${colors.line}`,
        }}
      />
    </div>
  );
}
