"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const navLinks = [
  { href: "#about", label: "About", sectionId: "about" },
  { href: "#skills", label: "Skills", sectionId: "skills" },
  { href: "#projects", label: "Projects", sectionId: "projects" },
  { href: "#experience", label: "Experience", sectionId: "experience" },
  { href: "#credentials", label: "Achievements", sectionId: "credentials" },
  { href: "#philosophy", label: "Code & Psychology", sectionId: "philosophy" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Active section tracking based on scroll position
  // More reliable than intersection ratio for large sections
  useEffect(() => {
    const sectionIds = ["hero", ...navLinks.map((l) => l.sectionId), "contact"];
    
    const updateActiveSection = () => {
      // Get viewport center point
      const scrollY = window.scrollY;
      const viewportCenter = scrollY + window.innerHeight / 2;
      
      // Find which section contains the viewport center
      let currentSection = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        
        const rect = el.getBoundingClientRect();
        const elementTop = scrollY + rect.top;
        const elementBottom = elementTop + rect.height;
        
        if (viewportCenter >= elementTop && viewportCenter < elementBottom) {
          currentSection = id;
          break;
        }
      }
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    // Update on scroll
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      if (navRef.current) navRef.current.style.opacity = "1";
    } else {
      gsap.fromTo(
        navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 1.2 }
      );
    }

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 640) setMobileOpen(false); };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  }, []);

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent focus:text-primary focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      <header
        ref={navRef}
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        role="banner"
      >
        <div
          className={`pointer-events-auto flex items-center gap-1 sm:gap-2 mt-4 rounded-full border select-none transition-all duration-600 ease-premium px-2.5 py-1.5 sm:px-3 sm:py-2 ${
            scrolled
              ? "border-accent/10 bg-black/70 backdrop-blur-2xl shadow-elevation-3 shadow-black/30"
              : "border-white/[0.05] bg-white/[0.02] backdrop-blur-xl"
          }`}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-1.5 shrink-0 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 bg-accent/10 border border-accent/20 transition-colors hover:bg-accent/20 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            aria-label="Go to top"
          >
            <span className="text-[11px] sm:text-xs font-semibold text-accent tracking-wide uppercase">IH</span>
          </a>

          {/* Desktop Nav links */}
          <nav className="hidden sm:flex items-center" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] transition-all duration-400 ease-premium focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${
                  activeSection === link.sectionId
                    ? "text-white bg-white/[0.08]"
                    : "text-muted hover:text-white hover:bg-white/[0.04]"
                }`}
                aria-current={activeSection === link.sectionId ? "true" : undefined}
              >
                {link.label}
                {activeSection === link.sectionId && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" aria-hidden="true" />
                )}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/[0.06] transition-colors focus-visible:outline-2 focus-visible:outline-accent"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <div className="flex flex-col gap-[3px]">
              <span className={`block w-3.5 h-[1.5px] bg-gray-400 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[4.5px]" : ""}`} />
              <span className={`block w-3.5 h-[1.5px] bg-gray-400 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-3.5 h-[1.5px] bg-gray-400 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[4.5px]" : ""}`} />
            </div>
          </button>

          {/* CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="hidden sm:inline-block whitespace-nowrap rounded-full px-4 py-1.5 text-[13px] font-semibold bg-gradient-to-r from-accent to-accent-light text-primary transition-all duration-400 ease-premium hover:shadow-glow-md hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            Contact
          </a>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="pointer-events-auto sm:hidden fixed top-16 left-4 right-4 rounded-3xl border border-white/[0.06] bg-black/80 backdrop-blur-2xl shadow-elevation-4 p-4 space-y-1 z-50">
            <nav aria-label="Mobile navigation">
              {[...navLinks, { href: "#contact", label: "Contact", sectionId: "contact" }].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block rounded-xl px-4 py-3 text-sm transition-all duration-300 ${
                    activeSection === link.sectionId
                      ? "text-white bg-accent/10 border-l-2 border-accent"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
