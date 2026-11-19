export type AgenticToolDetail = {
  name: string; accent: string; intro: [string, string]; practices: [string, string][];
};

export const agenticToolDetails: AgenticToolDetail[] = [
  {
    name: "OpenAI Codex", accent: "#d9f2ec",
    intro: ["Uso o Codex para trabalhar com o contexto completo do projeto: entender a estrutura, planejar mudanças e implementar funcionalidades em vários arquivos.", "I use Codex with the complete project context: understanding the structure, planning changes and implementing features across files."],
    practices: [
      ["Organizar uma tarefa em etapas e definir o que precisa mudar.", "Break a task into steps and define the required changes."],
      ["Conectar interface, lógica e dados durante a implementação.", "Connect interfaces, logic and data during implementation."],
      ["Executar verificações, revisar diferenças e ajustar o resultado.", "Run checks, review changes and refine the result."],
    ],
  },
  {
    name: "Claude Code", accent: "#e58b65",
    intro: ["Uso o Claude Code em tarefas mais delimitadas: otimizar trechos, depurar pequenas partes e revisar código com atenção à clareza e à manutenção.", "I use Claude Code for focused tasks: optimizing sections, debugging small parts and reviewing code for clarity and maintainability."],
    practices: [
      ["Investigar a causa de um erro em uma função ou componente.", "Investigate an error in a function or component."],
      ["Comparar alternativas e simplificar código sem perder a lógica.", "Compare alternatives and simplify code while preserving its logic."],
      ["Revisar nomes, responsabilidades e possíveis efeitos de uma alteração.", "Review naming, responsibilities and the possible effects of a change."],
    ],
  },
  {
    name: "GitHub Copilot", accent: "#aaa1ff",
    intro: ["Uso o Copilot como apoio durante a escrita no editor, acelerando partes repetitivas e sugerindo caminhos para continuar uma implementação.", "I use Copilot while writing in the editor, speeding up repetitive work and suggesting ways to continue an implementation."],
    practices: [
      ["Completar funções e padrões que já existem no projeto.", "Complete functions and patterns already used in the project."],
      ["Explorar exemplos de validações e transformações de dados.", "Explore examples of validation and data transformations."],
      ["Revisar e adaptar cada sugestão às regras da aplicação.", "Review and adapt each suggestion to the application's rules."],
    ],
  },
  {
    name: "Cursor", accent: "#c6d2e8",
    intro: ["Uso o Cursor para navegar pela base e refinar mudanças com o contexto dos arquivos aberto no editor.", "I use Cursor to navigate the codebase and refine changes with the context of the files open in the editor."],
    practices: [
      ["Localizar componentes e entender como eles se conectam.", "Find components and understand how they connect."],
      ["Refatorar interfaces e ajustar comportamentos relacionados.", "Refactor interfaces and adjust related behaviors."],
      ["Conferir o diff antes de incorporar mudanças ao projeto.", "Review the diff before incorporating changes into the project."],
    ],
  },
  {
    name: "Gemini CLI", accent: "#9b9cff",
    intro: ["Uso o Gemini CLI para apoiar análises e tarefas curtas no terminal, especialmente ao explorar arquivos, scripts e possibilidades de implementação.", "I use Gemini CLI to support analysis and focused terminal tasks, especially when exploring files, scripts and implementation options."],
    practices: [
      ["Ler contexto técnico e organizar hipóteses de solução.", "Read technical context and organize possible solutions."],
      ["Apoiar scripts e rotinas de tratamento de dados.", "Support scripts and data processing routines."],
      ["Comparar abordagens antes de implementar uma mudança.", "Compare approaches before implementing a change."],
    ],
  },
  {
    name: "Windsurf / Cascade", accent: "#4de0ce",
    intro: ["Uso o Windsurf e o Cascade para manter continuidade entre a leitura do código e os ajustes realizados no editor.", "I use Windsurf and Cascade to keep continuity between reading code and making changes in the editor."],
    practices: [
      ["Acompanhar o contexto de uma funcionalidade entre arquivos.", "Follow a feature's context across files."],
      ["Refinar componentes, estilos e fluxos da interface.", "Refine components, styles and interface flows."],
      ["Revisar alterações em sequência, verificando cada etapa.", "Review changes in sequence, checking each step."],
    ],
  },
  {
    name: "Cline", accent: "#68a7ff",
    intro: ["Uso o Cline para conduzir tarefas em passos claros, acompanhando as alterações propostas e validando o comportamento da aplicação.", "I use Cline to work through clearly defined steps, following proposed changes and validating application behavior."],
    practices: [
      ["Dividir um problema em pequenas ações verificáveis.", "Divide a problem into small, verifiable actions."],
      ["Analisar arquivos e ajustar pontos específicos da implementação.", "Analyze files and adjust specific implementation details."],
      ["Conferir comandos, mudanças e resultados antes de prosseguir.", "Check commands, changes and results before proceeding."],
    ],
  },
  {
    name: "Aider", accent: "#43df9a",
    intro: ["Uso o Aider em alterações focadas no código, aproveitando o versionamento para comparar a evolução de uma solução.", "I use Aider for focused code changes, using version control to compare how a solution evolves."],
    practices: [
      ["Trabalhar com um conjunto pequeno de arquivos por tarefa.", "Work with a small set of files for each task."],
      ["Ajustar funções e corrigir problemas de forma incremental.", "Adjust functions and fix problems incrementally."],
      ["Inspecionar as diferenças com Git e revisar o que será mantido.", "Inspect differences with Git and review what will be kept."],
    ],
  },
];
