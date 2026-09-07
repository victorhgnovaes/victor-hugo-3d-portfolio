"use client";

import { professionalProjects } from "@/data/portfolio";
import ProjectShowcase from "./ProjectShowcase";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import { useLanguage } from "./i18n/LanguageProvider";

export default function Projects(){const {text}=useLanguage();return <section className="section projects shell" id="projects"><Reveal><SectionIntro index="05" label={text("UNIVERSO DE PROJETOS","PROJECT UNIVERSE")} title={<>{text("Sistemas em","Systems in")}<br/><span>{text("movimento.","motion.")}</span></>} aside={text("Sistemas completos projetados em torno de operações, dados, regras de negócio e interfaces utilizáveis.","Complete systems designed around operations, data, business rules and usable interfaces.")} /></Reveal><div className="projectList">{professionalProjects.map((project,index)=><Reveal key={project.title}><ProjectShowcase project={project} reverse={index%2===1}/></Reveal>)}</div></section>}
