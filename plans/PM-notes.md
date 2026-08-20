# PM Notes

> Cycle-by-cycle notes from the auto-pi PM persona: decisions, the plan of
> record, and what the team should pick up next.

## Cycle 2026-08-20 (run pm-20260820-171827-be7b94eb)

### New this cycle (re-invocation)

- **CI now green on `main`**: latest `CI` run for `13924d0` completed **success**
  (33s) — `npm ci`, lint, test:coverage (100% core), and build all pass in CI.
  This confirms the scaffold success criterion `npm install && npm test && npm
  run build` now holds **in CI**, not just locally.
- **GitHub Pages deploy is FAILING** — `Deploy to GitHub Pages` run for
  `13924d0` failed at the `actions/configure-pages` step:
  > Get Pages site failed. Please verify that the repository has Pages enabled
  > and configured to build using GitHub Actions.

  Root cause confirmed: the repo is **PRIVATE** (`visibility: private`) and
  Pages **not enabled** (`has_pages: false`). Attempting to create the Pages
  site via the API returns HTTP 422: *"Your current plan does not support
  GitHub Pages for this repository."* Private repos need a paid GitHub plan
  for Pages.

  **Blocked on HUMAN action** (auto-pi cannot unblock): the owner must either
  (a) enable GitHub Pages for the repo in Settings → Pages, or (b) make the
  repo **public** (then Pages needs enabling too). Until then the live-demo
  success criterion cannot be verified end-to-end.

### Plan status

Slice 01 plan is unchanged and still the plan of record — the Pages blocker is
infrastructure/settings, not Slice 01 code scope. The team can implement and
verify Slice 01 locally (`npm run dev` / `npm run preview`) regardless; Pages
wire-up is already in `deploy-pages.yml` and will succeed once the repo is
Pages-enabled.

### Decision (from the prior planning cycle, still in force)

Dispatch was `pm` with no open issues/PRs and no merged PRs yet — so the team
is idle and the PM's job is to make the *next slice* implementation-ready.

**Plan of record: `plans/slice-01.md`** (authored in the prior planning cycle).
It is complete, well-scoped, and ready for the team to execute. No plan
revision was needed this cycle.

### State verified this cycle

- Scaffold baseline is healthy: `npm run test` green (7 tests),
  `npm run test:coverage` green at **100%** on `src/core/**/*.ts`.
- CI (`ci.yml`) and GitHub Pages (`deploy-pages.yml`) workflows are present but
  **have never run** — no push has happened since the scaffold commit
  (`f3cd7a7`), so no merged PRs / workflow runs exist yet.
- `plans/slice-01.md` already carries a suggested **3-issue** breakdown, which
  fits the `maxBatchIssues: 3` limit in `.pi/config.json`.

### Ready-to-pick-up (Slice 01 — batched, ≤ 3 issues)

1. **core** showcase registry + selection / expand-collapse / URL state engine
   (pure TS, 100% coverage enforced).
2. **thin showcase UI** + view model + window-history URL sync + sample demo
   showcase files.
3. **demo polish** + README usage + library-entry prep in `package.json`
   (no publish this slice — that stays manual).

Guidance for the implementer (from the plan's risks section): reimplement URL
sync with `window.history` (no `use-state-in-url` / react-router dependency) so
the package stays router-agnostic and the UI layer stays thin. All decisions
live in `src/core`.

### Not done this cycle

- Slice 01 not implemented (awaits team).
- No GitHub Pages demo deployed yet (awaits `main` push + workflow run).
- npm publishing intentionally deferred to the human.
