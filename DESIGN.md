# Dylan Design System — DESIGN.md

> Status: **skeleton (P0)**. Sections marked _TBD_ are filled in P1 (tokens) and
> P5 (handbook). This file is the single source of truth for _why_ the system
> looks and behaves as it does; per-component usage lives in Storybook.

---

## 1. What this is

Dylan DS is a production-oriented React component system. It reproduces the
component surface of the Eyris admin template (42 base components, 42 composite
components, 32 utilities) as an independent, self-contained library — no external
UI-kit dependency — built on React 18, Tailwind CSS v3, SCSS and TypeScript.

It is an **internal** system. Component and prop names mirror Eyris for API
familiarity; all brand assets, copy and visual identity are Dylan's own.

## 2. Principles

1. **Token-first.** No component contains a literal colour, radius, shadow or
   duration. Everything resolves through a CSS custom property so themes are a
   runtime concern, not a rebuild.
2. **Composition over configuration.** Compound components (`Tabs.TabList`,
   `Menu.MenuItem`, …) and `className` overrides beat prop explosions.
3. **Accessible by default.** Keyboard operability, focus management, correct
   roles and `axe` cleanliness are acceptance criteria, not follow-ups.
4. **Both themes, always.** Light, dark and RTL are designed together; a change
   that only works in one is unfinished.
5. **Small surface, sharp edges.** Each component ships types, tests, a story and
   an autodoc page. If it is not documented it does not exist.

## 3. Architecture

```
@dylan-ds/tokens  ──►  @dylan-ds/ui  ──►  apps/showcase
@dylan-ds/utils   ──►  (also used by showcase & Storybook)
@dylan-ds/icons   ──►
```

- `tokens` depends on nothing. `utils` depends on nothing (React peer only).
- `ui` depends on `tokens`, `utils`, `icons`.
- Styling split: **Tailwind** for layout and utilities inside JSX;
  **SCSS module** (`Component.scss`) for stateful styling, animation and
  high-specificity selectors, using `@apply` inside `@layer components`.

## 4. Design tokens

_TBD (P1)._ Will document, with tables:

- Colour: neutral ramp, brand family, status hues, semantic surface/text tokens.
- Spacing, radius, typography scale, weights, line-heights.
- Elevation (shadows), z-index layers, motion (durations + easings), breakpoints.

Current source: `packages/tokens/src/styles/*.scss`. Runtime contract:
`:root` (light) → `:root.dark` (dark) → `[data-theme-schema]` (brand hue).

### Preset theme schemas

Eight schemas ported from Eyris — `default, dark, green, purple, orange, cyan,
gold, pink` — each overriding the primary family. Applied at runtime by writing
CSS variables onto `<html>` (see `@dylan-ds/utils` → `useThemeSchema`, P1).

## 5. Theming & modes

- **Dark mode:** `.dark` class on `<html>` (Tailwind `darkMode: 'class'`).
- **Schema:** `data-theme-schema` + inline CSS variables.
- **RTL:** `dir` attribute + CSS logical properties in SCSS.
- Persisted to `localStorage`; managed by a Zustand store in the showcase.

## 6. Accessibility baseline

_TBD (P5)._ Focus-visible rings from `--dyl-ring`, focus trap for overlays,
`prefers-reduced-motion` respected, `axe` in every component test.

## 7. Component API conventions

- Common props: `variant`, `size` (`xs|sm|md|lg`), `shape` (`round|circle|none`),
  `disabled`, `loading`, `block`, `icon`, `active`.
- `className` accepts `string | (state) => string`.
- Every primitive forwards `ref` and spreads native props.
- Compound parts are attached to the root component (`Avatar.Group`).

Full details and the file layout: [`RECIPE.md`](./RECIPE.md).

## 8. Eyris ↔ Dylan mapping

_TBD (P6)._ Table of every Eyris component/prop and its Dylan equivalent,
including deliberate deviations.

## 9. Versioning

Changesets. All `@dylan-ds/*` packages version in lockstep (`fixed`).
`@dylan-ds/showcase` is not published.
