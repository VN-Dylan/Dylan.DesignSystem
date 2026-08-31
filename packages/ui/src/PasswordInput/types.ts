import type { InputProps } from '../Input'

export interface PasswordInputProps extends Omit<InputProps, 'type' | 'textArea'> {
  /** Callback when icon clicked. */
  onVisibleChange?: (visible: boolean) => void
}
