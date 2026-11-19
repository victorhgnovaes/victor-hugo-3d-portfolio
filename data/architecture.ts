export const architectureNotes = [
  {
    description: [
      "Organizo o front-end por componentes e responsabilidades. A interface fica separada das chamadas à API e das transformações de dados, usando React com Next.js ou Vite conforme o projeto.",
      "I organize the front-end by components and responsibilities. Interfaces are separated from API requests and data transformations, using React with Next.js or Vite depending on the project.",
    ],
    practices: [
      ["Componentes reutilizáveis para telas, formulários e navegação.", "Reusable components for screens, forms and navigation."],
      ["Estado, propriedades e eventos para controlar os fluxos da interface.", "State, props and events to control interface flows."],
      ["TypeScript, responsividade e acessibilidade durante a implementação.", "TypeScript, responsiveness and accessibility during implementation."],
    ],
  },
  {
    description: [
      "Trabalho com APIs REST e separação em camadas. No NestJS, organizo funcionalidades em módulos, deixando a entrada das requisições, as regras de negócio e o acesso aos dados com responsabilidades distintas.",
      "I work with REST APIs and layered responsibilities. In NestJS, I organize features into modules, separating request handling, business rules and data access.",
    ],
    practices: [
      ["Rotas e controladores recebem e validam as solicitações.", "Routes and controllers receive and validate requests."],
      ["Serviços concentram regras de negócio e operações da aplicação.", "Services hold business rules and application operations."],
      ["Autenticação com JWT e integração entre API, interface e banco.", "JWT authentication and integration between API, interface and database."],
    ],
  },
  {
    description: [
      "Uso modelagem relacional para representar os dados da aplicação. Defino tabelas, relacionamentos e regras de integridade; no acesso aos dados, utilizo SQL, Prisma ORM ou Npgsql conforme a stack.",
      "I use relational modeling to represent application data. I define tables, relationships and integrity rules, accessing data through SQL, Prisma ORM or Npgsql depending on the stack.",
    ],
    practices: [
      ["Chaves, relacionamentos e consultas em PostgreSQL.", "Keys, relationships and queries in PostgreSQL."],
      ["Operações CRUD ligadas às regras de negócio.", "CRUD operations connected to business rules."],
      ["Organização do acesso aos dados para facilitar manutenção e evolução.", "Organized data access to support maintenance and evolution."],
    ],
  },
  {
    description: [
      "Escolho a linguagem de acordo com o papel de cada parte do sistema. TypeScript também é uma linguagem central no meu fluxo, tanto nas interfaces quanto nas APIs do ecossistema JavaScript.",
      "I choose languages according to the role of each part of a system. TypeScript is also a central language in my workflow, both for interfaces and APIs in the JavaScript ecosystem.",
    ],
    practices: [
      ["TypeScript e JavaScript para interfaces, APIs e integração web.", "TypeScript and JavaScript for interfaces, APIs and web integration."],
      ["Python para automações, tratamento e importação de dados.", "Python for automation, data processing and imports."],
      ["C# com Windows Forms em aplicações desktop e C++ na base de lógica.", "C# with Windows Forms for desktop applications and C++ for programming foundations."],
    ],
  },
  {
    description: [
      "Organizo o trabalho com versionamento e verificações durante o desenvolvimento. Uso o editor para implementar e depurar, o terminal para executar o projeto e o Postman para conferir o comportamento das APIs.",
      "I organize work around version control and checks during development. I use the editor to implement and debug, the terminal to run the project and Postman to check API behavior.",
    ],
    practices: [
      ["Git e GitHub para histórico, comparação de alterações e evolução do código.", "Git and GitHub for history, reviewing changes and code evolution."],
      ["VS Code e Visual Studio conforme o tipo de aplicação.", "VS Code and Visual Studio according to the application type."],
      ["Postman e terminal para testar integrações e verificar os resultados.", "Postman and the terminal for integration checks and result verification."],
    ],
  },
];
