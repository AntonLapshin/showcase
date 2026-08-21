# showcase — Project State

> Current state and progress. Updated by the auto-pi loop as work is done.

## Status

**IN-PROGRESS (slice 03 / m3)** — Slice 01 (m1) and Slice 02 (m2) are complete
and merged. m2 made the library **style-framework agnostic** by fully removing
the TailwindCSS dependency (PRs #13, #14, #15). New README-polish issues #16
(add logo) and #17 (fix auto-pi repo URL) were planned as slice 03 (m3) and are
ready for the Engineer. CI green, 100% core coverage, build passes, Pages demo
live, README demo URL present.

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

## Slice 02 (m2) — COMPLETE (style-framework agnostic)

Triggered by issue **#9**: remove TailwindCSS, use plain CSS so the library is
style-framework agnostic. All three sub-issues merged:

- **#10 (M2-T1)** — rewrite `Showcase.tsx` gallery UI to plain CSS — merged via
  PR #13.
- **#11 (M2-T2)** — rewrite sample showcases (Button/Spinner/Badge) to plain
  CSS — merged via PR #14.
- **#12 (M2-T3)** — remove Tailwind build config, dependency, and README
  mentions — merged via PR #15.

**m2 success criteria met**: no Tailwind dependency at build or runtime; `npm
ci`, `npm run lint`, `npm run test:coverage` (100% core), `npm run build`, and
`npm run build:lib` all green; the Pages demo still renders (HTTP 200).

## Slice 03 (m3) — PLANNED (README polish)

Two new open, unplanned issues were planned as slice 03 and labeled ready:

- **#17** — fix the auto-pi repo URL in the README (`https://github.com/auto-pi/auto-pi`
  → `https://github.com/AntonLapshin/auto-pi`). size:xs, type:feature.
- **#16** — add a logo image to the README. size:xs, type:feature.

Both are labeled `pi:ready` / `size:xs` / `type:feature` / `milestone:m3` and
are ready for the Engineer.

## CI / Pages status

- ✅ CI green on `main`: lint, test:coverage (100% core), and build all pass.
- ✅ GitHub Pages demo **live** at https://AntonLapshin.github.io/showcase/
  (HTTP 200; Pages enabled, `build_type: workflow`, deploy workflow green).

## Done (all milestones — verified 2026-08-21)

- [x] All milestones complete — m1 (PRs #4, #5, #7) and m2 (PRs #13, #14, #15)
      implemented and merged.
- [x] No open issues and no open PRs — nothing in flight.
- [x] CI passes — latest CI runs on `main` are success.
- [x] Tests pass — `npm test`: 36 tests green.
- [x] Core coverage 100% — `npm run test:coverage`: 100% on `src/core/**`.
- [x] Build succeeds — `npm run build` produces a working bundle.
- [x] Pages deployed — demo URL live (HTTP 200).
- [x] README demo URL present.
- [x] Changelog + project-state current.

## Remaining (manual, owner)

- npm publishing of the package (owner publishes manually; prep is in place).
