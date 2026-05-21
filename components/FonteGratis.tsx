import { ReactNode } from "react";

type Tipo = "repo" | "video" | "post" | "doc" | "tool";

const tipoConfig: Record<Tipo, { label: string; icon: string; color: string }> = {
  repo:  { label: "Repo GitHub",  icon: "</>", color: "#1E4E89" },
  video: { label: "Vídeo",        icon: "▶",   color: "#B43B3B" },
  post:  { label: "Post / Blog",  icon: "✎",   color: "#C77800" },
  doc:   { label: "Documentação", icon: "📄",  color: "#1F8A5B" },
  tool:  { label: "Ferramenta",   icon: "⚙",   color: "#5A6A7C" },
};

export function FonteGratis({
  tipo = "repo",
  titulo,
  url,
  autor,
  stars,
  children,
}: {
  tipo?: Tipo;
  titulo: string;
  url: string;
  autor?: string;
  stars?: string;
  children?: ReactNode;
}) {
  const c = tipoConfig[tipo];
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block my-4 rounded-lg border bg-white p-4 hover:shadow-md transition-shadow no-underline"
      style={{ borderColor: "#DCE3EB" }}
    >
      <div className="flex items-start gap-3">
        <span
          className="inline-flex items-center justify-center w-9 h-9 rounded-md font-mono text-sm font-bold flex-shrink-0"
          style={{ background: c.color, color: "#fff" }}
          aria-hidden
        >
          {c.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span
              className="text-[10px] font-bold tracking-widest uppercase"
              style={{ color: c.color }}
            >
              {c.label}
            </span>
            {autor && <span className="text-xs" style={{ color: "#5A6A7C" }}>· {autor}</span>}
            {stars && <span className="text-xs font-mono" style={{ color: "#C77800" }}>★ {stars}</span>}
          </div>
          <div className="font-semibold mt-0.5" style={{ color: "#0F2E52" }}>{titulo}</div>
          {children && <div className="text-sm mt-1" style={{ color: "#44505F" }}>{children}</div>}
          <div className="text-xs font-mono mt-1.5 truncate" style={{ color: "#7C8896" }}>
            {url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    </a>
  );
}
