import { useCallback, useEffect, useState } from 'react'

export type ColorMode = 'light' | 'dark'

const STORAGE_KEY = 'dyl-color-mode'
const CLASS_NAME = 'dark'

const readInitial = (): ColorMode => {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Read and set the app colour mode. Toggles the `dark` class on `<html>` and
 * persists the choice to `localStorage`.
 *
 * @example const [isDark, setMode] = useDarkMode()
 */
export function useDarkMode(): [boolean, (mode: ColorMode) => void] {
  const [mode, setModeState] = useState<ColorMode>(readInitial)

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.classList.toggle(CLASS_NAME, mode === 'dark')
    window.localStorage.setItem(STORAGE_KEY, mode)
  }, [mode])

  const setMode = useCallback((next: ColorMode) => setModeState(next), [])

  return [mode === 'dark', setMode]
}

export default useDarkMode
