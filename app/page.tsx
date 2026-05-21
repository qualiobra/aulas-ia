import Link from "next/link";
import { cronograma, licaoId, totalLicoes } from "@/lib/cronograma";
import { BarraProgresso, StatusLicao } from "@/components/ProgressoLicao";

export default function Home() {
  const total = totalLicoes();
  const allIds = cronograma.flatMap((m) => m.licoes.map((l) => licaoId(m.slug, l.slug)));

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      {/* Hero */}
      <section
        className="rounded-2xl p-8 md:p-12 mb-10 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0F2E52 0%, #1E4E89 50%, #2A6BAE 100%)", color: "#fff" }}
      >
        <div
          className="absolute right-0 top-0 w-64 h-64 rounded-full opacity-20 -translate-y-20 translate-x-20"
          style={{ background: "radial-gradient(circle, #A9CFE5 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-3xl">
          <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#A9CFE5" }}>
            Estudo guiado · Lucas Araújo
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3" style={{ letterSpacing: "-0.02em" }}>
            AI Coding for Real Engineers
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-6 leading-relaxed">
            Plano de estudo do curso de Matt Pocock, traduzido pra português com analogias de obra e
            recheado com as fontes gratuitas que ele mesmo publica.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="px-3 py-1.5 rounded-full font-semibold" style={{ background: "rgba(255,255,255,0.15)" }}>
              8 módulos · {total} lições
            </span>
            <span className="px-3 py-1.5 rounded-full font-semibold" style={{ background: "rgba(255,255,255,0.15)" }}>
              ~24 h de estudo
            </span>
            <span className="px-3 py-1.5 rounded-full font-semibold" style={{ background: "rgba(255,255,255,0.15)" }}>
              Fontes 100% grátis
            </span>
          </div>
        </div>
      </section>

      {/* Progresso global */}
      <section
        className="rounded-xl p-5 mb-8 flex flex-col md:flex-row md:items-center gap-4"
        style={{ background: "#fff", border: "1px solid #DCE3EB" }}
      >
        <div className="flex-1">
          <div className="font-bold text-base mb-1" style={{ color: "#0F2E52" }}>
            Seu progresso
          </div>
          <BarraProgresso ids={allIds} />
        </div>
        <Link
          href={`/modulo/${cronograma[0].slug}/licao/${cronograma[0].licoes[0].slug}`}
          className="px-5 py-2.5 rounded-md font-semibold text-sm whitespace-nowrap"
          style={{ background: "#1E4E89", color: "#fff", textDecoration: "none" }}
        >
          Começar do início →
        </Link>
      </section>

      {/* Cronograma */}
      <section>
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-2xl font-bold" style={{ color: "#0F2E52" }}>
            Cronograma
          </h2>
          <span className="text-sm font-semibold" style={{ color: "#5A6A7C" }}>
            8 dias · 1 dia por módulo
          </span>
        </div>

        <div className="grid gap-4">
          {cronograma.map((m) => {
            const ids = m.licoes.map((l) => licaoId(m.slug, l.slug));
            return (
              <article
                key={m.slug}
                className="rounded-xl overflow-hidden"
                style={{ background: "#fff", border: "1px solid #DCE3EB" }}
              >
                <Link
                  href={`/modulo/${m.slug}`}
                  className="block p-5 md:p-6 hover:bg-[#F5F7FA] transition-colors"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex flex-col items-center justify-center w-14 h-14 rounded-lg font-bold text-white flex-shrink-0"
                      style={{ background: m.cor }}
                    >
                      <span className="text-[10px] tracking-widest uppercase opacity-80">Mod</span>
                      <span className="text-xl leading-none">{String(m.ordem).padStart(2, "0")}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: m.cor }}>
                        {m.subtitulo}
                      </div>
                      <h3 className="text-xl font-bold mb-1" style={{ color: "#0F2E52" }}>
                        {m.titulo}
                      </h3>
                      <p className="text-sm leading-relaxed mb-3" style={{ color: "#44505F" }}>
                        {m.resumo}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap text-xs" style={{ color: "#5A6A7C" }}>
                        <span className="font-semibold">{m.licoes.length} lições</span>
                        <span>·</span>
                        <div className="flex items-center gap-1.5">
                          {ids.map((id) => (
                            <StatusLicao key={id} id={id} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-2xl font-light flex-shrink-0" style={{ color: "#A4ADB8" }}>
                      →
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
