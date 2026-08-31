import type { ChangeEventHandler, ReactNode } from 'react'
import type { InputProps } from '../Input'

export interface NumberFormatValue {
  formattedValue: string
  value: string
  floatValue?: number
}

export interface CustomFormatInputProps
  extends Omit<
    InputProps,
    'prefix' | 'suffix' | 'value' | 'defaultValue' | 'onChange' | 'type' | 'textArea'
  > {
  /** Render a prefix content inside Input. */
  inputPrefix?: string | ReactNode
  /** Render a suffix content inside Input. */
  inputSuffix?: string | ReactNode
  /** Controlled numeric string or number. */
  value?: string | number
  /** Initial numeric string or number. */
  defaultValue?: string | number
  /** Native input change callback. */
  onChange?: ChangeEventHandler<HTMLInputElement>
  /** Callback compatible with react-number-format value payloads. */
  onValueChange?: (value: NumberFormatValue) => void
  /** A format function which can turn any numeric string to a formatted string. */
  format?: (value: string) => string
  /** A function to removing formatting from a formatted string and return numeric string. */
  removeFormatting?: (value: string) => string
  /** Returns boundaries of valid cursor positions for a formatted string. */
  getCaretBoundary?: (formattedValue: string) => boolean[]
  /** A function to tell if a character in the formatted value is a valid typeable character. */
  isValidInputCharacter?: (character: string) => boolean
}
