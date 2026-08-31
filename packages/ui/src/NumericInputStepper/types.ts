import type { HTMLAttributes } from 'react'

export interface NumericInputStepperProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'> {
  /** Current numeric value. @default 0 */
  value?: number
  /** Callback fired when the value changes. */
  onChange?: (value: number) => void
  /** Minimum allowed value. @default 0 */
  min?: number
  /** Maximum allowed value. @default Infinity */
  max?: number
  /** Amount to increment or decrement by. @default 1 */
  step?: number
  /** Whether the stepper is disabled. @default false */
  disabled?: boolean
  /** Additional CSS classes to apply. @default "" */
  className?: string
}
