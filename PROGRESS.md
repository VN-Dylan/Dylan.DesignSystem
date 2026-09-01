# PROGRESS.md — build tracker

Legend: ☐ todo · ◑ in progress · ☑ done · — n/a. Columns: spec · impl · test · story · review.

## Base UI components — 41/41 (icons = n/a)

| Component | done | notes |
| --- | :-: | --- |
| `action-bar` | ☑ |  |
| `alert` | ☑ |  |
| `avatar` | ☑ |  |
| `badge` | ☑ |  |
| `button` | ☑ |  |
| `calendar` | ☑ | full month/year picker views + exotic label-format props still stubbed |
| `cards` | ☑ |  |
| `carousel` | ☑ |  |
| `checkbox` | ☑ |  |
| `collapsible` | ☑ |  |
| `date-picker` | ☑ | see calendar note |
| `dialog` | ☑ |  |
| `drawer` | ☑ |  |
| `dropdown` | ☑ |  |
| `form-control` | ☑ |  |
| `grid` | ☑ |  |
| `icons` | — | n/a — @dylan-ds/icons |
| `input` | ☑ |  |
| `input-group` | ☑ |  |
| `menu` | ☑ |  |
| `multi-value-input` | ☑ |  |
| `pagination` | ☑ |  |
| `popover` | ☑ |  |
| `progress` | ☑ |  |
| `radio` | ☑ |  |
| `scroll` | ☑ |  |
| `segment` | ☑ |  |
| `select` | ☑ |  |
| `skeleton` | ☑ |  |
| `slider` | ☑ |  |
| `spinner` | ☑ |  |
| `steps` | ☑ |  |
| `switcher` | ☑ |  |
| `table` | ☑ |  |
| `tabs` | ☑ |  |
| `tag` | ☑ |  |
| `time-input` | ☑ |  |
| `timeline` | ☑ |  |
| `toast` | ☑ |  |
| `tooltip` | ☑ |  |
| `typography` | ☑ |  |
| `upload` | ☑ |  |

## Composite / shared components — 42/42

