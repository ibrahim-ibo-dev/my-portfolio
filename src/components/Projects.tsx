"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { projects, type Project } from "@/data/projects";

const FEATURED_SLUGS = ["rashkaw-media", "chat-mart", "kurdish-chess-ai", "true-prence"];
const GRID_SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 19 19 5M5 5h14v14" />
    </svg>
  );
}

function RecentProjectCard({ project, index }: { project: Project; index: number }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={false}
      whileInView={reducedMotion ? undefined : { y: [18, 0], opacity: [0.7, 1] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55 }}
      className={`min-w-0 ${GRID_SPANS[index]}`}
    >
      <a
        href={project.caseStudyUrl || `/projects/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/[0.09] bg-[#111116] transition-colors duration-300 hover:border-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        aria-label={`Read the ${project.title} case study`}
      >
        <div className="flex items-center justify-between gap-3 px-5 pt-5 sm:px-7 sm:pt-6">
          <span className="font-mono text-[10px] leading-5 tracking-[0.11em] uppercase text-accent/90">
            {project.showcase?.discipline}
          </span>
          <span className="font-mono text-xs text-white/35" aria-hidden="true">0{index + 1}</span>
        </div>

        <div className="relative mx-4 mt-5 overflow-hidden rounded-lg border border-white/10 bg-[#08090d] sm:mx-6">
          <div className="flex h-7 items-center gap-1.5 border-b border-white/[0.07] bg-[#17171d] px-3" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
            <span className="ml-auto font-mono text-[8px] tracking-[0.12em] text-white/35">{project.slug}</span>
          </div>
          <div className="relative aspect-[16/10]">
            <Image
              src={project.image}
              alt={project.imageAlt || project.title}
              fill
              sizes={index === 0 || index === 3 ? "(max-width: 1023px) 100vw, 700px" : "(max-width: 1023px) 100vw, 500px"}
              className="object-contain motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.025]"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-7">
          <div className="mb-3 flex items-start justify-between gap-4">
            <h3 className="text-[25px] font-semibold leading-tight tracking-[-0.035em] text-[#f0ebe6] sm:text-[29px]">
              {project.title}
            </h3>
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-accent transition-colors group-hover:border-accent/60 group-hover:bg-accent/10">
              <Arrow className="h-4 w-4" />
            </span>
          </div>
          <p className="max-w-lg text-sm leading-7 text-[#a6a3af]">{project.showcase?.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[9px] text-[#b7b1ad]">{tag}</span>
            ))}
            {project.status === "Prototype" && (
              <span className="rounded-full border border-accent/25 bg-accent/[0.08] px-2.5 py-1 font-mono text-[9px] text-accent">Experimental prototype</span>
            )}
          </div>
          <div className="mt-auto pt-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
              <span className="text-[11px] leading-5 text-[#99939b]">{project.showcase?.feature}</span>
              <span className="text-[11px] font-medium text-accent">Explore project <span aria-hidden="true">↗</span></span>
            </div>
          </div>
        </div>
      </a>
    </motion.article>
  );
}

function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <article className="min-w-0">
      <a
        href={project.caseStudyUrl || `/projects/${project.slug}`}
        className="group block h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111116] transition-colors hover:border-accent/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06] bg-[#0b0b11]">
          <Image src={project.image} alt={project.imageAlt || `${project.title} project preview`} fill loading="lazy" sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 300px" className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105" />
        </div>
        <div className="p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <h4 className="text-base font-medium leading-snug text-[#e8e4e0] group-hover:text-accent">{project.title}</h4>
            <Arrow className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/80" />
          </div>
          <p className="line-clamp-3 text-xs leading-6 text-[#a19ba7]">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[9px] text-accent/75">
            {project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
      </a>
    </article>
  );
}

export default function Projects() {
  const recent = projects.filter((project) => project.showcase);
  const featured = FEATURED_SLUGS.map((slug) => projects.find((project) => project.slug === slug)).filter((project): project is Project => Boolean(project));

  return (
    <section id="projects" className="relative overflow-hidden py-24 md:py-32" aria-labelledby="projects-heading">
      <div className="section-divider absolute inset-x-0 top-0" />
      <div className="pointer-events-none absolute -top-20 right-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(ellipse,rgba(212,165,116,0.055),transparent_70%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="overline text-accent/80">{"// Selected work"}</span>
            <h2 id="projects-heading" className="mt-5 text-[clamp(2.6rem,5vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.055em] text-[#f0ebe6]">
              Built to be <span className="text-gradient">explored.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#a6a0ad]">
              Interactive worlds, useful tools, and ideas made tangible.
              Four recent projects, each with its own story.
            </p>
          </div>
          <a href="https://case-study.ibrahim-eng.dev" className="inline-flex w-fit shrink-0 items-center gap-3 border-b border-accent/35 pb-2 text-xs font-medium text-accent transition-colors hover:text-accent-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            Full project archive <Arrow className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          {recent.map((project, index) => <RecentProjectCard key={project.slug} project={project} index={index} />)}
        </div>

        <div className="mt-16 border-t border-white/[0.08] pt-9 md:mt-20">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="overline text-accent/70">{"// More from my portfolio"}</span>
              <h3 className="mt-3 text-2xl font-medium tracking-tight text-[#e8e4e0]">Platforms & applied AI</h3>
            </div>
            <p className="max-w-sm text-xs leading-6 text-[#a19ba7]">Client platforms, AI tools, and systems built around real problems.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((project) => <FeaturedProjectCard key={project.slug} project={project} />)}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <a href="https://case-study.ibrahim-eng.dev" className="btn-secondary gap-3 border-accent/20 text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            View all projects & case studies <Arrow className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
