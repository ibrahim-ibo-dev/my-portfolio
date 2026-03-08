"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#credentials", label: "Achievements" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 1.2 }
    );

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={navRef}
      style={{ opacity: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div
        className={`pointer-events-auto flex items-center gap-1 sm:gap-2 mt-4 rounded-full border select-none transition-all duration-500 px-2 py-1.5 sm:px-3 sm:py-2 ${
          scrolled
            ? "border-accent/15 bg-black/60 backdrop-blur-xl shadow-lg shadow-accent/5"
            : "border-white/[0.06] bg-white/[0.03] backdrop-blur-md"
        }`}
      >
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-1.5 shrink-0 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 bg-accent/10 border border-accent/20 transition-colors hover:bg-accent/20"
        >
          <span className="text-[11px] sm:text-xs font-semibold text-accent tracking-wide uppercase">IH</span>
        </a>

        {/* Nav links */}
        <nav className="flex items-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="whitespace-nowrap rounded-full px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-[13px] text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="whitespace-nowrap rounded-full px-2.5 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-[13px] font-medium bg-gradient-to-r from-accent to-accent-light text-primary transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:scale-105"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
