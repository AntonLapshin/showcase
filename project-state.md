# showcase — Project State

> Current state and progress. Updated by the auto-pi loop as work is done.

## Status

**IN-PROGRESS — Slice 02 (m2)** — Slice 01 remains complete, but a new open
issue (#9) requested making the showcase library **style-framework agnostic**
(remove the TailwindCSS dependency, use plain CSS). That work is now planned as
**Slice 02 / milestone m2** and split into a small batch of 3 issues. The project
is back **in-progress** until m2 is merged and verified.

## What's here

- Vite + React + TypeScript + Tailwind project.
- Core/UI split with `src/core` (business logic) and `src/ui` (thin views).
- Vitest with 100% coverage enforced on `src/core/**/*.ts`.
- Showcase engine core (`src/core/showcase.ts`): registry, selection,
  expand/collapse, and URL encode/decode — pure, router-agnostic, 100% covered.
- Thin showcase UI (`src/ui`): `Showcase` gallery (sidebar, breadcrumbs, canvas),
  `useShowcase` view model with `window.history`/`popstate` URL sync, and three
  sample showcase files (Button, Spinner, Badge).
- Demo root mounts the showcase gallery directly.
- README with usage, "how to add a showcase file", and live-demo link.
- `package.json` library-entry prep (peer deps, `files`, `exports`, `build:lib`)
  ready for a manual `npm publish`.
- CI (`ci.yml`) and GitHub Pages (`deploy-pages.yml`) workflows.

## Slice 01 — COMPLETE

All three Slice 01 issues merged:

- **#1** core showcase engine (`src/core`) — merged via PR #4.
- **#2** thin showcase UI + view model + URL sync + sample showcases — merged
  via PR #5.
- **#3** demo polish + README + library-entry prep — merged via PR #7.

## Slice 02 (m2) — PLANNED (style-framework agnostic)

Triggered by issue **#9**: remove TailwindCSS, use plain CSS so the library is
style-framework agnostic. The core (`src/core`) is already pure TS and
Tailwind-free; Tailwind is confined to the UI layer, `src/styles/index.css`, the
build config, and README. Closed #9 as it was split into a small batch:

- **#10 (M2-T1)** — rewrite `Showcase.tsx` gallery UI to plain CSS
  (`size:s, type:refactor`).
- **#11 (M2-T2)** — rewrite sample showcases (Button/Spinner/Badge) to plain CSS
  (`size:xs, type:refactor`).
- **#12 (M2-T3)** — remove Tailwind build config, dependency, and README mentions
  (`size:xs, type:refactor`).

**m2 success criteria**: no Tailwind dependency at build or runtime; `npm ci`,
`npm run lint`, `npm run test:coverage` (100% core), `npm run build`, and
`npm run build:lib` all green; the Pages demo still renders identically.

## CI / Pages status

- ✅ CI green on `main`: lint, test:coverage (100% core), and build all pass.
- ✅ GitHub Pages demo **live** at https://AntonLapshin.github.io/showcase/
  (HTTP 200; Pages enabled, `build_type: workflow`, deploy workflow green).

## Done (Slice 01 verified 2026-08-21)

- [x] All Slice 01 milestones complete (PRs #4, #5, #7).
- [ ] **Not done** — a new open issue (#9 → m2 batch #10/#11/#12) means there is
      unplanned remaining work, so the project is no longer done.
- [x] CI passes — latest CI run on `main` is success.
- [x] Tests pass — `npm test`: 36 tests green.
- [x] Core coverage 100% — `npm run test:coverage`: 100% on `src/core/**`.
- [x] Build succeeds — `npm run build` produces a working bundle.
- [x] Pages deployed — demo URL live (HTTP 200).
- [x] README demo URL present.
- [x] Changelog + project-state current.

## Remaining (manual, owner)

- npm publishing of the package (owner publishes manually; prep is in place).
