"use client";

import Image from "next/image";
import { education } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import { useLanguage } from "./i18n/LanguageProvider";

export default function Education() {
  const { locale, text } = useLanguage();
  const subjectsPt = ["SQL", "Python", "C#", "Programação", "IoT / Arduino", "HTML", "CSS", "JavaScript", "PostgreSQL", "Git", "GitHub", "Scrum", "Banco de Dados", "Desenvolvimento de Sistemas", "Engenharia de Software"];
  const subjectsEn = ["SQL", "Python", "C#", "Programming", "IoT / Arduino", "HTML", "CSS", "JavaScript", "PostgreSQL", "Git", "GitHub", "Scrum", "Databases", "Systems Development", "Software Engineering"];
  return <Reveal><section className="section education shell" id="education">
    <div className="educationBrandBackdrop" aria-hidden="true"><Image src="/cruzeiro-do-sul-education-bg.png" alt="" fill sizes="100vw" /></div>
    <SectionIntro index="07" label={text("FORMAÇÃO", "EDUCATION")} title={<>{text("Base", "Technical")}<br /><span>{text("técnica.", "foundation.")}</span></>} />
    <div className="educationGrid"><div className="institutionIdentity"><span>{text("INSTITUIÇÃO", "INSTITUTION")}</span><Image className="institutionInlineLogo" src="/cruzeiro-do-sul-education-bg.png" alt={education.institution} width={2000} height={720} /></div><div>
      <h3>{text(education.title, "High School Integrated with Technical Education in Information Technology")}</h3>
      <p>{text(education.description, "Technical education focused on systems development, databases and Software Engineering fundamentals.")}</p>
      <div className="subjectList">{(locale === "pt" ? subjectsPt : subjectsEn).map((subject, index) => <span key={subject}><i>{String(index + 1).padStart(2, "0")}</i>{subject}</span>)}</div>
    </div></div>
  </section></Reveal>;
}
