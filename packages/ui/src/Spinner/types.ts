import type { HTMLAttributes, ReactNode } from 'react'
import type { IconType } from '@vn-dylan/icons'

export type SpinnerSize = string | number
export type SpinnerIndicator = ReactNode | IconType

/** State passed to a `className` callback. */
export interface SpinnerClassNameState {
  spinning: boolean
}

export interface SpinnerProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'className' | 'children'> {
  /** Spinner indicator. @default CgSpinner */
  indicator?: SpinnerIndicator
  /** Whether the Spinner is spinning. @default true */
  isSpining?: boolean
  /** Size of Spinner. @default 20 */
  size?: SpinnerSize
  /** String, or a callback receiving spinner state. */
  className?: string | ((state: SpinnerClassNameState) => string)
}
