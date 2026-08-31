import type { HTMLAttributes } from 'react'

export interface ClockProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Progress value from 0 to 100. */
  value?: number
  /** Size of the clock progress indicator in pixels. @default 40 */
  size?: number
}
