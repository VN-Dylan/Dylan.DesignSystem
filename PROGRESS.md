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
| P4 | Layouts + example app + auth | ◑ C1–C5 done |
| P5 | Handbook | ☐ |
| P6 | QA & hardening | ☐ |

## P4 — showcase app (`apps/showcase`)

| Batch | Scope | Status |
| --- | --- | --- |
| C1 | Foundation: router + layouts (App/Blank/Auth) + template chrome (SideNav/Header/Footer/UserDropdown/ThemeConfigDrawer) + theme & auth stores (zustand) + app-coupled hooks (useAuth/useLayout/useMenuActive/useThemeBootstrap) + navigation/routes config + landing + access-denied + 404 + 13 auth screens (5 forms × simple/side/split) + component gallery | ☑ |
| C2 | `sales` area — dashboard, products (DataTable), product/new, product/:id, orders, order/new, order/:id; + `mock/sales.ts`, shared `KpiCard`/`ChartCard`/`StatusTag`, `SHOWCASE-RECIPE.md` | ☑ |
| C3 | `projects` area — dashboard, list, :id, scrumboard, timeline (GanttChart), tasks, settings; + `mock/projects.ts` | ☑ |
| C4 | `analytics` (dashboard, forecast, revenue, subscriptions, reports) + `crypto` (dashboard, market, coin/:sym, spot, assets, kyc); + `mock/analytics.ts`, `mock/crypto.ts` | ☑ |
| C5 | `customers` (dashboard, list, :id/overview, leads, lead/:id/overview, helpdesk) + `hrm` (dashboard, employees, attendance, payroll, leaves, announcements); + `mock/customers.ts`, `mock/hrm.ts` | ☑ |
| C6 | `ai` + `accounts` areas | ☐ |
| C7 | mock data consolidation, polish pass, Eyris visual diff | ☐ |

Unbuilt areas are routed via `PagePlaceholder` (`APP_AREAS` in `routes.config.tsx`); each area batch replaces them with a real `<area>Routes` module + views + `mock/<area>.ts`. Execution: Claude wrote C1 + the C2 dashboard/infra + `SHOWCASE-RECIPE.md`; codex builds the per-area screens from a spec, Claude reviews/fixes/verifies.

P4 follow-ups: `mock` `order.total` vs detail's subtotal+tax is inconsistent (decide pre/post-tax semantics in C7); DataTable has no row-click prop → views use `onClick` event delegation on a wrapper div; `Select`/`Segment` width must be constrained by a wrapper (component `width:100%` beats utility classes); DataTable's "Rows per page" `<select>` has no name/label association (P6 a11y).

fix(ui) shipped during P4: Chart got a token-derived multi-colour palette (C2); Progress circle variant rotated its `<g>` via CSS transform around the SVG origin → ring flew off / oversized — now `rotate(deg 50 50)` SVG attr (C3); Select's filter `<input>` got `name`/`type`/`autoComplete` (C3); VectorMap choropleth was black — jsvectormap 1.6 only has an ordinal (lookup) scale, not numeric, so the ramp is now interpolated in-component (border→primary per normalised value) and fed as a code→hex map (C4).

## Follow-ups

- Token alpha channels (`bg-primary/40`).
- Select/menu overlays could adopt @floating-ui (currently Select uses absolute pos).
- `Select` has no `name`/`inputId` passthrough — add for forms (P6).
- 4 app-coupled utils still deferred (useDataTableState / useAppendQueryParams / useQueryParamPagingState / withHeaderItem) — land with DataTable-heavy P4 area batches.
- Calendar/DatePicker: full month/year picker views + exotic label-format props.
- `packages/ui` bundle is ~800 kB (vendor libs are external); revisit code-splitting at P6.
