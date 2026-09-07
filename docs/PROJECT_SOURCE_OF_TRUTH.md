# Victor Hugo — Digital Universe

## Status de orquestração

- Ruflo CLI: disponível e funcional.
- Swarm: `hierarchical`, estratégia `specialized`, máximo de 8 agentes.
- Ruflo MCP: configurado em `.mcp.json`, mas não injetado como ferramenta nativa nesta sessão Codex.
- Execução: Ruflo coordena memória, routing, policies e receipts via CLI; workers Codex executam auditoria, implementação e revisão.
- Concorrência: somente auditorias read-only em paralelo. O integrador é o único escritor porque o repositório ainda não possui commit-base para worktrees.
- Memória: chaves importantes devem ser persistidas no Ruflo após resolver o lock WAL do daemon no Windows. Este arquivo é a fonte versionável durante esse intervalo.

## Direção imutável

- Conceito: **Victor Hugo — Digital Universe**.
- Visual: preto profundo, azul-marinho, branco e azul tecnológico controlado.
- Estilo: premium, cinematográfico, editorial, tecnológico e legível.
- Movimento: suave, reversível, controlado e narrativamente útil.
- 3D: mínimo, significativo e com acabamento alto.
- Mobile: experiência essencial própria, não desktop apenas escondido.
- Arquitetura: camada HTML semântica + camada WebGL decorativa.
- Conteúdo: somente fatos existentes em `data/portfolio.ts` e assets do repositório.

## Stack e decisões

- Next.js 15, React 19 e TypeScript estrito.
- Site estático, sem backend, autenticação ou banco.
- Um Canvas WebGL persistente para toda a experiência.
- React Three Fiber na linha compatível com React 19; Drei apenas para utilidades comprovadamente úteis.
- GSAP + ScrollTrigger para timelines rotuladas e reversíveis.
- Sem Lenis na primeira versão; scroll nativo permanece disponível.
- Conteúdo significativo nunca será renderizado apenas no Canvas.
- Não usar pós-processamento por padrão.

## Arquitetura-alvo

```text
app/page.tsx
├── ExperienceProvider / ExperienceController
├── ExperienceCanvas (dynamic, client-only)
│   └── SceneDirector
│       ├── VHMonogram
│       ├── AtmosphericField
│       ├── ExperiencePanel
│       ├── TechCore
│       └── ProjectPortal
└── HTML chapters
    ├── Hero
    ├── About
    ├── Career / TP-Samsung
    ├── Technologies + Agentic
    ├── Nexus
    ├── NovaTech
    ├── Phazion Quest
    └── Contact
```

Módulos previstos:

- `components/experience/ExperienceController.tsx`
- `components/experience/AdaptiveQualityProvider.tsx`
- `components/experience/ExperienceCanvas.tsx`
- `components/experience/ExperienceCanvasScene.tsx`
- `lib/experience/chapters.ts`
- `lib/experience/timeline-store.ts`
- `lib/experience/quality.ts`
- `hooks/useReducedMotion.ts`
- `hooks/useAdaptiveQuality.ts`

Na Foundation, o controller nativo baseado na geometria real do DOM é a autoridade de progresso. GSAP permanece instalado, mas só será carregado na Phase 2 para timelines cinematográficas que realmente precisem de scrub/pinning; tiers LOW não baixam GSAP.

## Contrato da timeline

O controlador publica:

```ts
type ExperienceSnapshot = {
  globalProgress: number;
  activeChapter: ChapterId;
  chapterProgress: number;
  direction: -1 | 0 | 1;
  velocity: number;
  quality: "high" | "medium" | "low";
  reducedMotion: boolean;
};
```

- Valores por frame ficam em store mutável e são consumidos diretamente pelo WebGL.
- React state é usado apenas para estado semântico de baixa frequência.
- Capítulos são declarativos e compartilhados por navegação, progress rail, DOM e cenas.
- Scroll permanece nativo e reversível.
- Pinning é excepcional: somente a passagem curta pelo VH em desktop capaz.
- Mobile, tablet modesto e reduced motion não usam pinning/camera-through.

## Capítulos e ritmo

Referência artística, ajustada pelas dimensões reais do DOM:

| Progresso | Capítulo | Ritmo |
| --- | --- | --- |
| 0–10% | Hero / VH | Impacto |
| 10–20% | Passagem pelo VH | Impacto / transição |
| 20–32% | About | Respiro |
| 32–44% | TP / Samsung | Informação premium |
| 44–55% | Tech Core + Agentic | Impacto controlado |
| 55–68% | Nexus | Projeto principal |
| 68–79% | NovaTech | Contraste clean |
| 79–91% | Phazion Quest | Microcena cinematográfica |
| 91–100% | Contact / retorno VH | Respiro e fechamento |

ECAR e Sellwave permanecem como sistemas selecionados secundários. AI Engineering Lab não recebe capítulo próprio nesta versão.

## Conteúdo factual

- Nome: Victor Hugo Novaes dos Santos.
- Papel: Software Developer.
- Local: São Paulo, Brasil.
- Foco: Full Stack, back-end e Agentic AI Development.
- Experiência: projetos independentes/acadêmicos e Front Office na Teleperformance, Operação Samsung.
- Projetos em destaque: Nexus, ECAR, Black Widow: Red Room Experience, NovaTech e **Phazion Quest**.
- Grafia oficial no repositório: `Phazion Quest`.
- Não existem links públicos confirmados para Nexus, NovaTech ou ECAR.
- O link público e o repositório de Black Widow ainda não foram conectados; ambos os CTAs permanecem desabilitados como “Em breve”. Não utilizar domínios provisórios.
- Não existe currículo no repositório; não exibir CTA de download falso.
- Não existe screenshot da NovaTech; usar interface procedural sem inventar métricas ou capacidades.
- Os arquivos estão em UTF-8 correto; mojibake visto no PowerShell é problema de exibição do terminal.

