# Changelog

All notable changes to **showcase** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial React + Tailwind + TypeScript scaffold (Vite).
- Core/UI separation with `src/core` (business logic) and `src/ui` (thin views).
- Vitest setup enforcing 100% coverage on `src/core/**/*.ts`.
- Initial demo panel rendering project name / status / demo info.

### Showcase engine core (#1)

- Pure, router-agnostic showcase engine in `src/core/showcase.ts`: `ShowcaseFile`
  / variant data model (opaque components, no React runtime), validated
  `createShowcaseRegistry`, and state transitions `select`, `toggleExpand`,
  `applyUrlPath`.
- URL encode/decode helpers (`encodeUrlPath` / `decodeUrlPath`) that are
  round-trip safe and handle missing/unknown values.
- 100% line/branch/function/statement coverage on `src/core`.

### Thin showcase UI (#2)

- `Showcase` gallery layout: sidebar header, breadcrumbs (file / variant path),
  sidebar nav with expandable file groups, and a canvas that renders the
  selected variant — all thin, dumb views.
- `useShowcase` view model binding the core engine to the component tree, with
  URL state sync via `window.history` + `popstate` (router-agnostic):
  deep links (`?file=..&showcase=..`), refresh, and back/forward all restore the
  selection.
- Three sample `src/ui/showcases/` demo files (Button, Spinner, Badge) so the
  Pages demo shows real gallery content.
- Component interaction tests (`tests/ui/showcase.test.tsx`) covering render,
  expand/collapse, selection → canvas + URL, deep-link restore, and popstate.
- Dropped the scaffold `DemoPanel` / `useProjectInfo` / `projectInfo` placeholder
  (the demo root now mounts the showcase gallery directly).

### Demo polish + library-entry prep (#3)

- Demo root now renders the `Showcase` gallery (placeholder `DemoPanel` removed).
- README rewritten: live-demo link, quick usage, how to run/build/library
  usage, and a "how to add a showcase file" guide.
- `package.json` library-entry prep for a future `npm publish` (manual):
  `peerDependencies` (`react` / `react-dom`), `files`, `exports`, and
  `main`/`module`/`types` pointing at the built `dist/` bundle.
- Public library entry `src/index.ts` re-exporting the pure core engine, the
  `Showcase` component, `useShowcase`, and the sample docs.
- Library build (`vite.lib.config.ts` + `tsconfig.lib.json` + `npm run build:lib`)
  emitting a reusable ESM bundle and TypeScript declarations.
- Verified `npm pack --dry-run` contains the expected artifacts (bundle, types,
  README, CHANGELOG).
