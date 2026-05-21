import { ReactNode } from "react";

export function ExercicioPratico({
  numero,
  titulo,
  tempo,
  children,
}: {
  numero?: number;
  titulo: string;
  tempo?: string;
  children: ReactNode;
}) {
  return (
    <div className="my-6 rounded-lg border-2" style={{ borderColor: "#1E4E89", background: "#fff" }}>
      <div
        className="px-5 py-3 flex items-center gap-3 border-b-2"
        style={{ background: "#F1F6FB", borderBottomColor: "#1E4E89" }}
      >
        <span
          className="inline-flex items-center justify-center px-2.5 py-1 rounded text-xs font-bold text-white"
          style={{ background: "#1E4E89", letterSpacing: "0.08em" }}
        >
          EXERCÍCIO {numero ? `#${numero}` : ""}
        </span>
        <h4 className="font-bold text-base flex-1" style={{ color: "#0F2E52", margin: 0 }}>{titulo}</h4>
        {tempo && (
          <span className="text-xs font-semibold" style={{ color: "#5A6A7C" }}>
            <span aria-hidden>⏱</span> {tempo}
          </span>
        )}
      </div>
      <div className="p-5 text-[15px] leading-relaxed" style={{ color: "#1B2738" }}>
        {children}
      </div>
    </div>
  );
}
