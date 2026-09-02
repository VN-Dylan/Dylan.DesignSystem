# SHOWCASE-RECIPE.md — the P4 app-screen contract

The showcase app (`apps/showcase`) rebuilds the Eyris example screens on the
Dylan Design System. P4 C1 built the shell; the area batches (C2+) fill in the
screens. This file is the prompt contract handed to codex for those batches.

The reference screen is **`src/views/sales/SalesDashboardView.tsx`** — read it
in full and mirror its structure, imports and density.

---

## Where things go

```
apps/showcase/src/
  views/<area>/                 one dir per area (sales, projects, analytics, …)
    <Area>DashboardView.tsx     the area's screens, one file per screen
    <Screen>View.tsx
    <area>Routes.tsx            RouteObject[] for the area  ← exported
  mock/<area>.ts                static, deterministic mock data for the area
  components/shared/            cross-area building blocks (already exist):
    PageHeader  KpiCard  ChartCard  StatusTag
```

Then register the area in `src/configs/routes.config.tsx`:
- add `import { <area>Routes } from '@/views/<area>/<area>Routes'`
- spread `...<area>Routes` into the protected `AppLayout` children **and**
  delete that area's entry from the `APP_AREAS` placeholder map.

## Screen shape

```tsx
export function XView() {
  const navigate = useNavigate()
  return (
    <div className="space-y-6">
      <PageHeader title="…" description="…" actions={<Button …/>} />
      {/* content */}
    </div>
  )
}
```

Rules:

1. **Components come from `@vn-dylan/ui`** — never hand-roll a button, table,
   card, input, tabs, dialog, etc. Full inventory: `packages/ui/src/index.ts`.
   Layout/spacing = Tailwind utilities with the semantic token classes
   (`bg-surface`, `text-content`, `text-content-muted`, `border-border`,
   `bg-primary-subtle`, `text-primary`, …). NO literal hex/px colours.
2. **Data comes from `src/mock/<area>.ts`** — you write this file: typed
   `interface`s + exported arrays/objects, static and deterministic (no
   `Math.random`, no `Date.now`). Reuse `src/mock/sales.ts` shapes as a guide.
   Cross-area entities (customers, users) may be imported across mock files.
3. **Money / numbers** → `formatCurrency`, `formatNumber`, `formatRelativeTime`
   from `@vn-dylan/utils`. **Deltas** → `<KpiCard delta>` or `<GrowShrinkTag>`.
   **Status pills** → `<StatusTag tone>` (tone by meaning, not label).
4. **Charts** → `<ChartCard>` (titled card) or `<Chart>` directly. Series/labels
   from mock data. Keep options minimal.
5. **Tables**:
   - simple summary tables → `<Table>` compound (see the dashboard).
   - list screens with paging/sort/selection → `<DataTable>` (TanStack columns).
     Paging is client-side over the mock array — compute the page slice in the
     view, pass `pagingData`, handle `onPaginationChange`/`onSort` with local
     `useState`.
6. **Forms** (new / edit screens): controlled React state, `<Input>`,
   `<Select>`, `<Checkbox>`, `<FormControl>` if available. Submit → validate
   inline → `navigate` to the list/detail route. No backend.
7. **Detail screens** read the `:id` param with `useParams`, look the entity up
   in mock (`getProduct`, `getOrder`, …); if missing, render `<EmptyState>` /
   a "not found" block with a back button.
8. **`useNavigate`** for every cross-screen link — `<Button onClick={() =>
   navigate(path)}>` (our `Button` has no `asChild`). Row clicks navigate to
   the detail route.
9. TSDoc one-liner on every exported view. Match the surrounding code's density.

## Verify — all must pass before finishing

```
pnpm --filter @vn-dylan/showcase exec tsc -p tsconfig.app.json --noEmit
pnpm exec eslint apps/showcase/src
pnpm exec prettier --check 'apps/showcase/src/**/*.{ts,tsx}'
pnpm --filter @vn-dylan/showcase build
```

Fix until green. Do NOT `git commit`. Summarise screens built + judgement calls.
