# showcase — Manifest

> Project charter / intent. This file is a living document maintained by the
> auto-pi PM persona as the project evolves.

## Purpose

Implement a new project called Showcase, it's a lightweight alternative to Storybook. It's already implemented in ws/natalies-corner/web project. Your goal is to extract it into a standalone git repository, polish it, create a demo (github page), README and prepare a package for npm publishing (I'll publish it manually).

## Goals

- Deliver a small, testable, demoable slice of the idea.
- Keep all business logic in `src/core` with 100% test coverage.
- Keep the UI layer thin and free of business logic.

## Non-goals (initial slice)

- Anything beyond the minimal viable slice needed for a live demo.

## Success criteria

- [ ] `npm install && npm test && npm run build` pass in CI.
- [ ] A live demo is deployed to GitHub Pages.
- [ ] `src/core/**` holds 100% test coverage.
