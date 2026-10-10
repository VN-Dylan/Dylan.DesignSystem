import { useCallback, useMemo } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { formatCurrency as formatCurrencyBase } from '@vn-dylan/utils'
import { en } from './messages/en'
import { vi } from './messages/vi'
import type { MessageKey, MessageValues, Messages } from './types'

export type { MessageKey, Messages } from './types'

export const locales = [
  { code: 'vi', label: 'Tiếng Việt', intl: 'vi-VN' },
  { code: 'en', label: 'English', intl: 'en-US' },
] as const

export type Locale = (typeof locales)[number]['code']

const catalogs: Record<Locale, Messages> = { en: en as Messages, vi }

const detectLocale = (): Locale => {
  const browser = typeof navigator === 'undefined' ? 'en' : navigator.language
  return browser.toLowerCase().startsWith('vi') ? 'vi' : 'en'
}

interface LocaleState {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: detectLocale(),
      setLocale: (locale) => set({ locale }),
    }),
    { name: 'dylan-showcase-locale' },
  ),
)

const lookup = (messages: Messages, key: string): string | undefined => {
  let node: unknown = messages
  for (const part of key.split('.')) {
    if (typeof node !== 'object' || node === null) return undefined
    node = (node as Record<string, unknown>)[part]
  }
  return typeof node === 'string' ? node : undefined
}

const interpolate = (template: string, values?: MessageValues) =>
  values
    ? template.replace(/\{(\w+)\}/g, (match, name: string) => String(values[name] ?? match))
    : template

/** Pure translation: the locale's message, else English, else the key itself. */
export function translate(locale: Locale, key: MessageKey, values?: MessageValues): string {
  const template = lookup(catalogs[locale], key) ?? lookup(catalogs.en, key) ?? key
  return interpolate(template, values)
}

/**
 * Translation + locale-aware formatting for the current language.
 *
 * ```tsx
 * const { t, formatCurrency } = useTranslation()
 * t('customers.toast.added', { name })
 * ```
 */
export function useTranslation() {
  const locale = useLocaleStore((s) => s.locale)
  const setLocale = useLocaleStore((s) => s.setLocale)
  const intl = locales.find((l) => l.code === locale)?.intl ?? 'en-US'

  const t = useCallback(
    (key: MessageKey, values?: MessageValues) => translate(locale, key, values),
    [locale],
  )

  return useMemo(
    () => ({
      locale,
      /** BCP 47 tag for `Intl` APIs and `LocaleProvider`. */
      intl,
      setLocale,
      t,
      /** Side-navigation title for a `NavItem.key`, falling back to `fallback`. */
      navTitle: (key: string, fallback: string) =>
        catalogs[locale].nav[key] ?? catalogs.en.nav[key] ?? fallback,
      formatCurrency: (value: number, currency = 'USD') =>
        formatCurrencyBase(value, currency, intl),
      formatDate: (value: Date | string | number, options?: Intl.DateTimeFormatOptions) =>
        new Intl.DateTimeFormat(intl, options ?? { dateStyle: 'medium' }).format(new Date(value)),
    }),
    [locale, intl, setLocale, t],
  )
}
