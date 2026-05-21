import { ReactNode } from "react";

export function Glossario({ termo, children }: { termo: string; children: ReactNode }) {
  return (
    <span className="inline-flex items-baseline gap-0.5 group relative cursor-help" tabIndex={0}>
      <span
        className="underline decoration-dotted decoration-2 underline-offset-4 font-semibold"
        style={{ color: "#1E4E89", textDecorationColor: "#4A8BC8" }}
      >
        {termo}
      </span>
      <span
        className="absolute left-0 top-full mt-1 z-10 hidden group-hover:block group-focus:block w-72 p-3 rounded-md shadow-lg text-sm leading-snug"
        style={{ background: "#0F2E52", color: "#fff", border: "1px solid #173C6E" }}
      >
        <strong className="block mb-1 text-[#A9CFE5] uppercase tracking-wider text-[10px]">Glossário</strong>
        <strong className="block mb-1">{termo}</strong>
        {children}
      </span>
    </span>
  );
}
