import type { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Tighter cell padding. */
  compact?: boolean
  /** Remove horizontal row borders. */
  borderless?: boolean
  /** Add a hover background to body rows. */
  hoverable?: boolean
}

export type TableSectionProps = HTMLAttributes<HTMLTableSectionElement>
export type TableRowProps = HTMLAttributes<HTMLTableRowElement>

export interface TableHeadCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Show a sort affordance and reflect the current direction. */
  sortable?: boolean
  /** Current sort state for this column. */
  sortDirection?: 'asc' | 'desc' | false
  /** Called when a sortable header is activated. */
  onSort?: () => void
}

export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>
