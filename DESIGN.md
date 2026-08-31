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
- Styling split: **Tailwind** for anything expressible as utilities, applied via
  `@apply` in the component's `.scss` (no `@layer` wrapper — the entry
  `styles/index.scss` owns the layers). Plain CSS + `var(--dyl-*)` for the rest
  (z-index, keyframes, overlay scrim). See [`RECIPE.md`](./RECIPE.md).

## 4. Design tokens

Source: `packages/tokens/src/styles/*.scss` → generated to CSS variables
(`@dylan-ds/tokens/css`), a Tailwind preset (`@dylan-ds/tokens/tailwind-preset`)
and TS (`@dylan-ds/tokens`). Runtime contract, in cascade order:
`:root` (light) → `:root.dark` (dark) → `[data-theme-schema]` (brand hue).

Every CSS variable is prefixed `--dyl-`. The Tailwind preset maps them to
semantic utility names (right column).

### Neutral ramp

`--dyl-gray-50` `#fafafa` · `100` `#f5f5f5` · `200` `#e5e5e5` · `300` `#d5d7da` ·
`400` `#a4a7ae` · `500` `#717680` · `600` `#535862` · `700` `#404040` ·
`800` `#262626` · `900` `#171717` · `950` `#0a0a0a` → `gray-50…gray-950`

### Brand & status

| Token | Light | Utility |
| --- | --- | --- |
| `--dyl-primary` | `#286cf0` | `primary` |
| `--dyl-primary-deep` | `#1f56c0` | `primary-deep` |
| `--dyl-primary-mild` | `#4c86f4` | `primary-mild` |
| `--dyl-primary-subtle` | `#286cf0` @ 10% | `primary-subtle` |
| `--dyl-on-primary` | `#ffffff` | `primary-fg` |
| `--dyl-success` / `-subtle` | `#00a85b` | `success` / `success-subtle` |
| `--dyl-error` / `-subtle` | `#eb4137` | `error` / `error-subtle` |
| `--dyl-info` / `-subtle` | `#3380fa` | `info` / `info-subtle` |
| `--dyl-warning` / `-subtle` | `#f59e0b` | `warning` / `warning-subtle` |

### Semantic surface / text (light → dark)

| Token | Light | Dark | Utility |
| --- | --- | --- | --- |
| `--dyl-bg` | `gray-100` | `gray-950` | `bg-bg` |
| `--dyl-surface` | `#ffffff` | `gray-900` | `bg-surface` |
| `--dyl-surface-raised` | `#ffffff` | `gray-800` | `bg-surface-raised` |
| `--dyl-surface-sunken` | `gray-50` | `gray-950` | `bg-surface-sunken` |
| `--dyl-border` | `gray-200` | `gray-800` | `border-border` |
| `--dyl-border-strong` | `gray-300` | `gray-700` | `border-border-strong` |
| `--dyl-text` | `gray-900` | `gray-100` | `text-content` |
| `--dyl-text-muted` | `gray-500` | `gray-400` | `text-content-muted` |
| `--dyl-text-faint` | `gray-400` | `gray-500` | `text-content-faint` |
| `--dyl-overlay` | `gray-950` @ 50% | `#000` @ 60% | `bg-overlay` |

### Scales

| Group | Values | Utility |
| --- | --- | --- |
| Radius | `sm .25rem` · `base .375` · `md .5` · `lg .75` · `xl 1` · `2xl 1.5` · `full` | `rounded-*` |
| Font size | `xs .75rem` … `4xl 2.25rem` (8 steps) | `text-*` |
| Font weight | `normal 400` · `medium 500` · `semibold 600` · `bold 700` | `font-*` |
| Line height | `none 1` · `tight 1.25` · `snug 1.375` · `normal 1.5` · `relaxed 1.625` | `leading-*` |
| Font family | `sans` = Inter stack · `mono` = JetBrains Mono stack | `font-sans` / `font-mono` |
| Shadow | `sm` · `md` (= DEFAULT) · `lg` | `shadow-*` |
| Duration | `fast 120ms` · `base 200ms` · `slow 320ms` | `duration-*` |
| Easing | `standard` · `emphasized` · `exit` | `ease-*` |
| Z-index | `dropdown 1000` · `sticky 1010` · `drawer 1020` · `dialog 1030` · `popover 1040` · `toast 1050` · `tooltip 1060` | `z-*` |
| Breakpoint | `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536` | Tailwind default |

### Known limitation — opacity modifier

Themed colours resolve to `var(--dyl-*)` (not channel triples), so
`bg-primary/40` does **not** work. Use a dedicated token
(`primary-subtle`, `overlay`) or `brightness-*`. Adding `<alpha-value>` channel
variables to the palette is a tracked follow-up (see PROGRESS.md).

### Preset theme schemas

Eight schemas ported from Eyris — `default, dark, green, purple, orange, cyan,
gold, pink` — each overriding the primary family. Applied at runtime by writing
CSS variables onto `<html>`: `useThemeSchema(name, mode)` from `@dylan-ds/utils`,
or `presetThemeSchema` + `themeSchemaToCssVars` from `@dylan-ds/tokens`.

## 5. Theming & modes

- **Dark mode:** `.dark` class on `<html>` (Tailwind `darkMode: 'class'`).
- **Schema:** `data-theme-schema` + inline CSS variables.
- **RTL:** `dir` attribute (`useDirection` from `@dylan-ds/utils`) + CSS logical
  properties in SCSS.
- Colour mode and direction persist to `localStorage` (`useDarkMode`,
  `useDirection`). The showcase app owns the higher-level theme store.

## 6. Accessibility baseline

- Visible `:focus-visible` ring: `ring-2 ring-primary ring-offset-2
  ring-offset-surface`.
- Modal overlays render through `<Portal>`, set `role="dialog"` +
  `aria-modal="true"`, and trap focus with `_internal/useFocusTrap`
  (restoring focus on close).
- `@media (prefers-reduced-motion: reduce)` slows or disables every animation.
- Every component test asserts `expect(await axe(container)).toHaveNoViolations()`.
- Interactive non-`<button>` elements carry an accessible name (axe
  `button-name` / `aria-input-field-name`).

## 7. Component API conventions

- Common props: `variant`, `size` (`xs|sm|md|lg` — Input/Select use `sm|md|lg`),
  `shape` (`round|circle|none`), `disabled`, `loading`, `block`, `icon`,
  `active`, `invalid`.
- Variants are surfaced as `data-*` attributes on the DOM node; SCSS targets
  `&[data-variant='…']`.
- `className` accepts `string | (state) => string` where the component has
  interaction state (see `Button`).
- Every primitive forwards `ref` to its main node and spreads native props.
- Compound parts are attached to the root (`Table.THead`, `Select.Multi`), with
  shared state via context.
- Controlled/uncontrolled through `useControllableState`
  (`value` / `defaultValue` / `onChange`).

Full details and the file layout: [`RECIPE.md`](./RECIPE.md).

## 8. Eyris ↔ Dylan mapping

_TBD (P6)._ Table of every Eyris component/prop and its Dylan equivalent,
including deliberate deviations.

## 9. Versioning

Changesets. All `@dylan-ds/*` packages version in lockstep (`fixed`).
`@dylan-ds/showcase` is not published.
