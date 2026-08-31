import type { ChangeEventHandler, ReactNode } from 'react'
import type { InputProps } from '../Input'
import type { NumberFormatValue } from '../CustomFormatInput'

export type NumericInputThousandsGroupStyle = 'thousand' | 'lakh' | 'wan' | 'none'

export interface NumericInputProps
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
  /** Whether to enable thousandSeparator, also allow custom character. */
  thousandSeparator?: boolean | string
  /** Decimal separator symbol. */
  decimalSeparator?: string
  /** Characters which when pressed result in a decimal separator. */
  allowedDecimalSeparators?: string[]
  /** Defines the thousand grouping style. */
  thousandsGroupStyle?: NumericInputThousandsGroupStyle
  /** Limits the number of digits after the decimal point. */
  decimalScale?: number
  /** Adds trailing zeros after decimalSeparator to match decimalScale. */
  fixedDecimalScale?: boolean
  /** Allows leading zeros in the input field. */
  allowLeadingZeros?: boolean
  /** If false, negative numbers will not be allowed. */
  allowNegative?: boolean
  /** Adds the suffix after the input value. */
  suffix?: string
  /** Adds the prefix character before the input value. */
  prefix?: string
}
