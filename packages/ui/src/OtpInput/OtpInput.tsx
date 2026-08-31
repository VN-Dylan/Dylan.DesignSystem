import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  type ClipboardEvent,
  type KeyboardEvent,
} from 'react'
import { classNames, useControllableState } from '@dylan-ds/utils'
import type { OtpInputProps } from './types'
import './OtpInput.scss'

const sanitize = (value: string) => value.replace(/\D/g, '')

/**
 * Multi-field one-time-password input.
 */
export const OtpInput = forwardRef<HTMLDivElement, OtpInputProps>(function OtpInput(
  {
    autoFocus,
    disabled,
    invalid,
    inputClass,
    length,
    onChange,
    placeholder,
    value,
    className,
    ...rest
  },
  ref,
) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
  const fieldCount = length ?? 6
  const [otpValue, setOtpValue] = useControllableState({
    value: value == null ? undefined : sanitize(value).slice(0, fieldCount),
    defaultValue: '',
    onChange,
  })

  const digits = useMemo(
    () => Array.from({ length: fieldCount }, (_, index) => otpValue[index] ?? ''),
    [fieldCount, otpValue],
  )

  useEffect(() => {
    if (autoFocus && !disabled) inputRefs.current[0]?.focus()
  }, [autoFocus, disabled])

  const commit = (nextDigits: string[], focusIndex?: number) => {
    const nextValue = nextDigits.join('').slice(0, fieldCount)
    setOtpValue(nextValue)
    if (focusIndex != null) inputRefs.current[Math.min(focusIndex, fieldCount - 1)]?.focus()
  }

  const onInputChange = (index: number, next: string) => {
    const cleaned = sanitize(next)
    if (!cleaned) {
      const nextDigits = [...digits]
      nextDigits[index] = ''
      commit(nextDigits)
      return
    }

    // If the value grew by appending to an already-filled field, the new
    // characters belong to the following fields.
    const isAppend = cleaned.length > 1 && digits[index] !== '' && cleaned[0] === digits[index]
    const chars = isAppend ? cleaned.slice(1) : cleaned
    const start = isAppend ? index + 1 : index

    const nextDigits = [...digits]
    chars.split('').forEach((digit, offset) => {
      if (start + offset < fieldCount) nextDigits[start + offset] = digit
    })

    const lastFilled = Math.min(start + chars.length - 1, fieldCount - 1)
    // Fresh single keystroke advances; an append/paste stays on the last field.
    commit(nextDigits, isAppend || chars.length > 1 ? lastFilled : lastFilled + 1)
  }

  const onKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && digits[index] === '' && index > 0) {
      event.preventDefault()
      inputRefs.current[index - 1]?.focus()
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault()
      inputRefs.current[index - 1]?.focus()
    }
    if (event.key === 'ArrowRight' && index < fieldCount - 1) {
      event.preventDefault()
      inputRefs.current[index + 1]?.focus()
    }
  }

  const onPaste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    onInputChange(index, event.clipboardData.getData('text'))
  }

  return (
    <div
      ref={ref}
      className={classNames('dyl-otp-input', className)}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      {...rest}
    >
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(node) => {
            inputRefs.current[index] = node
          }}
          className={classNames('dyl-otp-input__field', inputClass)}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : undefined}
          aria-label={`Digit ${index + 1}`}
          aria-invalid={invalid || undefined}
          disabled={disabled}
          placeholder={placeholder}
          value={digit}
          onChange={(event) => onInputChange(index, event.currentTarget.value)}
          onKeyDown={(event) => onKeyDown(index, event)}
          onPaste={(event) => onPaste(index, event)}
        />
      ))}
    </div>
  )
})
