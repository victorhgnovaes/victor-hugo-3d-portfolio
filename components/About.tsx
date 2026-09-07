"use client";

import Image from "next/image";
import { profile } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import { useLanguage } from "./i18n/LanguageProvider";

export default function About() {
  const { locale, text } = useLanguage();
  const aboutEn = ["I am a software developer in technical Information Technology education, focused on Full Stack development, back-end, APIs, databases and desktop applications.","I turn real problems into organized, functional systems, working from the interface through architecture, business rules and databases.","I also use Artificial Intelligence agents as part of my Software Engineering workflow for planning, codebase analysis, implementation, debugging and refactoring."];
  const factsEn = [{ label: "LOCATION", value: "São Paulo, Brazil" }, { label: "FOCUS", value: "Software Development" }, { label: "SPECIALTY", value: "Full Stack + Agentic AI" }, { label: "STATUS", value: "Open to Opportunities" }];
  const factsPt = [{ label: "LOCALIZAÇÃO", value: "São Paulo, Brasil" }, { label: "FOCO", value: "Desenvolvimento de Software" }, { label: "ESPECIALIDADE", value: "Full Stack + IA Agêntica" }, { label: "STATUS", value: "Aberto a oportunidades" }];
  return <Reveal><section className="section shell" id="about">
    <SectionIntro index="02" label={text("SOBRE", "ABOUT")} title={<>{text("Engenharia", "Engineering")}<br /><span>{text("com propósito.", "with intent.")}</span></>} />
    <div className="aboutLayout">
      <div className="aboutIdentity">
        <p className="aboutRole">{text("PERFIL / DESENVOLVEDOR DE SOFTWARE", "PORTRAIT / SOFTWARE DEVELOPER")}</p>
        <div className="aboutPortrait">
          <Image src="/victor-profile.png" alt="Retrato de Victor Hugo" fill sizes="(max-width: 760px) 100vw, 32vw" />
          <span aria-hidden="true" />
        </div>
      </div>
      <div className="aboutText">
        {profile.about.map((paragraph,index) => <p key={paragraph}>{locale === "pt" ? paragraph : aboutEn[index]}</p>)}
        {profile.links.resume
          ? <a className="textLink" href={profile.links.resume}>{text("BAIXAR CURRÍCULO", "DOWNLOAD RESUME")} <span>↗</span></a>
          : <a className="textLink" href="#contact">{text("INICIAR UMA CONVERSA", "START A CONVERSATION")} <span>→</span></a>}
      </div>
    </div>
    <div className="facts">{(locale === "pt" ? factsPt : factsEn).map((fact) => <div key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></div>)}</div>
  </section></Reveal>;
}
