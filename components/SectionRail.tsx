"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useActiveChapter } from "@/hooks/useActiveChapter";
import { chapters } from "@/lib/experience/chapters";
import { useLanguage } from "./i18n/LanguageProvider";

export default function SectionRail() {
  const { locale, text } = useLanguage();
  const active = useActiveChapter();
  const activeChapter = chapters.find(({ id }) => id === active) ?? chapters[0];
  const activeIndex = chapters.findIndex(({ id }) => id === active);
  const railStyle = { "--rail-progress": `${((activeIndex + 1) / chapters.length) * 100}%` } as CSSProperties;

  return <aside className="sectionRail" aria-label={text("Navegação entre seções","Section navigation")} style={railStyle}>
    <span className="railMark" aria-hidden="true"><Image src="/victor-hugo-brand.png" alt="" width={30} height={30} /></span>
    <span className="railLabel">{text("JORNADA DEV","DEV JOURNEY")}</span>
    <span className="railTrack" aria-hidden="true"><i /></span>
    <nav>
      {chapters.map(({ id, domId, navLabel, index }) => {
        const localizedLabel = locale === "pt" ? ({ hero: "INÍCIO", about: "SOBRE", experience: "EXPERIÊNCIA", tech: "NÚCLEO TECH", contact: "CONTATO" } as Partial<Record<typeof id, string>>)[id] ?? navLabel : navLabel;
        return <a
        key={id}
        href={`#${domId}`}
        className={active === id ? "active" : ""}
        aria-label={`${text("Ir para","Go to")} ${localizedLabel}`}
        aria-current={active === id ? "location" : undefined}
      >
        <i /><span>{index}</span><b>{localizedLabel}</b>
      </a>;})}
    </nav>
    <span className="railProgress"><b>{activeChapter.index}</b><i />{String(chapters.length).padStart(2, "0")}</span>
  </aside>;
}
