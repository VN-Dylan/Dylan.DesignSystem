import { useEffect, useState } from 'react'

export interface UseMediaQueryOptions {
  /** Value returned during SSR and the first client render. @default false */
  defaultValue?: boolean
}

/** Subscribe to a CSS media query without reading `window` during render. */
export const useMediaQuery = (
  query: string,
  { defaultValue = false }: UseMediaQueryOptions = {},
) => {
  const [matches, setMatches] = useState(defaultValue)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const update = (event: MediaQueryListEvent | MediaQueryList) => setMatches(event.matches)

    update(mediaQuery)
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [query])

  return matches
}
