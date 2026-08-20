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

Extract a lightweight, Storybook-like component gallery from
`ws/natalies-corner/web/src/showcase` into this standalone package:

- [ ] Pure core showcase engine in `src/core` (registry, selection,
      expand/collapse, URL encode/decode) with 100% coverage.
- [ ] Thin showcase UI + view model + window-history URL sync + sample demo
      showcase files.
- [ ] Demo polish + README (usage + "add a showcase") + library-entry prep in
      `package.json`.

## Done

- [x] `npm install && npm test && npm run build` pass locally (baseline verified).
