import type { InputHTMLAttributes, ReactNode } from 'react'

export interface AutoCompleteClassNameState {
  open: boolean
}

export interface AutoCompleteProps<T>
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'className' | 'defaultValue' | 'onChange' | 'value' | 'size' | 'prefix'
  > {
  /** Array of data items to be used as autocomplete options. @default [] */
  data?: T[]
  /** Function to extract the string key from each data item for filtering and display. */
  optionKey: (obj: T) => string
  /** Current input value (controlled). */
  value?: string
  /** Initial input value for uncontrolled usage. */
  defaultValue?: string
  /** Callback fired when the input value changes. */
  onInputChange?: (value: string) => void
  /** Callback fired when an option is selected from the dropdown. */
  onOptionSelected?: (option: T) => void
  /** Custom render function for each option in the dropdown list. */
  renderOption?: (option: T) => ReactNode
  /** String, or a callback receiving autocomplete state. */
  className?: string | ((state: AutoCompleteClassNameState) => string)
}
