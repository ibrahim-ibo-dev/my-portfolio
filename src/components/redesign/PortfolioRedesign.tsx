"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { featuredWork, type FeaturedWork } from "./featured-work";
import AuroraBackground from "./AuroraBackground";
import AboutExpertise from "./AboutExpertise";
import Journey from "./Journey";
import LabSection from "./LabSection";
import ScrollDetails from "./ScrollDetails";
import WritingSection from "./WritingSection";
import MotionSection from "./MotionSection";
import MobileNavigation from "./MobileNavigation";
import type {FeaturedWriting,FeaturedVideo} from "@/data/featured-expression";
import "./portfolio.css";
import "./background.css";
import "./sections.css";
import "./lab.css";
import "./refinements.css";

const navItems = [{ id: "projects", label: "Selected work" }, { id: "about", label: "About" }, { id: "experience", label: "Journey" }, { id: "words", label: "Words" }, { id: "philosophy", label: "Playground" }, { id: "motion", label: "Motion" }];
function Arrow({ diagonal = false }: { diagonal?: boolean }) { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"} /></svg>; }

function WorkCard({ item, index }: { item: FeaturedWork; index: number }) {
  const { project, title } = item;
  return <article className={`nx-work-card ${index === 0 ? "nx-work-featured" : ""}`}>
    <a href={project.caseStudyUrl || `/projects/${project.slug}`} aria-label={`Read ${title} case study`}>
      <div className="nx-work-visual"><div className="nx-work-browser"><span><i /><i /><i /></span><span>{item.address}</span><Arrow diagonal /></div><div className="nx-work-picture"><Image src={project.image} alt={project.imageAlt || `${title} application preview`} fill sizes={index===0 ? "(max-width: 900px) 100vw, 760px" : "(max-width: 640px) 100vw, 400px"} /></div><div className="nx-image-caption"><span>{item.caption}</span><span aria-hidden="true">↗</span></div></div>
      <div className="nx-work-copy"><div className="nx-work-overline"><span>{String(index+1).padStart(2,"0")} / {item.category}</span><span className="nx-live-dot">{project.status}</span></div><h3>{title}</h3><p>{project.description}</p><div className="nx-work-tags">{project.tags.slice(0,index===0?4:3).map(tag=><span key={tag}>{tag}</span>)}</div>{index===0 && <div className="nx-work-facts">{item.facts.map(fact=><div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}</div>}<span className="nx-work-link">Discover the project <Arrow diagonal /></span></div>
    </a>
  </article>;
}

export default function PortfolioRedesign({writings,videos}:{writings:FeaturedWriting[];videos:FeaturedVideo[]}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu=useCallback(()=>setMenuOpen(false),[]);
  const [active, setActive] = useState("");
  const [paused, setPaused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame=0;
    const onScroll=()=> { if(frame) return; frame=requestAnimationFrame(()=>{ const range=document.documentElement.scrollHeight-innerHeight; progressRef.current?.style.setProperty("--progress",String(range>0?scrollY/range:0)); setScrolled(scrollY>50); frame=0; }); };
    onScroll(); window.addEventListener("scroll",onScroll,{passive:true});
    const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting)setActive(entry.target.id);}},{rootMargin:"-18% 0px -55% 0px"});
    pageRef.current?.querySelectorAll("section[id]").forEach(section=>observer.observe(section));
    return()=>{window.removeEventListener("scroll",onScroll); cancelAnimationFrame(frame); observer.disconnect();};
  },[]);
  useEffect(()=>{const onKey=(event:KeyboardEvent)=>{if(event.key==="Escape"&&menuOpen){setMenuOpen(false);menuButton.current?.focus();}};const onResize=()=>{if(innerWidth>850)setMenuOpen(false);}; window.addEventListener("keydown",onKey);window.addEventListener("resize",onResize);return()=>{window.removeEventListener("keydown",onKey);window.removeEventListener("resize",onResize);};},[menuOpen]);

  return <div className={`nx-portfolio ${paused?"nx-motion-paused":""}`} ref={pageRef}>
    <AuroraBackground paused={paused} />
    <ScrollDetails />
    <div className="nx-scroll-progress" ref={progressRef} aria-hidden="true" />
    <a className="nx-skip" href="#projects">Skip to projects</a>
    <header className={`nx-nav ${scrolled?"is-scrolled":""}`}><div className="nx-nav-inner">
      <a className="nx-wordmark" href="#hero" aria-label="Ibrahim Hussein — back to top"><span className="nx-monogram">ih<span>.</span></span><span className="nx-brand-caption">IBRAHIM HUSSEIN<br /><small>ENGINEER & DEVELOPER</small></span></a>
      <nav className="nx-desktop-nav" aria-label="Main navigation">{navItems.map(item=><a href={`#${item.id}`} key={item.id} aria-current={active===item.id?"location":undefined}>{item.label}</a>)}</nav>
      <a href="#contact" className="nx-nav-contact">Let&apos;s talk <Arrow diagonal /></a>
      <button ref={menuButton} className="nx-menu-toggle" aria-label={menuOpen?"Close menu":"Open menu"} aria-controls="nx-mobile-navigation" aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}><span>{menuOpen?"Close":"Menu"}</span><i aria-hidden="true"/></button>
    </div></header>
    <MobileNavigation open={menuOpen} onClose={closeMenu} active={active} returnFocus={menuButton}/>

    <main>
      <section id="hero" className="nx-hero" aria-labelledby="hero-heading">
        <div className="nx-hero-orbits" aria-hidden="true"><span /><span /><span /></div>
        <div className="nx-hero-center nx-container"><div className="nx-hero-location"><span />ERBIL, KURDISTAN <span className="nx-hero-separator">/</span> IDEAS WITHOUT BORDERS</div><h1 id="hero-heading">Ibrahim <span>Hussein.</span></h1><p className="nx-hero-role">Computer engineer.<br className="nx-mobile-break" /> Creative by nature.</p><p className="nx-hero-description">I turn complex problems into software that feels simple.<br className="nx-desktop-break" /> Full-stack platforms, intelligent systems, and a little curiosity.</p><div className="nx-hero-actions"><a href="#projects" className="nx-button">Explore my work <Arrow diagonal /></a><a href="#about" className="nx-text-button">The person behind it <Arrow /></a></div></div>
        <div className="nx-hero-bottom nx-container"><div className="nx-hero-disciplines"><span>01 / SOFTWARE</span><span>02 / ARTIFICIAL INTELLIGENCE</span><span>03 / EMBEDDED SYSTEMS</span></div><a href="#projects" className="nx-scroll-cue"><span>SCROLL TO DISCOVER</span><span aria-hidden="true">↓</span></a></div>
      </section>
      <div className="nx-proof-strip nx-container" aria-label="Experience at a glance"><div><strong>HITEX <span>2025</span></strong><span>CSAI · exhibited in Kurdistan</span></div><div><strong>70<span>+</span></strong><span>Members supported at NICER</span></div><div><strong>30<span>+</span></strong><span>Hardware projects built</span></div><div><strong>2<span>nd</span></strong><span>Salahaddin coding competition</span></div></div>

      <section id="projects" className="nx-work nx-container" aria-labelledby="projects-heading"><div className="nx-section-heading"><div><span className="nx-section-label">01 / SELECTED WORK</span><h2 id="projects-heading">Built with intent.<br /><span>Made to matter.</span></h2></div><p>A selection of my strongest work.<br />Real problems, thoughtful decisions,<br />and the details that make a difference.</p></div><div className="nx-work-grid">{featuredWork.map((item,index)=><WorkCard key={item.slug} item={item} index={index}/>)}</div><a href="https://case-study.ibrahim-eng.dev" className="nx-archive-link"><div><span className="nx-section-label">THERE&apos;S MORE TO THE STORY</span><strong>Explore the complete project archive</strong></div><span className="nx-archive-arrow"><Arrow diagonal /></span></a></section>
      <AboutExpertise />
      <Journey />
      <WritingSection pieces={writings}/>
      <LabSection />
      <MotionSection videos={videos}/>
      <section id="contact" className="nx-contact nx-container" aria-labelledby="contact-heading"><span className="nx-section-label">LET&apos;S MAKE SOMETHING THAT MATTERS</span><h2 id="contact-heading">Your next idea.<br /><span>Our next conversation.</span></h2><p>Have a project in mind, a challenge to solve,<br />or just something interesting to share?</p><a className="nx-contact-email" href="mailto:ibrahimhuseein842@gmail.com">ibrahimhuseein842@gmail.com <Arrow diagonal /></a><div className="nx-contact-links"><a href="https://www.linkedin.com/in/ibrahim-hussein-b080712b7/" target="_blank" rel="noopener noreferrer">LinkedIn <Arrow diagonal /></a><a href="https://github.com/ibrahim-ibo-dev" target="_blank" rel="noopener noreferrer">GitHub <Arrow diagonal /></a><a href="https://wa.me/9647507985953" target="_blank" rel="noopener noreferrer">WhatsApp <Arrow diagonal /></a></div></section>
    </main>
    <footer className="nx-footer nx-container"><a href="#hero" className="nx-footer-signature">Ibrahim Hussein<span>.</span></a><div><span>© {new Date().getFullYear()} Ibrahim Hussein</span><span>CRAFTED IN KURDISTAN. WITH CURIOSITY.</span><a href="#hero">Back to top ↑</a></div></footer>
    <button className="nx-motion-control" onClick={()=>setPaused(!paused)} aria-pressed={paused} aria-label={paused?"Play animated background":"Pause animated background"}><span aria-hidden="true">{paused?"▶":"Ⅱ"}</span><span>{paused?"Motion paused":"Ambient motion"}</span></button>
  </div>;
}
