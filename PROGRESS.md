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
| P4 | Layouts + example app + auth | ☐ |
| P5 | Handbook | ☐ |
| P6 | QA & hardening | ☐ |

## Follow-ups

- Token alpha channels (`bg-primary/40`).
- Select/menu overlays could adopt @floating-ui (currently Select uses absolute pos).
- 7 app-coupled utils → showcase/DataTable (P3/P4).
- Calendar/DatePicker: full month/year picker views + exotic label-format props.
- `packages/ui` bundle is ~800 kB (vendor libs are external); revisit code-splitting at P6.
