# @vn-dylan/ui

## 0.3.0

### Minor Changes

- fe16ee9: `DataTable` gains `resizable`: drag a header's end edge (or focus it and use the
  arrow keys, Shift for big steps) to change a column's width; double-click or Enter
  returns to automatic widths. Bound a column with `minSize` / `maxSize`, opt out with
  `enableResizing: false`. The first resize freezes every column at its current width;
  `onLayoutChange` now reports `columnSizing` (once per resize) and
  `initialState.columnSizing` restores it. Works in RTL and with pinned columns.

### Patch Changes

- 9f13577: `DataTable` header no longer doubles its padding (it was ~64px tall, now ~44px)
  and gains `compact` (header ~32px, rows `px-3 py-2`) for dense tables or inline
  editors.
  - @vn-dylan/icons@0.3.0
  - @vn-dylan/tokens@0.3.0
  - @vn-dylan/utils@0.3.0

## 0.2.0

### Minor Changes

- 24a1c68: Booking-readiness component set + brand-booking token pack.
- 8bdea92: Data components: `List` (rich rows, single / multiple selection, drag and
  Alt + ↑/↓ reordering, fixed-height virtualization), `TreeList` (ARIA tree,
  tri-state checkboxes, lazy children with retry, search that keeps matching
  branches), `Combobox` (debounced and abortable remote search, tag-style
  multi-select), tree rows for `DataTable` (`getSubRows`, expand per row or all,
  search keeps ancestors, paging by top-level rows) and `Table.TreeCell` for
  static tree tables.
- 5796465: Overlays: `Dialog` gains `title` / `footer` slots (plus `headerClass`,
  `bodyClass`, `footerClass`); `Dialog` and `Drawer` pin header and footer, scroll
  only the body and cap height at the visible viewport (`100dvh`). `ConfirmDialog`
  actions now render in the pinned footer as an `ActionGroup`. Portalled menus
  (`Select`, `Combobox`, `AutoComplete`, `Dropdown`) moved to the popover z-layer so
  they open above dialogs and drawers.

  Actions & forms: `ActionGroup` gains `sticky` (pins page-form actions to the
  viewport bottom). New `Form.Group` (titled fieldset with responsive `columns`,
  `divided`, `disabled`); `Form.Item` gains `hint`, `span` and wires a single
  control's `id` / `aria-describedby` automatically; `horizontal` layout stacks on
  mobile; bare buttons inside `Form` no longer stretch. `Select` puts `id` and
  `aria-describedby` on its trigger. Inputs disabled by a `<fieldset disabled>`
  render as disabled.

  Motion (CSS, off under `prefers-reduced-motion`): Tabs panels, Collapsible,
  Menu submenus, Checkbox tick, staggered table-row fade-in, and page transitions
  via the new `AppShell.Main transitionKey`.

  Localization: new `LocaleProvider`, `useLocale`, `useUiMessages`,
  `getUiMessages`, `uiMessagesEn`, `uiMessagesVi` — built-in strings of 15
  components translate (English default, Vietnamese bundled); explicit props
  still win.

  Permissions: new `AccessProvider`, `Can` (hide / fallback / disable),
  `useAccess`, `hasPermission` and `resolvePermissions` with `resource.*` / `*`
  wildcards.

- fee27f3: Layout system: spacing/rhythm tokens (`gap-tight|base|loose|group`, `py-section`,
  `p-card`, `px-gutter`, content widths, shell sizes, `breakpoints`), new `Stack`,
  `Inline`, `Section`, `PageHeader`, `Center`, `Spacer`, `AspectRatio`, `AppShell`
  and `useMediaQuery`/`useBreakpoint`; `Grid` (`columns`, `minChildWidth`,
  `Grid.Item`), `Container` (`size`, `gutter`), `Card` (`padding`) and `Divider`
  (`spacing`, `label`) upgraded. Visual change: component padding/gap snapped to
  the 4px scale (Button, Input, Select, Drawer, StatisticCard, Table, Upload, …)
  and Card padding is now 24px by default (`padding="compact"` = 16px).

  Actions: `Button` gains `tone` (`primary` | `danger` | `success`) on top of
  `variant`; new `ActionGroup` (+ `ActionGroup.Start`) fixes button placement —
  primary last at the end, destructive isolated at the start, stacked full-width
  with primary on top below `sm`. `ConfirmDialog` confirm button now uses `tone`.
  `AppShell.Main` is fluid by default with a uniform `p-gutter`.

### Patch Changes

- Updated dependencies [24a1c68]
- Updated dependencies [fee27f3]
  - @vn-dylan/tokens@0.2.0
  - @vn-dylan/utils@0.2.0
  - @vn-dylan/icons@0.2.0

## 0.1.1

### Patch Changes

- f538658: Widen the React peer dependency range to `^18.2.0 || ^19.0.0` so the packages
  install cleanly in React 19 projects. Test suite passes under React 19.
- Updated dependencies [f538658]
  - @vn-dylan/utils@0.1.1
  - @vn-dylan/icons@0.1.1
  - @vn-dylan/tokens@0.1.1
