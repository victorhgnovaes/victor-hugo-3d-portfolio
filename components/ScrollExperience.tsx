"use client";

import { useEffect } from "react";

const motionGroups = [
  { selector: ".heroCopy", depth: -20, rotate: -0.45 },
  { selector: ".heroPortrait", depth: 34, rotate: 0.8 },
  { selector: ".heroBottom", depth: 15, rotate: 0.25 },
  { selector: ".sectionIntro h2", depth: 22, rotate: 0.7 },
  { selector: ".projectVisual", depth: 42, rotate: 1.15 },
  { selector: ".projectCopy", depth: -18, rotate: -0.45 },
  { selector: ".personalVisual", depth: 28, rotate: 0.8 },
  { selector: ".agentTerminal", depth: 34, rotate: 1 },
  { selector: ".agentSide", depth: -17, rotate: -0.35 },
  { selector: ".timelineCopy", depth: 18, rotate: 0.35 },
  { selector: ".educationGrid", depth: 24, rotate: 0.5 },
  { selector: ".careerBrandBackdrop, .educationBrandBackdrop", depth: 55, rotate: 0 },
  { selector: ".contactTitle", depth: 30, rotate: 0.65 },
];

type MotionItem = {
  element: HTMLElement;
  depth: number;
  rotate: number;
};

export default function ScrollExperience() {
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return;

    const items = motionGroups.flatMap(({ selector, depth, rotate }) =>
      Array.from(document.querySelectorAll<HTMLElement>(selector)).map((element) => ({ element, depth, rotate }))
    );
    const itemByElement = new Map<Element, MotionItem>(items.map((item) => [item.element, item]));
    const activeItems = new Set<MotionItem>();
    let frame = 0;

    const render = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      activeItems.forEach(({ element, depth, rotate }) => {
        const rect = element.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const progress = Math.max(-1, Math.min(1, (center - viewportHeight / 2) / viewportHeight));
        element.style.setProperty("--motion-y", `${(-progress * depth).toFixed(2)}px`);
        element.style.setProperty("--motion-rx", `${(progress * rotate).toFixed(3)}deg`);
      });
    };

    const requestRender = () => {
      if (!frame && activeItems.size) frame = window.requestAnimationFrame(render);
    };

    const visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const item = itemByElement.get(entry.target);
        if (!item) return;
        if (entry.isIntersecting) {
          activeItems.add(item);
          item.element.classList.add("scrollMotion3d");
        } else {
          activeItems.delete(item);
          item.element.classList.remove("scrollMotion3d");
          item.element.style.removeProperty("--motion-y");
          item.element.style.removeProperty("--motion-rx");
        }
      });
      requestRender();
    }, { rootMargin: "200px 0px" });

    items.forEach(({ element }) => visibilityObserver.observe(element));
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender, { passive: true });

    return () => {
      visibilityObserver.disconnect();
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      if (frame) window.cancelAnimationFrame(frame);
      items.forEach(({ element }) => {
        element.classList.remove("scrollMotion3d");
        element.style.removeProperty("--motion-y");
        element.style.removeProperty("--motion-rx");
      });
    };
  }, []);

  return null;
}
