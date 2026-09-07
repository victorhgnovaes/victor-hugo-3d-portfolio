"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { primaryNavigation } from "@/lib/experience/chapters";
import { useActiveChapter } from "@/hooks/useActiveChapter";
import { useLanguage } from "./i18n/LanguageProvider";

export default function Navigation() {
  const { locale, setLocale, text } = useLanguage();
  const activeChapter = useActiveChapter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const syncViewport = () => {
      setIsMobile(media.matches);
      if (!media.matches) setOpen(false);
    };
    syncViewport();
    media.addEventListener("change", syncViewport);
    return () => media.removeEventListener("change", syncViewport);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = [...(navigation.current?.querySelectorAll<HTMLAnchorElement | HTMLButtonElement>("a[href], button:not([disabled])") ?? []), menuButton.current]
      .filter((item): item is HTMLAnchorElement | HTMLButtonElement => item !== null);
    const focusFrame = window.requestAnimationFrame(() => focusable[0]?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (event.key === "Tab" && focusable.length) {
        const currentIndex = focusable.indexOf(document.activeElement as HTMLAnchorElement | HTMLButtonElement);
        const nextIndex = event.shiftKey
          ? (currentIndex <= 0 ? focusable.length - 1 : currentIndex - 1)
          : (currentIndex >= focusable.length - 1 ? 0 : currentIndex + 1);
        event.preventDefault();
        focusable[nextIndex]?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleNavigation = (domId: string) => {
    setOpen(false);
    window.setTimeout(() => {
      const target = document.getElementById(domId);
      if (!target) return;
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
    }, 0);
  };

  return <><a className="skipLink" href="#main-content">{text("PULAR PARA O CONTEÚDO", "SKIP TO CONTENT")}</a><header className={`nav ${scrolled ? "navScrolled" : ""}`}>
    <div className="navInner">
      <a href="#top" className="brand" aria-label={text("Voltar ao início", "Back to top")}>
        <Image src="/victor-hugo-brand.png" alt="Victor Hugo" width={56} height={56} sizes="(max-width: 760px) 48px, 56px" priority />
      </a>
      <nav ref={navigation} id="primary-navigation" aria-hidden={isMobile && !open} inert={isMobile && !open ? true : undefined} className={open ? "navLinks open" : "navLinks"}>
        {primaryNavigation.map(({ id, domId, navLabel }) => {
          const targetId = id === "nexus" ? "projects" : domId;
          const label = id === "about" ? text("SOBRE", "ABOUT") : id === "experience" ? text("EXPERIÊNCIA", "EXPERIENCE") : id === "nexus" ? text("PROJETOS", "PROJECTS") : id === "contact" ? text("CONTATO", "CONTACT") : navLabel;
          const projectActive = id === "nexus" && ["nexus", "ecar", "black-widow", "novatech", "phazion"].includes(activeChapter);
          const isActive = activeChapter === id || projectActive;
          return <a key={id} className={isActive ? "navActive" : ""} aria-current={isActive ? "location" : undefined} href={`#${targetId}`} onClick={() => handleNavigation(targetId)}>{label}</a>;
        })}
        <div className="language" role="group" aria-label={text("Selecionar idioma", "Select language")}><button type="button" className={locale === "pt" ? "active" : ""} aria-pressed={locale === "pt"} onClick={() => setLocale("pt")}>PT</button><i /><button type="button" className={locale === "en" ? "active" : ""} aria-pressed={locale === "en"} onClick={() => setLocale("en")}>EN</button></div>
      </nav>
      <button ref={menuButton} className={`menuButton ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-label={open ? text("Fechar menu", "Close menu") : text("Abrir menu", "Open menu")} aria-controls="primary-navigation" aria-expanded={open}>
        <span /><span />
      </button>
    </div>
  </header></>;
}
