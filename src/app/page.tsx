"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CurvedText from "@/components/CurvedText";
import ScrollTypography from "@/components/ScrollTypography";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Credentials from "@/components/Credentials";
import InteractivePhilosophy from "@/components/InteractivePhilosophy";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

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
