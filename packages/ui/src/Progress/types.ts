import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

export type ProgressVariant = 'line' | 'circle'
export type ProgressSize = 'sm' | 'md'
export type ProgressGapPosition = 'top' | 'right' | 'bottom' | 'left'
export type ProgressStrokeLinecap = 'round' | 'square'

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Custom content. */
  customInfo?: string | ReactNode
  /** The gap degree of circle progress. @default 0 */
  gapDegree?: number
  /** Gap postion of circle progress. @default 'top' */
  gapPosition?: ProgressGapPosition
  /** The current value of progress. @default 0 */
  percent?: number
  /** Whether to display progress info. @default true */
  showInfo?: boolean
  /** Size of progress bar. @default 'md' */
  size?: ProgressSize
  /** Custom class for stroke. */
  strokeClass?: string
  /** Style of the progress linecap. @default 'round' */
  strokeLinecap?: ProgressStrokeLinecap
  /** Width of the circular progress. @default 6 */
  strokeWidth?: number
  /** Css class for progress trail. */
  trailClass?: string
  /** Progress variants. @default 'line' */
  variant?: ProgressVariant
  /** Determine the size of circular progress. @default 'line' */
  width?: CSSProperties['width']
}
