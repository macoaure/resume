import { job, type JobRef } from './technologies.ts'

type Text = { en: string; pt: string }

export type SoftSkill = {
  id: string
  fa: string
  title: Text
  description: Text
  // where it showed up, linking to the experience timeline
  jobs: JobRef[]
}

export const softSkillTexts = {
  title: { en: 'Beyond the code', pt: 'Além do código' },
  lead: {
    en: 'Most of what I solved was not a technical problem alone. These are the skills that showed up in every job, and where.',
    pt: 'Boa parte do que resolvi não era só um problema técnico. Estas são as habilidades que apareceram em todos os cargos, e onde.',
  },
}

export const softSkills: SoftSkill[] = [
  {
    id: 'leadership',
    fa: 'fa-solid fa-people-group',
    title: { en: 'Leadership', pt: 'Liderança' },
    description: {
      en: 'I led about 20 developers as Technical Lead and a team of about 40 people as Engineering Manager, hiring and letting go about 30 people and owning the engineering budget and cloud costs. The challenge was less about a single design and more about how planned work, urgent problems, and customer requests competed for the same people. I complemented the practice with leadership courses, such as People Management and Leadership Challenges (ACIL).',
      pt: 'Liderei cerca de 20 desenvolvedores como Líder Técnico e uma equipe de cerca de 40 pessoas como Gerente de Engenharia, contratando e desligando cerca de 30 pessoas e respondendo pelo orçamento da engenharia e pelos custos de nuvem. O desafio era menos um desenho só e mais como trabalho planejado, problemas urgentes e pedidos de clientes disputavam as mesmas pessoas. Complementei a prática com cursos de liderança, como Gestão de Pessoas e Desafios da Liderança (ACIL).',
    },
    jobs: [job.bis2020, job.bis2021],
  },
  {
    id: 'teaching',
    fa: 'fa-solid fa-chalkboard-user',
    title: { en: 'Teaching and mentoring', pt: 'Ensino e mentoria' },
    description: {
      en: 'At UniFil I taught more than 60 students and built the course around situations from real products. About 20 team projects and more than 100 code reviews became the method. At Bis2Bis I created onboarding and training programs, and at MACO Studios I train technical teams in GitOps, cloud, testing, and microservices.',
      pt: 'Na UniFil ensinei mais de 60 alunos e montei a disciplina em torno de situações de produtos reais. Cerca de 20 projetos em equipe e mais de 100 revisões de código viraram o método. Na Bis2Bis criei programas de integração e treinamento, e na MACO Studios capacito equipes técnicas em GitOps, nuvem, testes e microsserviços.',
    },
    jobs: [job.unifil, job.bis2021, job.maco],
  },
  {
    id: 'communication',
    fa: 'fa-solid fa-comments',
    title: { en: 'Communication and clarity', pt: 'Comunicação e clareza' },
    description: {
      en: 'Before tech, I studied Communication, Advertising, and Marketing. It shows in how I work: scale, cost, and availability written down as trade-offs instead of implied, decisions explained to the executive leadership I reported to, and concepts explained in a way a classroom can follow. I also took courses in public speaking and assertive communication (Sesc, Sebrae, ACIL, and Vox2You).',
      pt: 'Antes da tecnologia, estudei Comunicação, Publicidade e Marketing. Isso aparece no meu jeito de trabalhar: escala, custo e disponibilidade escritos como troca, em vez de implícitos, decisões explicadas à diretoria a quem eu respondia e conceitos explicados de um jeito que uma turma consegue acompanhar. Também fiz cursos de oratória e comunicação assertiva (Sesc, Sebrae, ACIL e Vox2You).',
    },
    jobs: [job.bis2022, job.unifil],
  },
  {
    id: 'ownership',
    fa: 'fa-solid fa-bullseye',
    title: { en: 'Ownership', pt: 'Responsabilidade ponta a ponta' },
    description: {
      en: 'At Farmbits I owned a product from catalog and checkout to infrastructure, releases, and what happened after a failure. At 1Doc, I keep going after recurring incidents until the fix is a structural change and not another temporary patch.',
      pt: 'Na Farmbits assumi um produto do catálogo e do checkout até a infraestrutura, as publicações e o que acontecia depois da falha. Na 1Doc, sigo atrás de incidentes recorrentes até o conserto ser uma mudança estrutural e não mais um remendo.',
    },
    jobs: [job.farmbits, job.doc1],
  },
  {
    id: 'entrepreneurship',
    fa: 'fa-solid fa-rocket',
    title: { en: 'Product vision and initiative', pt: 'Visão de produto e iniciativa' },
    description: {
      en: 'I created Contar, a SaaS for accounting firms now used by about 30 firms and more than 200 accountants, and I own product, backend, and operations. At MACO Studios I deliver custom solutions, consulting, and training for e-commerce and SaaS clients.',
      pt: 'Criei a Contar, um SaaS para escritórios de contabilidade usado hoje por cerca de 30 escritórios e mais de 200 contadores, e cuido de produto, backend e operação. Na MACO Studios entrego soluções sob medida, consultoria e treinamento para clientes de e-commerce e SaaS.',
    },
    jobs: [job.contar, job.maco],
  },
  {
    id: 'process',
    fa: 'fa-solid fa-diagram-project',
    title: { en: 'Process and organization', pt: 'Processo e organização' },
    description: {
      en: 'With a queue of about 800 tickets a month, I created an operating model with SLA, priority, escalation, and root cause. Later came five work areas, each with an owner and an escalation path, and the planned work that actually shipped went from about 60% to more than 80%. At Farmbits I ran more than 70 sprints in Jira, with more than 40% efficiency gain.',
      pt: 'Com uma fila de cerca de 800 chamados por mês, criei um modelo de operação com SLA, prioridade, escalonamento e causa raiz. Depois vieram cinco frentes, cada uma com responsável e caminho de escalonamento, e o trabalho planejado que de fato saía subiu de cerca de 60% para mais de 80%. Na Farmbits conduzi mais de 70 sprints no Jira, com ganho de mais de 40% de eficiência.',
    },
    jobs: [job.bis2020, job.bis2021, job.farmbits],
  },
  {
    id: 'collaboration',
    fa: 'fa-solid fa-handshake',
    title: { en: 'Working across teams', pt: 'Trabalho entre times' },
    description: {
      en: 'I started my career sitting next to customer support. Today I work with Engineering and QA on a shared method for using coding agents inside specification, tests, and review, adopted by about 90 people.',
      pt: 'Comecei a carreira sentado ao lado do suporte ao cliente. Hoje trabalho com Engenharia e QA num método comum para usar agentes de código em especificação, teste e revisão, adotado por cerca de 90 pessoas.',
    },
    jobs: [job.bis2018, job.doc1],
  },
  {
    id: 'research',
    fa: 'fa-solid fa-flask',
    title: { en: 'Research and community', pt: 'Pesquisa e comunidade' },
    description: {
      en: 'I am doing a Master’s in Computer Science on the right to be forgotten in blockchain, and I have contributed occasionally to the PHP core (php-src and php-web) since 2020. Before that, I coordinated an open community of more than 30 developers and artists building indie game prototypes.',
      pt: 'Faço mestrado em Ciência da Computação, com pesquisa sobre o direito ao esquecimento em blockchain, e contribuo ocasionalmente com o núcleo do PHP (php-src e php-web) desde 2020. Antes, coordenei uma comunidade aberta com mais de 30 desenvolvedores e artistas que montavam protótipos de jogos independentes.',
    },
    jobs: [job.php],
  },
]
