"use client";

import { useEffect, useState } from "react";
import { useProgresso } from "@/lib/progresso";

export function BotaoConcluir({ id }: { id: string }) {
  const [mounted, setMounted] = useState(false);
  const isConcluida = useProgresso((s) => s.isConcluida);
  const toggleConcluida = useProgresso((s) => s.toggleConcluida);

  useEffect(() => setMounted(true), []);

  const concluida = mounted && isConcluida(id);

  return (
    <button
      type="button"
      onClick={() => toggleConcluida(id)}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-semibold text-sm transition-colors"
      style={{
        background: concluida ? "#1F8A5B" : "#1E4E89",
        color: "#fff",
        border: "none",
        cursor: "pointer",
      }}
      aria-pressed={concluida}
    >
      {concluida ? "✓ Lição concluída" : "Marcar lição como concluída"}
    </button>
  );
}

export function ProgressoGeral() {
  const [mounted, setMounted] = useState(false);
  const concluidas = useProgresso((s) => s.concluidas);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const count = Object.values(concluidas).filter(Boolean).length;
  return (
    <span className="text-xs font-semibold" style={{ color: "#5A6A7C" }}>
      {count} {count === 1 ? "lição concluída" : "lições concluídas"}
    </span>
  );
}

export function BarraProgresso({ ids }: { ids: string[] }) {
  const [mounted, setMounted] = useState(false);
  const concluidas = useProgresso((s) => s.concluidas);

  useEffect(() => setMounted(true), []);

  const done = mounted ? ids.filter((id) => concluidas[id]).length : 0;
  const total = ids.length || 1;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs font-semibold" style={{ color: "#5A6A7C" }}>
          {done}/{ids.length} lições
        </span>
        <span className="text-xs font-mono font-semibold" style={{ color: "#1E4E89" }}>
          {pct}%
        </span>
      </div>
      <div className="w-full h-2 rounded-full" style={{ background: "#DEE3E9" }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: pct === 100 ? "#1F8A5B" : "#1E4E89" }}
        />
      </div>
    </div>
  );
}

export function StatusLicao({ id }: { id: string }) {
  const [mounted, setMounted] = useState(false);
  const isConcluida = useProgresso((s) => s.isConcluida);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <span className="w-4 h-4 inline-block" />;

  return isConcluida(id) ? (
    <span
      className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-[11px] font-bold flex-shrink-0"
      style={{ background: "#1F8A5B" }}
      aria-label="Concluída"
    >
      ✓
    </span>
  ) : (
    <span
      className="inline-block w-5 h-5 rounded-full flex-shrink-0"
      style={{ border: "2px solid #C7CDD5" }}
      aria-label="Pendente"
    />
  );
}
