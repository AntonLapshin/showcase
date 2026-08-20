# Slice 01 — Showcase engine core + live demo

> PM plan, generated 2026-08-20. Owner: PM persona (docs for the team).

## Goal

Extract the first meaningful slice of the `showcase` product: a **lightweight,
Storybook-like component gallery**. The scaffold currently only renders a static
project-identity panel; this slice replaces that with the real core engine and
a live, demoable UI. It is the smallest slice that satisfies the manifest's
"small, testable, demoable" goal and unblocks a meaningful GitHub Pages demo.

Reference implementation to extract/polish from:
`/home/auroradev/ws/natalies-corner/web/src/showcase/` (`showcase.tsx` +
`showcases/*.tsx`).

## Scope

1. **Core showcase engine (`src/core`)** — pure TypeScript, no React/DOM.
   - `ShowcaseFile` / `Showcase` data model: a file has a `name` and a map of
     named variant components (as opaque `ComponentType`s so core stays UI-free).
   - `createShowcaseRegistry(files)` — validates the registry (unique names).
   - Selection & expand/collapse **state transitions** — reducer-style pure
     functions: `select`, `toggleExpand`, `applyUrlPath` (decodes
     `file`/`showcase` from URL params into state, with fallbacks when the
     referenced file/showcase does not exist).
   - URL **encode/decode** helpers for the `file` and `showcase` query params
     (must round-trip and handle missing/unknown values).
   - **100% coverage enforced** (already gated by `vite.config.ts`).
2. **Thin showcase UI (`src/ui`)** — dumb presentational layer.
   - `Showcase` layout: sidebar header, breadcrumbs (file / variant path),
     sidebar nav with expandable file groups, canvas that renders the selected
     variant.
   - View model (`useShowcase`) wires core functions to the component; URL
     state sync via `window.history`/`popstate` (no router dependency), kept
     strictly thin — all decisions stay in `src/core`.
   - 2–3 sample `showcases/` demo files (e.g. a Button + Spinner + Badge) so the
     Pages demo shows real content and the sidebar/canvas interaction is visible.
3. **Demo + packaging prep (polish).**
   - Replace the `DemoPanel` placeholder root with the showcase demo app.
   - README: usage + "how to add a showcase file" + link to live demo.
   - `package.json` library-entry prep (peer deps, `files`, `exports`) so the
     follow-up npm publish step has a foundation — **no publish in this slice**.

## Non-goals (this slice)

- npm publishing / CI publishing the package.
- Any backend, persistence, or routing framework (URL state is direct).
- Porting *all* natalies-corner showcases — only representative samples.

## Definition of Done

- [ ] `npm run lint` passes (max-warnings 0).
- [ ] `npm run test` green AND `npm run test:coverage` shows 100% on
      `src/core/**/*.ts` (the existing gate).
- [ ] `npm run build` produces a working production bundle.
- [ ] GitHub Pages demo renders the showcase gallery; selecting a file/variant
      updates the canvas and is reflected in the URL (`?file=..&showcase=..`);
      refresh / back-forward restores selection.

## Suggested issues (one per focus area, ≤ team batch)

1. **`core` showcase registry + selection/expansion/URL state engine** (all
   pure TS, 100% coverage).
2. **thin showcase UI + view model + URL sync + sample demo showcase files**.
3. **demo polish + README + library-entry prep** (no publish).

## Risks / notes

- `use-state-in-url` (used in the source repo) depends on react-router; this
  extraction **intentionally reimplements URL sync with `window.history`** to
  keep the package router-agnostic and the UI layer thin. Core URL (de)serialize
  stays pure+fuzzable.
- Keep the existing core/UI split invariant: no logic in `src/ui`.
