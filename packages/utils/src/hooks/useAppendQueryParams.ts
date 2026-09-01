import { useCallback } from 'react'

export interface AppendQueryParamsOptions {
  /** Use `history.replaceState` instead of `pushState` (no new history entry). */
  replace?: boolean
  /** Drop every existing param before applying the new ones. */
  override?: boolean
}

export interface UseAppendQueryParamsResult {
  onAppendQueryParams: (params: Record<string, unknown>, options?: AppendQueryParamsOptions) => void
}

const isEmpty = (value: unknown) => value === undefined || value === null || value === ''

/**
 * Append or update URL query parameters while preserving the ones already
 * there. Framework-agnostic — it drives the History API directly and emits a
 * `popstate` event so router-aware trees re-read the location.
 *
 * A `null`, `undefined` or `''` value removes that key.
 *
 * @example
 * const { onAppendQueryParams } = useAppendQueryParams()
 * onAppendQueryParams({ filter: 'active', page: 1 })          // merge
 * onAppendQueryParams({ page: 1 }, { override: true })        // reset others
 * onAppendQueryParams({ sort: 'name' }, { replace: true })    // no history entry
 */
export function useAppendQueryParams(): UseAppendQueryParamsResult {
  const onAppendQueryParams = useCallback(
    (params: Record<string, unknown>, options: AppendQueryParamsOptions = {}) => {
      if (typeof window === 'undefined') return

      const search = new URLSearchParams(options.override ? '' : window.location.search)

      for (const [key, value] of Object.entries(params)) {
        if (isEmpty(value)) search.delete(key)
        else search.set(key, String(value))
      }

      const query = search.toString()
      const url = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`

      window.history[options.replace ? 'replaceState' : 'pushState'](window.history.state, '', url)
      window.dispatchEvent(new PopStateEvent('popstate'))
    },
    [],
  )

  return { onAppendQueryParams }
}

export default useAppendQueryParams
