# Dylan Design System

A self-contained React design system — component library, design tokens, and a
handbook — reverse-engineered from the Eyris admin template and rebuilt on
**React + Tailwind CSS v3 + SCSS + TypeScript**.

## Packages

| Package | What it is |
| --- | --- |
| `@vn-dylan/tokens` | Design tokens — SCSS source, generated CSS variables, Tailwind preset, 8 preset theme schemas. |
| `@vn-dylan/utils` | Framework hooks and helpers (`classNames`, `useResponsive`, `formatCurrency`, …). |
| `@vn-dylan/icons` | Icon layer — a thin wrapper over `react-icons` (Tabler as the house set). |
| `@vn-dylan/ui` | The React component library — 42 base + 42 composite components. |
| `apps/showcase` | Reference app that rebuilds the Eyris example screens on the system. |

## Getting started

```bash
corepack enable pnpm      # once
pnpm install
pnpm storybook            # handbook + component playground → http://localhost:6006
pnpm dev                  # showcase app → http://localhost:5173
pnpm test                 # unit + a11y tests
pnpm build                # build all packages
```

## Using it in another project

The `@vn-dylan/*` packages publish to GitHub Packages (private, org `VN-Dylan`).
See [`CONSUMING.md`](./CONSUMING.md) for auth, install, the stylesheet, Tailwind
preset and theming. In short:

```bash
# consuming project's .npmrc: @vn-dylan:registry=https://npm.pkg.github.com  (+ token)
pnpm add @vn-dylan/ui
# app entry:  import '@vn-dylan/ui/styles.css'
```

## Documentation

- [`DESIGN.md`](./DESIGN.md) — principles, token anatomy, theming, accessibility.
- [`CONSUMING.md`](./CONSUMING.md) — installing and using the packages downstream.
- [`docs/`](./docs) — getting started, theming guide, the build plan.
- [`docs/reference/`](./docs/reference) — the Eyris exploration report and the raw
  crawl of all 84 component docs + 32 utilities (the implementation spec source).
- [`PROGRESS.md`](./PROGRESS.md) — per-component build status.
- [`RECIPE.md`](./RECIPE.md) — the contract every component follows.

## Status

**P0 — scaffold.** See the [blueprint](./docs/reference/blueprint.html) for the
7-phase plan.
