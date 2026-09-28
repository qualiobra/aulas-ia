import Link from "next/link";
import type { Metadata } from "next";
import Conteudo from "@/content/extras/art-openpipe.mdx";

export const metadata: Metadata = {
  title: "ART (OpenPipe) explicado",
  description:
    "Aula bônus em vídeo: como o ART, da OpenPipe, treina agentes de IA com aprendizado por reforço (GRPO + RULER).",
};

export default function ArtPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-8">
      <nav className="text-xs font-semibold mb-4" style={{ color: "#5A6A7C" }}>
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          ← Cronograma
        </Link>
      </nav>

      <header className="mb-8 pb-6" style={{ borderBottom: "2px solid #E4EEF7" }}>
        <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#C77800" }}>
          Bônus · Vídeo · ~6min
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: "#0F2E52", letterSpacing: "-0.02em" }}>
          ART: treinando agentes com aprendizado por reforço
        </h1>
      </header>

      <video
        controls
        preload="metadata"
        playsInline
        poster="/videos/art-openpipe-poster.jpg"
        className="w-full rounded-xl mb-8"
        style={{ aspectRatio: "16 / 9", background: "#0F2E52" }}
      >
        <source src="/videos/art-openpipe.mp4" type="video/mp4" />
        Seu navegador não suporta vídeo. <a href="/videos/art-openpipe.mp4">Baixe o MP4</a>.
      </video>

      <article className="prose">
        <Conteudo />
      </article>
    </div>
  );
}
