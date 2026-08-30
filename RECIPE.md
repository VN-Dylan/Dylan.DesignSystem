# RECIPE.md — the component contract

> Status: **draft (P0)**. Finalised in P1 alongside the golden-five reference
> components (`Button`, `Input`, `Select`, `Dialog`, `Table`). This file is the
> prompt contract handed to codex for every component batch.

## File layout

Every component lives in `packages/ui/src/<Name>/`:

```
<Name>/
  <Name>.tsx          component + forwardRef
  <Name>.scss         semantic styling (@layer components, @apply, tokens)
  types.ts            public prop types (exported)
  context.ts          only if compound (createContext + use hook)
  <Name>.stories.tsx  every meaningful variant, tags: ['autodocs']
  <Name>.test.tsx     behaviour + a11y (axe)
  index.ts            re-exports
```

Then add the export to `packages/ui/src/index.ts`.

## Rules

1. **No literal design values.** Colours, radii, shadows, durations → Tailwind
   utilities from the preset (`bg-primary`, `rounded-lg`, `shadow`) or
   `var(--dyl-*)` in SCSS. A grep for hex in `src/**/*.{tsx,scss}` must be clean.
2. **Props:** follow the conventions in `DESIGN.md §7`. Types are named
   `<Name>Props`, exported from `types.ts` and the package root.
3. **Ref + native props:** forward `ref`; spread the rest onto the root element.
4. **`className` merge:** use `classNames` from `@dylan-ds/utils`; support the
   function form `(state) => string` where the component has interaction state.
5. **Compound components:** attach parts as static properties
   (`Tabs.TabList = TabList`), share state via context in `context.ts`.
6. **A11y:** correct role/aria, keyboard support, visible focus, focus trap for
   overlays. Test with `axe` — zero violations.
7. **Stories:** one per documented demo in the Eyris reference
   (`docs/reference/eyris-crawl/<name>.json` → `sections` / `code`). `autodocs`
   generates the prop table from TSDoc.
8. **Tests:** cover each variant's observable behaviour + one `axe` assertion.

## codex invocation

```
codex exec --skip-git-repo-check --dangerously-bypass-approvals-and-sandbox \
  -C packages/ui \
  "$(cat RECIPE.md) \
   --- SPEC --- \
   $(node ../../scripts/ds-spec.mjs <name>) \
   --- REFERENCE COMPONENTS --- \
   src/Button/*  src/Input/*  src/Dialog/*"
```

Output is then run through `ds-review` before merge.
