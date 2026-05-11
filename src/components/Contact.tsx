"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiMail,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { icon: FiLinkedin, href: "https://www.linkedin.com/in/ibrahim-hussein-b080712b7/", label: "LinkedIn" },
  { icon: FiGithub, href: "https://github.com/ibrahim-ibo-dev", label: "GitHub" },
];


export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      // Just make everything visible immediately
      sectionRef.current.querySelectorAll("[style*='opacity: 0']").forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
      });
      return;
    }

    const triggers: ScrollTrigger[] = [];

    if (headerRef.current) {
      const h = gsap.fromTo(
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
      if (h.scrollTrigger) triggers.push(h.scrollTrigger);
    }

    if (infoRef.current) {
      const cards = infoRef.current.querySelectorAll(".info-card");
      cards.forEach((card, i) => {
        const a = gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
        if (a.scrollTrigger) triggers.push(a.scrollTrigger);
      });
    }

    return () => triggers.forEach((t) => t.kill());
  }, []);


  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Pulsing concentric rings */}
      <div className="absolute inset-0 contact-rings" aria-hidden="true" />
      {/* Central warm glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/[0.035] rounded-full blur-[200px]" aria-hidden="true" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-accent-light/[0.02] rounded-full blur-[150px]" aria-hidden="true" />
      <div className="section-divider absolute top-0 left-0 right-0" aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <span className="overline text-accent/70">
            {"// Work With Me"}
          </span>
          <h2 id="contact-heading" className="text-heading text-gradient mt-4">
            Have a problem worth solving?
          </h2>
          <p className="text-body text-muted mt-4 max-w-xl mx-auto leading-relaxed">
            I work with businesses ready to <span className="text-gray-300">automate customer communication</span>, <span className="text-gray-300">digitize operations</span>, or <span className="text-gray-300">add AI</span> to how they actually run. If you have a real problem &mdash; not just a feature request &mdash; let&apos;s talk.
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-accent-light rounded-full mx-auto mt-6" aria-hidden="true" />
        </div>

        <div className="max-w-2xl mx-auto">
          <div ref={infoRef} className="space-y-5">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ibrahimhuseein842@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="info-card glass-card rounded-xl p-5 flex items-center gap-4 border border-accent/10 hover:border-accent/20 transition-all"
              style={{ opacity: 0 }}
            >
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <FiMail className="text-accent text-lg" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                  Email
                </p>
                <p className="text-sm text-white mt-0.5">
                  ibrahimhuseein842@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://wa.me/96407507985953"
              target="_blank"
              rel="noopener noreferrer"
              className="info-card glass-card rounded-xl p-5 flex items-center gap-4 border border-green-500/10 hover:border-green-500/30 transition-all"
              style={{ opacity: 0 }}
            >
              <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                <FaWhatsapp className="text-green-500 text-xl" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                  WhatsApp
                </p>
                <p className="text-sm text-white mt-0.5">
                  +964 750 798 5953
                </p>
              </div>
            </a>

            {/* Social links */}
            <div className="pt-2">
              <p className="text-xs text-gray-600 font-mono uppercase tracking-widest mb-4">
                Connect
              </p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="info-card w-12 h-12 rounded-xl glass-card flex items-center justify-center text-gray-400 hover:text-accent transition-all duration-300 border border-white/5 hover:border-accent/30 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                    aria-label={href.startsWith("mailto:") ? label : `${label} (opens in new tab)`}
                    style={{ opacity: 0 }}
                  >
                    <Icon className="text-xl" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
