"use client";

import Image from "next/image";
import { experience } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import { useLanguage } from "./i18n/LanguageProvider";

export default function Career() {
  const { locale, text } = useLanguage();
  const ordered = [experience[1], experience[0]];
  const descriptionsEn = [
    "Experience in digital support and Front Office operations for Samsung, communicating through chat and email, analyzing and tracking cases, organizing information and working with corporate systems. The role involves Microsoft Office, administrative processes, data records and structured request resolution in a corporate environment.",
    "Development of complete projects involving front-end, back-end, APIs, PostgreSQL, desktop applications, architecture, authentication, business rules and AI agents.",
  ];
  return <Reveal><section className="section career shell" id="career">
    <SectionIntro index="03" label={text("CARREIRA / EXPERIÊNCIA", "CAREER / EXPERIENCE")} title={<>{text("Trajetória", "Career path")}<span>.</span></>} aside={text("Experiência corporativa e prática aplicada em desenvolvimento de software.", "Corporate experience and hands-on software development practice.")} />
    <div className="timeline">{ordered.map((item,index)=><article key={item.company} className={index===0?"corporateExperience":""}>
      {index===0&&<div className="careerBrandBackdrop" aria-hidden="true"><Image src="/tp-samsung-operation.png" alt="" fill sizes="100vw"/></div>}
      <div className="timelineMeta"><span>0{index+1}</span><p>{locale==="pt"?item.period.replace("PRESENT","PRESENTE").replace("FEB","FEV").replace("DEC","DEZ"):item.period}</p><p>{text("São Paulo · Brasil","São Paulo · Brazil")}</p></div>
      <div className="timelineCopy"><span className="experienceType">{index===0?text("EXPERIÊNCIA CORPORATIVA","CORPORATE EXPERIENCE"):text("PRÁTICA DE DESENVOLVIMENTO","DEVELOPMENT PRACTICE")}</span><h3>{index===0?"Front Office":text("Desenvolvimento de Software","Software Development")}</h3><h4>{item.company}</h4><p>{locale==="pt"?item.description:descriptionsEn[index]}</p><div className="stack">{item.skills.map(x=><span key={x}>{x}</span>)}</div></div>
    </article>)}</div>
  </section></Reveal>;
}
