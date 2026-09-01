import { useCallback, useMemo, useState } from 'react'
import type { SortOrder, TableQueries } from './useQueryParamPagingState'

const DEFAULTS: TableQueries = {
  pageIndex: 1,
  pageSize: 10,
  query: '',
  sortKey: '',
  sortOrder: '',
}

export interface UseDataTableStateResult<T> {
  /** Current paging / sort / search state. */
  tableData: TableQueries
  /** Merge a partial update into `tableData`. */
  setTableData: (patch: Partial<TableQueries>) => void
  /** `DataTable` `onPaginationChange` handler. */
  onPaginationChange: (pageIndex: number) => void
  /** `DataTable` `onPageSizeChange` handler — also resets to page 1. */
  onPageSizeChange: (pageSize: number) => void
  /** `DataTable` `onSort` handler. */
  onSort: (sort: { key: string; order: SortOrder }) => void
  /** Rows currently selected via the checkbox column. */
  selectedRows: T[]
  /** `DataTable` `onSelectChange` handler. */
  onSelectChange: (rows: T[]) => void
  /** Clear the selection (e.g. after a bulk action completes). */
  resetSelection: () => void
}

/**
 * Bundles the boilerplate every server-driven `DataTable` screen repeats:
 * paging / page-size / sort state plus the selected-row list, with handlers
 * shaped exactly for the component's props.
 *
 * @example
 * const t = useDataTableState<User>({ pageSize: 25 })
 * <DataTable
 *   pagingData={{ ...t.tableData, total }}
 *   onPaginationChange={t.onPaginationChange}
 *   onPageSizeChange={t.onPageSizeChange}
 *   onSort={t.onSort}
 *   selectable
 *   onSelectChange={t.onSelectChange}
 * />
 */
export function useDataTableState<T>(
  initial: Partial<TableQueries> = {},
): UseDataTableStateResult<T> {
  const initialState = useMemo<TableQueries>(
    () => ({ ...DEFAULTS, ...initial }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const [tableData, setTableDataState] = useState<TableQueries>(initialState)
  const [selectedRows, setSelectedRows] = useState<T[]>([])

  const setTableData = useCallback(
    (patch: Partial<TableQueries>) => setTableDataState((prev) => ({ ...prev, ...patch })),
    [],
  )

  const onPaginationChange = useCallback(
    (pageIndex: number) => setTableData({ pageIndex }),
    [setTableData],
  )

  const onPageSizeChange = useCallback(
    (pageSize: number) => setTableData({ pageSize, pageIndex: 1 }),
    [setTableData],
  )

  const onSort = useCallback(
    (sort: { key: string; order: SortOrder }) =>
      setTableData({ sortKey: sort.key, sortOrder: sort.order }),
    [setTableData],
  )

  const resetSelection = useCallback(() => setSelectedRows([]), [])

  return {
    tableData,
    setTableData,
    onPaginationChange,
    onPageSizeChange,
    onSort,
    selectedRows,
    onSelectChange: setSelectedRows,
    resetSelection,
  }
}

export default useDataTableState
