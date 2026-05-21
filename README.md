# Aulas IA

Webapp pessoal de estudo do curso **AI Coding for Real Engineers** do Matt Pocock ([aihero.dev](https://www.aihero.dev/cohorts/ai-coding-for-real-engineers-m0k0w)), reorganizado em 8 módulos (28 lições) com analogias de obra civil pra um engenheiro civil em transição pra tech.

Não é um produto comercial nem substitui o curso pago do Matt. É um caderno de obra digital pessoal do Lucas Araújo (Araújo Empreendimentos / QualiApps), publicado aberto pra quem quiser forkar e adaptar.

## Stack

- Next.js 16 (App Router, Turbopack) + TypeScript strict
- Tailwind CSS v4 com design system Araújo (tokens em `app/globals.css`)
- MDX (`@next/mdx`) pro conteúdo das lições
- Zustand + `localStorage` pra progresso de estudo (zero servidor, zero login)
- Plus Jakarta Sans + JetBrains Mono via `next/font`

## Como rodar local

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

## Build de produção

```bash
npm run build
npm start
```

Build gera 42 páginas estáticas (8 módulos + 28 lições + home + glossário + sobre + 404).

## Estrutura

```
app/
  page.tsx                     home / cronograma
  modulo/[slug]/page.tsx       página do módulo
  modulo/[slug]/licao/[licao]/ página da lição (carrega MDX dinâmico)
  glossario/                   16 termos de AI coding
  sobre/                       sobre o projeto
components/                    AnalogiaObra, Callout, Checkpoint,
                               ExercicioPratico, FonteGratis, Glossario,
                               Header, Footer, ProgressoLicao
content/modulos/<slug>/        MDX de cada lição
lib/
  cronograma.ts                fonte da verdade (módulos + lições)
  progresso.ts                 Zustand store persistido em localStorage
mdx-components.tsx             componentes auto-injetados no MDX
```

## Conteúdo

- **Estrutura dos módulos:** ementa pública do curso AI Hero (8 dias de estudo).
- **Fontes técnicas:** repos gratuitos do Matt no GitHub (`mattpocock/skills`, `sandcastle`, `dictionary-of-ai-coding`, `evalite`, `ai-hero-dev/ai-hero`), documentação oficial da Anthropic, posts do aihero.dev.
- **Linguagem / analogias / curadoria:** Iris (assistente IA do Lucas), com revisão humana.

## Licença

MIT. Forka, adapta, refaz com suas próprias analogias.

## Créditos

- [Matt Pocock](https://www.aihero.dev/) pelo curso original, pelos repos abertos e pelo trabalho de difusão.
- [Anthropic](https://docs.claude.com/en/docs/claude-code) pelo Claude Code e pela documentação.

---

🌈 Iris · Araújo Empreendimentos · 2026
