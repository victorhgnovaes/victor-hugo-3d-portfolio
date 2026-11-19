"use client";

import Image from "next/image";
import { education } from "@/data/portfolio";
import { FiArrowRight, FiCode, FiMonitor } from "react-icons/fi";
import { TbDeviceGamepad2 } from "react-icons/tb";
import StudioSection from "./StudioSection";
import TechnologyIcon from "./TechnologyIcon";
import styles from "./StudioSection.module.css";
import { useLanguage } from "./i18n/LanguageProvider";

export default function Education() {
  const { locale, text } = useLanguage();
  const subjectsPt = ["SQL", "Python", "C#", "Programação", "IoT / Arduino", "HTML", "CSS", "JavaScript", "PostgreSQL", "Git", "GitHub", "Scrum", "Banco de Dados", "Desenvolvimento de Sistemas", "Engenharia de Software"];
  const subjectsEn = ["SQL", "Python", "C#", "Programming", "IoT / Arduino", "HTML", "CSS", "JavaScript", "PostgreSQL", "Git", "GitHub", "Scrum", "Databases", "Systems Development", "Software Engineering"];
  const featured = ["HTML5", "CSS3", "JavaScript", "Python", "C#", "PostgreSQL", "Git", "GitHub"];
  return <StudioSection id="education" titleId="education-title" background="/about-office-background.png">
    <p className={styles.eyebrow}>{text("FORMAÇÃO ACADÊMICA", "ACADEMIC EDUCATION")}</p>
    <h2 id="education-title" className={styles.educationTitle}>{text("Base", "Technical")} <span>{text("técnica.", "foundation.")}</span></h2>
    <div className={styles.institution}>
      <Image src="/cruzeiro-do-sul-education-bg.png" alt={education.institution} width={2000} height={720} sizes="(max-width: 520px) 76vw, 400px" />
      <h3>{text(education.title, "High School Integrated with Technical Education in Information Technology")}</h3>
    </div>
    <p className={styles.educationDescription}>{text("Programação, desenvolvimento de sistemas e bancos de dados conectados à prática.", "Programming, systems development and databases connected to hands-on practice.")}</p>
    <ul className={styles.subjectCards}>{featured.map(subject => <li key={subject}><TechnologyIcon name={subject} /><span>{subject}</span></li>)}</ul>
    <details className={styles.details}>
      <summary>{text("Ver toda a formação", "Explore the complete curriculum")}</summary>
      <p>{text(education.description, "Technical education focused on systems development, databases and Software Engineering fundamentals.")}</p>
      <ul className={styles.tagList}>{(locale === "pt" ? subjectsPt : subjectsEn).map(subject => <li key={subject}>{subject}</li>)}</ul>
    </details>
    <div className={styles.practice}>
      <h3><FiCode aria-hidden="true" />{text("Projetos na prática", "Projects in practice")}</h3>
      <a className={styles.button} href="#novatech"><FiMonitor aria-hidden="true" />NovaTech<FiArrowRight aria-hidden="true" /></a>
      <a className={styles.button} href="#phazion"><TbDeviceGamepad2 aria-hidden="true" />Phazion Quest<FiArrowRight aria-hidden="true" /></a>
    </div>
  </StudioSection>;
}
