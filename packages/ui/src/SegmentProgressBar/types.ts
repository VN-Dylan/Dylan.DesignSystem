import type { HTMLAttributes } from 'react'

export interface SegmentProgressBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  /** Number of segments to display. */
  segments: number
  /** Progress percentage (0-100). Determines how many segments are filled. */
  percent: number
  /** CSS class for filled segments. @default "bg-emerald-500" */
  filledClass?: string
  /** Additional CSS classes for each segment. */
  className?: string
  /** Gap between segments in pixels. @default 4 */
  gap?: number
  /** Height of each segment in pixels. @default 16 */
  height?: number
}
