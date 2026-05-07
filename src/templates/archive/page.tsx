"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

/* ══════════════════════════════════════════════
   Archive Data — case-study.ibrahim-eng.dev
   ══════════════════════════════════════════════ */

interface ArchiveProject {
  year: string;
  title: string;
  description: string;
  madeFor: string;
  tech: string[];
  image: string;
  category: "software" | "hardware";
  status: "Completed" | "Ongoing" | "Conceptualized";
  link: string;
  archived?: boolean;
}

const archiveProjects: ArchiveProject[] = [
  { year: "2025", title: "CSAI — Customer Service AI", description: "Full-stack AI customer service platform with Kurdish language support, product catalog, and admin dashboard.", madeFor: "HITEX 2025", tech: ["Next.js", "Python", "AI"], image: "/images/projects/csai.jpg", category: "software", status: "Completed", link: "/csai" },
  { year: "2026", title: "Chat Mart — Omni-Channel SaaS", description: "Evolution of CSAI into a multi-company marketplace with 5 messaging channels, Kurdish TTS voice replies, RBAC, reservation system, and PWA.", madeFor: "Businesses", tech: ["PHP", "Gemini API", "WhatsApp", "PWA"], image: "/images/projects/chat-mart.png", category: "software", status: "Completed", link: "/chat-mart" },
  { year: "2025", title: "Ashti Library", description: "Kurdish bookstore website with AI chatbot, search/filtering, admin dashboard, and WhatsApp ordering. Built for a real client in Erbil.", madeFor: "Ashti Books, Erbil", tech: ["PHP", "Gemini API", "RTL"], image: "/images/projects/ashti-library.jpg", category: "software", status: "Completed", link: "/ashti-library" },
  { year: "2026", title: "Bradaran — Car Dealership", description: "Complete car dealership management: inventory, cash & installment sales, rentals, debt tracking, financial reports, RBAC, push notifications, and PWA.", madeFor: "Car Dealership Client", tech: ["PHP", "MySQL", "PWA", "Push"], image: "/images/projects/bradar.png", category: "software", status: "Completed", link: "/xara" },
  { year: "2026", title: "Dyari — Advanced Car Dealership", description: "Enhanced dealership system with dual-database architecture, batch car imports, individual & gallery deposit tracking, advance payments, and automated receipts.", madeFor: "Car Dealership Client", tech: ["PHP", "MySQL", "Dual DB", "PWA"], image: "/images/projects/dyari-car.png", category: "software", status: "Completed", link: "/diari" },
  { year: "2025", title: "ID Kurdm — AI Platform", description: "Comprehensive AI API integration project mastering agent orchestration and large-scale architecture.", madeFor: "Personal R&D", tech: ["Python", "AI Agents", "API"], image: "/images/projects/id-kurdm.jpg", category: "software", status: "Completed", link: "#" },
  { year: "2025", title: "AI Social Media Responder", description: "Self-trained AI that responds to customer inquiries with company profiles and pricing.", madeFor: "Small Business", tech: ["NLP", "Automation", "API"], image: "/images/projects/ai-social-responder.jpg", category: "software", status: "Conceptualized", link: "#", archived: true },
  { year: "2024", title: "Home System", description: "Smart home integrating five sensor-based mini-projects on Arduino into one comprehensive system.", madeFor: "TIU / LFU / NICER", tech: ["Arduino", "IoT", "Sensors"], image: "/images/projects/home-system.jpg", category: "hardware", status: "Completed", link: "#" },
  { year: "2024", title: "Water Level Monitoring", description: "Real-time water tank monitoring with alerts at 15% and 80% levels and progress bar display.", madeFor: "Personal Project", tech: ["Arduino", "Sensors"], image: "/images/projects/water-level.jpg", category: "hardware", status: "Completed", link: "#" },
  { year: "2024", title: "Hand Drones", description: "Drone with 1.2km+ range controlled via gyroscope instead of traditional joystick.", madeFor: "Personal R&D", tech: ["ESP", "Gyroscope", "Drone"], image: "/images/projects/hand-drones.jpg", category: "hardware", status: "Ongoing", link: "#", archived: true },
  { year: "2024", title: "Glove Talk", description: "Speech-enabled glove converting sign language to speech and text for ~250K people in Kurdistan.", madeFor: "Accessibility", tech: ["Robotics", "AI", "NLP"], image: "/images/projects/glove-talk.jpg", category: "hardware", status: "Conceptualized", link: "#", archived: true },
  { year: "2024", title: "Portfolio v2", description: "Personal portfolio website with 3D scenes, GSAP animations, and cinematic design system.", madeFor: "Personal", tech: ["Next.js", "Tailwind", "GSAP"], image: "/images/projects/portfolio-v2.jpg", category: "software", status: "Completed", link: "https://ibrahim-eng.dev", archived: true },
  { year: "2024", title: "Erbil Chess Academy", description: "Official RTL Kurdish website for Erbil Chess Academy (Asia Chess Federation branch) with activities tracker, search/filter, and admin panel.", madeFor: "Erbil Chess Academy", tech: ["HTML", "CSS", "JS", "RTL"], image: "/images/projects/erbil-chess.jpg", category: "software", status: "Completed", link: "https://case-study.ibrahim-eng.dev/ches" },
  { year: "2025", title: "Face Track Pro — Attendance System", description: "Face recognition attendance system recognizing up to 20 students per frame. CNN/HOG detection, SQLite, Tkinter UI, Excel/PDF/Matplotlib exports.", madeFor: "Universities & Companies", tech: ["Python", "OpenCV", "face_recognition", "dlib", "SQLite"], image: "/images/projects/face-track-pro.jpg", category: "software", status: "Completed", link: "https://case-study.ibrahim-eng.dev/attendance" },
  { year: "2025", title: "Gesture Recognition Engine", description: "Real-time gesture recognizer using MediaPipe (hands, face, pose) and custom KNN model with incremental learning, augmentation, and temporal analysis.", madeFor: "Accessibility / R&D", tech: ["Python", "MediaPipe", "KNN", "scikit-learn", "OpenCV"], image: "/images/projects/gestures.jpg", category: "software", status: "Completed", link: "https://case-study.ibrahim-eng.dev/gestures" },
  { year: "2023", title: "Kurdistan CTF Tools", description: "Custom security tools built for CTF competitions including exploit frameworks and analysis tools.", madeFor: "CTF Competition", tech: ["Python", "Security"], image: "/images/projects/ctf-tools.jpg", category: "software", status: "Completed", link: "#", archived: true },
  { year: "2023", title: "CodeX Examination Prep", description: "National exam preparation platform with algorithmic problem solving and practice modules.", madeFor: "National Exam", tech: ["C++", "Algorithms"], image: "/images/projects/codex-prep.jpg", category: "software", status: "Completed", link: "#", archived: true },
];

