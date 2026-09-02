import { forwardRef } from 'react'
import { classNames, useControllableState } from '@vn-dylan/utils'
import { Input } from '../Input'
import {
  applyPatternFormat,
  createValueChange,
  numericCharacters,
  toRawString,
} from '../CustomFormatInput/numberFormatShim'
import type { PatternInputProps } from './types'
import './PatternInput.scss'

/**
 * Pattern formatted input wrapper compatible with the Eyris PatternInput API.
 */
export const PatternInput = forwardRef<HTMLInputElement, PatternInputProps>(function PatternInput(
  {
    inputPrefix,
    inputSuffix,
    value,
    defaultValue,
    onChange,
    onValueChange,
    format,
    allowEmptyFormatting,
    mask,
    patternChar = '#',
    className,
    ...rest
  },
  ref,
) {
  const formatValue = (next: string) =>
    applyPatternFormat({ value: next, format, allowEmptyFormatting, mask, patternChar })

  const [rawValue, setRawValue] = useControllableState({
    value: value == null ? undefined : numericCharacters(toRawString(value)),
    defaultValue: numericCharacters(toRawString(defaultValue)),
    onChange: (next) => onValueChange?.(createValueChange(next, formatValue(next))),
  })

  const formattedValue = formatValue(rawValue)

  return (
    <Input
      ref={ref}
      type="text"
      inputMode="numeric"
      prefix={inputPrefix}
      suffix={inputSuffix}
      className={classNames('dyl-pattern-input', className)}
      value={formattedValue}
      onChange={(event) => {
        setRawValue(numericCharacters(event.currentTarget.value))
        onChange?.(event)
      }}
      {...rest}
    />
  )
})
