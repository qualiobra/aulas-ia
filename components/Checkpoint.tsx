import { ReactNode } from "react";

export function Checkpoint({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 rounded-lg p-6" style={{ background: "#F1F9F4", border: "1px solid #1F8A5B" }}>
      <div className="flex items-center gap-3 mb-3">
        <span
          className="inline-flex items-center justify-center w-9 h-9 rounded-full text-white font-bold text-lg"
          style={{ background: "#1F8A5B" }}
          aria-hidden
        >
          ✓
        </span>
        <h4 className="font-bold text-lg" style={{ color: "#14694A", margin: 0 }}>
          Checkpoint da lição
        </h4>
      </div>
      <div className="text-[15px] leading-relaxed" style={{ color: "#2A3645" }}>{children}</div>
    </div>
  );
}
