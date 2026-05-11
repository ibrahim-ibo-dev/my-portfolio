"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiGithub, FiExternalLink } from "react-icons/fi";
import gsap from "gsap";

interface Props {
  project: Project;
}

export default function ProjectDetail({ project }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const els = contentRef.current.querySelectorAll(".reveal-up");

    if (prefersReducedMotion) {
      els.forEach((el) => { (el as HTMLElement).style.opacity = "1"; });
      return;
    }

    gsap.fromTo(
      els,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.3,
      }
    );
  }, []);

  return (
    <main className="min-h-screen">
      {/* Back button */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/#projects"
          className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-muted hover:text-white border border-white/[0.06] hover:border-accent/20 transition-all duration-400 ease-premium focus-visible:outline-2 focus-visible:outline-accent"
        >
          <FiArrowLeft className="text-accent" aria-hidden="true" />
          Back
        </Link>
      </div>

      {/* Hero image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} z-10`} />
        <div className="absolute inset-0 bg-[#12121A] z-0" />
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover opacity-40 z-[5]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/50 to-transparent z-20" />

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-6 md:p-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full ${
                  project.category === "software"
                    ? "bg-accent/20 text-accent border border-accent/20"
                    : "bg-accent-light/20 text-accent-light border border-accent-light/20"
                }`}
              >
                {project.category}
              </span>
              <span
                className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full border ${
                  project.status === "Completed"
                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                    : project.status === "Ongoing"
                    ? "bg-accent/10 text-accent/80 border-accent/20"
                    : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                }`}
              >
                {project.status}
              </span>
            </div>
            <h1 className="text-display text-gradient">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="max-w-5xl mx-auto px-6 py-16">
        {/* Highlight stats bar */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="reveal-up mb-14 flex flex-wrap gap-4 sm:gap-6">
            {project.highlights.map((h) => (
              <div key={h.label} className="flex-1 min-w-[120px] p-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] text-center">
                <div className="text-base sm:text-lg font-bold text-gradient">{h.value}</div>
                <div className="text-[10px] text-subtle font-mono uppercase tracking-wider mt-1">{h.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* TL;DR */}
        <div className="reveal-up mb-14">
          <h2 className="overline text-accent/70 mb-4">
            {"// In One Line"}
          </h2>
          <p className="text-body-lg text-gray-300 leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* The Problem */}
        {project.problem && (
          <div className="reveal-up mb-12">
            <h2 className="overline text-accent/70 mb-4">
              {"// The Problem"}
            </h2>
            <p className="text-body text-muted leading-relaxed max-w-3xl">
              {project.problem}
            </p>
          </div>
        )}

        {/* My Approach */}
        {project.solution && (
          <div className="reveal-up mb-12">
            <h2 className="overline text-accent/70 mb-4">
              {"// My Approach"}
            </h2>
            <p className="text-body text-muted leading-relaxed max-w-3xl">
              {project.solution}
            </p>
          </div>
        )}

        {/* The Result */}
        {project.impact && (
          <div className="reveal-up mb-12 rounded-2xl border border-accent/15 bg-accent/[0.03] p-6 md:p-8">
            <h2 className="overline text-accent-light/90 mb-4">
              {"// The Result"}
            </h2>
            <p className="text-body-lg text-white leading-relaxed max-w-3xl font-medium">
              {project.impact}
            </p>
          </div>
        )}

        {/* Tech stack */}
        <div className="reveal-up mb-12">
          <h2 className="overline text-accent/70 mb-4">
            {"// Tech Stack"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-sm font-mono rounded-xl bg-accent/10 text-accent/90 border border-accent/15"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="reveal-up mb-16">
          <h2 className="overline text-accent/70 mb-4">
            {"// Links"}
          </h2>
          <div className="flex flex-wrap gap-4">
            {project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary focus-visible:outline-2 focus-visible:outline-accent"
              >
                <FiGithub className="text-accent" aria-hidden="true" />
                GitHub Repository
              </a>
            )}
            {project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary focus-visible:outline-2 focus-visible:outline-accent"
              >
                <FiExternalLink aria-hidden="true" />
                Live Demo
              </a>
            )}
            {project.github === "#" && project.live === "#" && (
              <span className="text-sm text-subtle font-mono">
                Links coming soon...
              </span>
            )}
          </div>
        </div>

        {/* Back to projects */}
        <div className="reveal-up pt-8 border-t border-white/[0.06]">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-subtle hover:text-accent transition-colors duration-400 ease-premium"
          >
            <FiArrowLeft aria-hidden="true" />
            Back to all projects
          </Link>
        </div>
      </div>
    </main>
  );
}
