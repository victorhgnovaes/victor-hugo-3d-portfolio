export const profile = {
  firstName: "VICTOR", lastName: "HUGO", fullName: "Victor Hugo Novaes dos Santos",
  role: "SOFTWARE DEVELOPER", location: "São Paulo · Brazil", availability: "AVAILABLE FOR OPPORTUNITIES",
  headline: "Full Stack · Back-end · Agentic AI Development",
  intro: "Desenvolvo sistemas completos unindo programação tradicional, arquitetura de software e desenvolvimento assistido por agentes de Inteligência Artificial.",
  about: [
    "Sou desenvolvedor de software em formação técnica em Tecnologia da Informação, com foco em desenvolvimento Full Stack, Back-end, APIs, bancos de dados e aplicações desktop.",
    "Gosto de transformar problemas reais em sistemas organizados e funcionais, trabalhando desde a interface até arquitetura, regras de negócio e banco de dados.",
    "Além da programação tradicional, utilizo agentes de Inteligência Artificial como parte do meu fluxo de Engenharia de Software, auxiliando em planejamento, desenvolvimento, análise de codebase, debugging e refatoração.",
  ],
  links: {
    whatsapp: "https://wa.me/5511993706252?text=Ol%C3%A1%2C%20Victor!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto%20ou%20oportunidade.",
    email: "victorhg.novaes@gmail.com",
    linkedin: "https://www.linkedin.com/in/victor-hugo-novaes-dos-santos-870b08400",
    github: "https://github.com/victorhgnovaes",
    resume: "",
  },
};

export const quickFacts = [
  { label: "LOCATION", value: "São Paulo, Brazil" }, { label: "FOCUS", value: "Software Development" },
  { label: "SPECIALTY", value: "Full Stack + Agentic AI" }, { label: "STATUS", value: "Open to Opportunities" },
];

