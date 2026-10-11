# @vn-dylan/tokens

## 0.3.0

## 0.2.0

### Minor Changes

- 24a1c68: Booking-readiness component set + brand-booking token pack.
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

## 0.1.1
