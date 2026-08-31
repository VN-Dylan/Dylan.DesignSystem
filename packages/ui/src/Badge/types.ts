import type { CSSProperties, HTMLAttributes } from 'react'

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'content'> {
  /** Content to show in badge. */
  content?: string | number
  /** Max number to show. @default 99 */
  maxCount?: number
  /** Class for badge inner. */
  innerClass?: string
  /** Custom styling for Badge. */
  badgeStyle?: CSSProperties
}
