// @dylan-ds/utils — framework hooks and helpers.
//
// Ported from the Eyris `@/utils` surface. Three app-coupled hooks
// (useAuth, useLayout, useMenuActive) are intentionally NOT here — they depend
// on the app's auth store / layout config / navigation tree and live in the
// showcase app. See PROGRESS.md.
//
// The table / URL hooks below are Eyris-coupled to react-router in the vendor
// template; ours drive the History API directly so they carry no router
// dependency.

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
export {
  useAppendQueryParams,
  type AppendQueryParamsOptions,
  type UseAppendQueryParamsResult,
} from './hooks/useAppendQueryParams'
export {
  useQueryParamPagingState,
  type TableQueries,
  type SortOrder,
} from './hooks/useQueryParamPagingState'
export { useDataTableState, type UseDataTableStateResult } from './hooks/useDataTableState'
export { withHeaderItem, type WithHeaderItemProps } from './hooks/withHeaderItem'
