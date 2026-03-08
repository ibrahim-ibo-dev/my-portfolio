"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiMail,
  FiPhone,
  FiSend,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { icon: FiLinkedin, href: "https://linkedin.com/in/ibrahim-hussein", label: "LinkedIn" },
  { icon: FiGithub, href: "https://github.com/imxoshnawm", label: "GitHub" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const triggers: ScrollTrigger[] = [];

    // Header
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

    // Info cards
    if (infoRef.current) {
      const cards = infoRef.current.querySelectorAll(".info-card");
      cards.forEach((card, i) => {
        const a = gsap.fromTo(
          card,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
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

    // Form fields
    if (formRef.current) {
      const fields = formRef.current.querySelectorAll(".form-field");
      fields.forEach((field, i) => {
        const a = gsap.fromTo(
          field,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
        if (a.scrollTrigger) triggers.push(a.scrollTrigger);
      });
    }

    return () => triggers.forEach((t) => t.kill());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Pulsing concentric rings */}
      <div className="absolute inset-0 contact-rings" />
      {/* Central warm glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/[0.035] rounded-full blur-[200px]" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-accent-light/[0.02] rounded-full blur-[150px]" />
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase">
            // Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 text-gradient">
            Contact Me
          </h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            Have a project in mind or want to collaborate? I&apos;d love to hear from
            you.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-light rounded-full mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info + Socials */}
          <div ref={infoRef} className="lg:col-span-2 space-y-6">
            <motion.div
              whileHover={{ x: 4 }}
              className="info-card glass-card rounded-xl p-5 flex items-center gap-4 border border-accent/10"
              style={{ opacity: 0 }}
            >
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <FiMail className="text-accent text-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                  Email
                </p>
                <p className="text-sm text-white mt-0.5">
                  ibrahimhuseein842@gmail.com
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 4 }}
              className="info-card glass-card rounded-xl p-5 flex items-center gap-4 border border-accent-light/10"
              style={{ opacity: 0 }}
            >
              <div className="w-11 h-11 rounded-xl bg-accent-light/10 flex items-center justify-center shrink-0">
                <FiPhone className="text-accent-light text-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                  Phone
                </p>
                <p className="text-sm text-white mt-0.5">
                  07507985953
                </p>
              </div>
            </motion.div>

            {/* Social links */}
            <div className="pt-4">
              <p className="text-xs text-gray-600 font-mono uppercase tracking-widest mb-4">
                Connect
              </p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{
                      scale: 1.15,
                      boxShadow: "0 0 20px rgba(212, 165, 116, 0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-xl glass-card flex items-center justify-center text-gray-400 hover:text-accent transition-colors duration-300 border border-white/5 hover:border-accent/30"
                    aria-label={label}
                  >
                    <Icon className="text-lg" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Status badge */}
            <div className="pt-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-gray-500 font-mono">
                  Available for freelance
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="form-field" style={{ opacity: 0 }}>
                <label
                  htmlFor="name"
                  className="text-xs text-gray-500 font-mono uppercase tracking-wider block mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, name: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-gray-600 focus:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                  placeholder="Your name"
                />
              </div>
              <div className="form-field" style={{ opacity: 0 }}>
                <label
                  htmlFor="email"
                  className="text-xs text-gray-500 font-mono uppercase tracking-wider block mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, email: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-gray-600 focus:border-purple/40 focus:outline-none focus:ring-1 focus:ring-purple/20 transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="form-field" style={{ opacity: 0 }}>
              <label
                htmlFor="message"
                className="text-xs text-gray-500 font-mono uppercase tracking-wider block mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                value={formState.message}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, message: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-gray-600 focus:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-300 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <div className="form-field" style={{ opacity: 0 }}>
              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 40px rgba(212, 165, 116, 0.25)",
                }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-accent to-accent-light text-white font-semibold text-sm tracking-wide transition-all"
              >
                <FiSend className="text-sm" />
                Send Message
              </motion.button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto px-6 mt-24 pt-8 border-t border-white/[0.04]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600 font-mono">
            &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
          <p className="text-xs text-gray-700 font-mono">
            Crafted with passion &amp; precision
          </p>
        </div>
      </div>
    </section>
  );
}
