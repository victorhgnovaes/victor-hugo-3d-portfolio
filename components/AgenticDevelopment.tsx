"use client";

import { agentic } from "@/data/portfolio";
import { useCallback, useState } from "react";
import { agenticToolDetails } from "@/data/agenticTools";
import { FiArrowRight, FiLayers } from "react-icons/fi";
import StudioSection from "./StudioSection";
import TechnologyIcon from "./TechnologyIcon";
import ToolInfoDialog from "./ToolInfoDialog";
import styles from "./StudioSection.module.css";
import { useLanguage } from "./i18n/LanguageProvider";

export default function AgenticDevelopment() {
  const { locale, text } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const closeTool = useCallback(() => setSelectedTool(null), []);
  const toolDetail = agenticToolDetails.find(tool => tool.name === selectedTool);
  const terminalPt = ["analisando a base de código", "lendo a arquitetura do projeto", "planejando a implementação", "editando múltiplos arquivos", "executando testes", "revisando alterações"];
  const capabilitiesPt = ["Programação com agentes", "Análise de codebase", "Engenharia de contexto", "Planejamento de funcionalidades", "Debugging assistido por IA", "Refatoração assistida por IA", "Implementação em múltiplos arquivos", "Engenharia de prompts para desenvolvimento", "Arquitetura de software com IA", "Automação de desenvolvimento"];
  const terminal = locale === "pt" ? terminalPt : agentic.terminal;
  const capabilities = locale === "pt" ? capabilitiesPt : agentic.capabilities;

  const steps = locale === "pt" ? ["Análise", "Planejamento", "Implementação", "Testes", "Revisão"] : ["Analysis", "Planning", "Implementation", "Testing", "Review"];
  return <StudioSection id="agentic" titleId="agentic-title">
    <div className={styles.twoColumn}>
      <div className={styles.intro}>
        <h2 className={styles.aiTitle} id="agentic-title">{text("Desenvolvimento", "Development")}<br />{text("com inteligência", "with artificial")}<br /><span>{text("artificial.", "intelligence.")}</span></h2>
        <p>{text("Agentes e ferramentas que apoiam cada etapa do desenvolvimento.", "Agents and tools supporting every stage of development.")}</p>
      </div>
      <div className={styles.panel}>
        <ul className={styles.toolGrid}>{agentic.tools.map(tool => <li key={tool}><button type="button" onClick={() => setSelectedTool(tool)} aria-haspopup="dialog" aria-label={text(`Como uso ${tool}`, `How I use ${tool}`)}><TechnologyIcon name={tool} /><span>{tool}</span></button></li>)}</ul>
        <div className={styles.process}><FiLayers aria-hidden="true" />{steps.map(step => <span key={step}>{step}</span>)}</div>
        <div className={styles.centerAction}><button type="button" className={styles.button} aria-expanded={expanded} aria-controls="agentic-details" onClick={() => setExpanded(value => !value)}>{expanded ? text("Ver menos", "Show less") : text("Explorar ferramentas", "Explore tools")}<FiArrowRight aria-hidden="true" /></button></div>
        <div className={styles.expandedContent} id="agentic-details" hidden={!expanded}>
          <p>{text(agentic.description, "I use Artificial Intelligence agents as a layer of the Software Engineering process, not merely as code generators.")}</p>
          <h3>{text("Capacidades de engenharia", "Engineering capabilities")}</h3>
          <ul className={styles.capabilities}>{capabilities.map(item => <li key={item}>{item}</li>)}</ul>
          <h3>{text("Fluxo de trabalho", "Development workflow")}</h3>
          <ol className={styles.workflow}>{terminal.map((line, index) => <li key={line}>{String(index + 1).padStart(2,"0")} · {line}</li>)}</ol>
        </div>
      </div>
    </div>
    {toolDetail && <ToolInfoDialog tool={toolDetail} onClose={closeTool} />}
  </StudioSection>;
}
