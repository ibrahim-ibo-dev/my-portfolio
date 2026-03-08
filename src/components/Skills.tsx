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
  SiDavinciresolve,
  SiAudacity,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiLaravel,
  SiPhp,
  SiInertia,
  SiMongoose,
  SiPostcss,
  SiFramer,
  SiAuth0,
} from "react-icons/si";
import { FaRobot, FaBrain, FaCamera, FaHeadphones, FaServer, FaDesktop, FaDatabase, FaMicrochip } from "react-icons/fa";

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
      { name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4" },
      { name: "HTML", icon: <SiHtml5 />, color: "#E34F26" },
      { name: "CSS", icon: <SiCss />, color: "#1572B6" },
      { name: "Motion", icon: <SiFramer />, color: "#0055FF" },
      { name: "PostCSS", icon: <SiPostcss />, color: "#DD3A0A" },
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
      { name: "Auth", icon: <SiAuth0 />, color: "#EB5424" },
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
      { name: "Mongoose", icon: <SiMongoose />, color: "#880000" },
    ],
  },
  {
    title: "AI & Tools",
    icon: <FaMicrochip />,
    accent: "#E8C9A0",
    skills: [
      { name: "AI / ML", icon: <FaBrain />, color: "#D4A574" },
      { name: "Robotics", icon: <FaRobot />, color: "#E8C9A0" },
      { name: "Arduino", icon: <SiArduino />, color: "#00979D" },
      { name: "MATLAB", icon: <FaBrain />, color: "#E16737" },
      { name: "Git", icon: <SiGit />, color: "#F05032" },
      { name: "GitHub", icon: <SiGithub />, color: "#ffffff" },
      { name: "Linux", icon: <SiLinux />, color: "#FCC624" },
      { name: "DaVinci", icon: <SiDavinciresolve />, color: "#E44D26" },
      { name: "Photoshop", icon: <FaCamera />, color: "#31A8FF" },
      { name: "Audition", icon: <FaHeadphones />, color: "#9999FF" },
      { name: "Audacity", icon: <SiAudacity />, color: "#0000CC" },
      { name: "React Dev", icon: <SiReact />, color: "#61DAFB" },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={sectionRef} className="pt-12 pb-24 relative overflow-hidden">
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
          <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase">
            // Tech Stack
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 text-gradient">
            Skills &amp; Technologies
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-light rounded-full mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIdx * 0.12 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-5 hover:border-white/10 transition-all duration-500"
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
