"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CurvedText from "@/components/CurvedText";
import ScrollTypography from "@/components/ScrollTypography";
import LoadingScreen from "@/components/LoadingScreen";

// Lazy load below-fold components to reduce initial bundle
const About = dynamic(() => import("@/components/About"));
const Skills = dynamic(() => import("@/components/Skills"));
const Projects = dynamic(() => import("@/components/Projects"));
const Experience = dynamic(() => import("@/components/Experience"));
const Credentials = dynamic(() => import("@/components/Credentials"));
const InteractivePhilosophy = dynamic(() => import("@/components/InteractivePhilosophy"), {
  ssr: false,
  loading: () => <div className="min-h-[50vh]" />,
});
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <main className="relative">
      <LoadingScreen />
      <Navbar />
      <Hero />
      <CurvedText />
      <ScrollTypography
        lines={[
          "PYTHON · C++ · REACT · FLUTTER · NEXT.JS · TYPESCRIPT · PYTHON · C++ · REACT ·",
          "BUILD · INNOVATE · DEVELOP · AUTOMATE · DEPLOY · BUILD · INNOVATE ·",
          "ARDUINO · AI · MACHINE LEARNING · DRONES · FLUTTER · ARDUINO · AI ·",
        ]}
      />
      <About />
      <ScrollTypography
        lines={[
          "REACT · NEXT.JS · TAILWIND · NODE.JS · GSAP · THREE.JS · REACT · NEXT.JS ·",
          "PYTHON · C++ · HTML · CSS · MATLAB · FLUTTER · PYTHON · C++ · HTML ·",
          "TENSORFLOW · PYTORCH · OPENCV · FIREBASE · TENSORFLOW · PYTORCH ·",
        ]}
      />
      <Skills />
      <Projects />
      <ScrollTypography
        lines={[
          "INNOVATE · SHIP · GROW · REPEAT · LEARN · ITERATE · INNOVATE · SHIP ·",
          "AI · ROBOTICS · HARDWARE · SOFTWARE · FLUTTER · WEB · AI · ROBOTICS ·",
          "FULL STACK · EMBEDDED · VISION · NLP · FULL STACK · EMBEDDED ·",
        ]}
      />
      <Experience />
      <Credentials />
      <InteractivePhilosophy />
      <Contact />
      <Footer />
    </main>
  );
}
