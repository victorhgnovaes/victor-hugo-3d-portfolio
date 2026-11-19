import { ecarExperience, personalProjects, professionalProjects } from "./portfolio";

export type ShowcaseProject = {
  id: string; label: string; title: string; subtitle: [string, string];
  description: [string, string]; features: [readonly string[], readonly string[]];
  stack: readonly string[]; image?: string; imageAlt: string;
  href?: string; codeUrl?: string; codePrivate?: boolean; video?: string;
};

const nexus = professionalProjects[0];
const ecar = professionalProjects[1];
const widow = professionalProjects[2];
const clinic = personalProjects[0];
const game = personalProjects[1];

export const showcaseProjects: ShowcaseProject[] = [
  {
    id: "nexus", label: "NEXUS", title: "NEXUS",
    subtitle: ["Plataforma de Inteligência Financeira", "Financial Intelligence Platform"],
    description: [nexus.description, "Financial platform built to organize, manage and analyze revenue, expenses, categories, goals, documents, risk, audits, alerts and AI-assisted insights."],
    features: [nexus.features, ["Financial dashboard", "Goals and risk analysis", "Auditing and alerts", "AI chat and insights", "CSV / OFX import", "PDF and exports"]],
    stack: nexus.stack, image: "/nexus-portfolio-showcase.jpeg", imageAlt: "Interface da plataforma financeira NEXUS", href: "https://financenexus.com.br",
  },
  {
    id: "ecar", label: "ECAR Frotas", title: "ECAR Frotas",
    subtitle: ["Plataforma automotiva e comercial", "Automotive and commercial platform"],
    description: [ecar.description, "System for the automotive and vehicle sales sector, combining an institutional landing page, customer accounts, administration and CRM."],
    features: [ecar.features, ["Customers and authentication", "Quotes and proposals", "Leads and opportunities", "Commissions", "Content and listings", "WhatsApp integration"]],
    stack: ecar.stack, image: "/ecar-frotas-website.png", imageAlt: "Página inicial da ECAR Frotas com apresentação de veículos e atendimento comercial", href: "https://ecarfrotas.com.br",
  },
  {
    id: "ecar-pcd", label: "ECAR PCD", title: "ECAR Frotas PCD",
    subtitle: ["Soluções web para o setor automotivo", "Web solutions for the automotive sector"],
    description: ["Projeto web da ECAR Frotas PCD, integrado à minha prática de desenvolvimento de plataformas e soluções comerciais para o setor automotivo.", "ECAR Frotas PCD web project, part of my work developing commercial platforms and solutions for the automotive sector."],
    features: [[], []], stack: [], image: "/ecar-pcd-website.png", imageAlt: "Página inicial da ECAR Frotas PCD com catálogo de veículos e mobilidade", href: "https://ecarfrotas-pcd.vercel.app/", codeUrl: "https://github.com/victorhgnovaes/ecar-pcd", codePrivate: true,
  },
  {
    id: "ecar-aurora", label: "ECAR × Aurora", title: "eCar × Aurora Alimentos",
    subtitle: ["Catálogo comercial de veículos", "Commercial vehicle catalog"],
    description: [ecarExperience.highlights[4], "Responsive web solution for viewing and presenting a vehicle catalog supporting the eCar × Aurora Alimentos commercial operation."],
    features: [["Consulta de veículos", "Apresentação do catálogo", "Interface responsiva"], ["Vehicle browsing", "Catalog presentation", "Responsive interface"]],
    stack: [], image: "/ecar-aurora-website.png", imageAlt: "Página inicial da parceria ECAR e Aurora Coop com catálogo comercial de veículos", href: "https://ecar-aurora.vercel.app", codeUrl: "https://github.com/victorhgnovaes/ecar-aurora",
  },
  {
    id: "novatech", label: "NovaTech", title: clinic.title,
    subtitle: ["Sistema de Gestão Clínica", "Clinic Management System"],
    description: [clinic.description, "Desktop system for clinic management with patient, doctor and administrator profiles."],
    features: [clinic.features, ["Login", "Appointments", "Patients", "Doctors", "Specialties", "Schedule", "Reports"]],
    stack: clinic.stack, image: "/novatech-portfolio.png", imageAlt: "Painéis administrativo, médico e paciente do sistema NovaTech",
    codeUrl: clinic.codeUrl, video: "/novatech-demo.mp4",
  },
  {
    id: "black-widow", label: "Black Widow", title: "Black Widow",
    subtitle: ["Experiência Red Room", "Red Room Experience"],
    description: [widow.description, "Concept microsite inspired by the visual atmosphere of Black Widow (2021), recreating a cinematic promotional experience with espionage aesthetics, classified documents, scroll animation and interactive video transformations."],
    features: [widow.features, ["Two preloaded overlapping videos", "Interactive A → B → A transformation cycle", "Playback control and click locking", "HTML5 Video API and playsinline", "Keyboard, visible focus and reduced motion", "Intersection Observer and cinematic scroll"]],
    stack: widow.stack, image: "/blackwidow-red-room.webp", imageAlt: "Arte do projeto Black Widow — Red Room Experience",
    href: widow.projectUrl, codeUrl: widow.codeUrl,
  },
  {
    id: "phazion", label: "Phazion Quest", title: game.title,
    subtitle: ["Jogo 2D autoral · Arte frame a frame", "Solo 2D game · Frame-by-frame art"],
    description: [game.description, "Original 2D game developed independently in Scratch, with hand-crafted frame-by-frame art and animation."],
    features: [game.features, ["OOP", "Movement", "Collisions", "Combat", "Enemy AI", "Scrum"]],
    stack: game.stack, image: "/phazion-quest-cover.jpeg", imageAlt: "Arte autoral do jogo Phazion Quest", href: game.link, codeUrl: "https://scratch.mit.edu/projects/1216501586/editor/",
  },
];
