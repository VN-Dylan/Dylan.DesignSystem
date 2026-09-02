# Dylan Design System — DESIGN.md

> This file is the single source of truth for _why_ the system looks and behaves
> as it does; per-component usage lives in Storybook. The **Handbook** section of
> Storybook (`docs/handbook/*`) is the browsable, example-backed version of this
> document.

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

Fuller version, with the build/bundle strategy and the monorepo layout: the
**Handbook → Architecture** page in Storybook (`docs/handbook/Architecture.mdx`).

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

### Opacity modifier

`primary`, `success`/`error`/`info`/`warning`, `content` and `gray` each ship a
`--dyl-*-channel` R G B triplet and resolve through `rgb(var(...) /
<alpha-value>)`, so `bg-primary/40`, `text-content/60`, etc. work. Colours
without a channel var — `surface`, `border`, `bg`, `overlay` — stay solid-only;
reach for `-subtle`, `overlay`, or `brightness-*` there instead.

### Preset theme schemas

Eight schemas ported from Eyris — `default, dark, green, purple, orange, cyan,
gold, pink` — each overriding the primary family. Applied at runtime by writing
CSS variables onto `<html>`: `useThemeSchema(name, mode)` from `@dylan-ds/utils`,
or `presetThemeSchema` + `themeSchemaToCssVars` from `@dylan-ds/tokens`.

## 5. Theming & modes

- **Dark mode:** `.dark` class on `<html>` (Tailwind `darkMode: 'class'`).
- **Schema:** `data-theme-schema` + inline CSS variables.
- **RTL:** `dir` attribute (`useDirection` from `@dylan-ds/utils`). Component SCSS
  is fully logical — both plain CSS and the Tailwind `@apply` layer (`ps`/`pe`/
  `ms`/`me`/`start`/`end`/`text-start`/`rounded-s`); transform offsets carry an
  `rtl:` override. A few things stay physical by design (Drawer `placement`,
  Slider fill, Gantt timeline). Storybook has a **Direction** toolbar.
- Colour mode and direction persist to `localStorage` (`useDarkMode`,
  `useDirection`). The showcase app owns the higher-level theme store.

## 6. Accessibility baseline

- Visible `:focus-visible` ring: `ring-2 ring-primary ring-offset-2
  ring-offset-surface`.
- Modal overlays render through `<Portal>`, set `role="dialog"` +
  `aria-modal="true"`, and trap focus with `_internal/useFocusTrap` — moves focus
  in on open (deferred until the portal node mounts), cycles Tab / Shift-Tab, and
  restores focus to the opener on close.
- Roving-tabindex composites (`Tabs`, `Segment`, the `Calendar` day grid) expose
  one tab stop and move focus with the arrow keys + Home/End; single-select
  groups move the selection with focus.
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

The system reproduces the Eyris component surface 1:1 by name; the import alias
is the only expected change. The **Handbook → Eyris Mapping** page in Storybook
(`docs/handbook/EyrisMapping.mdx`) records coverage and every deliberate
deviation — `Button` has no `asChild`, `FullCalendar`/`GanttChart` are
dependency-free, 3 app-coupled utilities live in the showcase, etc.

## 9. Versioning & publishing

Changesets. All `@dylan-ds/*` packages version in lockstep (`fixed`).
`@dylan-ds/showcase` is not published.

Published to **GitHub Packages** (`npm.pkg.github.com`, private, org `dylan-ds`).
The `.github/workflows/release.yml` workflow turns merged changesets into a
version PR, then on merge runs `pnpm release` to publish. Consuming a package
downstream: [`CONSUMING.md`](./CONSUMING.md).
