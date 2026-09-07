"use client";

import { useState } from "react";
import { technologies } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
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

  return <Reveal><section className="section shell techSection" id="technologies"><SectionIntro index="04" label="TECH CORE" title={<>{text("Arquitetura para", "Architecture for")}<br /><span>{text("software real.", "real software.")}</span></>} aside={text("Interface, serviços, dados e desenvolvimento inteligente organizados como um único sistema de engenharia.", "Interface, services, data and intelligent development organized as one engineering system.")} />
    <div className="techRows">{technologies.map((group, index) => {
      const isOpen = openIndex === index;
      const panelId = `tech-panel-${index + 1}`;
      return <div className={`techAccordion ${isOpen ? "isOpen" : ""}`} key={group.category}>
        <button className="techRow" type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenIndex(isOpen ? null : index)}>
          <span className="techIndex">0{index + 1}</span><h3>{group.category}</h3><p>{group.items.join(" · ")}</p><span className="techToggle" aria-hidden="true"><i /><i /></span>
        </button>
        <div className="techPanel" id={panelId} aria-hidden={!isOpen}><div><p>{locale === "pt" ? group.description : descriptionsEn[index]}</p></div></div>
      </div>;
    })}</div>
  </section></Reveal>;
}
