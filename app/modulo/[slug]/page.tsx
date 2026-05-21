import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cronograma, getModulo, licaoId } from "@/lib/cronograma";
import { BarraProgresso, StatusLicao } from "@/components/ProgressoLicao";

export const dynamicParams = false;

export async function generateStaticParams() {
  return cronograma.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const modulo = getModulo(slug);
  if (!modulo) return { title: "Módulo não encontrado" };
  return {
    title: modulo.titulo,
    description: modulo.resumo,
  };
}

export default async function ModuloPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const modulo = getModulo(slug);
  if (!modulo) return notFound();

  const ids = modulo.licoes.map((l) => licaoId(modulo.slug, l.slug));
  const prox = cronograma[modulo.ordem + 1];
  const ant = modulo.ordem > 0 ? cronograma[modulo.ordem - 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-5 py-8">
      <nav className="text-xs font-semibold mb-4" style={{ color: "#5A6A7C" }}>
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          ← Cronograma
        </Link>
      </nav>

      <header
        className="rounded-xl p-6 md:p-8 mb-8 relative overflow-hidden"
        style={{ background: modulo.cor, color: "#fff" }}
      >
        <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#CFE3F0" }}>
          Módulo {String(modulo.ordem).padStart(2, "0")} · {modulo.dia}
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2" style={{ letterSpacing: "-0.02em" }}>
          {modulo.titulo}
        </h1>
        <p className="text-base md:text-lg opacity-90 leading-relaxed max-w-2xl">{modulo.resumo}</p>
      </header>

      <section className="grid md:grid-cols-2 gap-5 mb-8">
        <div className="rounded-xl p-5" style={{ background: "#fff", border: "1px solid #DCE3EB" }}>
          <h3 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#1E4E89" }}>
            Objetivos
          </h3>
          <ul className="space-y-2 text-sm leading-relaxed" style={{ color: "#2A3645" }}>
            {modulo.objetivos.map((o, i) => (
              <li key={i} className="flex gap-2">
                <span className="flex-shrink-0 font-bold" style={{ color: "#1F8A5B" }}>
                  ✓
                </span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl p-5" style={{ background: "#fff", border: "1px solid #DCE3EB" }}>
          <h3 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#1E4E89" }}>
            Progresso do módulo
          </h3>
          <BarraProgresso ids={ids} />
          <p className="text-xs mt-3 leading-relaxed" style={{ color: "#5A6A7C" }}>
            Você pode marcar cada lição como concluída no final dela. O progresso fica salvo só no seu
            navegador.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4" style={{ color: "#0F2E52" }}>
          Lições deste módulo
        </h2>
        <div className="grid gap-3">
          {modulo.licoes.map((l) => (
            <Link
              key={l.slug}
              href={`/modulo/${modulo.slug}/licao/${l.slug}`}
              className="block p-4 rounded-lg transition-colors"
              style={{
                background: "#fff",
                border: "1px solid #DCE3EB",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="flex items-center gap-4">
                <StatusLicao id={licaoId(modulo.slug, l.slug)} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span
                      className="text-[10px] font-bold tracking-widest uppercase"
                      style={{ color: modulo.cor }}
                    >
                      Lição {l.numero}
                    </span>
                    {l.duracao && (
                      <span className="text-[11px]" style={{ color: "#7C8896" }}>
                        · {l.duracao}
                      </span>
                    )}
                  </div>
                  <div className="font-semibold" style={{ color: "#0F2E52" }}>
                    {l.titulo}
                  </div>
                </div>
                <span className="text-xl font-light flex-shrink-0" style={{ color: "#A4ADB8" }}>
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <nav
        className="flex items-center justify-between gap-4 pt-6"
        style={{ borderTop: "1px solid #DCE3EB" }}
      >
        {ant ? (
          <Link
            href={`/modulo/${ant.slug}`}
            className="text-sm font-semibold"
            style={{ color: "#1E4E89", textDecoration: "none" }}
          >
            ← {ant.titulo}
          </Link>
        ) : (
          <span />
        )}
        {prox ? (
          <Link
            href={`/modulo/${prox.slug}`}
            className="text-sm font-semibold text-right"
            style={{ color: "#1E4E89", textDecoration: "none" }}
          >
            {prox.titulo} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
