/**
 * Translation hook — **placeholder implementation**.
 *
 * i18n is deferred (see DESIGN.md). This stub keeps the call sites stable: `t`
 * returns the fallback string (or the key), and `ready` is always `true`. When
 * `react-i18next` is wired in, only this file changes.
 *
 * @example const { t } = useTranslation(); t('actions.save', 'Save')
 */
export interface UseTranslationResult {
  t: (key: string, fallback?: string | Record<string, string | number>) => string
  ready: boolean
  i18n: string
}

export function useTranslation(_usePlaceholder = true): UseTranslationResult {
  return {
    t: (key, fallback) => {
      if (typeof fallback === 'string') return fallback
      return key
    },
    ready: true,
    i18n: '',
  }
}

export default useTranslation
