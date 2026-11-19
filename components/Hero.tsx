"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLanguage } from "./i18n/LanguageProvider";
import TechnologyIcon from "./TechnologyIcon";
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
    <div className={styles.mobileBackground} aria-hidden="true" />
    <div className={styles.content}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{text("PORTFÓLIO 2026", "PORTFOLIO 2026")}<span aria-hidden="true" /></p>
        <div className={styles.identity}>
          <h1 id="opening-title"><span className={styles.desktopName}>Victor Hugo</span><span className={styles.mobileName}>Victor <span className={styles.mobileAccent}>Hugo</span></span></h1>
          <p>
            <span className={styles.desktopRole}>{text("Desenvolvedor de Software", "Software Developer")}</span>
            <span className={styles.mobileRole}><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18" /></svg>Software Developer</span>
          </p>
        </div>
        <p className={styles.description}>{text("Desenvolvendo soluções digitais que unem tecnologia, criatividade e experiência do usuário.", "Developing digital solutions that bring together technology, creativity and user experience.")}</p>
        <div className={styles.actions}>
          <a className={styles.primary} href="#projects">
            {text("Explorar projetos", "Explore projects")}
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
          </a>
          <a className={styles.secondary} href="#contact"><svg className={styles.contactIcon} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></svg>{text("Contato", "Contact")}</a>
        </div>
        <ul className={styles.technologies} aria-label={text("Tecnologias utilizadas nos meus projetos", "Technologies used in my projects")}>
          {["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"].map(name => <li key={name}><TechnologyIcon name={name} /><span className={styles.technologyLabel}>{name}</span></li>)}
        </ul>
        <a className={styles.scrollIndicator} href="#about"><span className={styles.scrollMouse} aria-hidden="true"><i /></span><span>{text("Role para explorar", "Scroll to explore")}</span><svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m5 7 5 5 5-5" /></svg></a>
      </div>
      <div className={styles.visual}>
        <div className={styles.brandLayer} aria-hidden="true">
          <div className={styles.monogram}>
            <Image src="/nova-abertura/01_vh_pixelado.png" alt="" width={1536} height={1024} sizes="(max-width: 760px) 168vw, 80vw" priority />
          </div>
        </div>
        <div className={styles.portrait}>
          <Image src="/nova-abertura/02_foto_recortada.png" alt={text("Retrato de Victor Hugo", "Portrait of Victor Hugo")} width={1254} height={1254} sizes="(max-width: 760px) 175vw, (max-width: 1100px) 49vw, (max-width: 1800px) 46vw, 850px" priority />
        </div>
      </div>
    </div>
  </section>;
}
