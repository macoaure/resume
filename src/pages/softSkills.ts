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
      en: 'I led about 20 developers as Technical Lead and an engineering organization of about 40 people as Engineering Manager. The job was less about a single design and more about how planned work, incidents, and customer requests shared the same people.',
      pt: 'Liderei cerca de 20 desenvolvedores como Líder Técnico e uma organização de engenharia de cerca de 40 pessoas como Gerente de Engenharia. O trabalho era menos sobre um desenho só e mais sobre como trabalho planejado, incidente e pedido de cliente dividiam as mesmas pessoas.',
    },
    jobs: [job.bis2020, job.bis2021],
  },
  {
    id: 'teaching',
    fa: 'fa-solid fa-chalkboard-user',
    title: { en: 'Teaching and mentoring', pt: 'Ensino e mentoria' },
    description: {
      en: 'At UniFil I taught more than 60 students and built the course around problems that looked like real products. About 20 team projects and more than 100 reviews became the method. Mentoring and hiring are also part of how I describe my technical leadership.',
      pt: 'Na UniFil ensinei mais de 60 alunos e montei a disciplina em cima de problemas com cara de produto. Cerca de 20 projetos em equipe e mais de 100 revisões viraram o método. Mentoria e contratação também fazem parte de como descrevo minha liderança técnica.',
    },
    jobs: [job.unifil, job.bis2021],
  },
  {
    id: 'communication',
    fa: 'fa-solid fa-comments',
    title: { en: 'Communication and clarity', pt: 'Comunicação e clareza' },
    description: {
      en: 'Before tech, I studied Communication, Advertising, and Marketing. It shows in how I work: scale, cost, and availability written down as trade-offs instead of implied, and concepts explained in a way a classroom of students can follow.',
      pt: 'Antes da tecnologia, estudei Comunicação, Publicidade e Marketing. Isso aparece no meu jeito de trabalhar: escala, custo e disponibilidade escritos como troca, em vez de implícitos, e conceitos explicados de um jeito que uma turma de alunos consegue acompanhar.',
    },
    jobs: [job.bis2022, job.unifil],
  },
  {
    id: 'ownership',
    fa: 'fa-solid fa-bullseye',
    title: { en: 'Ownership', pt: 'Responsabilidade ponta a ponta' },
    description: {
      en: 'At Farmbits I owned a product from catalog and checkout to infrastructure, release, and what happened after a failure. At 1Doc, I keep going after recurring incidents until the fix is a design change and not another patch.',
      pt: 'Na Farmbits assumi um produto do catálogo e do checkout até a infraestrutura, o release e o que acontecia depois da falha. Na 1Doc, sigo atrás de incidentes recorrentes até o conserto ser uma mudança de desenho e não mais um remendo.',
    },
    jobs: [job.farmbits, job.doc1],
  },
  {
    id: 'process',
    fa: 'fa-solid fa-diagram-project',
    title: { en: 'Process and organization', pt: 'Processo e organização' },
    description: {
      en: 'With a queue of about 800 tickets a month, I created an operating model with SLA, priority, escalation, and root cause. Later came five workstreams, each with an owner and an escalation path, and planned work that actually shipped went from about 60% to more than 80%.',
      pt: 'Com uma fila de cerca de 800 chamados por mês, criei um modelo de operação com SLA, prioridade, escalonamento e causa raiz. Depois vieram cinco frentes, cada uma com responsável e caminho de escalonamento, e o trabalho planejado que de fato saía subiu de cerca de 60% para mais de 80%.',
    },
    jobs: [job.bis2020, job.bis2021],
  },
  {
    id: 'collaboration',
    fa: 'fa-solid fa-handshake',
    title: { en: 'Working across teams', pt: 'Trabalho entre times' },
    description: {
      en: 'I started my career sitting next to customer support. Today I work with Engineering and QA on a shared method for using coding agents inside specification, tests, and review.',
      pt: 'Comecei a carreira sentado ao lado do suporte ao cliente. Hoje trabalho com Engenharia e QA num método comum para usar agentes de código em especificação, teste e revisão.',
    },
    jobs: [job.bis2018, job.doc1],
  },
]
