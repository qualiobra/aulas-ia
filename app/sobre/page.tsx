import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Por que este webapp existe, de onde vem o conteúdo, stack técnica e como o progresso é guardado.",
};

export default function SobrePage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-8">
      <nav className="text-xs font-semibold mb-4" style={{ color: "#5A6A7C" }}>
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          ← Cronograma
        </Link>
      </nav>

      <header className="mb-8">
        <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#4A8BC8" }}>
          Sobre este projeto
        </div>
        <h1 className="text-4xl font-extrabold" style={{ color: "#0F2E52", letterSpacing: "-0.02em" }}>
          Por que existo
        </h1>
      </header>

      <article className="prose">
        <p>
          Este é um <strong>webapp pessoal de estudo</strong> do Lucas Araújo (engenheiro civil em
          transição pra tecnologia, dono da Araújo Empreendimentos e da QualiApps). Não é um produto.
          Não é um curso à venda. É um caderno de obra digital pra acompanhar o curso{" "}
          <a
            href="https://www.aihero.dev/cohorts/ai-coding-for-real-engineers-m0k0w"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI Coding for Real Engineers
          </a>{" "}
          do Matt Pocock.
        </p>

        <h2>Por que não usei só o material do Matt direto</h2>
        <p>
          O material do Matt é em inglês, espalhado entre vídeos, repos no GitHub e posts no blog. Pra
          alguém ainda formando o vocabulário de IA + programação, faltava: tradução pra português,
          analogias de obra que conectam com o que eu já sei, ordem fixa por dia, e um lugar único pra
          ver o que já estudei.
        </p>

        <h2>De onde vem o conteúdo</h2>
        <ul>
          <li>
            <strong>Estrutura dos módulos:</strong> ementa pública do curso AI Hero (8 dias de estudo).
          </li>
          <li>
            <strong>Fontes técnicas:</strong> repos gratuitos do Matt no GitHub (mattpocock/skills,
            sandcastle, dictionary-of-ai-coding, evalite, ai-hero, etc.), documentação oficial da
            Anthropic, e os posts que ele escreve no aihero.dev.
          </li>
          <li>
            <strong>Analogias e linguagem:</strong> Iris (assistente IA do Lucas), com revisão
            humana.
          </li>
        </ul>

        <h2>Posso usar?</h2>
        <p>
          Está aberto no GitHub. Se for útil, fork, adapta, refaz com suas próprias analogias. Não é
          substituto do curso pago do Matt — é guia complementar pra quem ta tentando entender o
          terreno.
        </p>

        <h2>Stack técnica</h2>
        <ul>
          <li>Next.js 16 (App Router, Turbopack) + TypeScript</li>
          <li>Tailwind CSS v4</li>
          <li>MDX para o conteúdo das lições</li>
          <li>Zustand + localStorage pra progresso (nada vai pro servidor)</li>
          <li>Design system da Araújo Empreendimentos adaptado pra tela</li>
        </ul>

        <h2>Privacidade</h2>
        <p>
          Seu progresso (lições concluídas, marcadores) fica salvo só no seu navegador via{" "}
          <code>localStorage</code>. Não há login, não há servidor que armazene seu uso. Apagar o
          cache do site = começar do zero.
        </p>

        <p style={{ marginTop: "2rem", fontStyle: "italic", color: "#5A6A7C" }}>
          🌈 Iris · Araújo Empreendimentos · 2026
        </p>
      </article>
    </div>
  );
}
