"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const credentials = [
  {
    badge: "// Hardware",
    title: "NICER Club — Home System Project",
    subtitle: "LFU · NICER Club",
    text:
      "Presented the Home System project at NICER Club, Lebanese French University. Certificate issued by Head of NICER Club Dr. Mohamed Tahir and College Dean Dr. Banar Fareed Ibrahim.",
    image: "/images/achievements/nicer-home-system.jpg",
    accent: "from-accent-light/20 to-accent/10",
    dot: "bg-accent-light",
  },
  {
    badge: "// Cybersecurity",
    title: "1st Place — Kurdistan Region CTF Competition",
    subtitle: "Security Achievement · 10,200 Points",
    text:
      "Won 1st place in the Kurdistan Region CTF Competition with 31 flags captured, 10,200 total points. Top categories: Reversing (21 flags) and Coding (10 flags).",
    image: "/images/achievements/ctf-competition.png",
    accent: "from-accent/20 to-accent-light/10",
    dot: "bg-accent",
  },
  {
    badge: "// Competition",
    title: "2nd Place — Salahaddin University Coding Competition",
    subtitle: "Programming Achievement",
    text:
      "Achieved 2nd place in the coding competition at Salahaddin University, demonstrating strong algorithmic thinking and problem-solving skills under competitive pressure.",
    image: "/images/achievements/coding-competition.jpg",
    accent: "from-accent-light/20 to-accent/10",
    dot: "bg-accent-light",
  },
  {
    badge: "// Programming",
    title: "C++ Mastering Functions — CodeSignal",
    subtitle: "Certification · December 2024",
    text:
      "Earned the Mastering Functions in C++ certificate from CodeSignal as part of the Functional Programming in C++ learning path. Verified by Tigran Sloyan, CEO.",
    image: "/images/achievements/codesignal.jpg",
    accent: "from-accent/20 to-accent/10",
    dot: "bg-accent",
  },
  {
    badge: "// Programming",
    title: "KNU CodeX — National Programming Leaderboard",
    subtitle: "Competitive Programming",
    text:
      "Ranked among the top performers in the KNU CodeX national programming examination across Iraq with 91 total score and 11 submissions.",
    image: "/images/achievements/codex-leaderboard.jpg",
    accent: "from-accent-light/15 to-accent/10",
    dot: "bg-accent-light",
  },
  {
    badge: "// Engineering",
    title: "NICE 2025 — National Innovation Competition in Engineering",
    subtitle: "Tishk International University · May 2025",
    text:
      "Received Certificate of Appreciation as attendee at the 10th National Innovation Competition in Engineering (NICE2025) at Tishk International University, Erbil. Theme: Targeting Smart Sustainable Innovations.",
    image: "/images/achievements/nice-attendee.png",
    accent: "from-accent/15 to-accent-light/15",
    dot: "bg-accent",
  },
  {
    badge: "// Hardware",
    title: "NICE 2025 — Smart Home System Project",
    subtitle: "Tishk International University · May 2025",
    text:
      "Presented the Smart Home System project at the 10th National Innovation Competition in Engineering (NICE2025), showcasing IoT and embedded systems expertise.",
    image: "/images/achievements/nice-smart-home.png",
    accent: "from-accent-light/20 to-accent-light/10",
    dot: "bg-accent-light",
  },
  {
    badge: "// Project",
    title: "Cihan Institute — Handy Flyer Project",
    subtitle: "Scientific Research Center · April 2025",
    text:
      "Received appreciation from Cihan Institute for presenting the Handy Flyer project at the 1st AI & Robotics Exhibition. Recognized by the Kurdistan Regional Government Ministry of Education.",
    image: "/images/achievements/cihan-handy-flyer.png",
    accent: "from-accent/20 to-accent/10",
    dot: "bg-accent",
  },
  {
    badge: "// Web Expo",
    title: "ECS Vision Web Expo 2026 — Signed Language",
    subtitle: "LFU · Web Expo 2026",
    text:
      "Participated in the ECS Vision Web Expo 2026 at Lebanese French University with the Signed Language project. Recognized for creativity, dedication, and innovative contribution.",
    image: "/images/achievements/ecs-signed-language.jpg",
    accent: "from-accent-light/15 to-accent/15",
    dot: "bg-accent-light",
  },
  {
    badge: "// Web Expo",
    title: "ECS Vision Web Expo 2026 — True Prence",
    subtitle: "LFU · Web Expo 2026",
    text:
      "Participated in the ECS Vision Web Expo 2026 at Lebanese French University with the True Prence project. Recognized for creativity, dedication, and innovative contribution.",
    image: "/images/achievements/ecs-true-prence.jpg",
    accent: "from-accent/15 to-accent-light/15",
    dot: "bg-accent",
  },
  {
    badge: "// AI",
    title: "1st Place — AI Projects Training Course (LFU)",
    subtitle: "AI Achievement · August 2025",
    text:
      "Obtained 1st place in AI projects at the AI Training Course at Lebanese French University (August 3–21, 2025). Covered AI & Human Intelligence, practical AI tools, and strategies for the future of work.",
    image: "/images/achievements/ai-training.jpg",
    accent: "from-accent-light/20 to-accent-light/10",
    dot: "bg-accent-light",
  },
];

const INITIAL_COUNT = 3;

export default function Credentials() {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const visibleCredentials = isExpanded
    ? credentials
    : credentials.slice(0, INITIAL_COUNT);

  return (
    <section
      id="credentials"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
      aria-labelledby="credentials-heading"
    >
      {/* Constellation starfield */}
      <div className="absolute inset-0 constellation-bg" />
      {/* Central nebula glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-light/[0.025] rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-accent/[0.02] rounded-full blur-[150px] pointer-events-none" />
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="overline text-accent/70">
            {"// Achievements"}
          </span>
          <h2 id="credentials-heading" className="text-heading text-gradient mt-4">
            Honors &amp; Achievements
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-accent-light rounded-full mx-auto mt-6" />
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCredentials.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className={`relative rounded-3xl border border-white/[0.07] bg-gradient-to-br ${item.accent} overflow-hidden group hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-500`}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/60 to-transparent" />
                {/* Badge on image */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider rounded-full bg-black/40 backdrop-blur-sm text-white/60 border border-white/10">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2 h-2 rounded-full ${item.dot} opacity-80`} />
                  <p className="text-xs text-gray-500 font-mono">{item.subtitle}</p>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expand / Collapse */}
        {credentials.length > INITIAL_COUNT && (
          <motion.div
            className="flex justify-center mt-14"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide border border-accent/15 bg-accent/[0.04] text-accent/80 hover:text-accent hover:border-accent/30 hover:shadow-glow-sm transition-all duration-400 ease-premium focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <span>{isExpanded ? "Show Less" : "View All Achievements"}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-400 ease-premium ${isExpanded ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              {!isExpanded && (
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-accent/40 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent/60" />
                </span>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
