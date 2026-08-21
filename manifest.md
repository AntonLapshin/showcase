# showcase — Manifest

> Project charter / intent. This file is a living document maintained by the
> auto-pi PM persona as the project evolves.

## Status

**done** — completed at 2026-08-21T15:33:00Z

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

## Active plan

See [`plans/slice-01.md`](plans/slice-01.md) — the current slice implementing the
showcase engine core, a thin demo UI with sample showcases, and demo/packaging
prep.

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
