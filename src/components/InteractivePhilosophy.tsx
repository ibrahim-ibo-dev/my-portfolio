"use client";

import { useState, useRef } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import dynamic from "next/dynamic";

const IllusionCanvas = dynamic(() => import("./experiments/IllusionOfOpportunity"), { ssr: false, loading: () => <div className="w-full h-full bg-[#07070E]" /> });
const WeightCanvas = dynamic(() => import("./experiments/WeightOfThePast"), { ssr: false, loading: () => <div className="w-full h-full bg-[#07070E]" /> });
const HorizonCanvas = dynamic(() => import("./experiments/EndlessHorizon"), { ssr: false, loading: () => <div className="w-full h-full bg-black" /> });
const FragilityCanvas = dynamic(() => import("./experiments/FragilityOfConnection"), { ssr: false, loading: () => <div className="w-full h-full bg-[#09090B]" /> });
const EchoCanvas = dynamic(() => import("./experiments/EchoChamber"), { ssr: false, loading: () => <div className="w-full h-full bg-[#1C1632]" /> });
const ParadoxCanvas = dynamic(() => import("./experiments/ParadoxOfChoice"), { ssr: false, loading: () => <div className="w-full h-full bg-[#0B0B14]" /> });
const BlindnessCanvas = dynamic(() => import("./experiments/SelectiveBlindness"), { ssr: false, loading: () => <div className="w-full h-full bg-black" /> });
const ButterflyCanvas = dynamic(() => import("./experiments/ButterflyEffect"), { ssr: false, loading: () => <div className="w-full h-full bg-[#0A0A0A]" /> });

/* ══════════════════════════════════════════════
   Data
   ══════════════════════════════════════════════ */

interface PhilosophyProject {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  labUrl: string;
  ready?: boolean;
  category: string;
  tags: string[];
  gradient: string;
}

const philosophyProjects: PhilosophyProject[] = [
  {
    id: "illusion-opportunity",
    title: "The Illusion of Opportunity",
    description:
      "A psychological simulation where 10 open doors beautifully glow, but violently slam shut the moment you step towards them.",
    videoUrl: "/videos/illusion.webm",
    labUrl: "https://lab.ibrahim-eng.dev/illusion",
    ready: true,
    category: "Psychology",
    tags: ["Canvas", "Physics"],
    gradient: "from-accent/20 to-accent-light/10",
  },
  {
    id: "weight-of-past",
    title: "The Weight of the Past",
    description:
      "Moving too fast spawns heavy shadows that tether to your soul. Freedom comes only when you stop to accept them.",
    videoUrl: "/videos/weight.webm",
    labUrl: "https://lab.ibrahim-eng.dev/weight",
    category: "Philosophy",
    tags: ["Kinematics", "Philosophy"],
    gradient: "from-accent-light/20 to-accent/10",
  },
  {
    id: "endless-horizon",
    title: "The Endless Horizon",
    description:
      "The goal mathematically repels you. But the faster you chase the unreachable, the more breathtaking the background becomes.",
    videoUrl: "/videos/horizon.webm",
    labUrl: "https://lab.ibrahim-eng.dev/horizon",
    category: "Concept",
    tags: ["Trigonometry", "Canvas"],
    gradient: "from-accent/15 to-accent-light/15",
  },
  {
    id: "fragility-connection",
    title: "The Fragility of Connection",
    description:
      "Building a crystalline connection requires extremely slow movements. A single sudden jerk violently shatters the bond.",
    videoUrl: "/videos/fragility.webm",
    labUrl: "https://lab.ibrahim-eng.dev/fragility",
    category: "Emotion",
    tags: ["Velocity Tracking", "Particles"],
    gradient: "from-accent-light/15 to-accent/10",
  },
  {
    id: "echo-chamber",
    title: "The Echo Chamber",
    description:
      "Accepting only familiar shapes makes your bubble thicker and darker. Rejecting opposing views isolates you completely.",
    videoUrl: "/videos/echo.webm",
    labUrl: "https://lab.ibrahim-eng.dev/echo",
    category: "Social",
    tags: ["Collision Math", "UI"],
    gradient: "from-accent/20 to-accent/10",
  },
  {
    id: "paradox-of-choice",
    title: "The Paradox of Choice",
    description:
      "Three calm choices fracture into hundreds the moment you approach one. The only peace is to stop choosing entirely.",
    videoUrl: "/videos/paradox.webm",
    labUrl: "https://lab.ibrahim-eng.dev/paradox",
    category: "Cognitive",
    tags: ["Swarm Physics", "Spawn Logic"],
    gradient: "from-accent-light/20 to-accent-light/10",
  },
  {
    id: "selective-blindness",
    title: "Selective Blindness",
    description:
      "The truth is written in giant letters — but your spotlight reveals only addictive distractions. Sweep fast to see it.",
    videoUrl: "/videos/blindness.webm",
    labUrl: "https://lab.ibrahim-eng.dev/blindness",
    category: "Attention",
    tags: ["Canvas Masking", "Particles"],
    gradient: "from-accent/10 to-accent-light/20",
  },
  {
    id: "butterfly-effect",
    title: "The Butterfly Effect",
    description:
      "A silent grid of thousands of dots. One click sends a wave that warps the entire universe into breathtaking patterns.",
    videoUrl: "/videos/butterfly.webm",
    labUrl: "https://lab.ibrahim-eng.dev/butterfly",
    category: "Chaos Theory",
    tags: ["Wave Function", "10k Dots"],
    gradient: "from-accent-light/15 to-accent/15",
  },
];

