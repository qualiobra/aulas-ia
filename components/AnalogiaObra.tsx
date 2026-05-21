import { ReactNode } from "react";

export function AnalogiaObra({ titulo, children }: { titulo?: string; children: ReactNode }) {
  return (
    <div className="my-6 rounded-lg overflow-hidden border" style={{ borderColor: "#CFE3F0", background: "#FAF8F4" }}>
      <div
        className="px-4 py-2 flex items-center gap-3 border-b"
        style={{ background: "#0F2E52", color: "#fff", borderBottomColor: "#173C6E" }}
      >
        <span
          className="inline-flex items-center justify-center w-7 h-7 rounded-md"
          style={{ background: "#4A8BC8", fontSize: 16 }}
          aria-hidden
        >
          🏗
        </span>
        <span className="text-xs font-bold tracking-widest uppercase" style={{ letterSpacing: "0.16em" }}>
          Analogia da obra
        </span>
        {titulo && <span className="text-sm font-semibold ml-1" style={{ color: "#CFE3F0" }}>· {titulo}</span>}
      </div>
      <div className="p-5 text-[15px] leading-relaxed" style={{ color: "#2A3645" }}>
        {children}
      </div>
    </div>
  );
}
