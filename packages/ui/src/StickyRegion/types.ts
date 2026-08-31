import type { HTMLAttributes, ReactNode } from 'react'

export interface StickyRegionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Distance from the top of the viewport when sticky. @default 0 */
  offsetTop?: number
  /** Custom scroll position to trigger sticky behavior. */
  triggerOffset?: number
  /** Whether to show a shadow when sticky. @default true */
  shadow?: boolean
  /** Additional CSS classes to apply when sticky. */
  stickyClassName?: string
  /** z-index value when sticky. @default 40 */
  zIndex?: number
  /** Duration of the shadow transition in milliseconds. @default 300 */
  transitionDuration?: number
  /** Callback fired when sticky state changes. */
  onStickyChange?: (isSticky: boolean) => void
  /** Additional CSS classes for the container. */
  className?: string
  /** Content to render inside the sticky region. */
  children?: ReactNode
}
