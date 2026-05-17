"use client";

import nextDynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CurvedText from "@/components/CurvedText";
import ScrollTypography from "@/components/ScrollTypography";
import LoadingScreen from "@/components/LoadingScreen";
import SectionTransition from "@/components/SectionTransition";

// Lazy load below-fold components to reduce initial bundle
const About = nextDynamic(() => import("@/components/About"));
const Skills = nextDynamic(() => import("@/components/Skills"));
const Projects = nextDynamic(() => import("@/components/Projects"));
const Experience = nextDynamic(() => import("@/components/Experience"));
const Credentials = nextDynamic(() => import("@/components/Credentials"));
const InteractivePhilosophy = nextDynamic(() => import("@/components/InteractivePhilosophy"), {
  ssr: false,
  loading: () => <div className="min-h-[50vh]" />,
});
const Contact = nextDynamic(() => import("@/components/Contact"), { ssr: false });
const Footer = nextDynamic(() => import("@/components/Footer"));

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
      <SectionTransition variant="warm" />
      <Projects />
      <ScrollTypography
        lines={[
          "INNOVATE · SHIP · GROW · REPEAT · LEARN · ITERATE · INNOVATE · SHIP ·",
          "AI · ROBOTICS · HARDWARE · SOFTWARE · FLUTTER · WEB · AI · ROBOTICS ·",
          "FULL STACK · EMBEDDED · VISION · NLP · FULL STACK · EMBEDDED ·",
        ]}
      />
      <Experience />
      <SectionTransition variant="default" />
      <Credentials />
      <SectionTransition variant="cool" />
      <InteractivePhilosophy />
      <SectionTransition variant="warm" />
      <Contact />
      <Footer />
    </main>
  );
}
