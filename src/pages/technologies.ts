import {
  siArgo,
  siClaude,
  siCursor,
  siCypress,
  siDocker,
  siElastic,
  siGin,
  siGit,
  siGithubactions,
  siGitlab,
  siGo,
  siGrafana,
  siGraphql,
  siHuawei,
  siJira,
  siKubernetes,
  siLaravel,
  siMysql,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPrometheus,
  siPython,
  siRedis,
  siRubyonrails,
  siRust,
  siSolana,
  siSolidity,
  siSpringboot,
  siSymfony,
  siTypescript,
  siVuedotjs,
} from 'simple-icons'

type Text = { en: string; pt: string }

// A job in the experience timeline; `id` matches the stop id generated in index.ts.
export type JobRef = { id: string; label: string }

export type Technology = {
  name: string
  // simple-icons path, or a Font Awesome class when the brand is not in simple-icons
  svgPath?: string
  fa?: string
  // brand color shown on hover; empty when the brand is black and would vanish in dark mode
  hex: string
  usage: Text
  // what was built with it; only on the featured technologies
  built?: { en: string[]; pt: string[] }
  // where it was used, linking to the experience timeline
  jobs: JobRef[]
}

export type TechnologyFamily = {
  id: string
  // the highlighted technology that heads the family; absent for plain groups
  head?: Technology
  // heading of a plain group
  title?: Text
  members: Technology[]
}

type SimpleIcon = { title: string; path: string; hex: string }

const icon = (simple: SimpleIcon, name = simple.title) => ({
  name,
  svgPath: simple.path,
  hex: simple.hex === '000000' ? '' : `#${simple.hex}`,
})

export const job = {
  maco: { id: 'job-maco-2024', label: 'MACO Studios' },
  contar: { id: 'job-contar-2023', label: 'Contar' },
  doc1: { id: 'job-1doc-2025', label: '1Doc' },
  unifil: { id: 'job-unifil-2025', label: 'UniFil' },
  farmbits: { id: 'job-farmbits-2024', label: 'Farmbits' },
  bis2022: { id: 'job-bis2bis-2022', label: 'Bis2Bis · 2022' },
  bis2021: { id: 'job-bis2bis-2021', label: 'Bis2Bis · 2021' },
  bis2020: { id: 'job-bis2bis-2020', label: 'Bis2Bis · 2020' },
  bis2019: { id: 'job-bis2bis-2019', label: 'Bis2Bis · 2019' },
  bis2018: { id: 'job-bis2bis-2018', label: 'Bis2Bis · 2018' },
  php: { id: 'job-php-2020', label: 'PHP · open source' },
}

const codingAgents = {
  usage: {
    en: 'Part of the agentic development I practice with SDD: the specification comes first and the agent generates the code. I built the method so Engineering and QA do the same, inside specification, tests, and review.',
    pt: 'Parte do desenvolvimento agêntico que pratico com SDD: a especificação vem primeiro e o agente gera o código. Criei o método para Engenharia e QA fazerem o mesmo, dentro de especificação, teste e revisão.',
  },
  jobs: [job.doc1],
}

export const technologyTexts = {
  title: { en: 'What I work with', pt: 'Com o que eu trabalho' },
  lead: {
    en: 'The five that shaped my work the most come first, with the tools that live around each one and the jobs where I used them. Tap a job to jump to it.',
    pt: 'As cinco que mais marcaram meu trabalho vêm primeiro, com as ferramentas que vivem em volta de cada uma e os cargos em que usei. Toque num cargo para ir até ele.',
  },
  moreTitle: { en: 'More tools', pt: 'Mais ferramentas' },
  builtLabel: { en: 'What I built', pt: 'O que construí' },
  jobsLabel: { en: 'Where', pt: 'Onde' },
  withLabel: { en: 'Around it', pt: 'Em volta' },
}

