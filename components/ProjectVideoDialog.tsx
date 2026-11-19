"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "./i18n/LanguageProvider";
import styles from "./Projects.module.css";

export default function ProjectVideoDialog({ src, poster, onClose }: { src: string; poster?: string; onClose: () => void }) {
  const { text } = useLanguage();
  const dialog = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    close.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); }
      if (event.key === "Tab") {
        const focusable = Array.from(dialog.current?.querySelectorAll<HTMLElement>('button, video, a[href], [tabindex="0"]') ?? []);
        if (!focusable.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); previousFocus?.focus({ preventScroll: true }); };
  }, [onClose]);
  return createPortal(<div className={styles.videoBackdrop} onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className={styles.videoDialog} ref={dialog} role="dialog" aria-modal="true" aria-label={text("Vídeo do sistema NovaTech", "NovaTech system video")}>
      <button type="button" ref={close} onClick={onClose} aria-label={text("Fechar vídeo", "Close video")}>×</button>
      <video src={src} poster={poster} controls autoPlay playsInline preload="metadata" tabIndex={0} />
    </div>
  </div>, document.body);
}
