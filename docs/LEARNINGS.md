# Learnings

- **2026-11-06 · Deleting a route breaks typecheck until the dev server reruns.** `tsconfig.json` includes `.next/dev/types`, which `next dev` writes. After removing `app/projects/fieldwork/page.tsx`, both `pnpm typecheck` and `pnpm build` failed with "Cannot find module …/fieldwork/page.js". Fix: start `pnpm dev` and request any page so it regenerates the types, then rerun `pnpm check`.
- **2026-11-06 · Screenshots of the hidden browser pane can show half-faded text.** A hidden pane runs as a background page, so CSS entrance animations don't advance until something interacts with it. Check `element.getAnimations()` or computed opacity before treating it as a bug.
