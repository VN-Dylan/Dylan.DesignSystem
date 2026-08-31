import { useEffect, useMemo, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFn = (...args: any[]) => void

/**
 * Returns a debounced version of `func` that only runs `wait` ms after the last
 * call. The debounced function is stable across renders; the latest `func` is
 * always invoked.
 *
 * @example const search = useDebounce(handleSearch, 300)
 */
export function useDebounce<T extends AnyFn>(
  func: T,
  wait = 300,
): (...args: Parameters<T>) => void {
  const funcRef = useRef(func)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    funcRef.current = func
  }, [func])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  return useMemo(
    () =>
      (...args: Parameters<T>) => {
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => funcRef.current(...args), wait)
      },
    [wait],
  )
}

export default useDebounce
