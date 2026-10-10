import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useId,
  type CSSProperties,
  type ReactElement,
} from 'react'
import { classNames } from '@vn-dylan/utils'
import { FormContext, useFormContext } from './context'
import type { FormGroupProps, FormItemProps, FormProps } from './types'
import './FormControl.scss'

const toWidth = (v: string | number) => (typeof v === 'number' ? `${v}px` : v)

type ControlProps = { id?: string; 'aria-describedby'?: string }

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

const FormGroup = forwardRef<HTMLFieldSetElement, FormGroupProps>(function FormGroup(
  { title, description, extra, columns = 1, divided = false, className, children, ...rest },
  ref,
) {
  const descriptionId = useId()

  return (
    <fieldset
      ref={ref}
      data-columns={columns}
      data-divided={divided || undefined}
      data-has-extra={extra != null || undefined}
      aria-describedby={description != null ? descriptionId : undefined}
      className={classNames('dyl-form-group', className)}
      {...rest}
    >
      {/* `legend` must be the fieldset's first child to name the group. */}
      {title != null && <legend className="dyl-form-group__title">{title}</legend>}
      {extra != null && <div className="dyl-form-group__extra">{extra}</div>}
      {description != null && (
        <p id={descriptionId} className="dyl-form-group__description">
          {description}
        </p>
      )}
      <div className="dyl-form-group__body">{children}</div>
    </fieldset>
  )
})

const FormItem = forwardRef<HTMLDivElement, FormItemProps>(function FormItem(
  {
    label,
    extra,
    hint,
    asterisk = false,
    errorMessage,
    invalid = false,
    htmlFor,
    span,
    layout: layoutProp,
    size: sizeProp,
    className,
    style,
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
  const hintId = `${generatedId}-hint`
  const errorId = `${generatedId}-error`

  // A single control child is wired to the label, hint and error automatically;
  // an explicit `htmlFor` / child `id` / `aria-describedby` always wins.
  const onlyChild =
    Children.count(children) === 1 && isValidElement<ControlProps>(children)
      ? (children as ReactElement<ControlProps>)
      : null
  const controlId = htmlFor ?? onlyChild?.props.id ?? (onlyChild ? generatedId : undefined)
  // The error replaces the hint while present.
  const describedBy = errorMessage != null ? errorId : hint != null ? hintId : undefined
  const control = onlyChild
    ? cloneElement(onlyChild, {
        id: onlyChild.props.id ?? controlId,
        'aria-describedby':
          [onlyChild.props['aria-describedby'], describedBy].filter(Boolean).join(' ') || undefined,
      })
    : children

  const itemStyle: CSSProperties = {
    ...(layout === 'horizontal'
      ? ({ '--dyl-form-label-width': toWidth(ctx.labelWidth) } as CSSProperties)
      : null),
    ...style,
  }

  return (
    <div
      ref={ref}
      data-layout={layout}
      data-size={size}
      data-invalid={isInvalid || undefined}
      data-span={span}
      className={classNames('dyl-form-item', className)}
      style={itemStyle}
      {...rest}
    >
      {(label != null || extra != null) && (
        <div className="dyl-form-item__label-row">
          {label != null && (
            <label className="dyl-form-item__label" htmlFor={controlId}>
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
      <div className="dyl-form-item__control">{control}</div>
      {hint != null && errorMessage == null && (
        <p id={hintId} className="dyl-form-item__hint">
          {hint}
        </p>
      )}
      {errorMessage != null && (
        <p id={errorId} className="dyl-form-item__error" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  )
})

/**
 * `Form` sets layout/size context; `Form.Group` clusters related fields under a
 * title on a responsive column grid; `Form.Item` renders label, required
 * marker, control slot, hint and error text, and wires a single control to them
 * (`id`, `aria-describedby`). Presentational — wire values with
 * react-hook-form (or any form library) on the controls themselves.
 *
 * Actions: on a page put Save / Cancel in `<ActionGroup sticky>` at the end of
 * the form; in a `Dialog` / `Drawer` pass them as `footer` and point the submit
 * button at the form with `form="<form id>"`.
 */
export const Form = Object.assign(FormRoot, { Item: FormItem, Group: FormGroup })
