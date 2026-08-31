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

export interface DataTableProps<TData> {
  /** TanStack column definitions. */
  columns: ColumnDef<TData, unknown>[]
  /** Row data for the current page. */
  data: TData[]
  /** Show the loading overlay. */
  loading?: boolean
  /** Server-side paging state. Omit for a non-paginated table. */
  pagingData?: DataTablePagingData
  /** Page-size options for the selector. @default [10, 25, 50] */
  pageSizeOptions?: number[]
  /** Called when the page changes. */
  onPaginationChange?: (pageIndex: number) => void
  /** Called when the page size changes. */
  onPageSizeChange?: (pageSize: number) => void
  /** Called when a sortable header is toggled. */
  onSort?: (sort: DataTableSort) => void
  /** Enable a leading selection-checkbox column. */
  selectable?: boolean
  /** Called with the selected row objects. */
  onSelectChange?: (rows: TData[]) => void
  /** Message shown when there are no rows. @default 'No data' */
  emptyMessage?: ReactNode
}