const filters = ["all", "software", "hardware"] as const;
type Filter = (typeof filters)[number];

/* ── Card (matches portfolio ProjectCard) ── */

function ArchiveCard({ project, index }: { project: ArchiveProject; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      layout
    >
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
        <div className={`relative rounded-3xl overflow-hidden group cursor-pointer h-full border transition-all duration-500 ease-premium ${
          project.archived
            ? "border-white/[0.03] bg-surface/30 backdrop-blur-sm shadow-card opacity-50 grayscale"
            : "border-white/[0.05] bg-surface/60 backdrop-blur-sm shadow-card hover:shadow-card-hover hover:border-accent/15"
        }`}>
          {/* Card top */}
          <div className="relative h-52 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-accent-light/15 z-10" />
            <div className="absolute inset-0 bg-[#12121A] z-0" />
            <Image
              src={project.image}
              alt={project.title}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-50 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500 z-[5]"
            />

            {/* Category badge */}
            <div className="absolute top-3 left-3 z-20">
              <span className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider rounded-full backdrop-blur-sm ${
                project.category === "software"
                  ? "bg-accent/20 text-accent border border-accent/20"
                  : "bg-accent-light/20 text-accent-light border border-accent-light/20"
              }`}>
                {project.category}
              </span>
            </div>

            {/* View indicator on hover */}
            <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="px-4 py-2 rounded-full glass-card backdrop-blur-xl text-xs font-medium text-white border border-white/20">
                View Details &rarr;
              </span>
            </div>

            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-5 h-5 border-l border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
            <div className="absolute bottom-2 right-2 w-5 h-5 border-r border-b border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className={`text-lg font-bold transition-all duration-300 line-clamp-1 ${
                  project.archived ? "line-through text-gray-500" : "group-hover:text-gradient"
                }`}>
                {project.title}
              </h3>
              {project.archived ? (
                <span className="shrink-0 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded-full border bg-gray-800/50 text-gray-600 border-gray-700/30">
                  Archived
                </span>
              ) : (
                <span className={`shrink-0 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded-full border ${
                  project.status === "Completed" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                  project.status === "Ongoing" ? "bg-accent/10 text-accent/80 border-accent/20" :
                  "bg-gray-500/10 text-gray-400 border-gray-500/20"
                }`}>
                  {project.status}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 mb-1.5 leading-relaxed line-clamp-2">
              {project.description}
            </p>
            <p className="text-[11px] text-subtle mb-4">
              Made for <span className="text-accent/70">{project.madeFor}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full bg-accent/10 text-accent/80 border border-accent/10"
                >
                  {t}
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
   Page
   ══════════════════════════════════════════════ */

export default function ArchivePage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all"
    ? archiveProjects
    : archiveProjects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-primary text-white selection:bg-accent/30 selection:text-white">
      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 border-b border-border bg-primary/80 backdrop-blur-2xl shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a
            href="https://ibrahim-eng.dev"
            className="inline-flex items-center gap-2 text-sm text-subtle hover:text-white transition-all duration-400 ease-premium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span>Ibrahim&apos;s Portfolio</span>
          </a>
          <span className="overline text-accent/50">
            Project Archive
          </span>
        </div>
      </header>

      <main className="relative overflow-hidden">
        {/* Background effects (matching portfolio) */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-accent-light/[0.03] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/12 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-28 relative z-10">
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-10"
          >
            <div className="grid lg:grid-cols-5 gap-8 items-end">
              <div className="lg:col-span-3">
                <span className="overline text-accent/70">{"// All Work"}</span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient mt-4">
                  Project Archive
                </h1>
                <p className="text-sm sm:text-base text-muted mt-4 max-w-xl leading-relaxed">
                  A complete archive of every project I&apos;ve built, from AI platforms
                  and embedded systems to web applications and experimental tools.
                </p>
                <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-accent-light rounded-full mt-6" />
              </div>

              {/* Filter tabs */}
              <div className="lg:col-span-2 flex justify-start lg:justify-end">
                <div className="inline-flex gap-1.5 p-1.5 rounded-full bg-surface/60 border border-white/[0.05] backdrop-blur-sm">
                  {filters.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-400 ease-premium ${
                        filter === f
                          ? "bg-accent/15 text-accent border border-accent/20 shadow-glow-sm"
                          : "text-subtle hover:text-white/70 border border-transparent"
                      }`}
                    >
                      {f === "all" ? `All (${archiveProjects.length})` : f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Card Grid (2 cols like portfolio) ── */}
          <div className="grid md:grid-cols-2 gap-7">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ArchiveCard key={project.title} project={project} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {/* ── Footer ── */}
          <div className="mt-16 sm:mt-20 pt-8 border-t border-border text-center">
            <p className="text-xs text-subtle font-mono">
              &copy; {new Date().getFullYear()} Ibrahim Hussein &middot; Built with Next.js
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
