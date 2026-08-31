import type { ChangeEventHandler, ReactNode } from 'react'
import type { InputProps } from '../Input'
import type { NumberFormatValue } from '../CustomFormatInput'

export interface PatternInputProps
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
  /** Format pattern using the # placeholder by default. */
  format?: string
  /** Apply formatting when value is empty. */
  allowEmptyFormatting?: boolean
  /** Mask character or mask character array for empty numeric positions. */
  mask?: string | string[]
  /** Character used as the format placeholder. */
  patternChar?: string
}
