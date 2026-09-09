import { useEffect, useState } from 'react'

const query = '(prefers-reduced-motion: reduce)'

const getSnapshot = () =>
  typeof window !== 'undefined' && window.matchMedia?.(query).matches === true

/**
 * Returns true when the user has requested reduced motion. Components in this
 * folder render without transform or opacity animation when it is true.
 */
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getSnapshot)

  useEffect(() => {
    const mediaQuery = window.matchMedia?.(query)
    if (!mediaQuery) return

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    handleChange()
    mediaQuery.addEventListener?.('change', handleChange)
    return () => mediaQuery.removeEventListener?.('change', handleChange)
  }, [])

  return prefersReducedMotion
}
