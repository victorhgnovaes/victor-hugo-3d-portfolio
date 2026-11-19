"use client";

import { useState } from "react";
import { technologies } from "@/data/portfolio";
import { architectureNotes } from "@/data/architecture";
import { FiCode, FiDatabase, FiLayers, FiServer } from "react-icons/fi";
import { SiReact } from "react-icons/si";
import StudioSection from "./StudioSection";
import TechnologyIcon from "./TechnologyIcon";
import styles from "./StudioSection.module.css";
import { useLanguage } from "./i18n/LanguageProvider";

export default function Technologies() {
  const { locale, text } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const descriptionsEn = [
    "Development of modern, responsive and visually structured interfaces with React, TypeScript, JavaScript, HTML and CSS. I build landing pages, dashboards, portfolios and interactive experiences with animation, video, mobile adaptation and strong visual identity.",
    "Creation of APIs and business rules with Node.js and NestJS, including JWT authentication, route organization, front-end and database integration, validation and financial systems such as Nexus.",
    "Relational database modeling and development with PostgreSQL and SQL, including tables, relationships, keys, queries, CRUD operations and integration through Prisma ORM and Npgsql.",
    "I use TypeScript and JavaScript for web development, SQL for databases, Python for logic and automation, and C# for Windows Forms desktop applications. I also have a foundation in C++, HTML and CSS.",
    "I use Git and GitHub for version control, VS Code, Visual Studio, Postman for API testing, and Terminal/CLI for dependencies, package management, project execution and deployment.",
    "Knowledge across the software lifecycle: requirements, data modeling, APIs, versioning, responsive design, systems integration and agile practices such as Scrum, always focused on organized and usable solutions.",
  ];

  const presentation = [
    { label: "FRONT-END", icon: SiReact, items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3"] },
    { label: "BACK-END", icon: FiServer, items: ["Node.js", "NestJS"] },
    { label: text("BANCO DE DADOS", "DATABASES"), icon: FiDatabase, items: ["PostgreSQL", "Prisma ORM"] },
    { label: text("LINGUAGENS", "LANGUAGES"), icon: FiCode, items: ["TypeScript", "JavaScript", "Python", "C#", "C++"] },
    { label: text("FERRAMENTAS", "TOOLS"), icon: FiLayers, items: ["Git", "GitHub", "VS Code", "Postman"] },
  ];

  return <StudioSection id="technologies" titleId="technologies-title" background="/studio-office-background.png">
    <div className={styles.twoColumn}>
      <div className={styles.intro}>
        <h2 id="technologies-title">{text("Arquitetura", "Architecture")}<br />{text("para", "for")}<br /><span>{text("software real.", "real software.")}</span></h2>
        <p>{text("Interface, serviços e dados conectados em um único sistema.", "Interfaces, services and data connected in a single system.")}</p>
      </div>
      <div className={styles.panel}>
        {presentation.map((group, index) => {
          const isOpen = openIndex === index;
          const Icon = group.icon;
          return <div className={styles.technologyGroup} key={group.label}>
            <button className={styles.technologyRow} type="button" aria-expanded={isOpen} aria-controls={`tech-panel-${index + 1}`} onClick={() => setOpenIndex(isOpen ? null : index)}>
              <span className={styles.category}><Icon aria-hidden="true" /><span>{group.label}</span></span>
              <span className={styles.badges}>{group.items.map(item => <span className={styles.badge} key={item}><TechnologyIcon name={item} /><span>{item}</span></span>)}</span>
            </button>
            <div className={styles.technologyDetail} id={`tech-panel-${index + 1}`} hidden={!isOpen}>
              <p>{locale === "pt" ? technologies[index].description : descriptionsEn[index]}</p>
              <div className={styles.architectureNote}>
                <h3>{text("Como uso na prática", "How I use it in practice")}</h3>
                <p>{architectureNotes[index].description[locale === "pt" ? 0 : 1]}</p>
                <ul>{architectureNotes[index].practices.map(practice => <li key={practice[0]}>{practice[locale === "pt" ? 0 : 1]}</li>)}</ul>
              </div>
              <ul className={styles.tagList}>{technologies[index].items.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>;
        })}
        <details className={styles.methods}>
          <summary>{text("Métodos e práticas de desenvolvimento", "Development methods and practices")}</summary>
          <p>{locale === "pt" ? technologies[5].description : descriptionsEn[5]}</p>
          <ul className={styles.tagList}>{technologies[5].items.map(item => <li key={item}>{item}</li>)}</ul>
        </details>
      </div>
    </div>
  </StudioSection>;
}
