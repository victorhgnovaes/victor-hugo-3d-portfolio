"use client";

import { profile } from "@/data/portfolio";
import HeroAmbient from "./HeroAmbient";
import HeroPortalMotion from "./experience/HeroPortalMotion";
import { useLanguage } from "./i18n/LanguageProvider";

export default function Hero() {
  const { text } = useLanguage();
  return <section className="heroJourney" id="top">
    <HeroPortalMotion />
    <div className="hero shell">
      <HeroAmbient />
      <div className="heroStage">
        <div className="heroCopy">
          <h1><span>{profile.firstName}</span><span>{profile.lastName}</span></h1>
        </div>
      </div>
      <div className="heroBottom">
        <div><p className="heroHeadline">{text("Desenvolvedor de Software · IA · Experiências Digitais", "Software Developer · AI · Digital Experiences")}</p><p className="heroIntro">{text(profile.intro,"I build complete systems by combining traditional programming, software architecture and AI-assisted development.")}</p></div>
        <div className="heroActions"><a className="cta ctaPrimary" href="#nexus">{text("VER PROJETOS", "VIEW SELECTED WORK")} <span>↗</span></a><a className="cta" href="#contact">{text("VAMOS TRABALHAR JUNTOS", "LET'S WORK TOGETHER")} <span>→</span></a></div>
      </div>
      <a className="scrollCue" href="#about"><span>{text("ROLAR", "SCROLL")}</span><i /></a>
    </div>
  </section>;
}
