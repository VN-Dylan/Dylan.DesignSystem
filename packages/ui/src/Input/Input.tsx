import { forwardRef } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { InputProps } from './types'
import './Input.scss'

/**
 * Single-line or multi-line text field, with optional inline prefix/suffix
 * affixes. Forwards `ref` to the underlying `input` / `textarea`.
 */
export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(function Input(
  {
    size = 'md',
    invalid = false,
    disabled = false,
    prefix,
    suffix,
    textArea = false,
    unstyle = false,
    className,
    type = 'text',
    rows,
    ...rest
  },
  ref,
) {
  const fieldClass = classNames('dyl-input__field', unstyle && 'dyl-input__field--unstyled')

  const field = textArea ? (
    <textarea
      ref={ref as React.Ref<HTMLTextAreaElement>}
      className={fieldClass}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      rows={rows ?? 3}
      {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
    />
  ) : (
    <input
      ref={ref as React.Ref<HTMLInputElement>}
      type={type}
      className={fieldClass}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  )

  if (unstyle) return field

  return (
    <div
      className={classNames('dyl-input', className)}
      data-size={size}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      data-textarea={textArea || undefined}
    >
      {prefix != null && (
        <span className="dyl-input__affix dyl-input__affix--prefix">{prefix}</span>
      )}
      {field}
      {suffix != null && (
        <span className="dyl-input__affix dyl-input__affix--suffix">{suffix}</span>
      )}
    </div>
  )
})
