# showcase

Implement a new project called Showcase, it's a lightweight alternative to Storybook. It's already implemented in ws/natalies-corner/web project. Your goal is to extract it into a standalone git repository, polish it, create a demo (github page), README and prepare a package for npm publishing (I'll publish it manually).

> Generated and maintained by [auto-pi](https://github.com/auto-pi/auto-pi) — an
> autonomous engineering team harness for Pi.

## Demo

Live demo: **[https://AntonLapshin.github.io/showcase/](https://AntonLapshin.github.io/showcase/)**

## Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vitest](https://vitest.dev/) for unit tests, with 100% coverage enforced on `src/core/**/*.ts`

## Getting started

```bash
npm install     # install dependencies
npm run dev     # start the dev server
```

## Scripts

| Script              | Purpose                                    |
|---------------------|--------------------------------------------|
| `npm run dev`       | Start the Vite dev server                  |
| `npm run build`     | Type-check (`tsc`) then build for production |
| `npm run preview`   | Preview the production build locally       |
| `npm run lint`      | Run ESLint                                 |
| `npm test`          | Run unit tests (Vitest)                    |
| `npm run test:coverage` | Run tests and enforce 100% core coverage |

## Architecture

The project enforces a strict **core / UI split** (plan.md §19.1):

- `src/core/**` — pure business logic, no React, no DOM. **100% test coverage is
  required here.**
- `src/ui/**` — thin, dumb view layer (components + view models). Contains no
  business logic; it only renders what `src/core` provides.

## Project documents

- [`manifest.md`](manifest.md) — project charter / intent
- [`project-state.md`](project-state.md) — current state and progress
- [`CHANGELOG.md`](CHANGELOG.md) — versioned change log
