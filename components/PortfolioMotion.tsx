"use client";

import { useEffect } from "react";
import styles from "./PortfolioMotion.module.css";

export default function PortfolioMotion() {
  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;
    main.classList.add(styles.flow);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const items = Array.from(main.querySelectorAll<HTMLElement>("[data-reveal]"));
    let frame = 0;
    let activeSurface: HTMLElement | null = null;
    let x = 50, y = 50;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.motionReveal = "visible";
        observer.unobserve(entry.target);
      });
    }, { threshold: .06, rootMargin: "0px 0px -35px" });

    const sync = () => {
      items.forEach(item => {
        if (preference.matches || item.getBoundingClientRect().top < window.innerHeight * .94) {
          item.dataset.motionReveal = "visible";
          observer.unobserve(item);
        } else if (item.dataset.motionReveal !== "visible") {
          item.dataset.motionReveal = "pending";
          observer.observe(item);
        }
      });
      if (preference.matches && frame) { window.cancelAnimationFrame(frame); frame = 0; }
    };
    const render = () => {
      frame = 0;
      if (!activeSurface || preference.matches || document.hidden) return;
      activeSurface.style.setProperty("--pointer-x", `${x.toFixed(1)}%`);
      activeSurface.style.setProperty("--pointer-y", `${y.toFixed(1)}%`);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (preference.matches || !finePointer.matches || document.hidden || !(event.target instanceof Element)) return;
      activeSurface = event.target.closest<HTMLElement>("[data-interactive-surface]");
      if (!activeSurface) return;
      const rect = activeSurface.getBoundingClientRect();
      x = (event.clientX - rect.left) / Math.max(1, rect.width) * 100;
      y = (event.clientY - rect.top) / Math.max(1, rect.height) * 100;
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    main.querySelectorAll<HTMLElement>('[class*="StudioSection_panel"], [class*="Projects_laptopLid"]').forEach(item => { item.dataset.interactiveSurface = "true"; });
    sync();
    preference.addEventListener("change", sync);
    main.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      preference.removeEventListener("change", sync);
      main.removeEventListener("pointermove", onPointerMove);
      main.classList.remove(styles.flow);
      items.forEach(item => { delete item.dataset.motionReveal; });
    };
  }, []);
  return null;
}
