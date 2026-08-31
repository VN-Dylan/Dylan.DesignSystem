import { useCallback, useEffect, useState } from 'react'

export type Direction = 'ltr' | 'rtl'

const STORAGE_KEY = 'dyl-direction'

const readInitial = (): Direction => {
  if (typeof window === 'undefined') return 'ltr'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'rtl' ? 'rtl' : 'ltr'
}

/**
 * Read and set the app text direction. Writes `dir` on `<html>` and persists.
 *
 * @example const [dir, setDir] = useDirection()
 */
export function useDirection(): [Direction, (dir: Direction) => void] {
  const [direction, setDirectionState] = useState<Direction>(readInitial)

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('dir', direction)
    window.localStorage.setItem(STORAGE_KEY, direction)
  }, [direction])

  const setDirection = useCallback((next: Direction) => setDirectionState(next), [])

  return [direction, setDirection]
}

export default useDirection
