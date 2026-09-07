"use client";

import type { professionalProjects } from "@/data/portfolio";
import EcarMockup from "./EcarMockup";
import NexusMockup from "./NexusMockup";
import BlackWidowMockup from "./BlackWidowMockup";
import { useLanguage } from "./i18n/LanguageProvider";

type Project = (typeof professionalProjects)[number];

export default function ProjectShowcase({ project, reverse }: { project: Project; reverse?: boolean }) {
  const { locale, text } = useLanguage();
  const Mockup = project.kind === "nexus" ? NexusMockup : project.kind === "ecar" ? EcarMockup : BlackWidowMockup;
  const projectUrl = "projectUrl" in project ? project.projectUrl : undefined;
  const codeUrl = "codeUrl" in project ? project.codeUrl : undefined;
  const english = {
    nexus: { description: "Financial platform built to organize, manage and analyze revenue, expenses, categories, goals, documents, risk, audits, alerts and AI-assisted insights.", features: ["Financial dashboard","Goals and risk analysis","Auditing and alerts","AI chat and insights","CSV / OFX import","PDF and exports"] },
    ecar: { description: "System for the automotive and vehicle sales sector, combining an institutional landing page, customer accounts, administration and CRM.", features: ["Customers and authentication","Quotes and proposals","Leads and opportunities","Commissions","Content and listings","WhatsApp integration"] },
    "black-widow": { description: "Concept microsite inspired by the visual atmosphere of Black Widow (2021), recreating a cinematic promotional experience with espionage aesthetics, classified documents, scroll animation and interactive video transformations.", features: ["Two preloaded overlapping videos","Interactive A → B → A transformation cycle","Playback control and click locking","HTML5 Video API and playsinline","Keyboard, visible focus and reduced motion","Intersection Observer and cinematic scroll"] },
  }[project.kind];
  const projectPresentation = {
    nexus: { ptSubtitle: "Plataforma de Inteligência Financeira", ptCategory: "FINTECH / TECNOLOGIA FINANCEIRA / IA", enSubtitle: "Financial Intelligence Platform", enCategory: "FINTECH / FINANCIAL TECHNOLOGY / AI" },
    ecar: { ptSubtitle: "Plataforma CRM Automotiva", ptCategory: "AUTOMOTIVO / CRM", enSubtitle: "Automotive CRM Platform", enCategory: "AUTOMOTIVE / CRM" },
    "black-widow": { ptSubtitle: "Experiência Red Room", ptCategory: "FRONT-END INTERATIVO / MICROSITE CINEMATOGRÁFICO", enSubtitle: "Red Room Experience", enCategory: "INTERACTIVE FRONT-END / CINEMATIC MICROSITE" },
  }[project.kind];

  return <article id={project.kind} className={`projectShowcase ${reverse ? "reverse" : ""}`}>
    <div className="projectVisual">
      <div className="visualLabel"><span>{project.number} / 03</span><span>{project.year}</span></div>
      <Mockup />
    </div>
    <div className="projectCopy">
      <div className="projectMeta"><span>{locale === "pt" ? projectPresentation.ptCategory : projectPresentation.enCategory}</span></div>
      <h3>{project.title}</h3>
      <h4>{locale === "pt" ? projectPresentation.ptSubtitle : projectPresentation.enSubtitle}</h4>
      <p>{locale === "pt" ? project.description : english.description}</p>
      <ul>{(locale === "pt" ? project.features : english.features).map((item) => <li key={item}>{item}</li>)}</ul>
      <div className="stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
      {project.kind === "black-widow" ? <div className="projectActions">
        {projectUrl ? <a className="projectButton projectButtonPrimary" href={projectUrl} target="_blank" rel="noreferrer">{text("ACESSAR PROJETO","OPEN PROJECT")} <span>↗</span></a> : <button className="projectButton projectButtonPrimary" disabled>{text("ACESSAR PROJETO","OPEN PROJECT")} <small>{text("EM BREVE","COMING SOON")}</small></button>}
        {codeUrl ? <a className="projectButton" href={codeUrl} target="_blank" rel="noreferrer">{text("VER CÓDIGO","VIEW CODE")} <span>↗</span></a> : <button className="projectButton" disabled>{text("VER CÓDIGO","VIEW CODE")} <small>{text("EM BREVE","COMING SOON")}</small></button>}
      </div> : <>
        <span className="projectAvailability projectInProgress">{text("DESENVOLVIMENTO EM ANDAMENTO","DEVELOPMENT IN PROGRESS")}</span>
        <div className="projectActions">
          <button className="projectButton projectButtonPrimary" disabled>{text("ACESSAR PROJETO","OPEN PROJECT")} <small>{text("EM BREVE","COMING SOON")}</small></button>
          <button className="projectButton" disabled>{text("VER CÓDIGO","VIEW CODE")} <small>{text("EM BREVE","COMING SOON")}</small></button>
        </div>
      </>}
    </div>
  </article>;
}
