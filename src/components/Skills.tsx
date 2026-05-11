"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiPython,
  SiCplusplus,
  SiHtml5,
  SiCss,
  SiGit,
  SiArduino,
  SiMysql,
  SiLinux,
  SiGithub,
  SiSharp,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiLaravel,
  SiPhp,
} from "react-icons/si";
import { FaRobot, FaBrain, FaCamera, FaServer, FaDesktop, FaDatabase, FaMicrochip } from "react-icons/fa";

type Skill = { name: string; icon: React.ReactNode; color: string };

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
  accent: string;
}

const categories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: <FaDesktop />,
    accent: "#61DAFB",
    skills: [
      { name: "React", icon: <SiReact />, color: "#61DAFB" },
      { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff" },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
      { name: "HTML", icon: <SiHtml5 />, color: "#E34F26" },
      { name: "CSS", icon: <SiCss />, color: "#1572B6" },
    ],
  },
  {
    title: "Backend",
    icon: <FaServer />,
    accent: "#D4A574",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
      { name: "Express", icon: <SiExpress />, color: "#ffffff" },
      { name: "Laravel", icon: <SiLaravel />, color: "#FF2D20" },
      { name: "PHP", icon: <SiPhp />, color: "#777BB4" },
      { name: "Python", icon: <SiPython />, color: "#3776AB" },
      { name: "C++", icon: <SiCplusplus />, color: "#00599C" },
      { name: "C#", icon: <SiSharp />, color: "#68217A" },
      { name: "REST API", icon: <FaServer />, color: "#E8C9A0" },
    ],
  },
  {
    title: "Database",
    icon: <FaDatabase />,
    accent: "#4479A1",
    skills: [
      { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
      { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
      { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28" },
    ],
  },
  {
    title: "AI & Systems",
    icon: <FaMicrochip />,
    accent: "#E8C9A0",
    skills: [
      { name: "AI / ML", icon: <FaBrain />, color: "#D4A574" },
      { name: "LLM APIs", icon: <FaRobot />, color: "#E8C9A0" },
      { name: "Kurdish NLP", icon: <FaBrain />, color: "#D4A574" },
      { name: "Computer Vision", icon: <FaCamera />, color: "#61DAFB" },
      { name: "Arduino", icon: <SiArduino />, color: "#00979D" },
      { name: "Git", icon: <SiGit />, color: "#F05032" },
      { name: "GitHub", icon: <SiGithub />, color: "#ffffff" },
      { name: "Linux", icon: <SiLinux />, color: "#FCC624" },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={sectionRef} className="py-20 md:pt-12 md:pb-24 relative overflow-hidden" aria-labelledby="skills-heading">
      <div className="absolute inset-0 skills-dot-grid opacity-60" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[180px]" />
      <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-accent-light/[0.03] rounded-full blur-[120px]" />
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="overline text-accent/70">
            {"// The Toolkit"}
          </span>
          <h2 id="skills-heading" className="text-heading text-gradient mt-4">
            What I Build With
          </h2>
          <p className="text-body text-muted mt-4 max-w-xl mx-auto leading-relaxed">
            Tools are a means, not a portfolio. These are the technologies I reach for when shipping AI agents, multilingual platforms, and business automation &mdash; chosen because they ship fast and run reliably for real clients.
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-accent-light rounded-full mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIdx * 0.12 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-5 hover:border-accent/15 hover:shadow-lg hover:shadow-accent/5 transition-all duration-500"
            >
              {/* Category header */}
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                  style={{ background: `${cat.accent}15`, color: cat.accent }}
                >
                  {cat.icon}
                </div>
                <h3 className="text-sm font-semibold text-white tracking-wide">{cat.title}</h3>
                <span className="text-[10px] font-mono text-gray-600 ml-auto">{cat.skills.length} skills</span>
              </div>

              {/* Skills grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-2">
                {cat.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ y: -2, scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="group flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.05] bg-white/[0.02] px-2 py-3 hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300 cursor-default"
                  >
                    <div
                      className="text-lg transition-all duration-300 group-hover:scale-110"
                      style={{ color: skill.color, filter: `drop-shadow(0 0 6px ${skill.color}40)` }}
                    >
                      {skill.icon}
                    </div>
                    <span className="text-[10px] font-medium text-gray-500 group-hover:text-gray-300 transition-colors text-center leading-tight">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
