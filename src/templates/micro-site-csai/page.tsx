"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/* ══════════════════════════════════════════════
   CSAI Micro-Site — csai.ibrahim-eng.dev
   ══════════════════════════════════════════════ */

const techStack = [
  "Next.js",
  "Python",
  "FastAPI",
  "OpenAI API",
  "Tailwind CSS",
  "PostgreSQL",
  "Kurdish NLP",
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

export default function CSAIMicroSite() {
  return (
    <div className="min-h-screen bg-primary text-white selection:bg-accent/30 selection:text-white">
      {/* ══════════════════════════════════════════════
         Navigation
         ══════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 border-b border-border bg-primary/80 backdrop-blur-2xl shadow-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <a
            href="https://case-study.ibrahim-eng.dev"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-subtle hover:text-white transition-all duration-400 ease-premium"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Archive</span>
          </a>
          <a
            href="https://customerservicesai.wuaze.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide bg-gradient-to-r from-accent to-accent-light text-primary shadow-glow-sm hover:shadow-glow transition-all duration-400 ease-premium"
          >
            <span>Launch Live App</span>
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
      </header>

      <main>
        {/* ══════════════════════════════════════════════
           Hero
           ══════════════════════════════════════════════ */}
        <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
          {/* Background glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-accent/[0.05] rounded-full blur-[200px] sm:blur-[250px] pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
            {/* Overline */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="overline text-accent/70"
            >
              {"// Case Study / 2025"}
            </motion.span>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mt-4 sm:mt-6"
            >
              <span className="text-gradient">
                CSAI: Intelligent
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-light">
                Customer Service Engine
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-4 sm:mt-6 text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed px-2"
            >
              A full-stack AI platform with discount management, product
              catalog, and admin dashboard — supporting Kurdish language.
              Showcased at HITEX 2025.
            </motion.p>

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-10 px-2"
            >
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider rounded-full bg-accent/10 text-accent/70 border border-accent/10"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
           Hero Screenshot
           ══════════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="px-4 sm:px-6 -mt-4 sm:-mt-8 mb-12 sm:mb-20"
        >
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border shadow-card">
              {/* Browser chrome bar */}
              <div className="h-8 sm:h-10 bg-surface/80 border-b border-border flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/50" />
                <div className="flex-1 ml-2 sm:ml-4">
                  <div className="max-w-[200px] sm:max-w-xs mx-auto h-4 sm:h-5 rounded-full bg-white/[0.05] border border-border flex items-center justify-center">
                    <span className="text-[8px] sm:text-[10px] font-mono text-subtle">customerservicesai.wuaze.com</span>
                  </div>
                </div>
              </div>
              {/* Project screenshot */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src="/images/csai.png"
                  alt="Customer Service AI — project screenshot"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════
           Stats Bar
           ══════════════════════════════════════════════ */}
        <motion.section
          {...fadeUp}
          className="border-y border-border bg-surface/40 backdrop-blur-sm"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              { label: "Showcased at", value: "HITEX 2025" },
              { label: "Languages", value: "Kurdish + EN" },
              { label: "Stack", value: "Next.js + Python" },
              { label: "Status", value: "Completed" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-base sm:text-xl md:text-2xl font-bold text-gradient">
                  {stat.value}
                </p>
                <p className="overline text-subtle mt-1 sm:mt-2 text-[9px] sm:text-[11px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════
           Case Study Content
           ══════════════════════════════════════════════ */}
        <section className="py-12 sm:py-20 md:py-28 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[200px] pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Problem + Architecture — stacked on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
              {/* ── The Problem ── */}
              <motion.div {...fadeUp} className="rounded-2xl sm:rounded-3xl border border-border bg-surface/40 backdrop-blur-sm p-5 sm:p-8 shadow-card hover:shadow-card-hover hover:border-accent/15 transition-all duration-500 ease-premium">
                <span className="overline text-accent/60 text-[9px] sm:text-[11px]">
                  01 — The Problem
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-3 sm:mt-4 leading-snug text-gradient">
                  Why I Built This
                </h2>
                <div className="w-12 h-[2px] bg-gradient-to-r from-accent to-accent-light rounded-full mt-3 sm:mt-4 mb-4 sm:mb-6" />
                <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-muted leading-relaxed">
                  <p>
                    Local businesses in Kurdistan lacked affordable, intelligent
                    customer service tools. Existing solutions didn&apos;t support
                    the Kurdish language or understand regional commerce patterns.
                  </p>
                  <p>
                    Small shops and companies were losing customers because they
                    couldn&apos;t respond promptly or personalize interactions at
                    scale. The communication gap between businesses and customers
                    needed a localized AI solution.
                  </p>
                </div>
              </motion.div>

              {/* ── The Architecture ── */}
              <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="rounded-2xl sm:rounded-3xl border border-border bg-surface/40 backdrop-blur-sm p-5 sm:p-8 shadow-card hover:shadow-card-hover hover:border-accent/15 transition-all duration-500 ease-premium">
                <span className="overline text-accent/60 text-[9px] sm:text-[11px]">
                  02 — The Architecture
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-3 sm:mt-4 leading-snug text-gradient">
                  System Design
                </h2>
                <div className="w-12 h-[2px] bg-gradient-to-r from-accent to-accent-light rounded-full mt-3 sm:mt-4 mb-4 sm:mb-6" />
                <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-muted leading-relaxed">
                  <p>
                    <strong className="text-white/80">Frontend:</strong> Next.js
                    App Router with Tailwind CSS — server-rendered for SEO,
                    client-interactive for the admin dashboard and chat interface.
                  </p>
                  <p>
                    <strong className="text-white/80">AI Engine:</strong> Python
                    FastAPI backend wrapping OpenAI&apos;s API with Kurdish-aware
                    prompt engineering, product catalog context injection, and
                    discount logic pipelines.
                  </p>
                  <p>
                    <strong className="text-white/80">Data Layer:</strong>{" "}
                    PostgreSQL for persistent product/discount data with an admin
                    CRUD dashboard and real-time analytics.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* ── Challenges ── */}
            <motion.div {...fadeUp} className="mt-10 sm:mt-16">
              <div className="text-center mb-6 sm:mb-10">
                <span className="overline text-accent/60">
                  03 — Challenges &amp; Solutions
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-3 sm:mt-4 leading-snug text-gradient">
                  Engineering Deep Dive
                </h2>
                <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-accent-light rounded-full mx-auto mt-3 sm:mt-4" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {[
                  {
                    title: "Kurdish NLP",
                    desc: "No pre-existing Kurdish language models. Built custom prompt templates, transliteration layers, and vocabulary expansion to handle Sorani Kurdish with Latin and Arabic scripts.",
                  },
                  {
                    title: "Context Window",
                    desc: "Product catalogs exceeded token limits. Implemented RAG-style chunking and semantic search to inject only relevant product context into each AI conversation turn.",
                  },
                  {
                    title: "Real-time Admin",
                    desc: "The admin dashboard needed live updates without WebSocket complexity. Used Server-Sent Events for analytics and optimistic UI patterns for CRUD operations.",
                  },
                ].map((challenge) => (
                  <div
                    key={challenge.title}
                    className="rounded-2xl sm:rounded-3xl border border-border bg-surface/40 backdrop-blur-sm p-5 sm:p-6 shadow-card hover:shadow-card-hover hover:border-accent/15 transition-all duration-500 ease-premium"
                  >
                    <h3 className="text-sm sm:text-base font-semibold text-white/90 mb-2 sm:mb-3">
                      {challenge.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {challenge.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
           Bottom CTA
           ══════════════════════════════════════════════ */}
        <motion.section
          {...fadeUp}
          className="border-t border-border py-14 sm:py-20 relative overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-accent/[0.04] rounded-full blur-[200px] pointer-events-none" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient">
              Want to see it live?
            </h2>
            <p className="text-muted mt-2 sm:mt-3 text-xs sm:text-sm max-w-md mx-auto">
              CSAI is deployed and running. Try the AI customer service agent
              yourself.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-8 sm:mt-10">
              <a
                href="https://customerservicesai.wuaze.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm font-semibold bg-gradient-to-r from-accent to-accent-light text-primary shadow-glow-sm hover:shadow-glow transition-all duration-400 ease-premium"
              >
                Launch Live App
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
              <a
                href="https://case-study.ibrahim-eng.dev"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm font-medium text-subtle border border-border hover:text-white hover:border-accent/20 transition-all duration-400 ease-premium"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                All Projects
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-6 sm:py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[10px] sm:text-xs text-subtle font-mono">
            &copy; {new Date().getFullYear()} Ibrahim Hussein &middot; CSAI Case Study
          </p>
        </div>
      </footer>
    </div>
  );
}
