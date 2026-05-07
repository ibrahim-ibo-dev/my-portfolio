"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type Project } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const FEATURED_COUNT = 4;

function ProjectCard({ project, index }: { project: Project; index: number }) {
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
        href={project.caseStudyUrl || `/projects/${project.slug}`}
      >
        <div className="relative rounded-3xl overflow-hidden group cursor-pointer h-full border border-white/[0.05] bg-surface/60 backdrop-blur-sm shadow-card hover:shadow-card-hover hover:border-accent/15 transition-all duration-500 ease-premium">
          {/* Card top */}
          <div className="relative h-52 overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} z-10`} />
            <div className="absolute inset-0 bg-[#12121A] z-0" />
            <Image
              src={project.image}
              alt={project.title}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
              <h3 className="text-lg font-bold group-hover:text-gradient transition-all duration-300">
                {project.title}
              </h3>
              <span className={`shrink-0 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded-full border ${
                project.status === "Completed" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                project.status === "Ongoing" ? "bg-accent/10 text-accent/80 border-accent/20" :
                "bg-gray-500/10 text-gray-400 border-gray-500/20"
              }`}>
                {project.status}
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full bg-accent/10 text-accent/80 border border-accent/10"
                >
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

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const btnInView = useInView(btnRef, { once: true, margin: "-40px" });

  const featured = projects.slice(0, FEATURED_COUNT);

  useEffect(() => {
    if (!headerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      headerRef.current.style.opacity = "1";
      return;
    }

    const anim = gsap.fromTo(
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

    return () => { anim.scrollTrigger?.kill(); };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden" aria-labelledby="projects-heading">
      {/* Diagonal sweep gradient */}
      <div className="absolute inset-0 projects-sweep" />
      {/* Accent glows at corners */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[180px]" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-accent-light/[0.03] rounded-full blur-[140px]" />
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12 items-start mb-10">
          <div ref={headerRef} className="lg:col-span-3">
            <span className="overline text-accent/70">
              {"// My Projects"}
            </span>
            <h2 id="projects-heading" className="text-heading text-gradient mt-4">
              Featured Projects
            </h2>
            <p className="text-body text-muted mt-4 max-w-xl leading-relaxed">
              A curated selection of my strongest work. From AI platforms to
              smart hardware — each built to solve meaningful problems.
            </p>
            <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-accent-light rounded-full mt-6" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-7">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {/* Archive CTA */}
        <motion.div
          ref={btnRef}
          initial={{ opacity: 0, y: 40 }}
          animate={btnInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex justify-center mt-16"
        >
          <a
            href="https://case-study.ibrahim-eng.dev"
            className="group relative inline-flex items-center gap-3 px-10 py-4.5 rounded-full text-sm font-semibold tracking-wide border border-accent/20 bg-accent/[0.04] text-accent/90 hover:text-accent hover:border-accent/40 transition-all duration-500 ease-premium focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            {/* Multi-layer glow backdrop */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/[0.08] via-accent-light/[0.04] to-accent/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-600 blur-md" aria-hidden="true" />
            <span className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-accent/20 via-accent-light/10 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10" aria-hidden="true" />

            <span className="relative z-10">View Full Project Archive</span>
            <svg className="relative z-10 w-4 h-4 transition-transform duration-400 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>

            {/* Pulsing dot */}
            <span className="relative z-10 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/40 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent/60" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
