"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { FiArrowRight, FiArrowUpRight, FiCode, FiLayers, FiMonitor, FiPlay, FiTruck } from "react-icons/fi";
import { TbBrandGithub, TbDeviceGamepad2, TbSpider } from "react-icons/tb";
import { SiScratch } from "react-icons/si";
import { showcaseProjects } from "@/data/projectShowcase";
import StudioSection from "./StudioSection";
import ProjectVideoDialog from "./ProjectVideoDialog";
import shared from "./StudioSection.module.css";
import styles from "./Projects.module.css";
import { useLanguage } from "./i18n/LanguageProvider";

const icons = [FiLayers, FiTruck, FiTruck, FiTruck, FiMonitor, TbSpider, TbDeviceGamepad2];

export default function Projects() {
  const { locale, text } = useLanguage();
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeVideo = useCallback(() => setVideoOpen(false), []);
  const project = showcaseProjects[active];
  const language = locale === "pt" ? 0 : 1;

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.slice(1);
      const index = showcaseProjects.findIndex(item => item.id === (hash === "personal" ? "novatech" : hash));
      if (index >= 0) { setActive(index); setExpanded(false); setVideoOpen(false); }
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const select = (index: number) => {
    setActive(index); setExpanded(false); setVideoOpen(false);
    window.history.replaceState(null, "", `#${showcaseProjects[index].id}`);
  };
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % showcaseProjects.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + showcaseProjects.length - 1) % showcaseProjects.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = showcaseProjects.length - 1;
    else return;
    event.preventDefault(); select(next); tabs.current[next]?.focus({ preventScroll: true });
  };

  return <StudioSection id="projects" titleId="projects-title">
    <div className={styles.fragmentAliases} aria-hidden="true">
      {["personal", ...showcaseProjects.filter(item => item.id !== "nexus").map(item => item.id)].map(id => <span id={id} data-chapter-alias="true" key={id} />)}
    </div>
    <div id="nexus" className={styles.showcase}>
      <div className={styles.stage} id="project-panel" role="tabpanel" aria-labelledby={`project-tab-${project.id}`} tabIndex={0}>
        <div className={styles.copy} key={`copy-${project.id}`}>
          <p className={styles.eyebrow}>{project.title} · {project.subtitle[language]}</p>
          <h2 id="projects-title">{text("Projetos que", "Projects that")}<br />{text("ganham vida.", "come to life.")}</h2>
          <p className={styles.description}>{project.description[language]}</p>
          <div className={styles.actions}>
            {project.video ? <button type="button" className={styles.primary} onClick={() => setVideoOpen(true)}>{text("Assistir vídeo", "Watch video")}<FiPlay aria-hidden="true" /></button>
              : project.href ? <a className={styles.primary} href={project.href} target="_blank" rel="noopener noreferrer">{text(project.id === "phazion" ? "Jogar no Scratch" : "Conhecer projeto", project.id === "phazion" ? "Play on Scratch" : "Open project")}<FiArrowUpRight aria-hidden="true" /></a>
              : <button type="button" className={styles.primary} aria-expanded={expanded} aria-controls="project-details" onClick={() => setExpanded(value => !value)}>{text(expanded ? "Ver menos" : "Conhecer projeto", expanded ? "Show less" : "Explore project")}<FiArrowRight aria-hidden="true" /></button>}
            {project.codeUrl ? <a className={styles.secondary} href={project.codeUrl} target="_blank" rel="noopener noreferrer">{project.id === "phazion" ? <SiScratch aria-hidden="true" /> : <TbBrandGithub aria-hidden="true" />}{text("Ver código", "View code")}{project.codePrivate && <small className={styles.codeStatus}>{text("Privado", "Private")}</small>}<FiArrowUpRight aria-hidden="true" /></a>
              : <button className={styles.secondary} type="button" disabled title={text("Link do código indisponível", "Source code link unavailable")}><TbBrandGithub aria-hidden="true" />{text("Ver código", "View code")}<small className={styles.codeStatus}>{text("Indisponível", "Unavailable")}</small></button>}
          </div>
          {(project.href || project.video) && <button className={styles.detailsToggle} type="button" aria-expanded={expanded} aria-controls="project-details" onClick={() => setExpanded(value => !value)}>{expanded ? text("Ver menos", "Show less") : text("Detalhes e tecnologias", "Details and technologies")} <span aria-hidden="true">{expanded ? "−" : "+"}</span></button>}
        </div>
        <div className={styles.device} aria-label={text("Apresentação do projeto em um notebook", "Project presentation in a laptop")}>
          <div className={styles.laptopLid}>
            <i className={styles.camera} aria-hidden="true" />
            <div className={styles.screen} key={`screen-${project.id}`}>
              {project.image ? <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 900px) 88vw, 60vw" />
                : <div className={styles.brandScreen}><Image src="/ecar-career-logo.webp" alt="ECAR Frotas" width={256} height={85} /><span>{project.subtitle[language]}</span><strong>{project.title}</strong><a href={project.href} target="_blank" rel="noopener noreferrer">{text("Visitar plataforma", "Visit platform")} <FiArrowUpRight aria-hidden="true" /></a></div>}
            </div>
          </div>
          <div className={styles.laptopBase} aria-hidden="true"><i /></div>
          <p className={styles.screenCaption}>{project.title} <span>· {project.subtitle[language]}</span></p>
        </div>
      </div>
      <div id="project-details" className={styles.projectDetails} hidden={!expanded}>
        <h3>{project.title}</h3>
        {project.features[language].length > 0 && <ul className={styles.features}>{project.features[language].map(feature => <li key={feature}><FiCode aria-hidden="true" />{feature}</li>)}</ul>}
        {project.stack.length > 0 && <ul className={shared.tagList}>{project.stack.map(item => <li key={item}>{item}</li>)}</ul>}
        {project.id === "nexus" && <p className={styles.availability}>{text("Desenvolvimento em andamento.", "Development in progress.")}</p>}
      </div>
      <div className={styles.tabs} role="tablist" aria-label={text("Selecionar projeto", "Select project")}>
        {showcaseProjects.map((item,index) => {
          const Icon = icons[index];
          return <button key={item.id} ref={node => { tabs.current[index] = node; }} type="button" role="tab" id={`project-tab-${item.id}`} aria-controls="project-panel" aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => select(index)} onKeyDown={event => onTabKeyDown(event,index)}><Icon aria-hidden="true" />{item.label}</button>;
        })}
      </div>
    </div>
    {videoOpen && project.video && <ProjectVideoDialog src={project.video} poster={project.image} onClose={closeVideo} />}
  </StudioSection>;
}