const INITIAL_COUNT = 3;

/* ══════════════════════════════════════════════
   Card
   ══════════════════════════════════════════════ */

function PhilosophyCard({ project, index }: { project: PhilosophyProject; index: number }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapperRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      <a
        href={project.labUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} — ${project.category} experience (opens in new tab)`}
        className="h-full block"
      >
        <div className="relative rounded-3xl overflow-hidden group cursor-pointer h-full border border-white/[0.05] bg-surface/60 backdrop-blur-sm shadow-card hover:shadow-card-hover hover:border-accent/15 transition-all duration-500 ease-premium">
          {/* Card top — media area */}
          <div className="relative h-52 overflow-hidden">
            {(() => {
              const canvasMap: Record<string, ReactNode> = {
                "illusion-opportunity": <IllusionCanvas />,
                "weight-of-past": <WeightCanvas />,
                "endless-horizon": <HorizonCanvas />,
                "fragility-connection": <FragilityCanvas />,
                "echo-chamber": <EchoCanvas />,
                "paradox-of-choice": <ParadoxCanvas />,
                "selective-blindness": <BlindnessCanvas />,
                "butterfly-effect": <ButterflyCanvas />,
              };
              const preview = canvasMap[project.id];
              if (preview) {
                return (
                  <>
                    <div className="absolute inset-0 z-[5] [&_canvas]:!cursor-pointer">
                      {preview}
                    </div>
                    <div className="absolute inset-0 z-[6] bg-gradient-to-t from-[#12121A]/50 via-transparent to-transparent pointer-events-none" />
                  </>
                );
              }
              return (
                <>
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} z-10`} />
                  <div className="absolute inset-0 bg-[#12121A] z-0" />
                  <div className="absolute inset-0 z-[5] flex items-center justify-center">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center">
                        <span className="text-xl font-bold text-gradient opacity-40">∅</span>
                      </div>
                      <div className="absolute -inset-8 bg-accent/[0.03] rounded-full blur-2xl" />
                    </div>
                  </div>
                </>
              );
            })()}
            <div className="absolute top-3 left-3 z-20">
              <span className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider rounded-full bg-black/40 backdrop-blur-sm text-white/60 border border-white/10">
                {project.category}
              </span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="px-4 py-2 rounded-full glass-card backdrop-blur-xl text-xs font-medium text-white border border-white/20">
                Experience &rarr;
              </span>
            </div>
            <div className="absolute top-2 left-2 w-5 h-5 border-l border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
            <div className="absolute bottom-2 right-2 w-5 h-5 border-r border-b border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
          </div>
          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-bold group-hover:text-gradient transition-all duration-300 mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full bg-accent/10 text-accent/80 border border-accent/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   Section
   ══════════════════════════════════════════════ */

export default function InteractivePhilosophy() {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const visibleProjects = isExpanded
    ? philosophyProjects
    : philosophyProjects.slice(0, INITIAL_COUNT);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
      aria-labelledby="philosophy-heading"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/[0.025] rounded-full blur-[200px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-accent-light/[0.02] rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
      <div className="section-divider absolute top-0 left-0 right-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="overline text-accent/70">{"// The Lab"}</span>
          <h2 id="philosophy-heading" className="text-heading text-gradient mt-4">
            Code & Psychology
          </h2>
          <p className="text-body text-muted mt-4 max-w-xl mx-auto leading-relaxed">
            Where code meets human psychology. Standalone experimental web
            environments that turn abstract ideas into visceral experiences.
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-accent-light rounded-full mx-auto mt-6" aria-hidden="true" />
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, i) => (
              <PhilosophyCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Expand / Collapse + lab link */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {philosophyProjects.length > INITIAL_COUNT && (
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide border border-accent/15 bg-accent/[0.04] text-accent/80 hover:text-accent hover:border-accent/30 hover:shadow-glow-sm transition-all duration-400 ease-premium focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <span>{isExpanded ? "Show Less" : "Show All Experiments"}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-400 ease-premium ${isExpanded ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}

          {/* Lab link pill */}
          <a
            href="https://lab.ibrahim-eng.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/[0.07] bg-white/[0.02] hover:border-accent/20 hover:bg-accent/[0.03] transition-all duration-400 ease-premium"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
            <span className="text-xs font-mono text-white/40 group-hover:text-white/70 transition-colors duration-300">
              lab.ibrahim-eng.dev
            </span>
            <svg className="w-3 h-3 text-accent/40 group-hover:text-accent/70 group-hover:translate-x-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
