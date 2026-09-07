"use client";

import { profile } from "@/data/portfolio";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Reveal from "./Reveal";
import { useLanguage } from "./i18n/LanguageProvider";

const contacts = [
  { label: "WHATSAPP", detail: "+55 11 99370-6252", href: profile.links.whatsapp, icon: FaWhatsapp },
  { label: "EMAIL", detail: profile.links.email, href: `mailto:${profile.links.email}`, icon: SiGmail },
  { label: "LINKEDIN", detail: "Victor Hugo Novaes", href: profile.links.linkedin, icon: FaLinkedinIn },
  { label: "GITHUB", detail: "@victorhgnovaes", href: profile.links.github, icon: FaGithub },
];

export default function Contact() {
  const { text } = useLanguage();
  return (
    <Reveal>
      <section className="contact shell" id="contact">
        <div className="sectionMarker"><span>08</span><span>{text("CONTATO","CONTACT")}</span></div>
        <div className="contactTitle">
          <p>{text("TEM UM PROJETO OU OPORTUNIDADE?","HAVE A PROJECT OR OPPORTUNITY?")}</p>
          <h2>{text("VAMOS CRIAR","LET'S BUILD")}<span>{text("ALGO.","SOMETHING.")}</span></h2>
        </div>
        <div className="contactBottom">
          <p>{text("Disponível para oportunidades em desenvolvimento de software e para construir produtos digitais com interfaces, arquitetura, dados e Inteligência Artificial.","Available for software development opportunities and for building digital products with interfaces, architecture, data and Artificial Intelligence.")}</p>
          <div className="contactLinks">
            {contacts.map(({ label, detail, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`${label}: ${detail}`}>
                <span className="contactIdentity"><i><Icon aria-hidden="true" /></i><span><b>{label}</b><small>{detail}</small></span></span>
                <span className="contactArrow">↗</span>
              </a>
            ))}
            {profile.links.resume && <a href={profile.links.resume} target="_blank" rel="noreferrer"><span>RESUME</span><span>↗</span></a>}
          </div>
        </div>
        <footer className="siteFooter">
          <div className="footerSignature"><span>{text("DESENVOLVIDO POR", "DEVELOPED BY")}</span><strong>VICTOR HUGO</strong><small>© 2026 · {text("DESENVOLVEDOR DE SOFTWARE", "SOFTWARE DEVELOPER")}</small></div>
          <div className="footerTechnology"><span>{text("TECNOLOGIAS DO PORTFÓLIO", "PORTFOLIO TECHNOLOGIES")}</span><div>{["NEXT.JS", "REACT", "TYPESCRIPT", "THREE.JS", "R3F", "GSAP"].map((technology) => <i key={technology}>{technology}</i>)}</div></div>
          <a className="footerTop" href="#top"><span>{text("VOLTAR AO TOPO", "BACK TO TOP")}</span><i>↑</i></a>
        </footer>
      </section>
    </Reveal>
  );
}
