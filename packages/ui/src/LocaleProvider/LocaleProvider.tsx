import { useMemo } from 'react'
import { LocaleContext } from './context'
import { getUiMessages } from './messages'
import type { LocaleProviderProps, UiMessages } from './types'

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const merge = (base: unknown, override: unknown): unknown => {
  if (!isPlainObject(base) || !isPlainObject(override)) return override ?? base
  const result: Record<string, unknown> = { ...base }
  for (const [key, value] of Object.entries(override)) {
    if (value !== undefined) result[key] = merge(base[key], value)
  }
  return result
}

/**
 * Translates the strings components render on their own — close buttons,
 * empty states, table footers, select placeholders. Props passed explicitly
 * (e.g. `emptyMessage`, `confirmText`) still win.
 */
export function LocaleProvider({ locale = 'en', messages, children }: LocaleProviderProps) {
  const value = useMemo(() => {
    const base = getUiMessages(locale)
    return { locale, messages: messages ? (merge(base, messages) as UiMessages) : base }
  }, [locale, messages])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
