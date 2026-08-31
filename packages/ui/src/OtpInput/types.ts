import type { HTMLAttributes } from 'react'

export interface OtpInputProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Whether the Input is focused automatically. */
  autoFocus?: boolean
  /** Whether the Input is disabled. */
  disabled?: boolean
  /** Whether the Input is invalid status. */
  invalid?: boolean
  /** Class for all input fields. */
  inputClass?: string
  /** Length of input field. */
  length?: number
  /** Callback when Input value changed. */
  onChange?: (value: string) => void
  /** Placeholder text for all input fields. */
  placeholder?: string
  /** Controlled Input value. */
  value?: string
}
