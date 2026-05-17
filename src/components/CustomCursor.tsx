"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [clickScale, setClickScale] = useState(1);
  const [label, setLabel] = useState<string>("");

  // Tiny dot exactly on cursor (Instant, no spring)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Larger ring with delay (Spring)
  const ringX = useSpring(-100, { stiffness: 400, damping: 28, mass: 0.5 });
  const ringY = useSpring(-100, { stiffness: 400, damping: 28, mass: 0.5 });

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Add global class to hide native cursor
    document.body.classList.add("hide-native-cursor");

    const updateMousePosition = (e: MouseEvent) => {
      // Direct assignment for instant response
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.closest<HTMLElement>("a, button, [data-cursor], [role='button']") ||
        (window.getComputedStyle(target).cursor === "pointer" ? target : null);

      if (interactive) {
        setIsHovering(true);
        // Determine contextual label
        const customLabel = interactive.getAttribute("data-cursor");
        if (customLabel) {
          setLabel(customLabel);
        } else if (interactive.tagName.toLowerCase() === "a") {
          const href = interactive.getAttribute("href") || "";
          if (href.startsWith("mailto:")) setLabel("Email");
          else if (href.startsWith("tel:") || href.includes("wa.me")) setLabel("Call");
          else if (href.startsWith("#")) setLabel("Go");
          else if (interactive.getAttribute("target") === "_blank") setLabel("Open");
          else setLabel("View");
        } else if (interactive.tagName.toLowerCase() === "button") {
          setLabel("Click");
        } else {
          setLabel("");
        }
      } else {
        setIsHovering(false);
        setLabel("");
      }
    };

    const handleMouseDown = () => setClickScale(0.8);
    const handleMouseUp = () => setClickScale(1);

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Use passive listener for better performance
    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      document.body.classList.remove("hide-native-cursor");
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, dotX, dotY, ringX, ringY]);

  if (!isVisible) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-native-cursor, .hide-native-cursor * { cursor: none !important; }
      `}} />
      
      {/* Outer Ring with Label */}
      <motion.div
        className="pointer-events-none flex items-center justify-center"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "1.5px solid rgba(212, 165, 116, 0.7)",
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9999,
        }}
        animate={{
          scale: isHovering ? (label ? 2.4 : 1.8) * clickScale : 1 * clickScale,
          backgroundColor: isHovering ? "rgba(212, 165, 116, 0.18)" : "transparent",
          borderColor: isHovering ? "rgba(212, 165, 116, 0.9)" : "rgba(212, 165, 116, 0.7)",
        }}
        transition={{ type: "tween", duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Contextual Label */}
        {label && isHovering && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 / 2.4 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#D4A574",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              fontFamily: "var(--font-space-grotesk), sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="pointer-events-none"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "#D4A574",
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9999,
        }}
        animate={{
          scale: isHovering ? 0 : 1 * clickScale,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: "tween", duration: 0.1 }}
      />
    </>
  );
}
