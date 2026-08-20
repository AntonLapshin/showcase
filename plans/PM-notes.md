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

---

## Cycle 2026-08-20 (run pm-20260820-181242-251ee072) — re-dispatch

### This dispatch

Dispatched `pm` again with reason "no ready work; 3 open issue(s) remain
unplanned". Re-verified the live GitHub state (scan 22:12, not the stale
pre-issue scan from 21:18):

- **3 open issues** (#1 core engine, #2 thin UI, #3 demo/packaging prep) — all
  filed in the prior planning cycle, all referencing `plans/slice-01.md`.
- **0 open PRs, 0 merged PRs** — no one has picked the issues up yet, so there
  is no in-flight implementation work.
- **CI**: latest `CI` run for `13924d0` completed **success** (lint,
  test:coverage @ 100% core, build).
- Codebase still at scaffold: `src/core` holds only `projectInfo.ts`; `App.tsx`
  still mounts the `DemoPanel` placeholder (Slice 01 unimplemented).
- **Pages deploy still failing** — repo is private and Pages not enabled
  (human-blocked, see above).

### Decision (no plan revision needed)

> Dispatch reason outcome: **SLICE 01 is the ground truth** — the three open
> issues ARE the plan; nothing new to author. The "no ready work" signal means
> the dev persona has not started, not that the plan is missing.

**Plan of record stays `plans/slice-01.md`**, mapped 1:1 to open issues #1–#3.
The issues are implementation-ready and correctly batched (meets
`maxBatchIssues: 3`). No changes to scope, ordering, or DoD.

### Ready-to-pick-up (for the dev persona, batch order)

1. Issue **#1** — core showcase engine (`src/core`): registry, selection,
   expand/collapse, URL (de)serialize. Pure TS, 100% coverage (gate already in
   `vite.config.ts`).
2. Issue **#2** — thin showcase UI + `useShowcase` view model + `window.history`
   URL sync + 2–3 sample showcase files. Depends on #1's core API.
3. Issue **#3** — demo root swap (drop `DemoPanel`), README usage + "add a
   showcase" + live-demo link, and `package.json` library-entry prep (no
   publish). Depends on #2.

Sequential order matters (#1 → #2 → #3) because each later issue builds on the
previous layer; the developer should still branch per issue and merge
incrementally so each merged PR keeps CI green.

### Not done this cycle

- Slice 01 still not implemented (issues open, no PRs) — **this is the only
  blocker to scope done** for Slice 01.
- GitHub Pages demo still human-blocked (private repo / Pages disabled).
- npm publishing still deferred to the human.