## Mapeamento de assets

- `victor-hugo-brand.png`: referência do monograma e marca pequena; não ampliar o ornamento no Hero.
- `victor-profile.png`: retrato para About, com crop e tratamento navy controlado.
- `tp-samsung-operation.png`: painel da experiência profissional.
- `nexus-portfolio-showcase.jpeg`: textura/interface do portal Nexus.
- `phazion-quest-cover.jpeg`: base 2.5D da microcena Phazion.
- `ecar-portfolio-showcase.png`: projeto secundário.
- `cruzeiro-do-sul-education-bg.png`: prova visual de formação.
- `hero-code-background.mp4`: fallback intermediário; nunca executar junto com WebGL.

## Qualidade adaptativa

### High

- Desktop capaz, sem reduced motion ou economia de dados.
- DPR máximo 1.5.
- Meta próxima de 60 FPS.
- Até 120–160 mil triângulos visíveis; preferir até 12 draw calls, máximo 25.
- Até 250 partículas discretas; sem pós-processamento padrão.

### Medium

- Tablet/laptop modesto, ponteiro coarse, rede/hardware limitados.
- DPR 1–1.25, meta 30 FPS.
- Até 60–80 mil triângulos, 100 partículas e sem sombras em tempo real.
- Usa cena WebGL geométrica simplificada quando WebGL estiver disponível; vídeo lazy é apenas fallback de falha/indisponibilidade, nunca simultâneo.

### Low

- Mobile/economia de dados/2G/reduced motion.
- DPR 0.75–1, até 20–30 mil triângulos quando WebGL for realmente usado.
- Sem partículas decorativas, reflexos ou pós-processamento.
- Reduced motion e save-data usam experiência estática sem baixar vídeo e sem contexto WebGL.

## Performance gates

- LCP mobile p75: até 2.5 s.
- CLS: até 0.05 como alvo; 0.1 máximo.
- INP: até 200 ms.
- JS inicial: manter próximo do baseline de 111 kB; WebGL sempre em chunk dinâmico.
- Apenas capítulo ativo e adjacente podem estar aquecidos.
- Pausar RAF/vídeo fora da viewport e com documento oculto.
- Nenhum asset desktop pesado deve ser carregado apenas para receber `display: none` no mobile.
- Remover geometria, materiais, texturas, listeners, observers e RAF no cleanup.

## Breakpoints

- Desktop full: `>= 1200px`.
- Tablet/intermediário: `768–1199px`.
- Mobile/essential: `<= 767px`.
- Portal VH com pinning somente acima de aproximadamente `900px` e com qualidade suficiente.
- Alvos interativos mínimos de 44 px; considerar `svh`, `dvh`, safe areas, landscape e zoom de texto.

## Regras visuais

- Uma única hierarquia focal dominante por viewport.
- Ritmo obrigatório: impacto → respiro → informação → impacto → respiro.
- Nomes de tecnologias não ficam orbitando como logos.
- Tech Core representa camadas de arquitetura, não um sistema solar genérico.
- Painel TP/Samsung desmonta em camadas para formar passagem, sem “card + rotate”.
- Nexus usa interface real como portal de dados.
- NovaTech usa composição clean baseada apenas nas features reais.
- Phazion é uma ruptura curta baseada no artwork real e retorna ao universo principal.
- Glow vem prioritariamente da iluminação da cena, não de decoração CSS excessiva.

## Quality gates

1. Foundation: build, tipos, fallback sem WebGL, timeline e qualidade adaptativa.
2. Hero: VH convincente, passagem real, reverse scroll, reduced motion e mobile.
3. Desktop: capítulos integrados e timeline consistente.
4. Optimization: bundle, FPS, memória, assets e context loss.
5. QA: 360, 768, 1024 e 1440 px; teclado, resize, hash, reverse scroll e reduced motion.
6. Polish: iluminação, câmera, easing, tipografia, alinhamento, legibilidade e coerência narrativa.

## Decisões integradas — cenas contínuas

- A experiência corporativa TP/Samsung aparece antes da prática independente para leitura imediata por recrutadores.
- About, Experience, Tech Core, Nexus, NovaTech, Phazion e Contact compartilham o Canvas persistente.
- Experience usa painéis em camadas; Tech Core usa núcleo arquitetural; projetos usam um portal estrutural compartilhado com variação de atmosfera.
- NovaTech e Phazion são capítulos narrativos amplos, não cards em uma grade genérica.
- AI Engineering Lab foi consolidado na seção Agentic Engineering para evitar repetição.
- Fundos desktop abrem janelas graduais para o WebGL; tablet/mobile mantêm superfícies opacas para legibilidade.
- Rótulos de projetos não afirmam uso comercial ou case privado sem evidência.

## Pendências de conteúdo não bloqueantes

- Currículo/URL real.
- Links de demo/repositório dos projetos.
- Screenshot da NovaTech.
- Confirmação de datas 2026 e estratégia PT/EN.
- Confirmação de uso público desejado para marcas TP/Samsung/bancos presentes nos screenshots.
