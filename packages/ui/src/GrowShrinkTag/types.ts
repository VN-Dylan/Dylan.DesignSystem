import type { HTMLAttributes, ReactNode } from 'react'

export interface GrowShrinkTagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'prefix'> {
  /**
   * The numeric value to display. Positive values show success styling, negative values show error styling.
   * @default 0
   */
  value?: number
  /** Whether to show the directional arrow icon. @default true */
  showIcon?: boolean
  /** Content to display before the value. */
  prefix?: ReactNode | string
  /** Content to display after the value. */
  suffix?: ReactNode | string
  /** Additional CSS classes to apply to the tag. */
  className?: string
}
