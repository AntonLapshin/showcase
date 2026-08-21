# showcase — Project State

> Current state and progress. Updated by the auto-pi loop as work is done.

## Status

**COMPLETE** — Slice 01 is fully implemented, merged, and verified. The
lightweight Storybook-like showcase gallery is implemented, the GitHub Pages
demo is live, and all done-definition criteria are met. The only remaining
follow-up is manual npm publishing by the owner.

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

## CI / Pages status

- ✅ CI green on `main`: lint, test:coverage (100% core), and build all pass.
- ✅ GitHub Pages demo **live** at https://AntonLapshin.github.io/showcase/
  (HTTP 200; Pages enabled, `build_type: workflow`, deploy workflow green).

## Done (done-definition verified 2026-08-21)

- [x] All milestones complete (Slice 01 merged via PRs #4, #5, #7).
- [x] No open issues (0) and no open PRs (0).
- [x] CI passes — latest CI run on `main` is success.
- [x] Tests pass — `npm test`: 36 tests green.
- [x] Core coverage 100% — `npm run test:coverage`: 100% on `src/core/**`.
- [x] Build succeeds — `npm run build` produces a working bundle.
- [x] Pages deployed — demo URL live (HTTP 200).
- [x] README demo URL present.
- [x] Changelog + project-state current.

## Remaining (manual, owner)

- npm publishing of the package (owner publishes manually; prep is in place).