export const technologies = [
  { category: "FRONTEND", items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Responsive Design"], description: "Desenvolvimento de interfaces modernas, responsivas e visualmente bem estruturadas com React, TypeScript, JavaScript, HTML e CSS. Tenho experiência criando landing pages, dashboards, portfólios e experiências interativas com animações, vídeos, adaptação para mobile e atenção à identidade visual." },
  { category: "BACKEND", items: ["Node.js", "NestJS", "REST APIs", "JWT", "Authentication", "Business Logic"], description: "Criação de APIs e regras de negócio com Node.js e NestJS. Tenho conhecimento em autenticação com JWT, organização de rotas, integração entre front-end e banco de dados, validações e estruturação de sistemas como o Nexus, voltado para gestão financeira." },
  { category: "DATABASE", items: ["PostgreSQL", "SQL", "Prisma ORM", "Data Modeling"], description: "Modelagem e desenvolvimento de bancos de dados relacionais com PostgreSQL e SQL. Sei criar tabelas, relacionamentos, chaves primárias e estrangeiras, consultas, cadastros e operações CRUD, além de integrar bancos de dados a aplicações usando Prisma ORM e Npgsql." },
  { category: "LANGUAGES", items: ["Python", "C#", "C++", "TypeScript", "JavaScript", "SQL", "HTML", "CSS"], description: "Utilizo TypeScript e JavaScript no desenvolvimento web, SQL para bancos de dados, Python para lógica e automações, e C# em aplicações desktop com Windows Forms. Também tenho base em C++ e utilizo HTML e CSS para estruturar e estilizar interfaces web." },
  { category: "TOOLS", items: ["Git", "GitHub", "VS Code", "Visual Studio", "Postman", "Terminal / CLI"], description: "Uso Git e GitHub para controle de versão e organização de projetos. Trabalho com VS Code, Visual Studio, Postman para testes de APIs e Terminal/CLI para instalar dependências, executar projetos, gerenciar pacotes e realizar deploys." },
  { category: "METHODS / KNOWLEDGE", items: ["Scrum", "Version Control", "Software Development", "APIs", "Database Modeling"], description: "Tenho conhecimento em desenvolvimento de software do planejamento à entrega: organização de requisitos, modelagem de dados, construção de APIs, versionamento, responsividade, integração entre sistemas e práticas ágeis como Scrum. Busco sempre criar soluções organizadas, funcionais e pensadas para a experiência do usuário." },
];

export const agentic = {
  title: ["AGENTIC", "DEVELOPMENT."],
  description: "Utilizo agentes de Inteligência Artificial como uma camada do processo de Engenharia de Software, não apenas como geradores de código.",
  tools: ["OpenAI Codex", "Claude Code", "GitHub Copilot", "Cursor", "Gemini CLI", "Windsurf / Cascade", "Cline", "Aider"],
  capabilities: ["Agentic Coding", "Codebase Analysis", "Context Engineering", "Feature Planning", "AI-assisted Debugging", "AI-assisted Refactoring", "Multi-file Implementation", "Prompt Engineering for Development", "Software Architecture with AI Assistance", "Development Automation"],
  terminal: ["analyzing codebase", "reading project architecture", "planning implementation", "editing multiple files", "running tests", "reviewing changes"],
};

export type ProjectKind = "nexus" | "ecar" | "black-widow";
export const professionalProjects = [
  { number: "01", kind: "nexus" as ProjectKind, title: "NEXUS", subtitle: "Financial Intelligence Platform", year: "2026", category: "FINTECH / FINANCIAL TECHNOLOGY / AI", description: "Plataforma financeira desenvolvida para organização, gestão e análise de informações financeiras, incluindo receitas, despesas, categorias, metas, documentos, análise de risco, auditoria, alertas e funcionalidades assistidas por Inteligência Artificial.", features: ["Dashboard financeiro", "Metas e análise de risco", "Auditoria e alertas", "Chat e insights com IA", "Importação CSV / OFX", "PDF e exportação"], stack: ["Node.js", "NestJS", "TypeScript", "PostgreSQL", "JWT", "APIs", "AI"] },
  { number: "02", kind: "ecar" as ProjectKind, title: "ECAR", subtitle: "Automotive CRM Platform", year: "2026", category: "AUTOMOTIVE / CRM", description: "Sistema voltado ao setor automotivo e vendas de veículos, combinando landing institucional, conta de clientes, painel administrativo e CRM.", features: ["Clientes e autenticação", "Cotações e propostas", "Leads e oportunidades", "Comissões", "Anúncios e conteúdo", "Integração com WhatsApp"], stack: ["Frontend", "Backend", "PostgreSQL", "API", "Authentication", "CRM"] },
  { number: "03", kind: "black-widow" as ProjectKind, title: "BLACK WIDOW", subtitle: "Red Room Experience", year: "FEATURED", category: "INTERACTIVE FRONT-END / CINEMATIC MICROSITE", description: "Microsite conceitual inspirado na atmosfera visual de Black Widow (2021), recriando uma experiência promocional cinematográfica com estética de espionagem, documentos classificados, animações de scroll e uma hero interativa com transformações em vídeo acionadas por clique.", features: ["Dois vídeos pré-carregados e sobrepostos", "Ciclo interativo de transformação A → B → A", "Controle de reprodução e bloqueio de cliques", "HTML5 Video API e playsinline", "Teclado, foco visível e reduced motion", "Intersection Observer e scroll cinematográfico"], stack: ["React", "TypeScript", "Vite", "Responsive CSS", "HTML5 Video API", "Intersection Observer", "Git", "GitHub", "Vercel"], projectUrl: "https://black-widow-site.vercel.app/?_vercel_share=rd4OUnrEfGrZ8xwXyLpJU5rjDWLiR7PV", codeUrl: "https://github.com/victorhgnovaes/black-widow-site" },
];

export const personalProjects = [
  { code: "N", title: "NovaTech", subtitle: "Clinic Management System", year: "2026", visual: "clinic", description: "Sistema desktop para gerenciamento de clínica com perfis de paciente, médico e administrativo.", features: ["Login", "Agendamento", "Pacientes", "Médicos", "Especialidades", "Agenda", "Relatórios"], stack: ["C#", "Windows Forms", "PostgreSQL", "SQL"], codeUrl: "https://github.com/victorhgnovaes/novatech-clinic-management" },
  { code: "P", title: "Phazion Quest", subtitle: "Solo · Hand-drawn 2D Game", year: "2026", visual: "game", description: "Jogo 2D autoral desenvolvido individualmente no Scratch, com arte e animações produzidas à mão frame a frame.", features: ["OOP", "Movimentação", "Colisões", "Combate", "Enemy AI", "Scrum"], stack: ["Scratch", "Frame-by-frame", "Game Development", "OOP"], link: "https://scratch.mit.edu/projects/1216501586/" },
  { code: "A", title: "AI Engineering Lab", subtitle: "Agentic Development Practice", year: "2026", visual: "agent", description: "Ambiente de prática para planejamento, implementação, debugging e refatoração assistidos por agentes.", features: ["Agents", "Automation", "Context Engineering", "Debugging", "Refactoring"], stack: ["OpenAI Codex", "Claude Code", "GitHub Copilot", "Cursor"] },
];

export const experience = [
  { period: "DEC 2024 — PRESENT", location: "São Paulo · Brazil", role: "Software Development", company: "Independent / Academic Projects", description: "Desenvolvimento de projetos completos envolvendo front-end, back-end, APIs, PostgreSQL, aplicações desktop, arquitetura, autenticação, regras de negócio e agentes de IA.", skills: ["Front-end", "Back-end", "APIs", "PostgreSQL", "Desktop", "Architecture", "Git", "GitHub", "Scrum", "AI Agents"] },
  { period: "FEB 2026 — PRESENT", location: "São Paulo · Brazil", role: "Front Office", company: "Teleperformance Brasil · Operação Samsung", description: "Atuação em suporte digital e operações de Front Office para a Samsung, com comunicação via chat e e-mail, análise e acompanhamento de ocorrências, organização de informações e utilização de sistemas corporativos. A rotina envolve Microsoft Office, processos administrativos, registro de dados e resolução estruturada de solicitações em ambiente corporativo.", skills: ["Suporte digital", "Comunicação via chat e e-mail", "Análise de ocorrências", "Microsoft Office", "Processos administrativos", "Sistemas corporativos", "Organização de informações", "Comunicação escrita", "Resolução de problemas"] },
];

export const education = {
  title: "Ensino Médio Integrado ao Técnico em Tecnologia da Informação", institution: "Colégio Cruzeiro do Sul", location: "São Paulo",
  description: "Formação técnica orientada ao desenvolvimento de sistemas, banco de dados e fundamentos de Engenharia de Software.",
  subjects: ["SQL", "Python", "C#", "Programação", "IoT / Arduino", "HTML", "CSS", "JavaScript", "PostgreSQL", "Git", "GitHub", "Scrum", "Banco de Dados", "Desenvolvimento de Sistemas", "Engenharia de Software"],
};
