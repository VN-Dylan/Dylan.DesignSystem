import { useEffect, useState } from 'react'

export interface UseScrollTopResult {
  /** `true` once the page has scrolled past `offset` from the top. */
  isSticky: boolean
}

/**
 * Track whether the window has scrolled past `offset` pixels — handy for
 * sticky-header transitions.
 *
 * @example const { isSticky } = useScrollTop()
 */
export function useScrollTop(offset = 0): UseScrollTopResult {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return { isSticky }
}

export default useScrollTop
