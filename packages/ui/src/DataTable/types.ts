import type { ColumnDef } from '@tanstack/react-table'
import type { ReactNode } from 'react'

export interface DataTablePagingData {
  pageIndex: number
  pageSize: number
  total: number
}

export interface DataTableSort {
  key: string
  order: 'asc' | 'desc' | ''
}

export interface DataTableColumnPinning {
  left?: string[]
  right?: string[]
}

/** The user-adjustable column layout — persist it to restore a user's view. */
export interface DataTableLayout {
  columnOrder: string[]
  columnPinning: { left: string[]; right: string[] }
  columnVisibility: Record<string, boolean>
  /** Column id → width in px. Empty while widths are automatic. */
  columnSizing: Record<string, number>
}

export interface DataTableInitialState {
  sorting?: DataTableSort
  columnOrder?: string[]
  columnPinning?: DataTableColumnPinning
  columnVisibility?: Record<string, boolean>
  /** Column id → width in px (a saved `layout.columnSizing`). Turns fixed widths on. */
  columnSizing?: Record<string, number>
  /** Client-side page size. Defaults to the first `pageSizeOptions` entry. */
  pageSize?: number
  /** Tree mode: `true` expands every row, or a map of row id → expanded. */
  expanded?: true | Record<string, boolean>
}

export interface DataTableProps<TData> {
  /** TanStack column definitions. Each column needs an `id` or `accessorKey`. */
  columns: ColumnDef<TData, unknown>[]
  /** Row data. Client mode: the full set. Server mode: the current page. */
  data: TData[]
  /** Show the loading overlay. */
  loading?: boolean
  /** Message shown when there are no rows. @default 'No data' */
  emptyMessage?: ReactNode
  /** Stable row id (used by selection and expansion). Defaults to the row index path. */
  getRowId?: (row: TData, index: number) => string
  /**
   * Tree mode: return a row's children. The first visible column gets the
   * indent + expand toggle; search keeps matching children with their
   * ancestors, sorting applies per level and pagination counts top-level rows.
   */
  getSubRows?: (row: TData, index: number) => TData[] | undefined

  /* ---------------------------------------------------------------- toolbar */
  /** Show the search box. Client mode filters every column. @default false */
  searchable?: boolean
  /** @default 'Search…' */
  searchPlaceholder?: string
  /** Server-side search: receives the raw query (debounce it yourself) and disables client filtering. */
  onSearchChange?: (query: string) => void
  /** Filter controls rendered after the search box (e.g. `Select`s). */
  filters?: ReactNode
  /** Extra controls at the end of the toolbar (e.g. an export button). */
  toolbarEnd?: ReactNode
  /** Show the "Columns" menu (visibility + reset layout). @default true when the toolbar is shown */
  columnsToggle?: boolean

  /* ---------------------------------------------------------------- columns */
  /** Per-column menu (sort, pin, move, hide). @default true */
  columnMenu?: boolean
  /** Drag column headers to reorder. @default true */
  reorderable?: boolean
  /**
   * Drag the end edge of a header (or focus it and use the arrow keys) to change
   * a column's width; double-click it to return to automatic widths. The first
   * resize freezes every column at its current width. Opt a column out with
   * `enableResizing: false`; bound it with `minSize` / `maxSize` (px).
   * @default false
   */
  resizable?: boolean
  /** Allow pinning columns to the start/end edge. @default true */
  pinnable?: boolean
  /** Initial sorting / layout / page size. */
  initialState?: DataTableInitialState
  /** Called whenever the column order, pinning or visibility changes. */
  onLayoutChange?: (layout: DataTableLayout) => void

  /* ------------------------------------------------------------- pagination */
  /** Client-side pagination over `data`. Ignored when `pagingData` is set. @default false */
  pagination?: boolean
  /** Server-side paging state (1-based `pageIndex`). */
  pagingData?: DataTablePagingData
  /** Page-size options for the selector. @default [10, 25, 50] */
  pageSizeOptions?: number[]
  /** Server mode: called with the new 1-based page. */
  onPaginationChange?: (pageIndex: number) => void
  /** Called when the page size changes (both modes). */
  onPageSizeChange?: (pageSize: number) => void

  /* ---------------------------------------------------------------- sorting */
  /** Server-side sorting: receives the sort and disables client sorting. */
  onSort?: (sort: DataTableSort) => void

  /* ---------------------------------------------------------------- density */
  /**
   * Tighter header and rows (`px-3 py-2` instead of `px-4 py-3`) for dense
   * data or tables with inline editors. @default false
   */
  compact?: boolean

  /* -------------------------------------------------------------- selection */
  /** Enable a leading selection-checkbox column. */
  selectable?: boolean
  /** Called with the selected row objects. */
  onSelectChange?: (rows: TData[]) => void
}