| Component | done | notes |
| --- | :-: | --- |
| `action-link` | ☑ |  |
| `advanced-filter-builder` | ☑ |  |
| `affix` | ☑ |  |
| `authority-check` | ☑ |  |
| `auto-complete` | ☑ |  |
| `chart` | ☑ | apexcharts (external) |
| `clock-progress` | ☑ |  |
| `confirm-dialog` | ☑ |  |
| `container` | ☑ |  |
| `custom-format-input` | ☑ |  |
| `data-table` | ☑ | @tanstack/react-table (external) |
| `debounce-input` | ☑ |  |
| `divider` | ☑ |  |
| `empty-state` | ☑ |  |
| `file-icon` | ☑ |  |
| `full-calendar` | ☑ | dependency-free month view; week/day/list + drag not included |
| `gantt-chart` | ☑ | dependency-free |
| `grow-shrink-tag` | ☑ |  |
| `histogram` | ☑ |  |
| `icon-frame` | ☑ |  |
| `info-bar` | ☑ |  |
| `loaders` | ☑ |  |
| `loading` | ☑ |  |
| `nav-toggle` | ☑ |  |
| `numeric-input` | ☑ |  |
| `numeric-input-stepper` | ☑ |  |
| `otp-input` | ☑ |  |
| `overflow-tabs` | ☑ |  |
| `password-input` | ☑ |  |
| `pattern-input` | ☑ |  |
| `popover-filter` | ☑ |  |
| `reaction-emoji-picker` | ☑ |  |
| `rich-text-editor` | ☑ | Tiptap / @tiptap/* (external) |
| `segment-progress-bar` | ☑ |  |
| `select-extension` | ☑ |  |
| `statistic-card` | ☑ |  |
| `sticky-region` | ☑ |  |
| `syntax-highlighter` | ☑ | react-syntax-highlighter (external); PrismLight + registered common grammars |
| `toggle-drawer` | ☑ |  |
| `users-avatar-group` | ☑ |  |
| `vector-map` | ☑ | jsvectormap (external) |
| `wizard` | ☑ |  |

## Utilities — 24/32 (+1 stub, 7 deferred)

| Utility | status |
| --- | :-: |
| `acronym` | ☑ |
| `classNames` | ☑ |
| `cookies-storage` | ☑ |
| `file-size-unit` | ☑ |
| `format-currency` | ☑ |
| `format-currency-compact` | ☑ |
| `format-number` | ☑ |
| `format-relative-time` | ☑ |
| `get-contrast` | ☑ |
| `highlight-search-match` | ☑ |
| `is-last-child` | ☑ |
| `paginate` | ☑ |
| `sleep` | ☑ |
| `sort-by` | ☑ |
| `use-append-query-params` | — deferred |
| `use-auth` | — deferred |
| `use-dark-mode` | ☑ |
| `use-data-table-state` | — deferred |
| `use-debounce` | ☑ |
| `use-direction` | ☑ |
| `use-interval` | ☑ |
| `use-layout` | — deferred |
| `use-menu-active` | — deferred |
| `use-query-param-paging-state` | — deferred |
| `use-random-color` | ☑ |
| `use-responsive` | ☑ |
| `use-scroll-top` | ☑ |
| `use-theme-schema` | ☑ |
| `use-time-out-message` | ☑ |
| `use-translation` | ☑ stub |
| `wild-card-search` | ☑ |
| `with-header-item` | — deferred |

## Phases

| Phase | Scope | Status |
| --- | --- | --- |
| P0 | Scaffold & infra | ☑ |
| P1 | Tokens + 24 utils + golden 5 + RECIPE | ☑ |
| P2 | Base components (41/41, icons n/a) | ☑ |
| P3 | 42 composite components | ☑ 42/42 |
| P4 | Layouts + example app + auth | ☑ C1–C7 done |
| P5 | Handbook | ◑ 8 Storybook MDX pages drafted (`docs/handbook/*`) |
| P6 | QA & hardening | ◑ bundle split · token guard · RTL parity · focus-trap fix · keyboard nav · API reconciliation. Left: visual-regression infra |

## P4 — showcase app (`apps/showcase`)

| Batch | Scope | Status |
| --- | --- | --- |
| C1 | Foundation: router + layouts (App/Blank/Auth) + template chrome (SideNav/Header/Footer/UserDropdown/ThemeConfigDrawer) + theme & auth stores (zustand) + app-coupled hooks (useAuth/useLayout/useMenuActive/useThemeBootstrap) + navigation/routes config + landing + access-denied + 404 + 13 auth screens (5 forms × simple/side/split) + component gallery | ☑ |
| C2 | `sales` area — dashboard, products (DataTable), product/new, product/:id, orders, order/new, order/:id; + `mock/sales.ts`, shared `KpiCard`/`ChartCard`/`StatusTag`, `SHOWCASE-RECIPE.md` | ☑ |
| C3 | `projects` area — dashboard, list, :id, scrumboard, timeline (GanttChart), tasks, settings; + `mock/projects.ts` | ☑ |
| C4 | `analytics` (dashboard, forecast, revenue, subscriptions, reports) + `crypto` (dashboard, market, coin/:sym, spot, assets, kyc); + `mock/analytics.ts`, `mock/crypto.ts` | ☑ |
| C5 | `customers` (dashboard, list, :id/overview, leads, lead/:id/overview, helpdesk) + `hrm` (dashboard, employees, attendance, payroll, leaves, announcements); + `mock/customers.ts`, `mock/hrm.ts` | ☑ |
| C6 | `ai` (chat, image, writer) + `accounts` (settings/profile, activity, referrals, pricing, invoice, users) ; + `mock/ai.ts`, `mock/account.ts`. All `APP_AREAS` placeholders now gone. | ☑ |
| C7 | mock data consolidation, polish pass, Eyris visual diff | ☑ visual sweep of all ~62 screens + 13 auth + landing/404/gallery + dark mode vs Eyris; 30 fixes across 3 commits; mock consolidation (order totals post-tax, analytics MRR/ARPU derived, crypto portfolio derived, `mock/team.ts` canonical roster, customer↔staff avatar de-dup, "Grace Mensah" customer→"Kwame Boateng"). |

C7 follow-ups (deferred, not blocking): nav keeps Dylan's "Dashboards" super-group + per-area groups (chose not to match Eyris's Dashboard-per-area nesting); string-name people refs (report owner / image author / task assignee label) use literals not `personName(key)`.

Unbuilt areas are routed via `PagePlaceholder` (`APP_AREAS` in `routes.config.tsx`); each area batch replaces them with a real `<area>Routes` module + views + `mock/<area>.ts`. Execution: Claude wrote C1 + the C2 dashboard/infra + `SHOWCASE-RECIPE.md`; codex builds the per-area screens from a spec, Claude reviews/fixes/verifies.

P4 follow-ups: ~~`mock` `order.total` vs detail's subtotal+tax is inconsistent~~ (C7: `order.total` field removed, everything now derives `orderSubtotal`/`orderTax`/`orderTotal` = post-tax grand total); DataTable has no row-click prop → views use `onClick` event delegation on a wrapper div; `Select`/`Segment` width must be constrained by a wrapper (component `width:100%` beats utility classes); DataTable's "Rows per page" `<select>` has no name/label association (P6 a11y).

fix(ui) shipped during P4: Chart got a token-derived multi-colour palette (C2); Progress circle variant rotated its `<g>` via CSS transform around the SVG origin → ring flew off / oversized — now `rotate(deg 50 50)` SVG attr (C3); Select's filter `<input>` got `name`/`type`/`autoComplete` (C3); VectorMap choropleth was black — jsvectormap 1.6 only has an ordinal (lookup) scale, not numeric, so the ramp is now interpolated in-component (border→primary per normalised value) and fed as a code→hex map (C4).

fix(ui) shipped during C7 (Eyris visual sweep): `Table`/`DataTable` sort indicator was literal `▲▼` text → `TbArrowsSort`/`TbArrowUp`/`TbArrowDown` icons; `Chart` reworked to Eyris style (faint horizontal-only gridlines, no axis border/ticks, light area-fill gradient), **now re-reads its token colours on runtime theme change** via a `MutationObserver` on `<html>` (was baking in light-mode grid/text colours → bright gridlines in dark mode), thins dense category axes (`tickAmount` when >12 categories), interleaved the categorical palette so donuts/multi-line aren't three blues, theme-aware tooltip. Showcase: sticky `Header` used `bg-surface/95` (opacity modifier on a themed var = invalid colour → transparent header, charts bled through) → solid `bg-surface`.

C7 mock consolidation: sales order totals (above); analytics MRR/active-accounts/ARPU derived from `subscriptions` (were hardcoded + disagreed between Revenue and Subscriptions screens); crypto `portfolioValue`/`portfolioCost`/`allocation` derived from `holdings` (dashboard $128,940 hardcode disagreed with Assets $164,445); **`mock/team.ts` = canonical 10-person staff roster** — `account.teamMembers` / `hrm.employees` / `projects.team` / `account.profile` now spread `personFields(key)` instead of re-listing name/email/avatar; 6 customer avatars that collided with staff avatars given distinct ids; the customer named "Grace Mensah" (also an internal new-hire — confusing) renamed to "Kwame Boateng". Still open: string-name refs (report owner / image author / task-assignee label) use literals rather than `personName(key)`.

## P5 — Handbook (`docs/handbook/*.mdx`)

Browsable "why" docs, wired into Storybook (`Handbook/*`, ordered via
`preview.tsx` `storySort`). 8 pages: Introduction · Principles · Design Tokens
(live `--dyl-*` swatches that follow the theme toolbar) · Theming & Modes ·
Accessibility · Component API · Contributing · Eyris Mapping. Drawn from
`DESIGN.md` + `RECIPE.md`; `DESIGN.md` §8 now points here.

Notes: `remark-gfm` is not in Storybook 8.4's addon-docs MDX pipeline and the
documented config hook doesn't take, so tables use the `<Markdown>` block from
`@storybook/blocks` (renders GFM). Swatch components are inline `export const`
in the MDX (a `docs/**/*.tsx` helper compiles to classic `React.createElement`
because no tsconfig covers `docs/`).

Remaining: DESIGN.md §3/§5/§7 could each get a fuller page; per-component
"when to use X vs Y" guidance; a schema-switcher demo on the Theming page.

## P6 — QA & hardening (in progress)

Done so far:
- **`@dylan-ds/ui` bundle: 807 kB single barrel → per-module chunks (~227 kB total, largest
  chunk 12 kB).** `preserveModules: true`; also externalised `/^@dylan-ds\//` and every
  `react-icons` subpath (`react-icons/hi2` alone was 595 kB of dead weight bundled in).
  `pnpm build` (vite + `tsc -b` `.d.ts`) verified; `exports`/types layout unchanged.
