import type { HTMLAttributes } from 'react'

export interface PaginationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current page number. @default 1 */
  currentPage?: number
  /** Whether to display total of data items. @default false */
  displayTotal?: boolean
  /** Callback when Pagination index is clicked. */
  onChange?: (pageNumber: number) => void
  /** Number of data items per page. @default 1 */
  pageSize?: number
  /** Total number of data items. @default 5 */
  total?: number
}
