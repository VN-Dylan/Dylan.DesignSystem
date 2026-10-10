---
"@vn-dylan/ui": minor
---

Overlays: `Dialog` gains `title` / `footer` slots (plus `headerClass`,
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
