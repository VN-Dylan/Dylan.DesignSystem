import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppendQueryParams } from './useAppendQueryParams'

export type SortOrder = 'asc' | 'desc' | ''

export interface TableQueries {
  pageIndex: number
  pageSize: number
  query: string
  sortKey: string
  sortOrder: SortOrder
}

const DEFAULTS: TableQueries = {
  pageIndex: 1,
  pageSize: 10,
  query: '',
  sortKey: '',
  sortOrder: '',
}

const PAGING_KEYS = new Set<keyof TableQueries>([
  'pageIndex',
  'pageSize',
  'query',
  'sortKey',
  'sortOrder',
])

const readSearch = () =>
  new URLSearchParams(typeof window === 'undefined' ? '' : window.location.search)

/**
 * Sync a DataTable's paging / sort / search state with the URL query string,
 * so a shared or reloaded link restores the same view. Built on
 * {@link useAppendQueryParams}, so it needs no router.
 *
 * `filterState` collects any *other* query params (e.g. `?status=active`) for
 * you to feed into your own filter UI.
 *
 * @example
 * const { pagingState, filterState, setQueryParams } = useQueryParamPagingState()
 * <DataTable
 *   pagingData={{ ...pagingState, total }}
 *   onPaginationChange={(pageIndex) => setQueryParams({ pageIndex })}
 *   onPageSizeChange={(pageSize) => setQueryParams({ pageSize, pageIndex: 1 })}
 *   onSort={({ key, order }) => setQueryParams({ sortKey: key, sortOrder: order })}
 * />
 */
export function useQueryParamPagingState(initialTableData: Partial<TableQueries> = {}): {
  pagingState: TableQueries
  filterState: Record<string, string>
  setQueryParams: (params: Record<string, unknown>, override?: boolean) => void
} {
  const base = useMemo<TableQueries>(
    () => ({ ...DEFAULTS, ...initialTableData }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const [search, setSearchState] = useState(readSearch)
  const { onAppendQueryParams } = useAppendQueryParams()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const sync = () => setSearchState(readSearch())
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  const pagingState = useMemo<TableQueries>(() => {
    const num = (key: keyof TableQueries, fallback: number) => {
      const raw = search.get(key)
      const parsed = raw === null ? NaN : Number(raw)
      return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
    }
    return {
      pageIndex: num('pageIndex', base.pageIndex),
      pageSize: num('pageSize', base.pageSize),
      query: search.get('query') ?? base.query,
      sortKey: search.get('sortKey') ?? base.sortKey,
      sortOrder: (search.get('sortOrder') as SortOrder | null) ?? base.sortOrder,
    }
  }, [search, base])

  const filterState = useMemo<Record<string, string>>(() => {
    const out: Record<string, string> = {}
    for (const [key, value] of search.entries()) {
      if (!PAGING_KEYS.has(key as keyof TableQueries)) out[key] = value
    }
    return out
  }, [search])

  const setQueryParams = useCallback(
    (params: Record<string, unknown>, override = false) => {
      onAppendQueryParams(params, { override })
    },
    [onAppendQueryParams],
  )

  return { pagingState, filterState, setQueryParams }
}

export default useQueryParamPagingState
