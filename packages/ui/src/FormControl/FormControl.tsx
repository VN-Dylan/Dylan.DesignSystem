import { forwardRef, useId } from 'react'
import { classNames } from '@dylan-ds/utils'
import { FormContext, useFormContext } from './context'
import type { FormItemProps, FormProps } from './types'
import './FormControl.scss'

const toWidth = (v: string | number) => (typeof v === 'number' ? `${v}px` : v)

const FormRoot = forwardRef<HTMLFormElement, FormProps>(function Form(
  { layout = 'vertical', size = 'md', labelWidth = 100, className, children, ...rest },
  ref,
) {
  return (
    <FormContext.Provider value={{ layout, size, labelWidth }}>
      <form
        ref={ref}
        data-layout={layout}
        data-size={size}
        className={classNames('dyl-form', className)}
        {...rest}
      >
        {children}
      </form>
    </FormContext.Provider>
  )
})

const FormItem = forwardRef<HTMLDivElement, FormItemProps>(function FormItem(
  {
    label,
    extra,
    asterisk = false,
    errorMessage,
    invalid = false,
    htmlFor,
    layout: layoutProp,
    size: sizeProp,
    className,
    children,
    ...rest
  },
  ref,
) {
  const ctx = useFormContext()
  const layout = layoutProp ?? ctx.layout
  const size = sizeProp ?? ctx.size
  const isInvalid = invalid || errorMessage != null
  const generatedId = useId()
  const errorId = `${generatedId}-error`

  return (
    <div
      ref={ref}
      data-layout={layout}
      data-size={size}
      data-invalid={isInvalid || undefined}
      className={classNames('dyl-form-item', className)}
      style={
        layout === 'horizontal'
          ? ({ '--dyl-form-label-width': toWidth(ctx.labelWidth) } as React.CSSProperties)
          : undefined
      }
      {...rest}
    >
      {(label != null || extra != null) && (
        <div className="dyl-form-item__label-row">
          {label != null && (
            <label className="dyl-form-item__label" htmlFor={htmlFor}>
              {label}
              {asterisk && (
                <span className="dyl-form-item__asterisk" aria-hidden>
                  {' '}
                  *
                </span>
              )}
            </label>
          )}
          {extra != null && <span className="dyl-form-item__extra">{extra}</span>}
        </div>
      )}
      <div className="dyl-form-item__control" aria-describedby={errorMessage ? errorId : undefined}>
        {children}
      </div>
      {errorMessage != null && (
        <p id={errorId} className="dyl-form-item__error" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  )
})

/**
 * `Form` sets layout/size context; `Form.Item` renders label, required marker,
 * control slot and error text. Presentational — wire values with react-hook-form
 * (or any form library) on the controls themselves.
 */
export const Form = Object.assign(FormRoot, { Item: FormItem })
