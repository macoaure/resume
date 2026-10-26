import {
  siArgo,
  siClaude,
  siCursor,
  siDocker,
  siGin,
  siGit,
  siGithubactions,
  siGitlab,
  siGo,
  siGrafana,
  siGraphql,
  siHuawei,
  siKubernetes,
  siLaravel,
  siMysql,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPrometheus,
  siRedis,
  siRubyonrails,
  siSpringboot,
  siSymfony,
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
  doc1: { id: 'job-1doc-2025', label: '1Doc' },
  unifil: { id: 'job-unifil-2025', label: 'UniFil' },
  farmbits: { id: 'job-farmbits-2024', label: 'Farmbits' },
  bis2022: { id: 'job-bis2bis-2022', label: 'Bis2Bis · 2022' },
  bis2021: { id: 'job-bis2bis-2021', label: 'Bis2Bis · 2021' },
  bis2020: { id: 'job-bis2bis-2020', label: 'Bis2Bis · 2020' },
  bis2019: { id: 'job-bis2bis-2019', label: 'Bis2Bis · 2019' },
  bis2018: { id: 'job-bis2bis-2018', label: 'Bis2Bis · 2018' },
}

const codingAgents = {
  usage: {
    en: 'Part of the method I built so Engineering and QA use coding agents inside specification, tests, and review.',
    pt: 'Parte do método que criei para Engenharia e QA usarem agentes de código em especificação, teste e revisão.',
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
        en: "Go is part of the backend stack at 1Doc, where I use it next to PHP, Laravel, and Symfony on a GovTech product. It is also one of the options in the rule I wrote at Bis2Bis for choosing technology: Go, Node.js, Symfony, Laravel, or Rails, according to the workload and the team's ability to operate the result.",
        pt: "Go faz parte do backend da 1Doc, onde uso ao lado de PHP, Laravel e Symfony num produto GovTech. Também é uma das opções da regra que escrevi na Bis2Bis para escolher tecnologia: Go, Node.js, Symfony, Laravel ou Rails, conforme o workload e a capacidade do time de operar o resultado.",
      },
      built: {
        en: ["Backend work at 1Doc, where old government systems and newer serverless workloads have to live in the same delivery cycle.", "Part of the stack behind the new APIs and service boundaries that let a feature stop touching half the application.", "At Bis2Bis, one of the options in the technology rule that gave the portfolio one direction instead of one decision per application."],
        pt: ["Backend na 1Doc, onde sistemas antigos de governo e workloads serverless novos precisam caber no mesmo ciclo de entrega.", "Parte da stack por trás das APIs e fronteiras de serviço novas que fizeram uma funcionalidade deixar de mexer em metade da aplicação.", "Na Bis2Bis, uma das opções da regra de tecnologia que deu um rumo ao portfólio, em vez de uma decisão por aplicação."],
      },
      jobs: [job.doc1, job.bis2022],
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
        en: "AWS shows up in three chapters of my career. At Bis2Bis it was where workloads ran, until the migration to Huawei Cloud that I led. At Farmbits I built a new setup for a store the team no longer trusted. At 1Doc it carries serverless workloads on AWS Lambda.",
        pt: "A AWS aparece em três capítulos da minha carreira. Na Bis2Bis era onde os workloads rodavam, até a migração para a Huawei Cloud que liderei. Na Farmbits montei uma infra nova para uma loja em que o time já não confiava. Na 1Doc, ela sustenta workloads serverless em AWS Lambda.",
      },
      built: {
        en: ["Farmbits: a new AWS and Kubernetes setup. Production incidents dropped by more than 90%, and availability held at 99.9%.", "Bis2Bis: the target architecture and the migration of workloads from AWS to Huawei Cloud, with scale, cost, and availability written down as trade-offs.", "1Doc: serverless workloads on AWS Lambda, living next to old government systems."],
        pt: ["Farmbits: uma infra nova em AWS e Kubernetes. Os incidentes em produção caíram mais de 90% e a disponibilidade ficou em 99,9%.", "Bis2Bis: a arquitetura-alvo e a migração de workloads da AWS para a Huawei Cloud, com escala, custo e disponibilidade escritos como troca.", "1Doc: workloads serverless em AWS Lambda, convivendo com sistemas antigos de governo."],
      },
      jobs: [job.farmbits, job.doc1, job.bis2022],
    },
    members: [
      {
        name: 'AWS Lambda',
        fa: 'fa-solid fa-bolt',
        hex: '#FF9900',
        usage: {
          en: 'Serverless workloads living next to old government systems.',
          pt: 'Workloads serverless convivendo com sistemas antigos de governo.',
        },
        jobs: [job.doc1],
      },
      {
        ...icon(siHuawei, 'Huawei Cloud'),
        usage: {
          en: 'The destination of the migration from AWS that I led.',
          pt: 'O destino da migração da AWS que liderei.',
        },
        jobs: [job.bis2022],
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
        en: "Magento is where my career started, and what I came back to. As a junior I worked on about 300 Magento 1 and 2 stores, sitting next to customer support, and learned how a small change behaves in production. Years later, at Farmbits, I owned a Magento 2 commerce product end to end: catalog, checkout, infrastructure, release, and what happened after a failure.",
        pt: "O Magento é onde minha carreira começou, e ao que voltei. Como júnior, trabalhei em cerca de 300 lojas Magento 1 e 2, ao lado do suporte ao cliente, e aprendi como uma mudança pequena se comporta em produção. Anos depois, na Farmbits, cuidei de ponta a ponta de um produto de e-commerce em Magento 2: catálogo, checkout, infraestrutura, release e o que acontecia depois da falha.",
      },
      built: {
        en: ["Reusable modules, whenever the same request kept showing up on different projects.", "The company's first headless Magento 2 delivery, with GraphQL, Vue.js, and Node.js.", "Features and integrations with ERPs, payment, marketplaces, and carriers that reached about 500 projects, designed as part of the product.", "At Farmbits, the integrations that move money (Bling, CORBAN, Santander, and Itaú), so sales and documents stayed consistent when one side failed."],
        pt: ["Módulos reutilizáveis, sempre que o mesmo pedido aparecia em projetos diferentes.", "A primeira entrega headless de Magento 2 da empresa, com GraphQL, Vue.js e Node.js.", "Funcionalidades e integrações com ERP, pagamento, marketplace e transportadora que chegaram a cerca de 500 projetos, desenhadas como parte do produto.", "Na Farmbits, as integrações que movimentam dinheiro (Bling, CORBAN, Santander e Itaú), para venda e documento continuarem consistentes quando um lado falhava."],
      },
      jobs: [job.bis2018, job.bis2019, job.farmbits],
    },
    members: [
      {
        ...icon(siVuedotjs, 'Vue.js'),
        usage: { en: 'Front end of the first headless delivery.', pt: 'Front end da primeira entrega headless.' },
        jobs: [job.bis2018],
      },
      {
        ...icon(siGraphql),
        usage: { en: 'The API layer of the first headless delivery.', pt: 'A camada de API da primeira entrega headless.' },
        jobs: [job.bis2018],
      },
      {
        ...icon(siNodedotjs),
        usage: {
          en: 'Part of the headless delivery, and an option in my technology rule at Bis2Bis.',
          pt: 'Parte da entrega headless, e uma opção na minha regra de tecnologia na Bis2Bis.',
        },
        jobs: [job.bis2018, job.bis2022],
      },
      {
        name: 'Bling, CORBAN, Santander, Itaú',
        fa: 'fa-solid fa-plug',
        hex: '',
        usage: {
          en: 'The integrations that move money, so sales and documents stayed consistent when one side failed.',
          pt: 'As integrações que movimentam dinheiro, para venda e documento continuarem consistentes quando um lado falhava.',
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
        en: "Laravel is part of the PHP backend at 1Doc, next to Symfony, and one of the options in the technology rule at Bis2Bis. The 1Doc product has to keep old government systems and newer serverless workloads in the same delivery cycle, and the backend is where that gets decided.",
        pt: "O Laravel faz parte do backend PHP da 1Doc, ao lado do Symfony, e é uma das opções da regra de tecnologia da Bis2Bis. O produto da 1Doc precisa manter sistemas antigos de governo e workloads serverless novos no mesmo ciclo de entrega, e o backend é onde isso se decide.",
      },
      built: {
        en: ["New APIs and service boundaries for modules that could not change on their own, so a feature no longer required touching half the application.", "Root-cause work on recurring incidents and slow paths, with MySQL, Redis, and caching, until the fix was a design change and not another patch.", "A working method for Engineering and QA to use coding agents (Cursor, Claude Code, Codex) inside specification, tests, and review."],
        pt: ["APIs e fronteiras de serviço novas para módulos que não conseguiam mudar sozinhos, para uma funcionalidade deixar de exigir mexer em metade da aplicação.", "Análise de causa em incidentes recorrentes e caminhos lentos, com MySQL, Redis e cache, até o conserto ser mudança de desenho e não mais um remendo.", "Um método de trabalho para Engenharia e QA usarem agentes de código (Cursor, Claude Code, Codex) dentro de especificação, teste e revisão."],
      },
      jobs: [job.doc1, job.bis2022],
    },
    members: [
      {
        ...icon(siPhp),
        usage: {
          en: 'Present in every role since 2018, from Magento stores to APIs.',
          pt: 'Presente em todos os cargos desde 2018, das lojas Magento até as APIs.',
        },
        jobs: [job.doc1, job.farmbits, job.bis2019, job.bis2018],
      },
      {
        ...icon(siSymfony),
        usage: { en: 'Backend, next to Laravel.', pt: 'Backend, ao lado do Laravel.' },
        jobs: [job.doc1, job.bis2022],
      },
    ],
  },
  {
    id: 'kubernetes',
    head: {
      ...icon(siKubernetes),
      usage: {
        en: "Kubernetes runs the Farmbits store. The store was one the team no longer trusted, so the new setup came with releases through GitOps, and rollback became a normal path instead of an emergency.",
        pt: "O Kubernetes roda a loja da Farmbits. A loja era uma em que o time já não confiava, então a infra nova veio com releases por GitOps, e o rollback virou um caminho normal em vez de uma emergência.",
      },
      built: {
        en: ["The new production setup on AWS and Kubernetes: production incidents down by more than 90%, with 99.9% availability.", "A delivery pipeline with GitHub Actions, GitOps, and Argo CD, taking deploys from about 40 minutes of manual work to 12.", "An observability stack with Grafana, Prometheus, and Loki, to see what was happening."],
        pt: ["A nova infra de produção em AWS e Kubernetes: incidentes em produção caíram mais de 90%, com 99,9% de disponibilidade.", "Um pipeline de entrega com GitHub Actions, GitOps e Argo CD, que levou o deploy de cerca de 40 minutos manuais para 12.", "Uma stack de observabilidade com Grafana, Prometheus e Loki, para enxergar o que acontecia."],
      },
      jobs: [job.farmbits],
    },
    members: [
      {
        ...icon(siDocker),
        usage: {
          en: 'Corsair, an internal environment that took local setup from two or three hours to under 30 minutes.',
          pt: 'O Corsair, um ambiente interno que levou o setup local de duas ou três horas para menos de 30 minutos.',
        },
        jobs: [job.bis2019, job.bis2021],
      },
      {
        ...icon(siArgo, 'Argo CD'),
        usage: {
          en: 'GitOps on dozens of applications; with standards and design reviews, release-related failures fell by about 40%.',
          pt: 'GitOps em dezenas de aplicações; com padrões e design reviews, as falhas ligadas a release caíram cerca de 40%.',
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
          en: 'The delivery pipeline: deploys went from about 40 minutes of manual work to 12.',
          pt: 'O pipeline de entrega: o deploy saiu de cerca de 40 minutos manuais para 12.',
        },
        jobs: [job.farmbits],
      },
      {
        ...icon(siGitlab, 'GitLab CI/CD'),
        usage: {
          en: 'With Docker, about 80% fewer manual release steps.',
          pt: 'Com Docker, cerca de 80% menos passos manuais de release.',
        },
        jobs: [job.bis2021],
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
        usage: { en: 'Root-cause work on recurring incidents and slow paths.', pt: 'Análise de causa em incidentes recorrentes e caminhos lentos.' },
        jobs: [job.doc1],
      },
      {
        ...icon(siRedis),
        usage: { en: 'Caching, with MySQL, to fix slow paths for good.', pt: 'Cache, com MySQL, para resolver caminhos lentos de vez.' },
        jobs: [job.doc1],
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
        usage: { en: 'One of the options in my technology rule, chosen by workload and team.', pt: 'Uma das opções da minha regra de tecnologia, escolhida por workload e time.' },
        jobs: [job.bis2022],
      },
      { ...icon(siCursor), ...codingAgents },
      { ...icon(siClaude, 'Claude Code'), ...codingAgents },
      { name: 'Codex', fa: 'fa-brands fa-openai', hex: '', ...codingAgents },
    ],
  },
]