- `Select` gained a `name` prop — mirrors the selection into hidden `<input>`(s) for native
  form submission (one per value in multi mode). `+2 tests, +InAForm story`.
- `DataTable` "Rows per page" `<select>` got an explicit `aria-label`.
- pre-existing prettier drift in `SelectExtension.tsx` fixed.
- **Token-first guard**: `scripts/check-tokens.mjs` (+ `pnpm check:tokens`, wired into
  CI after lint) scans `packages/ui/src` + `apps/showcase/src` for literal colours
  (hex, `rgb()/hsl()`, bare CSS colour keywords in `.scss/.css`). `readVar(` lines
  and a `// ds-allow-literal` marker are the escape hatches. Repo currently clean
  (535 files, 0 violations).
- a11y test coverage now 84/84 base+composite components — `Histogram` got its
  `axe` assertion (was the only file without one).
- **RTL pass.** The Tailwind `@apply` layer used physical-direction utilities
  (`pl-`/`ml-`/`text-left`/`left-`/`rounded-l`…) even though the plain-CSS layer
  was already logical — so `dir="rtl"` did not actually mirror. Converted 25
  component `.scss` files to logical utilities (`ps-`/`pe-`/`ms-`/`me-`/`start-`/
  `end-`/`text-start`/`rounded-s`/`border-s`); `Switcher` thumb + `Badge` dot use
  a transform offset so they carry an explicit `translate-x-* rtl:-translate-x-*`
  override. Showcase template chrome (SideNav/Header/UserDropdown/AuthLayout)
  converted too. Storybook got a **Direction** toolbar (`ltr`/`rtl`, sets
  `<html dir>`). Deliberately left physical: `Drawer` `placement`, `Slider` fill
  track, `GanttChart` timeline, checkbox tick glyph — documented in Theming
  handbook. `pnpm build` + generated-CSS spot-check verified.
