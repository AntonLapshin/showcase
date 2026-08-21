# showcase — Manifest

> Project charter / intent. This file is a living document maintained by the
> auto-pi PM persona as the project evolves.

## Status

**in-progress** — Slice 01 done; new unplanned work (issue #9: make the library
style-framework agnostic) is being planned as **Slice 02 / milestone m2**.
(Slice 01 was previously marked done; a new open issue means there is remaining
work, so the project is back in progress.)

## Purpose

Implement a new project called Showcase, it's a lightweight alternative to Storybook. It's already implemented in ws/natalies-corner/web project. Your goal is to extract it into a standalone git repository, polish it, create a demo (github page), README and prepare a package for npm publishing (I'll publish it manually).

## Goals

- Deliver a small, testable, demoable slice of the idea.
- Keep all business logic in `src/core` with 100% test coverage.
- Keep the UI layer thin and free of business logic.

## Product shape

Showcase is a lightweight, Storybook-like component gallery: a registry of
showcase "files" (each with a `meta` name and several variant components), a
sidebar that groups files and lists variants, a canvas that renders the selected
variant, and URL deep-linking (`?file=..&showcase=..`) so selections are
shareable and navigable. The engine lives in `src/core` (pure, router-agnostic);
the UI is a thin view. Reference/most-recent implementation:
`ws/natalies-corner/web/src/showcase/`.

## Milestones

- **m1 — Slice 01 (COMPLETE)**: core showcase engine, thin UI + view model,
  demo polish + README + packaging prep. Merged via PRs #4, #5, #7. CI green,
  100% core coverage, Pages demo live.
- **m2 — Slice 02 (PLANNED)**: make the showcase library **style-framework
  agnostic** by removing the TailwindCSS dependency and using plain CSS. Triggered
  by issue #9. Split into issues M2-T1..M2-T3 below.

## Active plan

- Slice 01: see [`plans/slice-01.md`](plans/slice-01.md) — complete.
- Slice 02 (m2): style-framework-agnostic refactor — remove Tailwind, use plain
  CSS in the gallery UI, sample showcases, and build config; update README.

## Non-goals (initial slice)

- Anything beyond the minimal viable slice needed for a live demo.

## Success criteria

- [x] `npm install && npm test && npm run build` pass in CI (verified green on
      `main`).
- [x] A live demo is deployed to GitHub Pages — **live** at
      https://AntonLapshin.github.io/showcase/ (Pages enabled, deploy workflow
      green, HTTP 200).
- [x] `src/core/**` holds 100% test coverage (gate in `vite.config.ts`; green in
      CI and locally).

## Progress check (Slice 01)

- **Complete.** Issues **#1** core engine, **#2** thin UI, **#3** demo +
  packaging prep all implemented and merged (PRs #4, #5, #7). CI green, 100%
  core coverage, build passes, Pages demo live, README demo link present.
  npm publishing remains a manual follow-up by the owner.

## Progress check (Slice 02 / m2) — PLANNED

- Open issue **#9**: "Get rid of TailwindCSS dependency in the core and only use
  plain css so the library becomes style-framework agnostic."
- The core (`src/core`) is already pure TS and Tailwind-free; the Tailwind usage
  is confined to the **UI layer** (`src/ui`), `src/styles/index.css`, the build
  config (`tailwind.config.ts`, `postcss.config.js`, `package.json` devDeps) and
  `README.md`.
- **Split into 3 small sub-issues (M2-T1..M2-T3)** — gallery UI, sample
  showcases, and build-config/README cleanup.
- Success criteria: no `tailwind` dependency at runtime or build; `npm ci`,
  `npm test`, `npm run test:coverage` (100% core), and `npm run build` all green;
  Pages demo still renders identically.
