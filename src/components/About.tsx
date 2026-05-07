"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCode, FaMicrochip, FaRobot, FaBolt } from "react-icons/fa";
import Image from "next/image";
import dynamic from "next/dynamic";
const AboutBackground = dynamic(() => import("./AboutBackground"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: <FaCode className="text-lg" />,
    title: "Full-Stack Development",
    desc: "Building complete web systems — from database schema to UI — using Next.js, Python, PHP, and MySQL.",
    color: "from-accent/20 to-accent/10",
    textColor: "text-accent",
  },
  {
    icon: <FaRobot className="text-lg" />,
    title: "AI-Powered Applications",
    desc: "Shipping production AI tools: customer service agents, Kurdish NLP systems, and multi-provider API pipelines.",
    color: "from-accent/10 to-accent-light/20",
    textColor: "text-accent-light",
  },
  {
    icon: <FaMicrochip className="text-lg" />,
    title: "Hardware & Embedded Systems",
    desc: "Designing smart systems with Arduino, sensors, and integrated circuits — from prototype to working product.",
    color: "from-accent-light/20 to-accent-light/10",
    textColor: "text-accent-light",
  },
  {
    icon: <FaBolt className="text-lg" />,
    title: "Systems Architecture",
    desc: "Structuring projects with clean separation of concerns — APIs, databases, auth, and deployment pipelines.",
    color: "from-accent-light/15 to-accent/10",
    textColor: "text-accent",
  },
];


export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveals = sectionRef.current.querySelectorAll(".about-reveal");

    if (prefersReducedMotion) {
      reveals.forEach((el) => { (el as HTMLElement).style.opacity = "1"; });
      return;
    }

    const triggers: ScrollTrigger[] = [];

    reveals.forEach((el, i) => {
      const anim = gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.08,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);



  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden" aria-labelledby="about-heading">
      <AboutBackground />
      <div className="section-divider absolute top-0 left-0 right-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="overline text-accent/70">
            {"// About Me"}
          </span>
          <h2 id="about-heading" className="text-heading text-gradient mt-4">
            About Me
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-accent-light rounded-full mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Profile Photo */}
          <div className="lg:col-span-2 about-reveal flex justify-center">
            <div className="relative group w-full max-w-[280px] sm:max-w-[320px] lg:max-w-none">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-accent/15 shadow-2xl shadow-black/40">
                <Image
                  src="/images/profile.jpg"
                  alt="Ibrahim Hussein"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 280px, 320px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/50 via-transparent to-transparent" />
              </div>
              <div className="absolute -inset-3 bg-gradient-to-br from-accent/10 to-accent-light/5 rounded-3xl blur-2xl -z-10 group-hover:from-accent/20 group-hover:to-accent-light/10 transition-all duration-700" />
              <div className="absolute -top-1 -left-1 w-6 h-6 border-l-2 border-t-2 border-accent/30 rounded-tl-lg" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r-2 border-b-2 border-accent-light/30 rounded-br-lg" />
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="about-reveal">
              <h3 className="text-subheading font-semibold mb-6 leading-snug">
                I build things that{" "}
                <span className="text-gradient">actually ship</span>
              </h3>
              <p className="text-body text-muted leading-relaxed mb-4">
                Computer Engineering student at <span className="text-gray-300">Lebanese French University</span>, Erbil. My core is <span className="text-gray-300">full-stack development</span> and <span className="text-gray-300">hardware systems</span> — I work across the entire stack, from writing C++ firmware for embedded devices to deploying full web platforms with AI backends.
              </p>
              <p className="text-body text-muted leading-relaxed mb-8">
                I co-founded <span className="text-gray-300">CSAI</span>, a full-stack AI platform showcased at <span className="text-accent/90">HITEX 2025</span>, and have since shipped <span className="text-gray-300">Chat Mart</span> — a SaaS omni-channel system serving real businesses. Alongside that, I&apos;ve built 30+ hardware projects and led software development for <span className="text-gray-300">70+ members</span> at NICER Club.
              </p>
            </div>

            {/* Highlight cards */}
            <div className="grid sm:grid-cols-2 gap-3">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="about-reveal flex items-start gap-3 p-4 rounded-2xl glass-card group/card cursor-default"
                >
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.color} ${item.textColor} shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}