- **Keyboard / focus-trap audit.**
  - **Bug fix:** `useFocusTrap` read `ref.current` once on the effect's first run,
    but `Dialog`/`Drawer` render through a mounted-gated `Portal` whose node
    doesn't exist yet — so the trap silently never activated (no initial focus,
    no Tab containment, no restore). Now retries on `requestAnimationFrame` until
    the node appears; also handles shift+Tab from the container and keeps focus
    in on an empty focusable set. +`useFocusTrap.test.tsx`, +focus tests on
    Dialog/Drawer.
  - `Segment` gained roving arrow/Home/End navigation (single-select moves
    selection with focus per the WAI-ARIA radio pattern; multi-select moves
    focus only). +2 tests.
  - `Tabs` already had full arrow/Home/End roving + roving tabindex — +2 tests
    to lock it in.
  - `Calendar` day grid: added a roving tab stop (selected day → today → first of
    month) + Arrow/Home/End navigation, RTL-aware. +1 test.
- **Showcase RTL sweep:** 6 remaining physical-direction utils in view screens
  (`text-left`/`text-right`/`right-0` in AI writer/chat, analytics table, invoice,
  spot-trade depth bars) → logical. Showcase already wires `direction` end-to-end
  (themeStore + ThemeConfigDrawer + useThemeBootstrap sets `<html dir>`).
  `bg-white/10` in AuthLayout kept — a Tailwind primitive for translucency where
  `var(--dyl-*)` tokens can't do an alpha channel.
- **API reconciliation vs crawl.** `scripts/api-coverage.mjs` + `pnpm check:api`
  (CI, after `check:tokens`) diffs every prop in the `docs/reference/eyris-crawl`
  JSON against each component's source. 38 base components, 433 props — all
  matched or listed as a verified deviation in the script's `ALLOW` map (which
  makes it a drift gate: a new unlisted gap fails CI). Deviations now spelled out
  in EyrisMapping: `Select` (no react-select surface — `creatable`,
  `customOption`, `onMenuOpen`, …), `Table` (`borderless` vs `bordered`, no
  `overflow`/`verticalDivider`/`asElement`), `Toast` (`placement` only, no
  offset/transition knobs), `Upload` (no `fileListClass`/`fileItemClass`),
  `Input` (native events pass straight through).

## Follow-ups

- Token alpha channels (`bg-primary/40`).
- Select/menu overlays could adopt @floating-ui (currently Select uses absolute pos).
- 4 app-coupled utils still deferred (useDataTableState / useAppendQueryParams / useQueryParamPagingState / withHeaderItem) — land with DataTable-heavy P4 area batches.
- Calendar/DatePicker: full month/year picker views + exotic label-format props.
