import Link from "next/link";
import Image from "next/image";
import { ProgressoGeral } from "./ProgressoLicao";

export function Header() {
  return (
    <header
      className="sticky top-0 z-30 backdrop-blur"
      style={{ background: "rgba(255,255,255,0.92)", borderBottom: "1px solid #DCE3EB" }}
    >
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center gap-5">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <Image
            src="/araujo-symbol.png"
            alt="Araújo"
            width={32}
            height={32}
            className="rounded"
          />
          <div className="leading-tight">
            <div className="font-extrabold text-[15px]" style={{ color: "#0F2E52", letterSpacing: "-0.01em" }}>
              Aulas IA
            </div>
            <div className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "#4A8BC8" }}>
              Estudo · Lucas Araújo
            </div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 ml-6 text-sm font-semibold" style={{ color: "#44505F" }}>
          <Link href="/" className="hover:text-[#0F2E52]" style={{ textDecoration: "none", color: "inherit" }}>
            Cronograma
          </Link>
          <Link href="/glossario" className="hover:text-[#0F2E52]" style={{ textDecoration: "none", color: "inherit" }}>
            Glossário
          </Link>
          <Link href="/extras/art" className="hover:text-[#0F2E52]" style={{ textDecoration: "none", color: "inherit" }}>
            Bônus: ART
          </Link>
          <Link href="/sobre" className="hover:text-[#0F2E52]" style={{ textDecoration: "none", color: "inherit" }}>
            Sobre
          </Link>
        </nav>
        <div className="ml-auto">
          <ProgressoGeral />
        </div>
      </div>
    </header>
  );
}
