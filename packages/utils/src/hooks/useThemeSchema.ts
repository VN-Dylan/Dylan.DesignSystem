import { useEffect } from 'react'
import { presetThemeSchema, themeSchemaToCssVars, type ThemeSchemaName } from '@dylan-ds/tokens'

/**
 * Apply a preset theme schema's colour variables to `<html>` for the given mode.
 * Call once near the app root and re-run when the schema or mode changes.
 *
 * @example useThemeSchema('green', isDark ? 'dark' : 'light')
 */
export function useThemeSchema(schema: ThemeSchemaName, mode: 'light' | 'dark' = 'light'): void {
  useEffect(() => {
    if (typeof document === 'undefined') return
    const schemaValue = presetThemeSchema[schema]?.[mode]
    if (!schemaValue) return

    const root = document.documentElement
    const vars = themeSchemaToCssVars(schemaValue)
    for (const [prop, value] of Object.entries(vars)) {
      root.style.setProperty(prop, value)
    }
    root.setAttribute('data-theme-schema', schema)
  }, [schema, mode])
}

export default useThemeSchema
