"use client";

import Image from "next/image";
import { useLanguage } from "./i18n/LanguageProvider";
import styles from "./About.module.css";

export default function About() {
  const { text } = useLanguage();
  return <section className={styles.about} id="about" aria-labelledby="about-title">
    <div className={styles.background} aria-hidden="true">
      <Image src="/about-office-background.png" alt="" fill sizes="100vw" />
    </div>
    <div className={styles.shade} aria-hidden="true" />
    <div className={styles.inner}>
      <div className={styles.main}>
        <div className={styles.identity}>
          <p className={styles.eyebrow}>{text("SOBRE MIM", "ABOUT ME")}</p>
          <h2 id="about-title">{text("Engenharia", "Engineering")}<br />{text("com propósito.", "with purpose.")}</h2>
        </div>
        <div className={styles.prose}>
          <p className={styles.lead}>{text(
            "Sou Victor Hugo, desenvolvedor de software em formação. Transformo problemas reais em sistemas, interfaces e experiências digitais.",
            "I'm Victor Hugo, a software developer in training. I turn real problems into systems, interfaces and digital experiences."
          )}</p>
          <p>{text(
            "Da interface à arquitetura, combino desenvolvimento e inteligência artificial para construir soluções.",
            "From interface to architecture, I combine software development and artificial intelligence to build solutions."
          )}</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.facts}>
          <span>{text("São Paulo, Brasil", "São Paulo, Brazil")}</span><i aria-hidden="true">·</i>
          <span>Full Stack</span><i aria-hidden="true">·</i>
          <span>{text("Aberto a oportunidades", "Open to opportunities")}</span>
        </p>
        <a href="#career">{text("Conheça minha trajetória", "Explore my journey")} <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </section>;
}
