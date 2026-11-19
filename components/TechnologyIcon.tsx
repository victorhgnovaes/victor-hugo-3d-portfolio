import type { IconType } from "react-icons";
import { SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiHtml5, SiNodedotjs, SiNestjs, SiPostgresql, SiPrisma, SiPython, SiSharp, SiCplusplus, SiGit, SiGithub, SiPostman, SiClaude, SiGithubcopilot, SiCursor, SiGooglegemini, SiWindsurf, SiCline, SiScratch } from "react-icons/si";
import { DiCss3 } from "react-icons/di";
import { RiOpenaiFill } from "react-icons/ri";
import { VscVscode } from "react-icons/vsc";
import { FiCode, FiTerminal } from "react-icons/fi";

const brands: Record<string, { icon: IconType; color: string }> = {
  React: { icon: SiReact, color: "#61dafb" },
  "Next.js": { icon: SiNextdotjs, color: "#f5f7fb" },
  TypeScript: { icon: SiTypescript, color: "#3178c6" },
  JavaScript: { icon: SiJavascript, color: "#f7df1e" },
  HTML5: { icon: SiHtml5, color: "#e34f26" }, HTML: { icon: SiHtml5, color: "#e34f26" },
  CSS3: { icon: DiCss3, color: "#1572b6" }, CSS: { icon: DiCss3, color: "#1572b6" },
  "Node.js": { icon: SiNodedotjs, color: "#83cd29" },
  NestJS: { icon: SiNestjs, color: "#e0234e" },
  PostgreSQL: { icon: SiPostgresql, color: "#6ba0c9" },
  "Prisma ORM": { icon: SiPrisma, color: "#f5f7fb" }, Prisma: { icon: SiPrisma, color: "#f5f7fb" },
  Python: { icon: SiPython, color: "#ffd343" }, "C#": { icon: SiSharp, color: "#ae67df" },
  "C++": { icon: SiCplusplus, color: "#5098df" }, Git: { icon: SiGit, color: "#f05032" },
  GitHub: { icon: SiGithub, color: "#f5f7fb" }, "VS Code": { icon: VscVscode, color: "#23a9f2" },
  Postman: { icon: SiPostman, color: "#ff6c37" }, Scratch: { icon: SiScratch, color: "#ffab19" },
  "OpenAI Codex": { icon: RiOpenaiFill, color: "#f5f7fb" },
  "Claude Code": { icon: SiClaude, color: "#d97757" },
  "GitHub Copilot": { icon: SiGithubcopilot, color: "#9c9bff" },
  Cursor: { icon: SiCursor, color: "#d3dae9" }, "Gemini CLI": { icon: SiGooglegemini, color: "#8a9bff" },
  "Windsurf / Cascade": { icon: SiWindsurf, color: "#44e9d5" },
  Cline: { icon: SiCline, color: "#62a4ff" }, Aider: { icon: FiTerminal, color: "#35dc99" },
};

export default function TechnologyIcon({ name, className }: { name: string; className?: string }) {
  const brand = brands[name] ?? { icon: FiCode, color: "#70aaff" };
  const Icon = brand.icon;
  return <Icon className={className} style={{ color: brand.color }} aria-hidden="true" />;
}
