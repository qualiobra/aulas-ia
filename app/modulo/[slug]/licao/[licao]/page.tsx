import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cronograma, getLicao, licaoId } from "@/lib/cronograma";
import { BotaoConcluir } from "@/components/ProgressoLicao";

export const dynamicParams = false;

export async function generateStaticParams() {
  return cronograma.flatMap((m) =>
    m.licoes.map((l) => ({ slug: m.slug, licao: l.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; licao: string }>;
}): Promise<Metadata> {
  const { slug, licao } = await params;
  const result = getLicao(slug, licao);
  if (!result) return { title: "Lição não encontrada" };
  const { modulo, licao: l } = result;
  return {
    title: l.titulo,
    description: `Lição ${l.numero} do módulo ${modulo.titulo}. ${modulo.resumo}`,
  };
}

type Params = Promise<{ slug: string; licao: string }>;

export default async function LicaoPage({ params }: { params: Params }) {
  const { slug, licao } = await params;
  const result = getLicao(slug, licao);
  if (!result) return notFound();
  const { modulo, licao: l } = result;

  // Tenta carregar o MDX. Se ainda não existir, mostra placeholder didático.
  let Conteudo: React.ComponentType | null = null;
  try {
    const mod = await import(`@/content/modulos/${modulo.slug}/${l.slug}.mdx`);
    Conteudo = mod.default;
  } catch {
    Conteudo = null;
  }

  const idxNoModulo = modulo.licoes.findIndex((x) => x.slug === l.slug);
  const proxLicao = modulo.licoes[idxNoModulo + 1];
  const antLicao = idxNoModulo > 0 ? modulo.licoes[idxNoModulo - 1] : null;
  const proxModulo = !proxLicao ? cronograma[modulo.ordem + 1] : null;
  const antModulo = !antLicao ? (modulo.ordem > 0 ? cronograma[modulo.ordem - 1] : null) : null;

  return (
    <div className="max-w-3xl mx-auto px-5 py-8">
      <nav className="text-xs font-semibold mb-4 flex items-center gap-2" style={{ color: "#5A6A7C" }}>
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          Cronograma
        </Link>
        <span>·</span>
        <Link href={`/modulo/${modulo.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
          {modulo.titulo}
        </Link>
      </nav>

      <header className="mb-8 pb-6" style={{ borderBottom: "2px solid #E4EEF7" }}>
        <div
          className="text-xs font-bold tracking-widest uppercase mb-2"
          style={{ color: modulo.cor }}
        >
          {modulo.subtitulo} · Lição {l.numero}
          {l.duracao && ` · ${l.duracao}`}
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: "#0F2E52", letterSpacing: "-0.02em" }}>
          {l.titulo}
        </h1>
      </header>

      <article className="prose">
        {Conteudo ? (
          <Conteudo />
        ) : (
          <div
            className="rounded-lg p-6"
            style={{ background: "#FDF4E2", border: "1px solid #C77800" }}
          >
            <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#92580A" }}>
              Conteúdo em produção
            </div>
            <p style={{ color: "#92580A" }}>
              Esta lição ainda não foi escrita. O conteúdo MDX será gerado em{" "}
              <code style={{ background: "rgba(146,88,10,0.1)", padding: "2px 6px", borderRadius: 4 }}>
                content/modulos/{modulo.slug}/{l.slug}.mdx
              </code>
              .
            </p>
          </div>
        )}
      </article>

      <div className="my-10 flex items-center gap-4">
        <BotaoConcluir id={licaoId(modulo.slug, l.slug)} />
      </div>

      <nav
        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6"
        style={{ borderTop: "1px solid #DCE3EB" }}
      >
        {antLicao ? (
          <Link
            href={`/modulo/${modulo.slug}/licao/${antLicao.slug}`}
            className="rounded-md p-3"
            style={{ background: "#F1F6FB", textDecoration: "none", color: "#1E4E89" }}
          >
            <div className="text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ color: "#7C8896" }}>
              ← Anterior
            </div>
            <div className="font-semibold">{antLicao.titulo}</div>
          </Link>
        ) : antModulo ? (
          <Link
            href={`/modulo/${antModulo.slug}`}
            className="rounded-md p-3"
            style={{ background: "#F1F6FB", textDecoration: "none", color: "#1E4E89" }}
          >
            <div className="text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ color: "#7C8896" }}>
              ← Módulo anterior
            </div>
            <div className="font-semibold">{antModulo.titulo}</div>
          </Link>
        ) : (
          <span />
        )}

        {proxLicao ? (
          <Link
            href={`/modulo/${modulo.slug}/licao/${proxLicao.slug}`}
            className="rounded-md p-3 text-right"
            style={{ background: "#1E4E89", color: "#fff", textDecoration: "none" }}
          >
            <div className="text-[10px] font-bold tracking-widest uppercase mb-0.5 opacity-80">
              Próxima lição →
            </div>
            <div className="font-semibold">{proxLicao.titulo}</div>
          </Link>
        ) : proxModulo ? (
          <Link
            href={`/modulo/${proxModulo.slug}`}
            className="rounded-md p-3 text-right"
            style={{ background: "#1E4E89", color: "#fff", textDecoration: "none" }}
          >
            <div className="text-[10px] font-bold tracking-widest uppercase mb-0.5 opacity-80">
              Próximo módulo →
            </div>
            <div className="font-semibold">{proxModulo.titulo}</div>
          </Link>
        ) : (
          <Link
            href="/"
            className="rounded-md p-3 text-right"
            style={{ background: "#1F8A5B", color: "#fff", textDecoration: "none" }}
          >
            <div className="text-[10px] font-bold tracking-widest uppercase mb-0.5 opacity-80">
              Fim do curso 🎉
            </div>
            <div className="font-semibold">Voltar pro cronograma</div>
          </Link>
        )}
      </nav>
    </div>
  );
}
