"use client";

import { useEffect } from "react";

// Scroll-driven accents also work with touch. Content is visible without JS.
export default function ScrollDetails() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".nx-portfolio");
    if (!root) return;
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-scroll-section]"));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const paint = () => {
      frame = 0;
      const fade = Math.min(1, Math.max(0, (window.scrollY - innerHeight * .4) / (innerHeight * .65)));
      root.style.setProperty("--nx-content-veil", String(.10 + fade * .38));
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (innerHeight * .5 - rect.top) / Math.max(1, rect.height - innerHeight * .3)));
        section.style.setProperty("--section-progress", String(preference.matches ? 1 : progress));
      }
    };
    const update = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) entry.target.classList.toggle("nx-card-visible", entry.isIntersecting);
    }, { threshold: .22, rootMargin: "0px 0px -6% 0px" });
    const cardSelector = ".nx-work-card,.nx-skill-panel,.nx-achievement-card,.nx-experience-row";
    const visitCards = (node: Node, visit: (card: Element) => void) => {
      if (!(node instanceof Element)) return;
      if (node.matches(cardSelector)) visit(node);
      node.querySelectorAll(cardSelector).forEach(visit);
    };
    visitCards(root, card => observer.observe(card));
    // Expanded achievements mount on demand; give them the same touch accents.
    const mutations = new MutationObserver(records => {
      for (const record of records) {
        record.removedNodes.forEach(node => {
          if (!root.contains(node)) visitCards(node, card => observer.unobserve(card));
        });
        record.addedNodes.forEach(node => {
          if (root.contains(node)) visitCards(node, card => observer.observe(card));
        });
      }
      update();
    });
    mutations.observe(root, { childList: true, subtree: true });
    paint();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    preference.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      preference.removeEventListener("change", update);
    };
  }, []);
  return null;
}
