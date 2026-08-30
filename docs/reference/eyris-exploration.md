# Eyris React Admin Template — Exploration Report

Source: https://eyris-react.themenate.net (demo login `admin-01@eyris.com`, pre-filled pwd)
Docs: https://static.themenate.net/eyris-doc/vite/introduction/
Version: v1.1.5 (01 Jul 2026). Vendor: ThemeNate. **Commercial paid template.**

## Tech stack (as built)
- React 18/19 + Vite + TypeScript (JS variant also shipped)
- Tailwind CSS (utility-first; `tailwind.config.ts`); PostCSS; plain CSS with `@apply`/`@layer`/`theme()` in `src/assets/styles/*` (components/docs/tailwind/template/vendors/index.css)
- Zustand state (themeStore/authStore/localeStore), react-router, react-icons, i18n
- Charts: ApexCharts-style wrapper (`components/shared/Chart`), Recharts also seen on dashboards
- MCP server bundled for AI agents; `scripts/ai-init` generates AI rule files

## Folder structure (target reference)
```
src/
  @types/  assets/{data,markdown,styles}  auth/  components/{auth,layouts,route,shared,svg,template,ui}
  configs/{navigation.config,routes.config,app.config,theme.config,preset-theme-schema.config}
  constants/  locales/  mock/  services/  store/  utils/{hoc,hooks}  views/
tailwind.config.ts  vite.config.ts
```
Design-system-relevant: `components/ui` (base), `components/shared` (composite), `utils/hooks` + `utils/*` (helpers), `configs/*theme*`, `assets/styles`.

## Theming (CSS variables — `src/assets/styles/tailwind/index.css`)
```
--muted:#fff  --primary:#286cf0  --primary-deep:#1f56c0  --primary-mild:#4c86f4  --primary-subtle:#286cf01a
--error:#eb4137 (+subtle)  --success:#00a85b (+subtle)  --info:#3380fa (+subtle)  --warning:#f59e0b (+subtle)
--gray-50..--gray-950  (50 #fafafa … 950 #0a0a0a)
```
- 8 preset theme schemas (`preset-theme-schema.config.ts`): default(blue), dark, green(#0cbf7a), purple(#9d5cfb), orange(#fb732c), cyan(#07b9e7), gold(#f3a027), pink(#f93f90). Each = {light,dark}×{primary,primaryDeep,primaryMild,primarySubtle,muted}.
- `useThemeSchema()` writes vars to `document.documentElement.style`. Persisted to localStorage.
- Dark mode = `.dark` class on root. RTL支持 via `direction`. Layouts: `stackedSide`, etc. (`setLayout`).

## Component API conventions (from Button)
- Props pattern: `variant` ('solid'|'plain'|'default'|...), `size` ('xs'|'sm'|'md'|'lg'), `shape` ('round'|'circle'|'none'), `disabled`, `loading`, `block`, `active`, `icon` (ReactNode), `iconAlignment`, `clickFeedback`
- `className` can be `string | (state) => string` (function form receives interaction state)
- Compound components: `Avatar.Group`, `Checkbox.Group`, `Radio.Group`, `Carousel.Content/Item`, `Collapsible.Trigger/Content`, `Tabs.TabList/TabNav/TabContent`, `Menu.MenuCollapse/MenuItem`, `Steps.Item`, `Slider.Range`, `Timeline.Item`, `InputGroup.Addon`
- Import alias: `@/components/ui/<Name>`
- Every doc page = intro sentence + demo sections (each demo is a standalone component file, viewable source) + API table (prop/description/type/default) + table-of-content

## BASE UI COMPONENTS (42) — `/ui-components/*`
Common: Button, Grid, Scroll, Typography, Icons
Data Display: Avatar, Badge, Calendar, Cards (Card), Carousel, Collapsible, Popover, Table, Tag, Timeline, Tooltip
Forms: Checkbox, DatePicker, FormControl (Form/FormItem + validation: field/schema/dependent/async), Input, InputGroup, MultiValueInput, Radio, Segment, Select, Slider, Switcher, TimeInput, Upload
Feedback: ActionBar, Alert, Dialog, Drawer, Progress, Skeleton, Spinner, Toast (toast API + Notification)
Navigation: Dropdown, Menu, Pagination, Steps, Tabs
(full crawl per-component: demos + API tables saved in scratchpad/eyris-crawl/*.json)

## SHARED / COMPOSITE COMPONENTS (42) — `/guide/shared-component-doc/*`
ActionLink, AdvancedFilterBuilder, Affix, AuthorityCheck, AutoComplete, Chart, ClockProgress, ConfirmDialog,
Container, CustomFormatInput, DataTable, DebounceInput, Divider, EmptyState, FileIcon, FullCalendar, GanttChart,
GrowShrinkTag, Histogram, IconFrame, InfoBar, Loaders, Loading, NavToggle, NumericInput, NumericInputStepper,
OtpInput, OverflowTabs, PasswordInput, PatternInput, PopoverFilter, ReactionEmojiPicker, RichTextEditor,
SegmentProgressBar, SelectExtension, StatisticCard, StickyRegion, SyntaxHighlighter, ToggleDrawer,
UsersAvatarGroup, VectorMap, Wizard
(crawl saved in scratchpad/eyris-crawl/shared/*.json)

## UTILITIES (32) — `/guide/utils-doc/*`
Hooks: useAuth, useDarkMode, useDebounce, useDirection, useInterval, useLayout, useMenuActive, useRandomColor,
useResponsive, useScrollTop, useTimeOutMessage, useTranslation, useThemeSchema, useDataTableState,
useAppendQueryParams, useQueryParamPagingState
Functions: acronym, classNames, cookiesStorage, fileSizeUnit, isLastChild, paginate, sleep, sortBy,
wildCardSearch, formatCurrency, formatCurrencyCompact, formatNumber, formatRelativeTime, getContrast,
highlightSearchMatch
HOC: withHeaderItem
(crawl saved in scratchpad/eyris-crawl/utils/*.json)

## EXAMPLE APP PAGES (~50) — `/apps/*` (composition showcases, mock data, no real API)
- sales: dashboard, products (DataTable list), products/:id, product (new), orders, order (new), orders/:id (edit)
- customers: dashboard, list, :id/overview, leads, leads/:id/overview, helpdesk
- projects: dashboard, list, :id, scrumboard (kanban), timeline, tasks, settings/general
- analytics: dashboard, forecast, revenue, subscriptions, reports
- ai: chat, image, writer
- crypto: dashboard, market, coin/:sym, spot, assets, kyc
- hrm: dashboard, employees, attendance, payroll, leaves, announcements
- accounts: settings/profile, activity, refferals, pricing, invoice, users
Auth (13): sign-in / sign-up / forgot-password / reset-password / otp-verification — each ×{simple, side, centred}
Others: /landing, /others/access-denied

## Design language observations
- Light, airy; off-white page bg; white cards with subtle 1px border, ~12px radius, minimal shadow
- Sidebar: left, collapsible groups, icon+label, active item = blue text + left accent bar
- Header: collapse toggle, search, notifications (dot), language flag, settings gear, user menu bottom-left
- Typography: tight headings, gray-500 secondary text, generous whitespace
- Data tables: header row uppercase gray labels, row hover, checkbox select, filter popover, export, page-size select
- Status pills, trend deltas (↑green / ↓red), sparklines in cards
- Charts: thin 2px lines, no fill or light gradient fill, sparse gridlines
