import { useCallback } from 'react'
import { breakpoints } from '@vn-dylan/tokens'
import { useMediaQuery } from './useMediaQuery'

export type BreakpointName = keyof typeof breakpoints
export type ActiveBreakpoint = 'base' | BreakpointName

export interface UseBreakpointResult {
  /** Largest minimum-width breakpoint currently matched. */
  active: ActiveBreakpoint
  /** Whether the viewport is at or above a breakpoint. */
  up: (breakpoint: ActiveBreakpoint) => boolean
  /** Whether the active breakpoint is at or below a breakpoint. */
  down: (breakpoint: ActiveBreakpoint) => boolean
}

const order: readonly ActiveBreakpoint[] = ['base', 'sm', 'md', 'lg', 'xl', '2xl']
const query = (breakpoint: BreakpointName) => `(min-width: ${breakpoints[breakpoint]}px)`

/** Return the active Dylan breakpoint and stable `up`/`down` helpers. */
export const useBreakpoint = (): UseBreakpointResult => {
  const sm = useMediaQuery(query('sm'))
  const md = useMediaQuery(query('md'))
  const lg = useMediaQuery(query('lg'))
  const xl = useMediaQuery(query('xl'))
  const xxl = useMediaQuery(query('2xl'))

  const active: ActiveBreakpoint = xxl
    ? '2xl'
    : xl
      ? 'xl'
      : lg
        ? 'lg'
        : md
          ? 'md'
          : sm
            ? 'sm'
            : 'base'
  const activeIndex = order.indexOf(active)

  const up = useCallback(
    (breakpoint: ActiveBreakpoint) => activeIndex >= order.indexOf(breakpoint),
    [activeIndex],
  )
  const down = useCallback(
    (breakpoint: ActiveBreakpoint) => activeIndex <= order.indexOf(breakpoint),
    [activeIndex],
  )

  return { active, up, down }
}