export const technologyFamilies: TechnologyFamily[] = [
  {
    id: 'go',
    head: {
      ...icon(siGo),
      usage: {
        en: "Go is part of the backend stack at 1Doc, next to PHP, Laravel, and Symfony, and it is a main language in the projects I deliver at MACO Studios. At Bis2Bis I introduced Go to the company, and it became one of the options in the rule I wrote for choosing technology: Go, Node.js, Symfony, Laravel, Hyperf, or Rails, according to the workload and the team's ability to operate the result. I also used it at Farmbits.",
        pt: "Go faz parte do backend da 1Doc, ao lado de PHP, Laravel e Symfony, e é uma das linguagens principais dos projetos que entrego na MACO Studios. Na Bis2Bis, levei o Go para a empresa, e ele virou uma das opções da regra que escrevi para escolher tecnologia: Go, Node.js, Symfony, Laravel, Hyperf ou Rails, conforme o tipo de carga e a capacidade do time de operar o resultado. Também usei na Farmbits.",
      },
      built: {
        en: ["Backend work at 1Doc, where old government systems and newer serverless workloads have to live in the same delivery cycle.", "Custom backends and integrations for e-commerce and SaaS clients at MACO Studios.", "At Bis2Bis, Go among the technologies I introduced and one of the options in the rule that gave the portfolio one direction instead of one decision per application."],
        pt: ["Backend na 1Doc, onde sistemas antigos de governo e cargas serverless novas precisam caber no mesmo ciclo de entrega.", "Backends e integrações sob medida para clientes de e-commerce e SaaS na MACO Studios.", "Na Bis2Bis, o Go entre as tecnologias que introduzi e uma das opções da regra que deu um rumo ao portfólio, em vez de uma decisão por aplicação."],
      },
      jobs: [job.doc1, job.maco, job.farmbits, job.bis2022],
    },
    members: [
      {
        name: 'Cobra',
        fa: 'fa-solid fa-terminal',
        hex: '',
        usage: { en: 'Go framework for command-line tools.', pt: 'Framework Go para ferramentas de linha de comando.' },
        jobs: [],
      },
      {
        ...icon(siGin),
        usage: { en: 'Go web framework for HTTP APIs.', pt: 'Framework web em Go para APIs HTTP.' },
        jobs: [],
      },
    ],
  },
  {
    id: 'aws',
    head: {
      name: 'AWS',
      fa: 'fa-brands fa-aws',
      hex: '#FF9900',
      usage: {
        en: "AWS shows up in several chapters of my career. At Bis2Bis it was where workloads ran, until the migration to Huawei Cloud that I led. At Farmbits I designed a new setup for a store the team no longer trusted. At 1Doc it carries serverless workloads on AWS Lambda, and it is part of the cloud where my own SaaS, Contar, runs.",
        pt: "A AWS aparece em vários capítulos da minha carreira. Na Bis2Bis era onde as cargas rodavam, até a migração para a Huawei Cloud que liderei. Na Farmbits projetei uma infra nova para uma loja em que o time já não confiava. Na 1Doc, ela sustenta cargas serverless em AWS Lambda, e faz parte da nuvem em que roda o meu próprio SaaS, a Contar.",
      },
      built: {
        en: ["Farmbits: a new AWS and Kubernetes setup. Critical incidents dropped by more than 90%, and availability reached 99.9%.", "Bis2Bis: the target architecture and the migration of workloads from AWS to Huawei Cloud, with scale, cost, and availability written down as trade-offs. The migration cut costs and improved performance.", "1Doc: serverless workloads on AWS Lambda, living next to old government systems."],
        pt: ["Farmbits: uma infra nova em AWS e Kubernetes. Os incidentes críticos caíram mais de 90% e a disponibilidade chegou a 99,9%.", "Bis2Bis: a arquitetura-alvo e a migração de cargas da AWS para a Huawei Cloud, com escala, custo e disponibilidade escritos como troca. A migração reduziu custos e melhorou o desempenho.", "1Doc: cargas serverless em AWS Lambda, convivendo com sistemas antigos de governo."],
      },
      jobs: [job.farmbits, job.doc1, job.contar, job.bis2022],
    },
    members: [
      {
        name: 'AWS Lambda',
        fa: 'fa-solid fa-bolt',
        hex: '#FF9900',
        usage: {
          en: 'Serverless workloads living next to old government systems.',
          pt: 'Cargas serverless convivendo com sistemas antigos de governo.',
        },
        jobs: [job.doc1],
      },
      {
        ...icon(siHuawei, 'Huawei Cloud'),
        usage: {
          en: 'The destination of the migration from AWS that I led, and part of the cloud I worked with in the roles that followed.',
          pt: 'O destino da migração da AWS que liderei, e parte da nuvem com que trabalhei nos cargos seguintes.',
        },
        jobs: [job.bis2022, job.bis2021, job.farmbits, job.doc1, job.contar],
      },
    ],
  },
  {
    id: 'magento',
    head: {
      name: 'Magento',
      fa: 'fa-brands fa-magento',
      hex: '#EE672F',
      usage: {
        en: "Magento is where my career started, and what I came back to. As a junior I worked on about 300 Magento 1 and 2 stores, sitting next to customer support, and learned how a small change behaves in production. At Bis2Bis I grew from features and integrations on about 500 projects to the architecture of the whole platform, keeping Magento 1 healthy while delivering Magento 2 and Adobe Commerce. At Farmbits, I owned a Magento 2 commerce product end to end.",
        pt: "O Magento é onde minha carreira começou, e ao que voltei. Como júnior, trabalhei em cerca de 300 lojas Magento 1 e 2, ao lado do suporte ao cliente, e aprendi como uma mudança pequena se comporta em produção. Na Bis2Bis, cresci de funcionalidades e integrações em cerca de 500 projetos até a arquitetura da plataforma inteira, mantendo o Magento 1 saudável enquanto entregava Magento 2 e Adobe Commerce. Na Farmbits, cuidei de ponta a ponta de um produto de e-commerce em Magento 2.",
      },
      built: {
        en: ["Reusable modules, whenever the same request kept showing up on different projects.", "The company's first headless Magento 2 delivery, with GraphQL, Vue.js, Pug, Webpack, and Node.js.", "Features and integrations with ERPs, payment gateways, marketplaces, coupons, shipping, and email, designed as part of the product, plus payment, shipping, and coupon modules.", "Redis, MySQL master-slave, and the ELK Stack on Magento 1, and Magento 1 tuned for PHP 7 with asynchronous indexing.", "MageSearch (a search built for Magento's EAV model), Engine (Magento 2 features on Magento 1), and a multitenancy proof of concept that let more than 1,000 projects run on one codebase.", "At Farmbits, the integrations with Bling, CORBAN, Santander, and Itaú, and a payment module that turns loyalty points into utility-bill payments."],
        pt: ["Módulos reutilizáveis, sempre que o mesmo pedido aparecia em projetos diferentes.", "A primeira entrega headless de Magento 2 da empresa, com GraphQL, Vue.js, Pug, Webpack e Node.js.", "Funcionalidades e integrações com ERPs, gateways de pagamento, marketplaces, cupons, frete e e-mail, desenhadas como parte do produto, além de módulos de pagamento, envio e cupons.", "Redis, MySQL master-slave e ELK Stack no Magento 1, e o Magento 1 ajustado para o PHP 7 com indexação assíncrona.", "O MageSearch (uma busca feita para o modelo EAV do Magento), o Engine (recursos do Magento 2 no Magento 1) e uma prova de conceito de multitenancy que deixou mais de 1.000 projetos rodarem sobre um único código.", "Na Farmbits, as integrações com Bling, CORBAN, Santander e Itaú, e um módulo de pagamento que transforma pontos de fidelidade em pagamento de contas."],
      },
      jobs: [job.bis2018, job.bis2019, job.bis2021, job.bis2022, job.farmbits],
    },
    members: [
      {
        ...icon(siVuedotjs, 'Vue.js'),
        usage: { en: 'Front end of the first headless delivery, and of the Farmbits store.', pt: 'Front end da primeira entrega headless, e da loja da Farmbits.' },
        jobs: [job.bis2018, job.farmbits],
      },
      {
        ...icon(siGraphql),
        usage: { en: 'The API layer of the first headless delivery.', pt: 'A camada de API da primeira entrega headless.' },
        jobs: [job.bis2018, job.bis2019, job.farmbits],
      },
      {
        ...icon(siNodedotjs),
        usage: {
          en: 'Part of the headless delivery, and an option in my technology rule at Bis2Bis.',
          pt: 'Parte da entrega headless, e uma opção na minha regra de tecnologia na Bis2Bis.',
        },
        jobs: [job.bis2018, job.bis2022, job.farmbits],
      },
      {
        name: 'Bling, CORBAN, Santander, Itaú',
        fa: 'fa-solid fa-plug',
        hex: '',
        usage: {
          en: 'The integrations that move money: Bling (management and invoicing), CORBAN (a banking-correspondent platform for credit), and the banks Santander and Itaú. Sales and invoices stayed consistent when one side failed.',
          pt: 'As integrações que movimentam dinheiro: Bling (gestão e notas fiscais), CORBAN (plataforma de correspondentes bancários para crédito) e os bancos Santander e Itaú. Venda e nota fiscal continuaram consistentes quando um lado falhava.',
        },
        jobs: [job.farmbits],
      },
    ],
  },
  {
    id: 'laravel',
    head: {
      ...icon(siLaravel),
      usage: {
        en: "Laravel is the base of Contar, the SaaS for accounting firms that I created and keep running. It is also part of the PHP backend at 1Doc, next to Symfony, and one of the options in the technology rule at Bis2Bis, where I delivered Laravel microservices for marketplaces. At 1Doc, the backend is where old government systems and newer serverless workloads get decided.",
        pt: "O Laravel é a base da Contar, o SaaS para escritórios de contabilidade que criei e mantenho. Também faz parte do backend PHP da 1Doc, ao lado do Symfony, e é uma das opções da regra de tecnologia da Bis2Bis, onde entreguei microsserviços em Laravel para marketplaces. Na 1Doc, o backend é onde se decide como sistemas antigos de governo e cargas serverless novas convivem.",
      },
      built: {
        en: ["Contar: a system used by about 30 accounting firms and more than 200 accountants, where I own product, backend, and operations.", "New APIs and service boundaries at 1Doc, so a feature no longer required touching half the application.", "Root-cause work on recurring incidents and slow paths, with MySQL, Redis, and caching, until the fix was a structural change and not a temporary patch.", "Agentic development with SDD, using Claude, Codex, and Cursor, and a method that about 90 people adopted."],
        pt: ["Contar: um sistema usado por cerca de 30 escritórios de contabilidade e mais de 200 contadores, em que cuido de produto, backend e operação.", "APIs e fronteiras de serviço novas na 1Doc, para uma funcionalidade deixar de exigir mexer em metade da aplicação.", "Análise de causa em incidentes recorrentes e caminhos lentos, com MySQL, Redis e cache, até o conserto ser uma mudança estrutural e não um remendo.", "Desenvolvimento agêntico com SDD, usando Claude, Codex e Cursor, e um método que cerca de 90 pessoas adotaram."],
      },
      jobs: [job.contar, job.doc1, job.bis2021, job.bis2022],
    },
    members: [
      {
        ...icon(siPhp),
        usage: {
          en: 'Present in every technical role since 2018, from Magento stores to APIs, with occasional contributions to php-src and php-web since 2020.',
          pt: 'Presente em todos os cargos técnicos desde 2018, das lojas Magento até as APIs, com contribuições ocasionais ao php-src e ao php-web desde 2020.',
        },
        jobs: [job.doc1, job.maco, job.farmbits, job.bis2022, job.bis2019, job.bis2018, job.php],
      },
      {
        ...icon(siSymfony),
        usage: { en: 'Backend, next to Laravel.', pt: 'Backend, ao lado do Laravel.' },
        jobs: [job.doc1, job.bis2022],
      },
      {
        name: 'Hyperf',
        fa: 'fa-solid fa-gauge-high',
        hex: '',
        usage: {
          en: 'A high-performance PHP framework, used in services that needed more speed.',
          pt: 'Framework PHP de alto desempenho, usado em serviços que exigiam mais velocidade.',
        },
        jobs: [job.doc1, job.bis2022],
      },
      {
        name: 'Swoole',
        fa: 'fa-solid fa-bolt-lightning',
        hex: '',
        usage: {
          en: 'A PHP extension that handles many simultaneous requests, behind the services that needed more speed.',
          pt: 'Extensão do PHP que atende muitas requisições simultâneas, por trás dos serviços que exigiam mais velocidade.',
        },
        jobs: [job.doc1, job.bis2022],
      },
      {
        name: 'PHPUnit e Pest',
        fa: 'fa-solid fa-vial',
        hex: '',
        usage: {
          en: 'Automated tests that kept the store stable from the code to the final use.',
          pt: 'Testes automatizados que mantiveram a loja estável do código ao uso final.',
        },
        jobs: [job.farmbits],
      },
      {
        ...icon(siCypress),
        usage: {
          en: 'End-to-end tests that simulate real use of the application.',
          pt: 'Testes de ponta a ponta que simulam o uso real da aplicação.',
        },
        jobs: [job.farmbits],
      },
    ],
  },
  {
    id: 'kubernetes',
    head: {
      ...icon(siKubernetes),
      usage: {
        en: "Kubernetes runs the Farmbits store. The store was one the team no longer trusted, so the new setup came with releases through GitOps, and rollback became a normal path instead of an emergency. It is also part of the cloud where Contar and the 1Doc product run, and of the platform I architected at Bis2Bis.",
        pt: "O Kubernetes roda a loja da Farmbits. A loja era uma em que o time já não confiava, então a infra nova veio com releases por GitOps, e o rollback virou um caminho normal em vez de uma emergência. Também faz parte da nuvem em que rodam a Contar e o produto da 1Doc, e da plataforma que arquitetei na Bis2Bis.",
      },
      built: {
        en: ["The new production setup on AWS and Kubernetes: critical incidents down by more than 90%, with 99.9% availability.", "A delivery pipeline with GitHub Actions, GitOps, and Argo CD, taking releases from about 40 minutes of manual work to 12.", "An observability stack with Grafana, Loki, Promtail, Prometheus, and AlertManager, which cut the time to recover from 2 hours to under 6 minutes."],
        pt: ["A nova infra de produção em AWS e Kubernetes: incidentes críticos caíram mais de 90%, com 99,9% de disponibilidade.", "Um pipeline de entrega com GitHub Actions, GitOps e Argo CD, que levou a publicação de cerca de 40 minutos manuais para 12.", "Uma stack de observabilidade com Grafana, Loki, Promtail, Prometheus e AlertManager, que reduziu o tempo de recuperação de 2 horas para menos de 6 minutos."],
      },
      jobs: [job.farmbits, job.doc1, job.contar, job.bis2022, job.bis2021],
    },
    members: [
      {
        ...icon(siDocker),
        usage: {
          en: 'Corsair, an internal environment that took local setup from about 3 hours to under 20 minutes, and the move of legacy infrastructure to containers.',
          pt: 'O Corsair, um ambiente interno que levou o setup local de cerca de 3 horas para menos de 20 minutos, e a migração da infraestrutura legada para contêineres.',
        },
        jobs: [job.bis2019, job.bis2021, job.maco],
      },
      {
        ...icon(siArgo, 'Argo CD'),
        usage: {
          en: 'GitOps on dozens of applications; with standards and design reviews, release-related failures fell by about 40%.',
          pt: 'GitOps em dezenas de aplicações; com padrões e revisões de projeto, as falhas ligadas a publicações caíram cerca de 40%.',
        },
        jobs: [job.bis2022, job.farmbits],
      },
    ],
  },
  {
    id: 'cicd',
    title: { en: 'CI/CD', pt: 'CI/CD' },
    members: [
      {
        ...icon(siGithubactions, 'GitHub Actions'),
        usage: {
          en: 'The delivery pipeline: releases went from about 40 minutes of manual work to 12.',
          pt: 'O pipeline de entrega: a publicação saiu de cerca de 40 minutos manuais para 12.',
        },
        jobs: [job.farmbits],
      },
      {
        ...icon(siGitlab, 'GitLab CI/CD'),
        usage: {
          en: 'With Docker, about 80% fewer manual release steps, and later pipelines with Dokku and Buildpacks.',
          pt: 'Com Docker, cerca de 80% menos passos manuais de publicação, e depois pipelines com Dokku e Buildpacks.',
        },
        jobs: [job.bis2021, job.bis2022],
      },
      {
        ...icon(siGit),
        usage: {
          en: 'Git and pull requests as the class method, instead of end-of-term solo work.',
          pt: 'Git e pull request como método de aula, no lugar do trabalho solto de fim de semestre.',
        },
        jobs: [job.unifil],
      },
    ],
  },
  {
    id: 'other',
    title: { en: 'Other stuff', pt: 'Outras coisas' },
    members: [
      {
        ...icon(siMysql),
        usage: { en: 'Root-cause work on recurring incidents and slow paths, and master-slave on Magento 1.', pt: 'Análise de causa em incidentes recorrentes e caminhos lentos, e master-slave no Magento 1.' },
        jobs: [job.doc1, job.bis2019],
      },
      {
        ...icon(siRedis),
        usage: { en: 'Caching, with MySQL, to fix slow paths for good.', pt: 'Cache, com MySQL, para resolver caminhos lentos de vez.' },
        jobs: [job.doc1, job.bis2019],
      },
      {
        ...icon(siElastic, 'ELK Stack'),
        usage: { en: 'Logs and search on Magento 1, for a more stable store.', pt: 'Logs e busca no Magento 1, para uma loja mais estável.' },
        jobs: [job.bis2019, job.bis2021],
      },
      {
        ...icon(siGrafana),
        usage: { en: 'The observability stack, with Prometheus and Loki.', pt: 'A stack de observabilidade, com Prometheus e Loki.' },
        jobs: [job.farmbits],
      },
      {
        ...icon(siPrometheus),
        usage: { en: 'Metrics in the observability stack.', pt: 'Métricas na stack de observabilidade.' },
        jobs: [job.farmbits],
      },
      {
        name: 'Loki',
        fa: 'fa-solid fa-file-lines',
        hex: '#F5A800',
        usage: { en: 'Logs in the observability stack.', pt: 'Logs na stack de observabilidade.' },
        jobs: [job.farmbits],
      },
      {
        ...icon(siJira),
        usage: { en: 'More than 70 sprints at Farmbits, and the main project tool I introduced as Engineering Manager.', pt: 'Mais de 70 sprints na Farmbits, e a principal ferramenta de projetos que introduzi como Gerente de Engenharia.' },
        jobs: [job.farmbits, job.bis2021],
      },
      {
        ...icon(siOpenjdk, 'Java'),
        usage: { en: 'Taught to more than 60 students.', pt: 'Ensinado para mais de 60 alunos.' },
        jobs: [job.unifil],
      },
      {
        ...icon(siSpringboot, 'Spring Boot'),
        usage: {
          en: 'The base of the course: about 20 team projects, from requirements to delivery.',
          pt: 'A base da disciplina: cerca de 20 projetos em equipe, do requisito à entrega.',
        },
        jobs: [job.unifil],
      },
      {
        ...icon(siRubyonrails, 'Rails'),
        usage: { en: 'One of the technologies I introduced at Bis2Bis, chosen by workload and team.', pt: 'Uma das tecnologias que introduzi na Bis2Bis, escolhida por carga de trabalho e time.' },
        jobs: [job.bis2022],
      },
      {
        ...icon(siPython),
        usage: { en: 'Data analysis and the synthetic-data generator of my Master’s research.', pt: 'Análise de dados e o gerador de dados sintéticos da minha pesquisa de mestrado.' },
        jobs: [],
      },
      {
        ...icon(siTypescript),
        usage: { en: 'Orchestration in Veritas, my research platform for zero-knowledge proofs.', pt: 'A orquestração do Veritas, minha plataforma de pesquisa para provas de conhecimento zero.' },
        jobs: [],
      },
      {
        ...icon(siRust),
        usage: { en: 'Network-critical and memory-sensitive components of Veritas.', pt: 'Os componentes críticos de rede e memória do Veritas.' },
        jobs: [],
      },
      {
        ...icon(siSolidity),
        usage: { en: 'Smart contracts, studied for my research on the right to be forgotten in blockchain.', pt: 'Contratos inteligentes, estudados na minha pesquisa sobre o direito ao esquecimento em blockchain.' },
        jobs: [],
      },
      {
        ...icon(siSolana),
        usage: { en: 'The test environment of Proof of Erasure, with off-chain cryptography.', pt: 'O ambiente de teste do Proof of Erasure, com criptografia fora da cadeia.' },
        jobs: [],
      },
      { ...icon(siCursor), ...codingAgents },
      { ...icon(siClaude, 'Claude Code'), ...codingAgents },
      { name: 'Codex', fa: 'fa-brands fa-openai', hex: '', ...codingAgents },
    ],
  },
]
