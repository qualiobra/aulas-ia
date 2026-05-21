export function Footer() {
  return (
    <footer
      className="mt-20 py-8"
      style={{ borderTop: "1px solid #DCE3EB", background: "#fff" }}
    >
      <div
        className="max-w-6xl mx-auto px-5 text-xs flex flex-wrap items-center justify-between gap-3"
        style={{ color: "#7C8896" }}
      >
        <div>
          Aulas IA · estudo pessoal baseado no curso{" "}
          <a
            href="https://www.aihero.dev/cohorts/ai-coding-for-real-engineers-m0k0w"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1E4E89", textDecoration: "underline" }}
          >
            AI Coding for Real Engineers
          </a>{" "}
          de Matt Pocock.
        </div>
        <div className="font-mono">v0.1 · Araújo Empreendimentos</div>
      </div>
    </footer>
  );
}
