"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CurvedText from "@/components/CurvedText";
import ScrollTypography from "@/components/ScrollTypography";
import About from "@/components/About";
import Principles from "@/components/Principles";
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
          "AI PRODUCT BUILDER · SMART SYSTEMS · REAL BUSINESSES · AI PRODUCT BUILDER ·",
          "AUTOMATE · MULTILINGUAL · RTL-NATIVE · SHIP · AUTOMATE · MULTILINGUAL ·",
          "KURDISH · ARABIC · ENGLISH · BUILT FOR THE LOCAL MARKET · KURDISH · ARABIC ·",
        ]}
      />
      <About />
      <Principles />
      <ScrollTypography
        lines={[
          "OUTCOME OVER OUTPUT · SHIP IN WEEKS · LOCAL-FIRST · OUTCOME OVER OUTPUT ·",
          "PROBLEM · APPROACH · RESULT · ITERATE · PROBLEM · APPROACH · RESULT ·",
          "AI IS THE MEANS · BUSINESS IS THE GOAL · AI IS THE MEANS · BUSINESS ·",
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
