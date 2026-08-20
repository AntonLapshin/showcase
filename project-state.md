# showcase — Project State

> Current state and progress. Updated by the auto-pi loop as work is done.

## Status

**Scaffolded / Slice 01 planned** — the React + Tailwind + TypeScript skeleton is
in place and `npm install && npm test && npm run build` pass. The next slice
(Slice 01) implements the real showcase engine core and a live demo.

## What's here

- Vite + React + TypeScript + Tailwind project scaffold.
- Core/UI split with `src/core` (business logic) and `src/ui` (thin views).
- Vitest with 100% coverage enforced on `src/core/**/*.ts`.
- Initial scaffold demo panel (placeholder — to be replaced by the real
  showcase gallery in Slice 01).
- CI (`ci.yml`) and GitHub Pages (`deploy-pages.yml`) workflows.

## Next slice — Slice 01 (see `plans/slice-01.md`)

> Implementation-ready. Issues **#1–#3** are open, batched (max 3), labeled
> `pi:ready` (with `size`, `type:feature`, `milestone:m1`, and `pi:issue-id`
> markers M1-T1/T2/T3 for idempotency), and ready for the Engineer to pick up
> in order #1 → #2 → #3. Latest PM notes: `plans/PM-notes.md`.

Extract a lightweight, Storybook-like component gallery from
`ws/natalies-corner/web/src/showcase` into this standalone package:

- [ ] Pure core showcase engine in `src/core` (registry, selection,
      expand/collapse, URL encode/decode) with 100% coverage.
- [ ] Thin showcase UI + view model + window-history URL sync + sample demo
      showcase files.
- [ ] Demo polish + README (usage + "add a showcase") + library-entry prep in
      `package.json`.

## CI / Pages status

- ✅ CI green on `main` (`13924d0`): lint, test:coverage (100% core), and build
  all pass in CI.
- 🚧 GitHub Pages deploy is **failing** — `actions/configure-pages` reports
  "Pages site not found / your current plan does not support GitHub Pages for
  this repository." The repo is **private** with Pages **not enabled**.
  **Blocked on human action**: enable Pages in repo Settings → Pages, or make
  the repo public. See `plans/PM-notes.md`.

## Done

- [x] `npm install && npm test && npm run build` pass locally (baseline verified).
- [x] `npm install && npm test && npm run build` pass in CI (`ci.yml`).
