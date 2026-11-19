"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { FiCheck, FiX } from "react-icons/fi";
import type { AgenticToolDetail } from "@/data/agenticTools";
import TechnologyIcon from "./TechnologyIcon";
import { useLanguage } from "./i18n/LanguageProvider";
import styles from "./ToolInfoDialog.module.css";

export default function ToolInfoDialog({ tool, onClose }: { tool: AgenticToolDetail; onClose: () => void }) {
  const { locale, text } = useLanguage();
  const closeButton = useRef<HTMLButtonElement>(null);
  const language = locale === "pt" ? 0 : 1;
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); }
      if (event.key === "Tab") { event.preventDefault(); closeButton.current?.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); previousFocus?.focus({ preventScroll: true }); };
  }, [onClose]);

  return createPortal(<div className={styles.backdrop} style={{ "--tool-accent": tool.accent } as CSSProperties} onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="tool-dialog-title" aria-describedby="tool-dialog-intro">
      <button type="button" className={styles.close} ref={closeButton} onClick={onClose} aria-label={text("Fechar explicação", "Close explanation")}><FiX aria-hidden="true" /></button>
      <div className={styles.brand}><TechnologyIcon name={tool.name} /></div>
      <p className={styles.eyebrow}>{text("COMO USO NO MEU FLUXO", "HOW I USE IT IN MY WORKFLOW")}</p>
      <h2 id="tool-dialog-title">{tool.name}</h2>
      <p className={styles.intro} id="tool-dialog-intro">{tool.intro[language]}</p>
      <ul>{tool.practices.map(practice => <li key={practice[0]}><FiCheck aria-hidden="true" /><span>{practice[language]}</span></li>)}</ul>
      <p className={styles.note}>{text("A IA apoia o processo. Eu reviso, adapto e valido o resultado.", "AI supports the process. I review, adapt and validate the result.")}</p>
    </div>
  </div>, document.body);
}
