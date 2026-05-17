"use client";

import { useEffect } from "react";

export default function DeveloperEasterEgg() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    // ASCII Art
    const asciiArt = `
  ╦┌┐ ┬─┐┌─┐┬ ┬┬┌┬┐  ╦ ╦┬ ┬┌─┐┌─┐┌─┐┬┌┐┌
  ║├┴┐├┬┘├─┤├─┤││││  ╠═╣│ │└─┐└─┐├┤ ││││
  ╩└─┘┴└─┴ ┴┴ ┴┴┴ ┴  ╩ ╩└─┘└─┘└─┘└─┘┴┘└┘
`;

    console.log(
      "%c" + asciiArt,
      "color: #D4A574; font-weight: bold; font-family: monospace; font-size: 11px; line-height: 1.2;"
    );

    console.log(
      "%c👋 Hey, curious developer.",
      "color: #D4A574; font-size: 16px; font-weight: bold; padding: 4px 0;"
    );

    console.log(
      "%cYou're inspecting my code — I respect that.\n%cI built this with: Next.js 14 · TypeScript · Three.js · GSAP · Framer Motion · Tailwind",
      "color: #E8E4E0; font-size: 13px; line-height: 1.6;",
      "color: #888; font-size: 12px; line-height: 1.6; font-family: monospace;"
    );

    console.log(
      "%c\n💼 Hiring? Collaborating? Just want to chat?",
      "color: #D4A574; font-size: 13px; font-weight: 600;"
    );
    console.log(
      "%c→ ibrahimhuseein842@gmail.com\n→ github.com/ibrahim-ibo-dev\n→ linkedin.com/in/ibrahim-hussein-b080712b7",
      "color: #B8956F; font-size: 12px; font-family: monospace; line-height: 1.8;"
    );

    console.log(
      "%c\n🎮 Easter egg: type 'matrix' anywhere to activate hidden mode.",
      "color: #888; font-size: 11px; font-style: italic;"
    );

    // Security warning (Facebook-style)
    console.log(
      "%c⚠️  STOP",
      "color: #ff4444; font-size: 32px; font-weight: bold; text-shadow: 2px 2px 0 #000;"
    );
    console.log(
      "%cThis is a browser feature for developers. If someone told you to copy/paste something here to \"hack\" or \"unlock\" something, it's a scam — you would be giving them access to your account.",
      "color: #ff8888; font-size: 13px; line-height: 1.6; max-width: 600px;"
    );

    // Typing sequence easter egg
    const secretCode = ["m", "a", "t", "r", "i", "x"];
    let inputSequence: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      inputSequence.push(e.key.toLowerCase());
      inputSequence = inputSequence.slice(-secretCode.length);
      
      if (inputSequence.join("") === secretCode.join("")) {
        // Trigger the easter egg
        console.log("%c>>> MATRIX MODE ACTIVATED <<<", "color: #0F0; font-size: 20px; font-weight: bold;");
        
        // Apply matrix effect to body
        const style = document.createElement('style');
        style.id = "matrix-easter-egg-style";
        style.innerHTML = `
          body {
            filter: hue-rotate(120deg) saturate(2) contrast(1.5) !important;
            transition: filter 1s ease-in-out;
          }
          * {
            font-family: monospace !important;
          }
        `;
        document.head.appendChild(style);

        // Remove after 10 seconds
        setTimeout(() => {
          const styleEl = document.getElementById("matrix-easter-egg-style");
          if (styleEl) {
            styleEl.remove();
          }
          console.log("%c>>> SYSTEM RESTORED <<<", "color: #D4A574; font-size: 16px; font-weight: bold;");
        }, 10000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}
