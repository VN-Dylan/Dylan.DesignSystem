import { forwardRef } from 'react'
import { classNames, useControllableState } from '@vn-dylan/utils'
import { Input } from '../Input'
import { createValueChange, numericCharacters, toRawString } from './numberFormatShim'
import type { CustomFormatInputProps } from './types'
import './CustomFormatInput.scss'

/**
 * Custom formatted input wrapper with a local react-number-format-compatible
 * value payload.
 */
export const CustomFormatInput = forwardRef<HTMLInputElement, CustomFormatInputProps>(
  function CustomFormatInput(
    {
      inputPrefix,
      inputSuffix,
      value,
      defaultValue,
      onChange,
      onValueChange,
      format,
      removeFormatting = numericCharacters,
      getCaretBoundary,
      isValidInputCharacter,
      className,
      ...rest
    },
    ref,
  ) {
    const [rawValue, setRawValue] = useControllableState({
      value: value == null ? undefined : toRawString(value),
      defaultValue: toRawString(defaultValue),
      onChange: (next) => onValueChange?.(createValueChange(next, formatValue(next))),
    })

    const formatValue = (next: string) => (format ? format(next) : next)

    const formattedValue = formatValue(rawValue)
    const caretBoundary = getCaretBoundary?.(formattedValue)

    return (
      <Input
        ref={ref}
        type="text"
        inputMode="numeric"
        prefix={inputPrefix}
        suffix={inputSuffix}
        data-caret-boundary={caretBoundary ? caretBoundary.length : undefined}
        className={classNames('dyl-custom-format-input', className)}
        value={formattedValue}
        onChange={(event) => {
          const next = removeFormatting(event.currentTarget.value)
            .split('')
            .filter((character) => isValidInputCharacter?.(character) ?? /\d/.test(character))
            .join('')
          setRawValue(next)
          onChange?.(event)
        }}
        {...rest}
      />
    )
  },
)
