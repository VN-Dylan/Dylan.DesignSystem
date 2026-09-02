import { useEffect } from 'react'
import { presetThemeSchema, themeSchemaToCssVars } from '@vn-dylan/tokens'
import { useThemeStore } from '@/store/themeStore'

/**
 * Reflects the persisted theme preferences onto `<html>`:
 * - `mode` → `.dark` class (Tailwind `darkMode: 'class'`)
 * - `schema` → preset colour custom properties on `document.documentElement`
 * - `direction` → `dir` attribute
 *
 * Call once, high in the tree (see `App`).
 */
export function useThemeBootstrap(): void {
  const mode = useThemeStore((s) => s.mode)
  const schema = useThemeStore((s) => s.schema)
  const direction = useThemeStore((s) => s.direction)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', mode === 'dark')

    const vars = themeSchemaToCssVars(presetThemeSchema[schema][mode])
    for (const [key, value] of Object.entries(vars)) {
      root.style.setProperty(key, value)
    }
  }, [mode, schema])

  useEffect(() => {
    document.documentElement.setAttribute('dir', direction)
  }, [direction])
}
