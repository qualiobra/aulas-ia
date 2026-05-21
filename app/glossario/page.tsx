import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossário",
  description: "Vocabulário de AI coding com analogias de obra civil. Os termos que aparecem ao longo do curso, todos num lugar só.",
};

const termos: { termo: string; def: string; analogia?: string }[] = [
  {
    termo: "Agente",
    def: "Um modelo de IA que não só conversa, mas executa ações (ler arquivos, rodar comandos, editar código). O Claude Code é um agente.",
    analogia: "Pedreiro que entende o projeto, pega ferramenta e executa, vs alguém que só te dá conselho por telefone.",
  },
  {
    termo: "Tool / Ferramenta",
    def: "Função que o agente pode invocar: Read, Write, Edit, Bash, Grep, Glob. É como o agente interage com o mundo real.",
    analogia: "A trena, o nível, a furadeira do pedreiro. O agente sabe quando puxar cada uma.",
  },
  {
    termo: "CLAUDE.md",
    def: "Arquivo de instruções que o Claude Code lê automaticamente ao abrir o projeto. Define regras, contexto e preferências.",
    analogia: "Caderno de obra que o mestre lê antes de começar o dia: o que vale, o que não pode, padrão da empresa.",
  },
  {
    termo: "Skill",
    def: "Bloco reutilizável de instruções + tools que o agente carrega sob demanda. Versionável, testável.",
    analogia: "Procedimento de obra (PEIM, FVS) que padroniza um serviço repetitivo.",
  },
  {
    termo: "Sub-agente",
    def: "Outro agente lançado pelo principal pra fazer uma sub-tarefa em paralelo, com escopo próprio e janela de contexto separada.",
    analogia: "O mestre delegar pra um oficial: 'vai lá, mede e me reporta', enquanto continua o trabalho principal.",
  },
  {
    termo: "Context window",
    def: "Quantidade de texto que o agente consegue 'lembrar' numa conversa. Limitada. Encher de lixo prejudica raciocínio.",
    analogia: "Mesa do engenheiro: se você empilha 20 plantas, ele não acha a que importa. Mantenha só o que tá em uso.",
  },
  {
    termo: "Prompt",
    def: "A instrução que você dá ao agente. Bom prompt = objetivo + contexto + restrição + critério de pronto.",
    analogia: "Ordem de serviço bem escrita: o que fazer, onde, com qual material, e quando considera concluído.",
  },
  {
    termo: "Diff",
    def: "Visualização do que mudou no código: linhas removidas (-) e adicionadas (+). Sempre revise antes de aceitar.",
    analogia: "Comparação foto antes/depois da obra. Não aceita serviço sem olhar.",
  },
  {
    termo: "Plan mode",
    def: "Modo onde o agente planeja antes de tocar código. Você revisa e aprova o plano, depois ele executa.",
    analogia: "Aprovar o cronograma antes de bater concreto. Errar no plano custa caro; errar no executar custa mais.",
  },
  {
    termo: "TDD",
    def: "Test-Driven Development. Escrever o teste antes do código. Com agente: o teste vira o critério de pronto.",
    analogia: "Definir o checklist da FVS antes de executar o serviço. Termina quando todos itens estão OK.",
  },
  {
    termo: "Eval",
    def: "Avaliação automatizada da saída do agente. Permite testar prompts e modelos de forma reproduzível (ex: Evalite).",
    analogia: "Ensaio de laboratório no concreto: você define o critério, mede, e compara entre lotes.",
  },
  {
    termo: "AFK Agent",
    def: "Away From Keyboard. Agente que trabalha sozinho enquanto você faz outra coisa, dentro de limites bem definidos.",
    analogia: "Equipe noturna que executa serviço autorizado e deixa relatório de manhã. Funciona quando o escopo é claro.",
  },
  {
    termo: "HITL",
    def: "Human-In-The-Loop. Padrão onde decisões importantes exigem aprovação humana, mas o resto roda no agente.",
    analogia: "Engenheiro libera concretagem com presença obrigatória; o resto da semana o oficial toca.",
  },
  {
    termo: "Guard-rail",
    def: "Verificação automática que impede o agente de quebrar coisa (typecheck, lint, teste). Falha = pare.",
    analogia: "Linha de vida e EPI. Não impede o trabalho, impede o acidente.",
  },
  {
    termo: "Feedback loop",
    def: "Ciclo curto entre 'agente faz' → 'sistema valida' → 'agente corrige'. Quanto mais rápido, melhor o resultado.",
    analogia: "Aferição com trena durante a execução, não só na entrega. Erro pequeno corrigido na hora.",
  },
];

export default function GlossarioPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-8">
      <nav className="text-xs font-semibold mb-4" style={{ color: "#5A6A7C" }}>
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          ← Cronograma
        </Link>
      </nav>

      <header className="mb-8">
        <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#4A8BC8" }}>
          Referência
        </div>
        <h1 className="text-4xl font-extrabold" style={{ color: "#0F2E52", letterSpacing: "-0.02em" }}>
          Glossário
        </h1>
        <p className="text-base mt-2 leading-relaxed" style={{ color: "#44505F" }}>
          Termos que aparecem ao longo das aulas, em ordem alfabética, com analogia de obra quando faz sentido.
        </p>
      </header>

      <div className="grid gap-4">
        {termos.map((t) => (
          <article
            key={t.termo}
            className="rounded-xl p-5"
            style={{ background: "#fff", border: "1px solid #DCE3EB" }}
          >
            <h2 className="text-lg font-bold mb-1" style={{ color: "#0F2E52" }}>
              {t.termo}
            </h2>
            <p className="text-[15px] leading-relaxed" style={{ color: "#2A3645" }}>
              {t.def}
            </p>
            {t.analogia && (
              <div
                className="mt-3 rounded-md p-3 text-sm leading-relaxed"
                style={{ background: "#F1F6FB", borderLeft: "3px solid #4A8BC8", color: "#1B2738" }}
              >
                <strong style={{ color: "#0F2E52" }}>🏗 Analogia: </strong>
                {t.analogia}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
