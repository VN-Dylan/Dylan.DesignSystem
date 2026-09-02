# RECIPE.md — the component contract

Finalised in P1 against the golden-five reference components — **Button, Input,
Select, Dialog, Table** in `packages/ui/src/`. Every component from P2 onward
follows this exactly. This file is the prompt contract handed to codex.

---

## File layout

Each component lives in `packages/ui/src/<Name>/`:

```
<Name>/
  <Name>.tsx          component; forwardRef; imports './<Name>.scss'
  <Name>.scss         semantic styling (see "Styling" below)
  types.ts            public prop types — exported, named <Name>Props etc.
  context.ts          only if compound (createContext + a use<Name>Context hook)
  <Name>.stories.tsx  one story per documented Eyris demo; meta.tags: ['autodocs']
  <Name>.test.tsx     behaviour + one axe() assertion
  index.ts            re-exports component + types
```

Then add the export to `packages/ui/src/index.ts` (component export + `export type`).

Shared building blocks live in `packages/ui/src/_internal/`:
`Portal.tsx`, `useFocusTrap.ts`. Add to these rather than reinventing.

## Component shape

```tsx
import { forwardRef } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { XProps } from './types'
import './X.scss'

export const X = forwardRef<HTMLElement, XProps>(function X(
  { variant = 'default', size = 'md', className, ...rest },
  ref,
) {
  return (
    <element
      ref={ref}
      data-variant={variant}
      data-size={size}
      className={classNames('dyl-x', className)}
      {...rest}
    />
  )
})
```

Rules:

1. **`forwardRef` always**, to the primary DOM node. Spread remaining native
   props onto it (`...rest`).
2. **Variants are `data-*` attributes**, not class permutations
   (`data-variant`, `data-size`, `data-shape`, `data-active`, `data-invalid`,
   `data-disabled`, …). The SCSS targets `&[data-variant='solid']`.
3. **`className` merge** with `classNames` from `@vn-dylan/utils`. Support the
   callback form `(state) => string` where the component exposes interaction
   state (see `Button`).
4. **Prop names & defaults** follow Eyris (`docs/reference/eyris-crawl/<name>.json`
   → the API table). Types are `<Name>Props`, `<Name>Variant`, etc. — exported
   from `types.ts` and re-exported from the package root.
5. **Controlled / uncontrolled** state uses `useControllableState` from
   `@vn-dylan/utils` (`value` / `defaultValue` / `onChange`).
6. **Compound components**: `export const X = Object.assign(XRoot, { Item, … })`,
   share state through context in `context.ts`.
7. **Overlays** (Dialog, Drawer, Popover, Tooltip, Dropdown, Toast) render
   through `<Portal>`, trap focus with `useFocusTrap` when modal, close on Esc /
   outside-click (both configurable), and honour `prefers-reduced-motion`.
   **Anchored** overlays (Popover, Tooltip, Dropdown, Select menu) position with
   `@floating-ui/react` (`useFloating` + `offset`/`flip`/`shift`/`autoUpdate`,
   `useRole`/`useDismiss`/`useInteractions`) — it is an allowed dependency of
   `@vn-dylan/ui`.

## Styling

- **Tailwind** for everything expressible as utilities, via `@apply` inside the
  component's `.scss` — **no `@layer` wrapper** (Tailwind v3 rejects `@layer` in
  files without `@tailwind`; the entry `styles/index.scss` owns the layers).
- Nesting with `&` (Dart Sass). BEM-ish names: `.dyl-x`, `.dyl-x__part`,
  `.dyl-x--modifier`, state via `&[data-*]`.
- **No literal design values.** Colours/radii/shadows/durations come from the
  Tailwind preset (`bg-primary`, `rounded-lg`, `shadow`, `duration-fast`) or
  `var(--dyl-*)` for things the preset doesn't map (z-index, animations,
  `--dyl-overlay`). A hex/rgb/px literal in `src/**/*.{tsx,scss}` fails review.
- **Opacity modifier caveat**: `bg-primary/50` does **not** work — themed colours
  are `var(--dyl-*)`, not channel triples. Use a dedicated token
  (`--dyl-primary-subtle`, `--dyl-overlay`) or `brightness-*`. (Adding
  `<alpha-value>` channel vars to the palette is a tracked follow-up.)
- Keyframes and media queries go at the bottom of the file, outside any selector.

## Accessibility

- Correct role / aria; keyboard operable; visible `:focus-visible` ring
  (`ring-2 ring-primary ring-offset-2 ring-offset-surface`).
- Interactive non-button elements get `aria-label` or an associated label —
  axe's `aria-input-field-name` / `button-name` rules must pass.
- Modal overlays: `role="dialog"` + `aria-modal="true"` + focus trap.
- Every test file ends with `expect(await axe(container)).toHaveNoViolations()`.

## Stories

- `title: '<Group>/<Name>'` — group is the Eyris category (Common, Data Display,
  Forms, Feedback, Navigation) or Primitives.
- `tags: ['autodocs']` on meta. Prop table comes from TSDoc on `types.ts`.
- One story per demo section in the Eyris reference. A `Playground` story with
  `argTypes` controls is encouraged for prop-heavy components.
- Interactive demos: wrap in a local `Demo` component, not hooks in `render`.

## Tests

- Cover each variant's observable behaviour (roles, `aria-*`, callbacks).
- Assert `ref` forwarding for primitives.
- Fake timers (`vi.useFakeTimers()`) for debounce/timeout behaviour.
- Note: `toHaveBeenCalledExactlyOnceWith` is not in vitest 2.1 — use
  `toHaveBeenCalledTimes(1)` + `toHaveBeenCalledWith(...)`.

## codex invocation (P2+)

```
codex exec --skip-git-repo-check --dangerously-bypass-approvals-and-sandbox \
  -C /path/to/repo \
  "$(cat RECIPE.md)

  === SPEC ===
  $(node scripts/ds-spec.mjs <name>)      # emits API table + demo list from the crawl

  === REFERENCE ===
  Read these fully and match their structure:
  packages/ui/src/Button/*  packages/ui/src/Input/*
  packages/ui/src/Dialog/*  packages/ui/src/Select/*  packages/ui/src/Table/*

  Build packages/ui/src/<Name>/ per the recipe. Run:
  pnpm --filter @vn-dylan/ui exec vite build && pnpm test -- <Name>
  Fix until green."
```

Then `ds-review` checks the output before merge.
