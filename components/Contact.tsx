"use client";

import { profile } from "@/data/portfolio";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Image from "next/image";
import { FiArrowUp, FiArrowUpRight } from "react-icons/fi";
import StudioSection from "./StudioSection";
import styles from "./StudioSection.module.css";
import { useLanguage } from "./i18n/LanguageProvider";

const contacts = [
  { label: "WHATSAPP", detail: "+55 11 99370-6252", href: profile.links.whatsapp, icon: FaWhatsapp },
  { label: "EMAIL", detail: profile.links.email, href: `mailto:${profile.links.email}`, icon: SiGmail },
  { label: "LINKEDIN", detail: "Victor Hugo Novaes", href: profile.links.linkedin, icon: FaLinkedinIn },
  { label: "GITHUB", detail: "@victorhgnovaes", href: profile.links.github, icon: FaGithub },
];

export default function Contact() {
  const { text } = useLanguage();
  return <StudioSection id="contact" titleId="contact-title" background="/studio-technology-background.png">
    <div className={styles.twoColumn}>
      <div className={`${styles.intro} ${styles.contactIntro}`}>
        <span className={styles.eyebrow}>{text("CONTATO", "CONTACT")}</span>
        <h2 id="contact-title">{text("Vamos criar", "Let's build")}<br /><span>{text("algo juntos.", "together.")}</span></h2>
        <p>{text("Tem um projeto ou uma oportunidade? Vamos conversar.", "Have a project or an opportunity? Let's talk.")}</p>
        <div className={styles.contactLead}>{text("Disponível para oportunidades em desenvolvimento de software e para construir produtos digitais com interfaces, arquitetura, dados e Inteligência Artificial.", "Available for software development opportunities and for building digital products with interfaces, architecture, data and Artificial Intelligence.")}</div>
      </div>
      <div className={styles.panel}>
        <div className={styles.contactLinks}>
          {contacts.map(({ label, detail, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label}: ${detail}`}>
            <Icon aria-hidden="true" /><span><b>{label === "WHATSAPP" ? "WhatsApp" : label === "EMAIL" ? "E-mail" : label === "LINKEDIN" ? "LinkedIn" : "GitHub"}</b><small>{detail}</small></span><FiArrowUpRight aria-hidden="true" />
          </a>)}
          {profile.links.resume && <a href={profile.links.resume} target="_blank" rel="noopener noreferrer"><span><b>{text("Currículo", "Resume")}</b></span><FiArrowUpRight aria-hidden="true" /></a>}
        </div>
      </div>
    </div>
    <footer className={styles.footer}>
      <div className={styles.signature}>
        <a href="#top" className="brand brandSignature" aria-label={text("Voltar ao início", "Back to top")}><Image src="/nova-abertura/05_vh_manuscrito.png" alt="" width={1536} height={1024} sizes="112px" /></a>
        <div><strong>Victor Hugo</strong><span>© 2026 · {text("Desenvolvedor de Software", "Software Developer")}</span></div>
      </div>
      <nav className={styles.footerNav} aria-label={text("Navegação do rodapé", "Footer navigation")}>
        <a href="#about">{text("Sobre", "About")}</a><a href="#projects">{text("Projetos", "Projects")}</a><a href="#education">{text("Formação", "Education")}</a><a href="#top">{text("Voltar ao topo", "Back to top")} <FiArrowUp aria-hidden="true" /></a>
      </nav>
      <p className={styles.footerTech}>{text("Desenvolvido com", "Built with")} Next.js · React · TypeScript</p>
    </footer>
  </StudioSection>;
}
