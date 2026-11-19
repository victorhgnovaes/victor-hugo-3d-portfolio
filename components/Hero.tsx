"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLanguage } from "./i18n/LanguageProvider";
import styles from "./Hero.module.css";

export default function Hero() {
  const { text } = useLanguage();
  const opening = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = opening.current;
    if (!section) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(min-width: 761px) and (pointer: fine)");
    let visible = true;
    let frame = 0;
    let x = 0;
    let y = 0;

    const render = () => {
      frame = 0;
      if (motion.matches || !visible || document.hidden) return;
      const scrollDepth = Math.min(18, Math.max(0, -section.getBoundingClientRect().top * 0.035));
      section.style.setProperty("--office-x", `${x}px`);
      section.style.setProperty("--office-y", `${y + scrollDepth}px`);
    };
    const requestRender = () => {
      if (!frame && !motion.matches && visible && !document.hidden) frame = window.requestAnimationFrame(render);
    };
    const move = (event: PointerEvent) => {
      if (!pointer.matches) return;
      x = (event.clientX / window.innerWidth - 0.5) * -12;
      y = (event.clientY / window.innerHeight - 0.5) * -8;
      requestRender();
    };
    const reset = () => { x = 0; y = 0; requestRender(); };
    const sync = () => {
      section.dataset.motionPaused = String(!visible || document.hidden || motion.matches);
      if (motion.matches) {
        section.style.removeProperty("--office-x");
        section.style.removeProperty("--office-y");
      } else requestRender();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(section);
    sync();
    section.addEventListener("pointermove", move, { passive: true });
    section.addEventListener("pointerleave", reset);
    window.addEventListener("scroll", requestRender, { passive: true });
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", reset);
      window.removeEventListener("scroll", requestRender);
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <section ref={opening} className={styles.opening} id="top" aria-labelledby="opening-title">
    <div className={styles.office} aria-hidden="true">
      <Image src="/nova-abertura/04_fundo_abertura.png" alt="" fill sizes="100vw" priority />
    </div>
    <div className={styles.shade} aria-hidden="true" />
    <div className={styles.content}>
      <div className={styles.copy}>
        <div className={styles.identity}>
          <h1 id="opening-title">Victor Hugo</h1>
          <p>{text("Desenvolvedor de Software", "Software Developer")}</p>
        </div>
        <div className={styles.actions}>
          <a className={styles.primary} href="#projects">
            {text("Explorar projetos", "Explore projects")}
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
          </a>
          <a className={styles.secondary} href="#contact">{text("Contato", "Contact")}</a>
        </div>
      </div>
      <div className={styles.visual}>
        <div className={styles.brandLayer} aria-hidden="true">
          <div className={styles.monogram}>
            <Image src="/nova-abertura/01_vh_pixelado.png" alt="" width={1536} height={1024} sizes="(max-width: 760px) 168vw, 80vw" priority />
          </div>
        </div>
        <div className={styles.portrait}>
          <Image src="/nova-abertura/02_foto_recortada.png" alt={text("Retrato de Victor Hugo", "Portrait of Victor Hugo")} width={1254} height={1254} sizes="(max-width: 760px) 125vw, (max-width: 1100px) 49vw, (max-width: 1800px) 46vw, 850px" priority />
        </div>
      </div>
    </div>
  </section>;
}
