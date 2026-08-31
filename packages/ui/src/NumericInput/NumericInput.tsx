import { forwardRef, useState } from 'react'
import { classNames, useControllableState } from '@dylan-ds/utils'
import { Input } from '../Input'
import {
  applyNumericFormat,
  createValueChange,
  normalizeNumericInput,
  toRawString,
} from '../CustomFormatInput/numberFormatShim'
import type { NumericInputProps } from './types'
import './NumericInput.scss'

/**
 * Numeric input wrapper compatible with the Eyris NumericInput API.
 */
export const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(function NumericInput(
  {
    inputPrefix,
    inputSuffix,
    value,
    defaultValue,
    onChange,
    onValueChange,
    thousandSeparator,
    decimalSeparator = '.',
    allowedDecimalSeparators,
    thousandsGroupStyle,
    decimalScale,
    fixedDecimalScale,
    allowLeadingZeros,
    allowNegative = true,
    suffix,
    prefix,
    className,
    onBlur,
    onFocus,
    ...rest
  },
  ref,
) {
  const [focused, setFocused] = useState(false)

  const normalize = (next: string) =>
    normalizeNumericInput({
      value: next,
      decimalSeparator,
      allowedDecimalSeparators,
      decimalScale,
      allowNegative,
      allowLeadingZeros,
    })

  const formatValue = (next: string, forceFixed = false) =>
    applyNumericFormat({
      value: next,
      thousandSeparator,
      decimalSeparator,
      thousandsGroupStyle,
      decimalScale,
      // Pad to a fixed decimal scale only once editing has finished.
      fixedDecimalScale: fixedDecimalScale && (forceFixed || !focused),
      prefix,
      suffix,
    })

  const [rawValue, setRawValue] = useControllableState({
    value: value == null ? undefined : normalize(toRawString(value)),
    defaultValue: normalize(toRawString(defaultValue)),
    onChange: (next) => onValueChange?.(createValueChange(next, formatValue(next))),
  })

  const formattedValue = formatValue(rawValue)

  return (
    <Input
      ref={ref}
      type="text"
      inputMode="decimal"
      prefix={inputPrefix}
      suffix={inputSuffix}
      className={classNames('dyl-numeric-input', className)}
      value={formattedValue}
      onChange={(event) => {
        setRawValue(normalize(event.currentTarget.value))
        onChange?.(event)
      }}
      onFocus={(event) => {
        setFocused(true)
        onFocus?.(event)
      }}
      onBlur={(event) => {
        setFocused(false)
        if (!allowLeadingZeros) setRawValue(normalize(event.currentTarget.value))
        onBlur?.(event)
      }}
      {...rest}
    />
  )
})
