export type Licao = {
  numero: number;
  slug: string;
  titulo: string;
  duracao?: string;
};

export type Modulo = {
  slug: string;
  ordem: number;
  titulo: string;
  subtitulo: string;
  dia: string;
  resumo: string;
  objetivos: string[];
  licoes: Licao[];
  cor: string;
};

export const cronograma: Modulo[] = [
  {
    slug: "00-setup",
    ordem: 0,
    titulo: "Setup pré-curso",
    subtitulo: "Antes do dia 1",
    dia: "Pré-curso",
    resumo: "Preparar a obra antes do canteiro abrir: Claude Code, Git, terminal, conta GitHub funcionando.",
    objetivos: [
      "Instalar Claude Code (CLI da Anthropic) localmente.",
      "Configurar terminal, Git e uma conta GitHub.",
      "Validar que o agente responde, lê arquivos e edita.",
      "Familiarizar com o vocabulário mínimo de IA aplicada a código.",
    ],
    cor: "#5A6A7C",
    licoes: [
      { numero: 1, slug: "instalando-claude-code", titulo: "Instalando o Claude Code", duracao: "20min" },
      { numero: 2, slug: "git-github-essencial", titulo: "Git e GitHub essenciais para o curso", duracao: "30min" },
      { numero: 3, slug: "primeiro-prompt", titulo: "Seu primeiro prompt útil no terminal", duracao: "20min" },
    ],
  },
  {
    slug: "01-conhecendo-claude-code",
    ordem: 1,
    titulo: "Conhecendo o Claude Code",
    subtitulo: "Day 0 · Tour",
    dia: "Dia 0",
    resumo: "Entender o que é o Claude Code, como ele lê seu projeto, e o que muda comparado a colar prompt no chat.",
    objetivos: [
      "Entender o modelo mental: agente com acesso ao filesystem, não chatbot.",
      "Conhecer ferramentas (Read, Edit, Write, Bash, Grep).",
      "Distinguir CLI vs IDE vs web app.",
      "Aprender a ler o que o agente faz (logs, edits, comandos).",
    ],
    cor: "#1E4E89",
    licoes: [
      { numero: 1, slug: "agente-vs-chatbot", titulo: "Agente vs chatbot: a diferença que muda tudo", duracao: "25min" },
      { numero: 2, slug: "ferramentas-do-agente", titulo: "As ferramentas que o agente usa", duracao: "30min" },
      { numero: 3, slug: "primeira-tarefa-real", titulo: "Sua primeira tarefa real (refatorar um arquivo)", duracao: "40min" },
    ],
  },
  {
    slug: "02-fundamentos",
    ordem: 2,
    titulo: "Fundamentos · Day 1",
    subtitulo: "Day 1 · Como falar com agente",
    dia: "Dia 1",
    resumo: "Como dar contexto, dividir tarefa, e revisar o que o agente fez. O básico que evita 80% das dores.",
    objetivos: [
      "Aprender a estruturar um pedido (objetivo, restrição, critério de pronto).",
      "Saber quando dividir em sub-tarefas.",
      "Revisar diff antes de aceitar.",
      "Entender o ciclo planeja-faz-revisa.",
    ],
    cor: "#1E4E89",
    licoes: [
      { numero: 1, slug: "anatomia-de-um-bom-pedido", titulo: "Anatomia de um bom pedido", duracao: "30min" },
      { numero: 2, slug: "dar-contexto-sem-poluir", titulo: "Como dar contexto sem poluir", duracao: "25min" },
      { numero: 3, slug: "revisando-diff", titulo: "Revisando o diff: o que sempre olhar", duracao: "30min" },
      { numero: 4, slug: "ciclo-planeja-faz-revisa", titulo: "O ciclo planeja → faz → revisa", duracao: "35min" },
    ],
  },
  {
    slug: "03-steering",
    ordem: 3,
    titulo: "Steering · Day 2",
    subtitulo: "Day 2 · Guiando o agente",
    dia: "Dia 2",
    resumo: "Configurar CLAUDE.md, skills e arquivos de instrução para o agente já entrar na conversa sabendo seu projeto.",
    objetivos: [
      "Escrever um CLAUDE.md útil (não ornamental).",
      "Entender o que é uma skill e quando vale criar uma.",
      "Configurar instruções globais vs por projeto.",
      "Evitar o anti-padrão 'CLAUDE.md gigante e confuso'.",
    ],
    cor: "#173C6E",
    licoes: [
      { numero: 1, slug: "claude-md-na-pratica", titulo: "CLAUDE.md na prática", duracao: "35min" },
      { numero: 2, slug: "skills-quando-criar", titulo: "Skills: quando criar uma", duracao: "30min" },
      { numero: 3, slug: "instrucoes-vivas", titulo: "Mantendo instruções vivas (não fósseis)", duracao: "25min" },
    ],
  },
  {
    slug: "04-planning",
    ordem: 4,
    titulo: "Planning · Day 3",
    subtitulo: "Day 3 · Antes de codar",
    dia: "Dia 3",
    resumo: "Como fazer o agente planejar antes de tocar código, e como você revisa o plano em 2 minutos.",
    objetivos: [
      "Usar plan-mode (ou equivalente) deliberadamente.",
      "Reconhecer um bom plano vs um plano vago.",
      "Quebrar feature em passos verificáveis.",
      "Decidir quando NÃO vale planejar (one-liner).",
    ],
    cor: "#0F2E52",
    licoes: [
      { numero: 1, slug: "porque-planejar", titulo: "Por que planejar antes de codar", duracao: "20min" },
      { numero: 2, slug: "anatomia-de-um-bom-plano", titulo: "Anatomia de um bom plano", duracao: "30min" },
      { numero: 3, slug: "planejando-uma-feature-real", titulo: "Planejando uma feature real", duracao: "45min" },
    ],
  },
  {
    slug: "05-feedback-loops",
    ordem: 5,
    titulo: "Feedback Loops · Day 4",
    subtitulo: "Day 4 · O agente se corrige",
    dia: "Dia 4",
    resumo: "Como configurar testes, lints e evals para o agente saber se errou — sem você ser o validador humano de cada coisinha.",
    objetivos: [
      "Configurar um loop de teste rápido (TDD com agente).",
      "Usar lint/typecheck como guard-rail automático.",
      "Conhecer evals (avaliações automatizadas) com Evalite.",
      "Saber quando o feedback loop está bom (e quando é teatro).",
    ],
    cor: "#0F2E52",
    licoes: [
      { numero: 1, slug: "loops-rapidos-vs-lentos", titulo: "Loops rápidos vs lentos", duracao: "25min" },
      { numero: 2, slug: "tdd-com-agente", titulo: "TDD com agente, sem dor", duracao: "40min" },
      { numero: 3, slug: "intro-a-evals", titulo: "Introdução a Evals (Evalite)", duracao: "35min" },
      { numero: 4, slug: "guard-rails-automaticos", titulo: "Guard-rails automáticos", duracao: "30min" },
    ],
  },
  {
    slug: "06-afk-agents",
    ordem: 6,
    titulo: "AFK Agents · Day 5",
    subtitulo: "Day 5 · Agente que trabalha sozinho",
    dia: "Dia 5",
    resumo: "Sub-agentes, agentes em background e tarefas autônomas. Quando o humano sai da frente, e quando não pode sair.",
    objetivos: [
      "Lançar um sub-agente (Task) com escopo claro.",
      "Rodar agente em background com critério de pronto.",
      "Configurar cron / scheduled triggers (ScheduleWakeup).",
      "Conhecer Sandcastle e padrões AFK.",
    ],
    cor: "#173C6E",
    licoes: [
      { numero: 1, slug: "quando-deixar-agente-sozinho", titulo: "Quando deixar o agente sozinho", duracao: "30min" },
      { numero: 2, slug: "sub-agentes-na-pratica", titulo: "Sub-agentes na prática", duracao: "40min" },
      { numero: 3, slug: "rodando-em-background", titulo: "Rodando em background", duracao: "30min" },
      { numero: 4, slug: "sandcastle-padroes-afk", titulo: "Sandcastle e padrões AFK", duracao: "35min" },
    ],
  },
  {
    slug: "07-hitl",
    ordem: 7,
    titulo: "HITL Patterns · Day 6",
    subtitulo: "Day 6 · Humano no loop",
    dia: "Dia 6",
    resumo: "Quando o humano precisa estar no loop, e como deixar isso explícito. Aprovação, checkpoint e escalação.",
    objetivos: [
      "Identificar pontos de decisão que exigem humano.",
      "Implementar checkpoints de aprovação.",
      "Escalar quando o agente está perdido.",
      "Equilibrar autonomia × segurança.",
    ],
    cor: "#1E4E89",
    licoes: [
      { numero: 1, slug: "onde-o-humano-precisa-estar", titulo: "Onde o humano precisa estar", duracao: "25min" },
      { numero: 2, slug: "checkpoints-explicitos", titulo: "Checkpoints explícitos", duracao: "30min" },
      { numero: 3, slug: "escalando-com-elegancia", titulo: "Escalando com elegância", duracao: "30min" },
      { numero: 4, slug: "encerramento-proximos-passos", titulo: "Encerramento e próximos passos", duracao: "20min" },
    ],
  },
];

export function getModulo(slug: string): Modulo | undefined {
  return cronograma.find((m) => m.slug === slug);
}

export function getLicao(moduloSlug: string, licaoSlug: string) {
  const m = getModulo(moduloSlug);
  if (!m) return undefined;
  const licao = m.licoes.find((l) => l.slug === licaoSlug);
  if (!licao) return undefined;
  return { modulo: m, licao };
}

export function totalLicoes(): number {
  return cronograma.reduce((acc, m) => acc + m.licoes.length, 0);
}

export function licaoId(moduloSlug: string, licaoSlug: string): string {
  return `${moduloSlug}/${licaoSlug}`;
}
