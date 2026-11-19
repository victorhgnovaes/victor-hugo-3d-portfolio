"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { FiArrowUpRight, FiCode, FiLayers, FiMapPin } from "react-icons/fi";
import { ecarExperience, experience } from "@/data/portfolio";
import { useLanguage } from "./i18n/LanguageProvider";
import styles from "./Career.module.css";

const ecarHighlightsEn = [
  "Development of web applications with React, TypeScript and Vite, focused on performance, responsiveness and user experience.",
  "Development of REST APIs with Node.js and NestJS, connecting front-end, back-end and database.",
  "PostgreSQL database modeling and integration, using Prisma ORM to manage and access data.",
  "Development of commercial catalogs and platforms presenting vehicles, versions, colors, specifications and commercial conditions.",
  "Development of eCar × Aurora Alimentos, a responsive vehicle catalog supporting the commercial operation.",
  "Implementation of responsive desktop and mobile interfaces following each project's visual identity and requirements.",
  "Creation of commercial flows integrated with WhatsApp for contacting the team and sending proposals from the platform.",
  "Use of Git and GitHub for version control, code organization and management of project improvements.",
  "Use of Python and JavaScript/TypeScript scripts to process, import and organize application data.",
  "Participation in the complete development cycle: requirements, architecture, development, integration, testing, version control and deployment.",
];

