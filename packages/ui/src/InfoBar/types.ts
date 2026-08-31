import type { HTMLAttributes } from 'react'

export type InfoBarLevel = 'low' | 'medium' | 'high'

export interface InfoBarProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * The level to display. Low shows 1 bar, medium shows 2 bars, high shows 3 bars.
   */
  level: InfoBarLevel
  /** Additional CSS classes to apply to the container. */
  className?: string
  /** Height of the info bar in pixels. @default 15 */
  height?: number
}
