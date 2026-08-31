import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export interface PortalProps {
  children: ReactNode
  /** Target container. Defaults to `document.body`. */
  container?: Element | null
}

/**
 * Renders `children` into `container` (default `document.body`) once mounted.
 * SSR-safe: renders nothing on the server / first paint.
 */
export function Portal({ children, container }: PortalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null
  const target = container ?? (typeof document !== 'undefined' ? document.body : null)
  if (!target) return null

  return createPortal(children, target)
}
