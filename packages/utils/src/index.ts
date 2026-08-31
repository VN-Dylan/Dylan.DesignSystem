// @dylan-ds/utils — framework hooks and helpers.
//
// Ported from the Eyris `@/utils` surface. Six app-coupled hooks
// (useAuth, useLayout, useMenuActive, useDataTableState,
// useAppendQueryParams, useQueryParamPagingState) are intentionally NOT here —
// they depend on the app's router / store / navigation config and live with
// their owner (showcase app, or the DataTable component). See PROGRESS.md.

// --- functions ---
export { classNames, type ClassValue } from './functions/classNames'
export { acronym } from './functions/acronym'
export { sleep } from './functions/sleep'
export { isLastChild } from './functions/isLastChild'
export { paginate } from './functions/paginate'
export { sortBy, type Primer } from './functions/sortBy'
export { wildCardSearch } from './functions/wildCardSearch'
export { fileSizeUnit } from './functions/fileSizeUnit'
export { getContrast } from './functions/getContrast'
export { cookiesStorage } from './functions/cookiesStorage'
export { formatCurrency } from './functions/formatCurrency'
export { formatCurrencyCompact } from './functions/formatCurrencyCompact'
export { formatNumber } from './functions/formatNumber'
export { formatRelativeTime } from './functions/formatRelativeTime'
export { highlightSearchMatch } from './functions/highlightSearchMatch'

// --- hooks ---
export { useIsomorphicLayoutEffect } from './hooks/useIsomorphicLayoutEffect'
export { useDebounce } from './hooks/useDebounce'
export { useInterval } from './hooks/useInterval'
export {
  useResponsive,
  breakpoints,
  type BreakpointKey,
  type ResponsiveInfo,
} from './hooks/useResponsive'
export { useScrollTop, type UseScrollTopResult } from './hooks/useScrollTop'
export { useTimeOutMessage } from './hooks/useTimeOutMessage'
export { useDarkMode, type ColorMode } from './hooks/useDarkMode'
export { useDirection, type Direction } from './hooks/useDirection'
export { useRandomColor, type RandomColorClasses } from './hooks/useRandomColor'
export { useThemeSchema } from './hooks/useThemeSchema'
export { useTranslation, type UseTranslationResult } from './hooks/useTranslation'
export {
  useControllableState,
  type UseControllableStateOptions,
} from './hooks/useControllableState'
