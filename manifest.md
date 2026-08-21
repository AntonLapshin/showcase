# showcase — Manifest

> Project charter / intent. This file is a living document maintained by the
> auto-pi PM persona as the project evolves.

## Status

**done** — All milestones complete. Slice 01 (m1) and Slice 02 (m2) are both
implemented and merged. m2 made the showcase library **style-framework agnostic**
by fully removing the TailwindCSS dependency (PRs #13, #14, #15). CI green, 100%
core coverage, build passes, Pages demo live, README demo link present. npm
publishing remains a manual follow-up by the owner.

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
- **m2 — Slice 02 (COMPLETE)**: make the showcase library **style-framework
  agnostic** by removing the TailwindCSS dependency and using plain CSS. Triggered
  by issue #9, split into M2-T1..M2-T3 (#10/#11/#12). All merged via PRs #13, #14,
  #15. CI green, 100% core coverage, build passes, Pages demo still live.

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

## Progress check (Slice 02 / m2) — COMPLETE

- All three m2 sub-issues merged: **#10 (M2-T1)** gallery UI to plain CSS (PR
  #13), **#11 (M2-T2)** sample showcases to plain CSS (PR #14), **#12 (M2-T3)**
  Tailwind build config/dep/README removal (PR #15).
- Success criteria met: no `tailwind` dependency at runtime or build; `npm ci`,
  `npm test`, `npm run test:coverage` (100% core), and `npm run build` all green;
  Pages demo still renders (HTTP 200).

## Completed

- **completed_at:** 2026-08-21T15:06:00Z
- All goals met. Remaining step is the owner's manual `npm publish` (prep is in
  place via `build:lib` + `files`/`exports` in `package.json`).
