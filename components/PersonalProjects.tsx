"use client";

import { personalProjects } from "@/data/portfolio";
import Image from "next/image";
import { SiScratch } from "react-icons/si";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import { useLanguage } from "./i18n/LanguageProvider";

function PersonalVisual({ type }: { type: string }) {
  if (type === "clinic") return <div className="miniClinic miniClinicCover"><Image src="/novatech-cover.png" alt="Interface do sistema de gestão clínica NovaTech" fill sizes="(max-width: 760px) 100vw, 60vw" /><span className="clinicCoverFade" /><em>NOVATECH / CLINIC MANAGEMENT</em></div>;
  if (type === "game") return <div className="miniGame"><Image src="/phazion-quest-cover.jpeg" alt="Capa de Phazion Quest" fill sizes="(max-width: 760px) 100vw, 33vw" /><span className="gameCoverFade" /><em>SOLO / FRAME BY FRAME</em></div>;
  return <div className="miniAgent"><div><span>AGENT / WORKSPACE</span>{["> read context", "> plan change", "> edit files", "> run tests", "✓ complete"].map(x => <i key={x}>{x}</i>)}</div></div>;
}

export default function PersonalProjects() {
  const { locale, text } = useLanguage();
  const featuredProjects = personalProjects.filter((project) => project.visual !== "agent");
  const english = {
    clinic: { subtitle: "Clinic Management System", description: "Desktop system for clinic management with patient, doctor and administrator profiles." },
    game: { subtitle: "Solo · Hand-drawn 2D Game", description: "Original 2D game developed independently in Scratch, with hand-crafted frame-by-frame art and animation." },
  } as const;
  return <Reveal><section className="section personal shell" id="personal">
    <SectionIntro index="06" label={text("PROJETOS AUTORAIS / EXPERIMENTOS", "SIDE PROJECTS / EXPERIMENTS")} title={<>{text("Mundos diferentes,", "Different worlds,")}<br /><span>{text("uma prática de engenharia.", "one engineering practice.")}</span></>} aside={text("Um sistema de gestão clínica e um jogo autoral apresentados como ambientes digitais distintos.", "A clinical management system and an original game presented as distinct digital environments.")} />
    <div className="personalList">{featuredProjects.map((project, index) => {
      const projectLink = "link" in project ? project.link : undefined;
      const chapterId = project.visual === "clinic" ? "novatech" : project.visual === "game" ? "phazion" : undefined;
      return <article id={chapterId} key={project.title} className={`personalChapter ${projectLink ? "personalLinked" : ""}`}>
        <div className="personalMeta"><span>0{index + 1}</span><span>{project.year}</span></div>
        <div className="personalVisual"><PersonalVisual type={project.visual} /></div>
        <div className="personalCopy"><p>{locale === "pt" ? project.subtitle : english[project.visual as keyof typeof english]?.subtitle ?? project.subtitle}</p><h3>{project.title}</h3><p>{locale === "pt" ? project.description : english[project.visual as keyof typeof english]?.description ?? project.description}</p><div className="stack">{project.stack.map(x => <span key={x}>{x}</span>)}</div>
          {project.visual === "clinic" && <><span className="projectAvailability projectInProgress">{text("DESENVOLVIMENTO EM PROGRESSO", "DEVELOPMENT IN PROGRESS")}</span><div className="projectActions personalProjectActions"><button className="projectButton projectButtonPrimary" disabled>{text("VÍDEO ILUSTRATIVO", "DEMO VIDEO")} <small>{text("EM BREVE", "COMING SOON")}</small></button></div></>}
          {projectLink && <a className="scratchLink" href={projectLink} target="_blank" rel="noreferrer" aria-label={text("Jogar Phazion Quest no Scratch", "Play Phazion Quest on Scratch")}><span><SiScratch aria-hidden="true" /> {text("JOGAR NO SCRATCH", "PLAY ON SCRATCH")}</span><i>↗</i></a>}
        </div>
      </article>;
    })}</div>
  </section></Reveal>;
}
