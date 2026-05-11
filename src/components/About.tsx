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
    icon: <FaRobot className="text-lg" />,
    title: "AI Customer Automation",
    desc: "Cutting response times for businesses with multilingual AI agents that handle real customer conversations on WhatsApp, Instagram, and Telegram.",
    color: "from-accent/20 to-accent/10",
    textColor: "text-accent",
  },
  {
    icon: <FaBolt className="text-lg" />,
    title: "Operations & Sales Systems",
    desc: "Replacing paper, spreadsheets, and manual workflows with full RTL Kurdish web platforms — inventory, sales pipelines, RBAC, and reporting.",
    color: "from-accent/10 to-accent-light/20",
    textColor: "text-accent-light",
  },
  {
    icon: <FaCode className="text-lg" />,
    title: "Local-Market Product Design",
    desc: "Building products around how Kurdish and regional businesses actually operate — language, channels, ordering habits, and trust.",
    color: "from-accent-light/20 to-accent-light/10",
    textColor: "text-accent-light",
  },
  {
    icon: <FaMicrochip className="text-lg" />,
    title: "AI + Hardware Integration",
    desc: "Bringing intelligence into the physical world — vision, attendance, and IoT systems where AI meets real environments.",
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
                I build <span className="text-gradient">AI systems</span> that solve real business problems
              </h3>
              <p className="text-body text-muted leading-relaxed mb-4">
                I&apos;m a <span className="text-gray-300">Kurdish AI systems builder</span> focused on a clear niche: helping <span className="text-gray-300">real local businesses</span> automate and scale through modern, multilingual, RTL-native technology. Restaurants, dealerships, bookstores, and service businesses &mdash; the ones that still run on paper, WhatsApp screenshots, and overworked staff.
              </p>
              <p className="text-body text-muted leading-relaxed mb-8">
                I co-founded <span className="text-gray-300">CSAI</span> (showcased at <span className="text-accent/90">HITEX 2025</span>) and evolved it into <span className="text-gray-300">Chat Mart</span> &mdash; an omni-channel AI platform that now handles customer conversations in <span className="text-gray-300">Kurdish, Arabic, and English</span> across 5 messaging channels for multiple companies. My focus isn&apos;t shipping more code; it&apos;s shipping <span className="text-gray-300">business outcomes</span>: faster response times, fewer manual workflows, and operations that scale.
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
