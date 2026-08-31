import type { HTMLAttributes } from 'react'

export type DividerOrientation = 'horizontal' | 'vertical'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** The orientation of the divider. @default 'horizontal' */
  orientation?: DividerOrientation
  /** Additional CSS classes to apply to the divider. @default '' */
  className?: string
}
