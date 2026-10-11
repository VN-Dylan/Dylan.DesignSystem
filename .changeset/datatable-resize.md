---
"@vn-dylan/ui": minor
---

`DataTable` gains `resizable`: drag a header's end edge (or focus it and use the
arrow keys, Shift for big steps) to change a column's width; double-click or Enter
returns to automatic widths. Bound a column with `minSize` / `maxSize`, opt out with
`enableResizing: false`. The first resize freezes every column at its current width;
`onLayoutChange` now reports `columnSizing` (once per resize) and
`initialState.columnSizing` restores it. Works in RTL and with pinned columns.
