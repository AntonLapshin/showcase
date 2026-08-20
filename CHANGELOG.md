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

### Planned (Slice 01 — see `plans/slice-01.md`)

- Core showcase engine in `src/core` (registry, selection, expand/collapse, URL
  encode/decode) with 100% coverage.
- Thin showcase UI + view model + window-history URL sync + sample demo
  showcases.
- Demo polish + README usage + library-entry prep in `package.json`.
