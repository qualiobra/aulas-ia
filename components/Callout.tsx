import { ReactNode } from "react";

type Tipo = "importa" | "armadilha" | "proximaParada" | "dica" | "info";

const config: Record<Tipo, { label: string; bg: string; border: string; text: string; icon: string }> = {
  importa:       { label: "POR QUE IMPORTA", bg: "#E4EEF7", border: "#1E4E89", text: "#0F2E52", icon: "★" },
  armadilha:     { label: "ARMADILHA",       bg: "#FCEDED", border: "#B43B3B", text: "#8B2C2C", icon: "⚠" },
  proximaParada: { label: "PRÓXIMA PARADA",  bg: "#F1F9F4", border: "#1F8A5B", text: "#14694A", icon: "→" },
  dica:          { label: "DICA",            bg: "#FDF4E2", border: "#C77800", text: "#92580A", icon: "💡" },
  info:          { label: "NOTA",            bg: "#F5F7FA", border: "#5A6A7C", text: "#2A3645", icon: "ℹ" },
};

export function Callout({ tipo = "info", titulo, children }: { tipo?: Tipo; titulo?: string; children: ReactNode }) {
  const c = config[tipo];
  return (
    <div
      className="my-6 rounded-lg p-4 pl-5 border-l-4"
      style={{ background: c.bg, borderLeftColor: c.border }}
    >
      <div
        className="text-xs font-bold tracking-widest mb-1.5 flex items-center gap-2"
        style={{ color: c.text }}
      >
        <span className="text-base leading-none" aria-hidden>{c.icon}</span>
        <span>{titulo || c.label}</span>
      </div>
      <div className="text-[15px]" style={{ color: "var(--ink-800)" }}>{children}</div>
    </div>
  );
}