export default function Career() {
  const { locale, text } = useLanguage();
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [compact, setCompact] = useState(false);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const sync = () => setCompact(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const entries = [
    {
      id: "ecar", label: "ECAR Frotas", role: text(ecarExperience.role, "Full Stack Developer"),
      company: ecarExperience.company,
      period: text("AGO 2025 — ATUAL", ecarExperience.period), logo: "/ecar-career-logo.webp",
      summary: text("Desenvolvo soluções web para apoiar as operações comerciais e digitais da eCar Frotas, da estruturação à publicação dos projetos.", "I build web solutions for eCar Frotas' commercial and digital operations, from application structure to deployment."),
      description: text(ecarExperience.description, "Development of web solutions supporting eCar Frotas' commercial and digital operations, participating from application structure through implementation and deployment."),
      highlights: locale === "pt" ? ecarExperience.highlights : ecarHighlightsEn,
      skills: ecarExperience.skills,
      projects: [
        { label: "ECAR Frotas", href: "https://ecarfrotas.com.br" },
        { label: "ECAR Frotas PCD", href: "https://ecarfrotas-pcd.vercel.app/" },
        { label: "eCar × Aurora Alimentos", href: "https://ecar-aurora.vercel.app" },
      ],
    },
    {
      id: "tp", label: "TP · Samsung", role: "Front Office",
      company: experience[1].company,
      period: locale === "pt" ? experience[1].period.replace("FEB", "FEV").replace("PRESENT", "ATUAL") : experience[1].period,
      logo: "/tp-samsung-operation.png",
      summary: text("Suporte digital e operações de Front Office para a Samsung, com atendimento via chat e e-mail, análise de ocorrências e organização de informações.", "Digital support and Front Office operations for Samsung, handling chat and email, analyzing cases and organizing information."),
      description: text(experience[1].description, "Experience in digital support and Front Office operations for Samsung, communicating through chat and email, analyzing and tracking cases, organizing information and working with corporate systems. The role involves Microsoft Office, administrative processes, data records and structured request resolution in a corporate environment."),
      highlights: [], skills: experience[1].skills, projects: [],
    },
    {
      id: "academic", label: text("Projetos acadêmicos", "Academic projects"), role: text("Desenvolvimento de Software", "Software Development"),
      company: text(experience[0].company, "Independent / Academic Projects"),
      period: locale === "pt" ? experience[0].period.replace("DEC", "DEZ").replace("PRESENT", "ATUAL") : experience[0].period,
      logo: "",
      summary: text("Prática de desenvolvimento em projetos completos, conectando interfaces, APIs, bancos de dados e aplicações desktop.", "Hands-on development of complete projects connecting interfaces, APIs, databases and desktop applications."),
      description: text(experience[0].description, "Development of complete projects involving front-end, back-end, APIs, PostgreSQL, desktop applications, architecture, authentication, business rules and AI agents."),
      highlights: [], skills: experience[0].skills, projects: [],
    },
  ];

  const select = (index: number) => { setActive(index); setExpanded(false); };
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % entries.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + entries.length - 1) % entries.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = entries.length - 1;
    else return;
    event.preventDefault();
    select(next);
    tabs.current[next]?.focus();
  };

  return <section className={styles.career} id="career" aria-labelledby="career-title">
    <div className={styles.background} aria-hidden="true"><Image src="/career-office-background.png" alt="" fill sizes="100vw" /></div>
    <div className={styles.shade} aria-hidden="true" />
    <div className={styles.inner}>
      <h2 id="career-title">{text("Minha trajetória", "My journey")}</h2>
      <div className={styles.layout}>
        <div className={styles.tabs} role="tablist" aria-label={text("Experiências profissionais e projetos", "Professional experience and projects")} aria-orientation={compact ? "horizontal" : "vertical"}>
          {entries.map((item, index) => <button key={item.id} ref={node => { tabs.current[index] = node; }}
            type="button" role="tab" id={`career-tab-${item.id}`} aria-controls={`career-panel-${item.id}`}
            aria-selected={active === index} tabIndex={active === index ? 0 : -1}
            onClick={() => select(index)} onKeyDown={event => onTabKeyDown(event, index)}>
            <span>{item.label}</span>{item.period && <small>{item.period}</small>}
          </button>)}
        </div>
        <div className={styles.panels}>
          {entries.map((item, index) => <article key={item.id} className={styles.panel} id={`career-panel-${item.id}`}
            role="tabpanel" aria-labelledby={`career-tab-${item.id}`} hidden={active !== index} tabIndex={0}>
            <div className={styles.panelInner}>
              <h3>{item.role}</h3>
              <div className={styles.companyRow}>
                {item.logo ? <div className={styles.companyMark}><Image src={item.logo} alt={item.id === "tp" ? "TP · Samsung" : "ECAR Frotas"} width={item.id === "tp" ? 2172 : 256} height={item.id === "tp" ? 724 : 85} sizes="(max-width: 760px) 180px, 210px" /></div>
                  : <div className={styles.academicMark} aria-hidden="true"><FiCode /></div>}
                <div className={styles.companyInfo}><h4>{item.company}</h4>{item.period && <p>{item.period}</p>}</div>
                <p className={styles.location}><FiMapPin aria-hidden="true" />{text("São Paulo · Brasil", "São Paulo · Brazil")}</p>
              </div>
              <p className={styles.summary} hidden={expanded}>{item.summary}</p>
              <div className={styles.details} id={`career-details-${item.id}`} hidden={!expanded}>
                <p>{item.description}</p>
                {item.highlights.length > 0 && <><h5>{text("Principais destaques", "Key highlights")}</h5><ul>{item.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul></>}
              </div>
              {item.projects.length > 0 && <div className={styles.projects}>
                <h5>{text("Projetos em destaque", "Featured projects")}</h5>
                <ul>{item.projects.map(project => <li key={project.href}>
                  <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={text(`${project.label} (abre em nova aba)`, `${project.label} (opens in a new tab)`)}>
                    <FiLayers aria-hidden="true" /><span>{project.label}</span><FiArrowUpRight className={styles.projectArrow} aria-hidden="true" />
                  </a>
                </li>)}</ul>
              </div>}
              <ul className={styles.skills} aria-label={text("Competências", "Skills")}>
                {(expanded ? item.skills : item.skills.slice(0, 6)).map(skill => <li key={skill}>{skill}</li>)}
              </ul>
              <button className={styles.more} type="button" aria-expanded={expanded} aria-controls={`career-details-${item.id}`} onClick={() => setExpanded(value => !value)}>
                {expanded ? text("Ver menos", "Show less") : text("Ver mais", "Read more")}<span aria-hidden="true">{expanded ? "↑" : "↓"}</span>
              </button>
            </div>
          </article>)}
        </div>
      </div>
    </div>
  </section>;
}
