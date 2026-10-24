import type { Project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiGithub, FiExternalLink } from "react-icons/fi";

function isAvailableLink(link: string | undefined): link is string {
  return Boolean(link && link !== "#");
}

export default function ProjectDetail({ project }: { project: Project }) {
  const hasGithub = isAvailableLink(project.github);
  const hasLive = isAvailableLink(project.live);

  return (
    <main className="min-h-screen bg-primary">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-8 sm:px-8 md:pt-12">
        <nav className="mb-14 flex items-center justify-between gap-4 border-b border-white/[0.08] pb-6" aria-label="Project navigation">
          <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 text-sm text-[#b8b0b9] transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            <FiArrowLeft className="text-accent" aria-hidden="true" />
            All projects
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent/75">Ibrahim Hussein / Selected work</span>
        </nav>

        <header className="max-w-4xl">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="overline text-accent/85">{project.showcase?.discipline || `${project.category} project`}</span>
            <span className={`rounded-full border px-2.5 py-1 font-mono text-[9px] ${project.status === "Prototype" ? "border-accent/35 bg-accent/10 text-accent" : "border-white/10 text-[#aaa3ad]"}`}>{project.status === "Prototype" ? "Experimental prototype" : project.status}</span>
          </div>
          <h1 className="text-[clamp(2.4rem,6vw,4.8rem)] font-semibold leading-[1.08] tracking-[-0.055em] text-[#f0ebe6]">{project.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#aca5b0] md:text-lg md:leading-9">{project.description}</p>
          {(hasLive || hasGithub) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {hasLive && <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary"><FiExternalLink aria-hidden="true" /> Open live project</a>}
              {hasGithub && <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary"><FiGithub aria-hidden="true" /> Source code</a>}
            </div>
          )}
        </header>

        <figure className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-[#090a0e] md:mt-16">
          <div className="flex h-9 items-center gap-1.5 border-b border-white/[0.07] bg-[#17171d] px-4" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-accent/60" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/10" />
            <span className="ml-auto font-mono text-[9px] tracking-wider text-white/40">{project.title}</span>
          </div>
          <div className="relative aspect-[16/10]">
            <Image src={project.image} alt={project.imageAlt || `${project.title} project screenshot`} fill priority sizes="(max-width: 1152px) 100vw, 1100px" className="object-contain" />
          </div>
          {project.showcase && <figcaption className="border-t border-white/[0.07] px-5 py-3 text-xs leading-6 text-[#9b94a0]">{project.showcase.feature}</figcaption>}
        </figure>

        {project.highlights && project.highlights.length > 0 && (
          <dl className="mt-9 grid gap-5 border-b border-white/[0.08] pb-9 sm:grid-cols-3 sm:gap-8">
            {project.highlights.map((highlight) => (
              <div key={highlight.label} className="min-w-0">
                <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#9b94a0]">{highlight.label}</dt>
                <dd className="mt-2 text-lg font-medium text-accent-light">{highlight.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
          {project.problem && (
            <section aria-labelledby="problem-heading">
              <span className="font-mono text-[10px] text-accent/70" aria-hidden="true">01 / THE QUESTION</span>
              <h2 id="problem-heading" className="mb-4 mt-3 text-2xl font-medium tracking-tight text-[#e8e4e0]">Where it started</h2>
              <p className="text-sm leading-8 text-[#aaa3af]">{project.problem}</p>
            </section>
          )}
          {project.solution && (
            <section aria-labelledby="solution-heading">
              <span className="font-mono text-[10px] text-accent/70" aria-hidden="true">02 / THE APPROACH</span>
              <h2 id="solution-heading" className="mb-4 mt-3 text-2xl font-medium tracking-tight text-[#e8e4e0]">How I built it</h2>
              <p className="text-sm leading-8 text-[#aaa3af]">{project.solution}</p>
            </section>
          )}
        </div>

        {project.gallery?.map((item) => (
          <figure key={item.image} className="mt-14 overflow-hidden rounded-2xl border border-white/10 bg-[#090a0e]">
            <div className="relative aspect-[16/10]">
              <Image src={item.image} alt={item.alt} fill loading="lazy" sizes="(max-width: 1152px) 100vw, 1100px" className="object-contain" />
            </div>
            <figcaption className="border-t border-white/[0.07] px-5 py-4 text-xs leading-6 text-[#a69eab]">{item.caption}</figcaption>
          </figure>
        ))}

        {project.impact && (
          <section className="mt-14 border-l-2 border-accent/50 pl-6 md:pl-8" aria-labelledby="outcome-heading">
            <span className="font-mono text-[10px] text-accent/70" aria-hidden="true">03 / THE RESULT</span>
            <h2 id="outcome-heading" className="mb-4 mt-3 text-2xl font-medium tracking-tight text-[#e8e4e0]">What it makes possible</h2>
            <p className="max-w-3xl text-base leading-8 text-[#bab1bc]">{project.impact}</p>
          </section>
        )}

        <section className="mt-14" aria-labelledby="stack-heading">
          <h2 id="stack-heading" className="overline text-accent/80">Built with</h2>
          <ul className="mt-5 flex flex-wrap gap-2.5" aria-label="Project technologies">
            {project.tags.map((tag) => <li key={tag} className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 font-mono text-xs text-[#bfb5bf]">{tag}</li>)}
          </ul>
        </section>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-white/[0.08] pt-8">
          <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 text-sm text-[#b8b0b9] transition-colors hover:text-accent"><FiArrowLeft aria-hidden="true" /> Back to selected work</Link>
          {isAvailableLink(project.caseStudyUrl) && <a href={project.caseStudyUrl} className="inline-flex min-h-11 items-center gap-2 text-sm text-accent transition-colors hover:text-accent-light">Full case study <FiExternalLink aria-hidden="true" /></a>}
        </div>
      </div>
    </main>
  );
}
