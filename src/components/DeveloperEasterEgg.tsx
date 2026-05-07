"use client";

import { useEffect } from "react";

export default function DeveloperEasterEgg() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    // ASCII Art
    const asciiArt = `
  ___ _               _     _          _  _                     _       
 |_ _| |__ _ _ __ _| |_ (_)_ __     | || |_  _ ______ ___ (_)_ _    
  | || '_ \\ '_/ _\` | ' \\| | '  \\    | __ | || (_-<_-</ -_) | ' \\   
 |___|_.__/_| \\__,_|_||_|_|_|_|_|   |_||_|\\_,_/__/__/\\___|_|_||_|  
                                                                    
`;
    
    console.log(
      "%c" + asciiArt,
      "color: #D4A574; font-weight: bold; font-family: monospace;"
    );
    console.log(
      "%cWelcome to the source. You're inspecting my code, aren't you?\nIf you are a developer looking for a challenge or just want to connect, reach out!\n\nHint: Try typing 'matrix' anywhere on the page...",
      "color: #FFF; font-size: 14px; padding: 10px; background: #0A0A0F; border-left: 4px solid #D4A574;"
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
        style.innerHTML = \`
          body {
            filter: hue-rotate(120deg) saturate(2) contrast(1.5) !important;
            transition: filter 1s ease-in-out;
          }
          * {
            font-family: monospace !important;
          }
        \`;
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
