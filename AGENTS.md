# Portfolio

Personal portfolio: a sticky two-column homepage (intro, numbered nav and "now" box on the left; work, about, experience and contact on the right) plus one generated case-study page per project.

- Stack: Next.js 16.4 (App Router), React 19.3, TypeScript 5.9 strict, Tailwind 4.3. pnpm 11.25, not npm.
- Commands: `pnpm dev` (127.0.0.1:3200), `pnpm typecheck`, `pnpm build`, `pnpm check` (both), `pnpm format`.
- Next 16 has breaking changes: read the relevant guide in `node_modules/next/dist/docs/` before writing code.
- All copy and data live in `lib/content.ts`; components only render it. Placeholders are marked TODO.
- Projects: `featured: true` gets the large tile, others get compact cards. A project with `caseStudy` gets `/projects/<slug>` from `app/projects/[slug]/page.tsx`; don't add per-project page files. Assets go in `public/projects/`.
- Proof numbers are copied from each project's own results: update `proofAsOf` with them, and never round up.
- Theme: moss and mint tokens in `app/globals.css` under `@theme`; use them, not raw hex. Mint is for links, active nav and numbers. Fonts: Instrument Serif (names, headings), JetBrains Mono (labels, dates, tags), Inter (body).
- Motion stays subtle: `.rise` (entrance, order via `--i`), `.reveal` (scroll-in), contour drift, cursor glow. All of it must switch off under `prefers-reduced-motion`.
- Read `docs/LEARNINGS.md` before changing routes or the build.
- Done means `pnpm check` passes and the page was looked at in the browser at desktop and phone widths.
