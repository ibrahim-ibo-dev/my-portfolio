"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Co-Founder & AI Product Lead",
    company: "CSAI — HITEX 2025",
    location: "Kurdistan, Iraq",
    period: "2025",
    description:
      "Co-founded CSAI to solve a concrete problem: Kurdish businesses had no AI customer service that actually understood their language. Built and presented the platform at HITEX 2025 with a dedicated booth, validating the product live with real visitors and business owners before evolving it into Chat Mart.",
    technologies: ["AI Product", "Kurdish NLP", "Customer Automation", "Live Demo"],
    color: "#D4A574",
    borderColor: "border-accent/30",
    bgColor: "bg-accent/5",
  },
  {
    role: "Software & AI Project Lead",
    company: "NICER Club",
    location: "Kurdistan, Iraq",
    period: "2024 — Present",
    description:
      "Turned scattered student ideas into shipped projects — guiding 70+ members through 40+ software/AI and 30+ hardware builds. My role wasn’t to code for them; it was to teach them how to scope a problem, pick the right stack, and ship something real.",
    technologies: ["Tech Leadership", "Mentoring", "AI Projects", "Robotics"],
    color: "#E8C9A0",
    borderColor: "border-accent-light/30",
    bgColor: "bg-accent-light/5",
  },
  {
    role: "Audiobook Producer & Editor",
    company: "Dargakan Application",
    location: "Kurdistan, Iraq",
    period: "2024",
    description:
      "Helped a Kurdish-language audiobook platform launch with real content — producing 40+ audiobooks in 45 days on a 13-hour daily schedule. Proof that I ship under pressure and care about the local content ecosystem, not just code.",
    technologies: ["Audio Production", "Editing", "High-Volume Delivery"],
    color: "#D4A574",
    borderColor: "border-accent/30",
    bgColor: "bg-accent/5",
  },
  {
    role: "Videographer & Content Producer",
    company: "Diwaxan Podcast / Mars Labs",
    location: "Kurdistan, Iraq",
    period: "2024",
    description:
      "Produced and shipped 13 podcast videos in under 5 days for HITEX 2024 coverage. Where most teams plan; I deliver. Same operator mindset I now apply to AI products.",
    technologies: ["Video Production", "Storytelling", "DaVinci Resolve"],
    color: "#E8C9A0",
    borderColor: "border-accent-light/30",
    bgColor: "bg-accent-light/5",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      if (headerRef.current) (headerRef.current as HTMLElement).style.opacity = "1";
      sectionRef.current.querySelectorAll(".exp-card").forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
      });
      return;
    }

    const triggers: ScrollTrigger[] = [];

    // Header reveal
    if (headerRef.current) {
      const headerAnim = gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
      if (headerAnim.scrollTrigger) triggers.push(headerAnim.scrollTrigger);
    }

    // Timeline line draw
    if (timelineRef.current) {
      const line = timelineRef.current.querySelector(".timeline-line-fill");
      if (line) {
        const lineAnim = gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              end: "bottom 30%",
              scrub: 0.8,
            },
          }
        );
        if (lineAnim.scrollTrigger) triggers.push(lineAnim.scrollTrigger);
      }
    }

    // Cards reveal with stagger
    const cards = sectionRef.current.querySelectorAll(".exp-card");
    const isMobile = window.innerWidth < 768;
    cards.forEach((card, i) => {
      const isLeft = i % 2 === 0;
      const cardAnim = gsap.fromTo(
        card,
        {
          opacity: 0,
          x: isMobile ? -30 : isLeft ? -60 : 60,
          rotateY: isMobile ? 0 : isLeft ? 8 : -8,
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
      if (cardAnim.scrollTrigger) triggers.push(cardAnim.scrollTrigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden exp-beams"
      aria-labelledby="experience-heading"
    >
      {/* Soft vertical light beam behind timeline */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[600px] bg-accent/[0.025] rounded-full blur-[200px] rotate-12" />
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[500px] bg-accent/[0.025] rounded-full blur-[180px] -rotate-12" />
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20" style={{ opacity: 0 }}>
          <span className="overline text-accent-light/70">
            {"// Track Record"}
          </span>
          <h2 id="experience-heading" className="text-heading text-gradient mt-4">
            Where I&apos;ve Shipped
          </h2>
          <p className="text-body text-muted mt-4 max-w-lg mx-auto leading-relaxed">
            Roles, teams, and ventures where I&apos;ve turned ideas into shipped, working products &mdash; not just side projects.
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-accent-light rounded-full mx-auto mt-6" />
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline line — left on mobile, center on desktop */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 bg-white/[0.05]">
            <div
              className="timeline-line-fill absolute inset-0 bg-gradient-to-b from-accent via-accent/60 to-accent-light origin-top"
              style={{ transformOrigin: "top" }}
            />
          </div>

          <div className="space-y-10 md:space-y-16">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className="exp-card relative"
                  style={{ opacity: 0, perspective: "1000px" }}
                >
                  {/* === MOBILE LAYOUT === */}
                  <div className="md:hidden relative pl-10">
                    {/* Timeline dot — mobile */}
                    <div className="absolute left-[9px] top-5 z-10">
                      <div
                        className="w-3 h-3 rounded-full border-2"
                        style={{
                          borderColor: exp.color,
                          boxShadow: `0 0 12px ${exp.color}40`,
                          background: `${exp.color}20`,
                        }}
                      />
                    </div>

                    {/* Period pill — mobile */}
                    <span
                      className="inline-block text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full border mb-3"
                      style={{
                        color: exp.color,
                        borderColor: `${exp.color}20`,
                        background: `${exp.color}08`,
                      }}
                    >
                      {exp.period}
                    </span>

                    {/* Card — mobile */}
                    <div
                      className={`rounded-xl p-4 border ${exp.borderColor} bg-white/[0.02] backdrop-blur-sm`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <FaBriefcase
                          className="text-xs"
                          style={{ color: exp.color }}
                        />
                        <span
                          className="text-[10px] font-mono tracking-wider uppercase"
                          style={{ color: exp.color }}
                        >
                          {exp.company}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white mb-1.5">
                        {exp.role}
                      </h3>

                      <div className="flex items-center gap-2 mb-2 text-[10px] text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-[8px]" />
                          {exp.location}
                        </span>
                      </div>

                      <p className="text-xs text-gray-400 leading-relaxed mb-3">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[9px] font-mono rounded-full border"
                            style={{
                              color: exp.color,
                              borderColor: `${exp.color}25`,
                              background: `${exp.color}08`,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* === DESKTOP LAYOUT === */}
                  <div className="hidden md:grid md:grid-cols-2 gap-8 items-center">
                    {/* Timeline dot — desktop */}
                    <div className="absolute left-1/2 top-8 -translate-x-1/2 z-10 flex flex-col items-center">
                      <div
                        className="w-4 h-4 rounded-full border-2"
                        style={{
                          borderColor: exp.color,
                          boxShadow: `0 0 15px ${exp.color}40`,
                          background: `${exp.color}20`,
                        }}
                      />
                    </div>

                    {/* Content card */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      className={`glass-card rounded-2xl p-6 border ${exp.borderColor} ${
                        isLeft ? "md:col-start-1" : "md:col-start-2"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <FaBriefcase
                          className="text-sm"
                          style={{ color: exp.color }}
                        />
                        <span
                          className="text-xs font-mono tracking-wider uppercase"
                          style={{ color: exp.color }}
                        >
                          {exp.company}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">
                        {exp.role}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt className="text-[10px]" /> {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-[10px]" />{" "}
                          {exp.location}
                        </span>
                      </div>

                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[10px] font-mono rounded-full border"
                            style={{
                              color: exp.color,
                              borderColor: `${exp.color}25`,
                              background: `${exp.color}08`,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Period badge on opposite side */}
                    <div
                      className={`flex items-start pt-6 ${
                        isLeft
                          ? "md:col-start-2 justify-start pl-12"
                          : "md:col-start-1 md:row-start-1 justify-end pr-12"
                      }`}
                    >
                      <span
                        className="text-xs font-mono tracking-wider px-3 py-1 rounded-full border"
                        style={{
                          color: exp.color,
                          borderColor: `${exp.color}20`,
                          background: `${exp.color}08`,
                        }}
                      >
                        {exp.period}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
