import { useEffect, useState } from 'react'

/** Breakpoint pixel values — mirror `@vn-dylan/tokens` `$breakpoint`. */
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type BreakpointKey = keyof typeof breakpoints
type BreakpointMap = Record<BreakpointKey, boolean>

export interface ResponsiveInfo {
  /** Breakpoints whose min-width the current viewport meets or exceeds. */
  larger: BreakpointMap
  /** Breakpoints whose min-width the current viewport is below. */
  smaller: BreakpointMap
  windowWidth: number
}

const compute = (width: number): ResponsiveInfo => {
  const larger = {} as BreakpointMap
  const smaller = {} as BreakpointMap
  for (const key of Object.keys(breakpoints) as BreakpointKey[]) {
    larger[key] = width >= breakpoints[key]
    smaller[key] = width < breakpoints[key]
  }
  return { larger, smaller, windowWidth: width }
}

/**
 * Reactive viewport-size helper.
 *
 * @example const { larger } = useResponsive(); if (larger.lg) { … }
 */
export function useResponsive(): ResponsiveInfo {
  const [info, setInfo] = useState<ResponsiveInfo>(() =>
    compute(typeof window === 'undefined' ? breakpoints.lg : window.innerWidth),
  )

  useEffect(() => {
    const onResize = () => setInfo(compute(window.innerWidth))
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return info
}

export default useResponsive
