"use client";

import { agentic } from "@/data/portfolio";
import Reveal from "./Reveal";
import { useLanguage } from "./i18n/LanguageProvider";

export default function AgenticDevelopment() {
  const { locale, text } = useLanguage();
  const terminalPt = ["analisando a base de código", "lendo a arquitetura do projeto", "planejando a implementação", "editando múltiplos arquivos", "executando testes", "revisando alterações"];
  const capabilitiesPt = ["Programação com agentes", "Análise de codebase", "Engenharia de contexto", "Planejamento de funcionalidades", "Debugging assistido por IA", "Refatoração assistida por IA", "Implementação em múltiplos arquivos", "Engenharia de prompts para desenvolvimento", "Arquitetura de software com IA", "Automação de desenvolvimento"];
  const terminal = locale === "pt" ? terminalPt : agentic.terminal;
  const capabilities = locale === "pt" ? capabilitiesPt : agentic.capabilities;

  return <Reveal><section className="agentic section" id="agentic"><div className="shell">
    <div className="agenticTop"><div className="sectionMarker"><span>04B</span><span>{text("ENGENHARIA AGÊNTICA", "AGENTIC ENGINEERING")}</span></div><p>{text(agentic.description, "I use Artificial Intelligence agents as a layer of the Software Engineering process, not merely as code generators.")}</p></div>
    <h2><span>AGENTIC</span><span className="outline">DEVELOPMENT.</span></h2>
    <div className="agenticGrid"><div className="agentTerminal"><div className="terminalBar"><span>{text("SESSÃO DE ENGENHARIA", "ENGINEERING SESSION")}</span><i /><i /><i /></div><div className="terminalBody">{terminal.map((line, index) => <p key={line}><span>{index === terminal.length - 1 ? "✓" : ">"}</span>{line}<i className={`terminalStatus ${index === terminal.length - 1 ? "done" : ""}`}>{index === terminal.length - 1 ? text("concluído", "complete") : text("feito", "done")}</i></p>)}<p className="terminalComplete"><span>✓</span>{text("implementação concluída", "implementation completed")}</p></div></div>
      <div className="agentSide"><span className="microLabel">{text("FERRAMENTAS / AGENTES", "TOOLS / AGENTS")}</span><div className="agentTools">{agentic.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div>
    </div>
    <div className="capabilities"><span className="microLabel">{text("CAPACIDADES DE ENGENHARIA", "ENGINEERING CAPABILITIES")}</span><div>{capabilities.map((item, index) => <p key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</p>)}</div></div>
  </div></section></Reveal>;
}
