"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaCompass,
  FaBolt,
  FaLanguage,
  FaChartLine,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    icon: <FaChartLine className="text-lg" />,
    title: "Outcome over output",
    desc: "Lines of code don't matter. What matters is whether the system replaces a slow manual process, recovers a lost customer, or pays for itself.",
  },
  {
    icon: <FaLanguage className="text-lg" />,
    title: "Local-first, not global-imitation",
    desc: "Most software in our region is translated from elsewhere. I design from the ground up around how Kurdish and regional businesses actually operate — language, channels, ordering habits, and trust.",
  },
  {
    icon: <FaBolt className="text-lg" />,
    title: "Ship in weeks, not quarters",
    desc: "Most real problems don't need a 6-month roadmap. They need a working v1 next month, real users on it, and ruthless iteration after that.",
  },
  {
    icon: <FaCompass className="text-lg" />,
    title: "AI is the means, not the brand",
    desc: "AI is a tool inside the system, not the headline. The headline is always the business outcome: faster ordering, fewer manual replies, more sales captured.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Understand the real problem",
    desc: "Most briefs describe a feature, not a problem. I spend the first conversation peeling back to what actually hurts the business.",
  },
  {
    step: "02",
    title: "Design the smallest system that works",
    desc: "Cut scope to the one workflow that, if automated, moves the metric. Skip the rest.",
  },
  {
    step: "03",
    title: "Ship to real users fast",
    desc: "A working v1 in production beats a perfect v2 in Figma. Real usage exposes what to build next.",
  },
  {
    step: "04",
    title: "Iterate on evidence",
    desc: "What's measurably saving time or money gets doubled down on. What isn't gets cut. No feature survives on opinion alone.",
  },
];

export default function Principles() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveals = sectionRef.current.querySelectorAll(".principle-reveal");

    if (prefersReducedMotion) {
      reveals.forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
      });
      return;
    }

    const triggers: ScrollTrigger[] = [];

    reveals.forEach((el, i) => {
      const anim = gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: (i % 4) * 0.08,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section
      id="principles"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
      aria-labelledby="principles-heading"
    >
      {/* Background accents */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[160px]" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-0 w-[350px] h-[350px] bg-accent-light/[0.025] rounded-full blur-[140px]" aria-hidden="true" />
      <div className="section-divider absolute top-0 left-0 right-0" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="overline text-accent/70">
            {"// Operating Principles"}
          </span>
          <h2
            id="principles-heading"
            className="text-heading text-gradient mt-4"
          >
            How I Think About Building
          </h2>
          <p className="text-body text-muted mt-4 max-w-2xl mx-auto leading-relaxed">
            The same beliefs apply whether I&apos;m shipping an AI customer agent,
            a dealership platform, or something I haven&apos;t built yet. Tools change.
            Principles don&apos;t.
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-accent-light rounded-full mx-auto mt-6" aria-hidden="true" />
        </motion.div>

        {/* Manifesto line */}
        <div className="principle-reveal text-center mb-16">
          <p className="text-subheading font-medium leading-snug max-w-3xl mx-auto">
            <span className="text-gray-500">I don&apos;t build websites. </span>
            <span className="text-gradient">
              I build systems that change how businesses operate.
            </span>
          </p>
        </div>

        {/* Principles grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-20">
          {principles.map((p) => (
            <div
              key={p.title}
              className="principle-reveal group flex items-start gap-4 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/15 hover:bg-white/[0.035] transition-all duration-500 ease-premium"
            >
              <div className="shrink-0 p-3 rounded-xl bg-gradient-to-br from-accent/15 to-accent-light/10 text-accent">
                {p.icon}
              </div>
              <div>
                <h3 className="font-semibold text-base mb-1.5 text-white">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* How I work — process */}
        <div className="principle-reveal mb-10 text-center">
          <span className="overline text-accent-light/70">
            {"// How I Work"}
          </span>
          <h3 className="text-subheading font-semibold text-gradient mt-3">
            From conversation to shipped product
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {processSteps.map((s) => (
            <div
              key={s.step}
              className="principle-reveal relative p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 transition-all duration-500"
            >
              <div className="text-[11px] font-mono text-accent/70 tracking-widest mb-3">
                {s.step}
              </div>
              <h4 className="font-semibold text-sm mb-2 text-white leading-snug">
                {s.title}
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
