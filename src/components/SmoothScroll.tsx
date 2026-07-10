"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const isLowEnd =
      isMobile &&
      ((nav.deviceMemory !== undefined && nav.deviceMemory <= 4) ||
        (navigator.hardwareConcurrency || 8) <= 4);

    // Skip smooth scroll on low-end devices — native scroll is smoother there
    if (isLowEnd) return;

    const lenis = new Lenis({
      lerp: 0.07,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
