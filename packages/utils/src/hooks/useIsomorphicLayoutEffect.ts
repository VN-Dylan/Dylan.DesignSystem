import { useEffect, useLayoutEffect } from 'react'

/**
 * `useLayoutEffect` on the client, `useEffect` on the server — avoids the
 * hydration warning while keeping synchronous DOM measurement in the browser.
 */
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
