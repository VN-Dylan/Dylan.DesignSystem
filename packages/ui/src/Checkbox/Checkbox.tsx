import { forwardRef, useEffect, useRef } from 'react'
import { classNames, useControllableState } from '@vn-dylan/utils'
import { CheckboxGroupProvider, useCheckboxGroupContext } from './context'
import type { CheckboxGroupProps, CheckboxProps, CheckboxValue } from './types'
import './Checkbox.scss'

const includesValue = (values: CheckboxValue[], value: CheckboxValue) =>
  values.some((item) => item === value)

const CheckboxRoot = forwardRef<HTMLInputElement, CheckboxProps>(function CheckboxRoot(
  {
    checked,
    defaultChecked,
    disabled = false,
    indeterminate = false,
    value,
    labelRef,
    checkboxClass,
    onChange,
    name,
    className,
    children,
    onClick,
    ...rest
  },
  ref,
) {
  const group = useCheckboxGroupContext()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const groupChecked = group && value !== undefined ? includesValue(group.value, value) : undefined
  const [selfChecked, setSelfChecked] = useControllableState<boolean>({
    value: groupChecked ?? checked,
    defaultValue: defaultChecked ?? false,
  })
  const isDisabled = disabled || group?.disabled || false

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate
  }, [indeterminate])

  const resolvedClassName =
    typeof className === 'function'
      ? className({ checked: selfChecked, disabled: isDisabled, indeterminate })
      : className

  const setInputRef = (node: HTMLInputElement | null) => {
    inputRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }

  return (
    <label
      ref={labelRef}
      data-checked={selfChecked || undefined}
      data-disabled={isDisabled || undefined}
      data-indeterminate={indeterminate || undefined}
      data-color={group?.color}
      className={classNames('dyl-checkbox', resolvedClassName)}
    >
      <input
        ref={setInputRef}
        type="checkbox"
        className="dyl-checkbox__input"
        checked={selfChecked}
        disabled={isDisabled}
        value={value}
        name={name ?? group?.name}
        onChange={() => undefined}
        onClick={(event) => {
          const nextChecked = event.currentTarget.checked
          if (group && value !== undefined) group.setValue(value, nextChecked, event)
          else setSelfChecked(nextChecked)
          onChange?.(nextChecked, event)
          onClick?.(event)
        }}
        {...rest}
      />
      <span
        className={classNames('dyl-checkbox__control', group?.checkboxClass, checkboxClass)}
        aria-hidden
      />
      {children != null && <span className="dyl-checkbox__label">{children}</span>}
    </label>
  )
})

const Group = forwardRef<HTMLDivElement, CheckboxGroupProps>(function CheckboxGroup(
  {
    vertical = false,
    color,
    value,
    onChange,
    name,
    checkboxClass,
    disabled = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  const [selected, setSelected] = useControllableState<CheckboxValue[]>({
    value,
    defaultValue: [],
  })

  const setValue = (
    itemValue: CheckboxValue,
    checked: boolean,
    event: React.MouseEvent<HTMLInputElement>,
  ) => {
    const next = checked
      ? includesValue(selected, itemValue)
        ? selected
        : [...selected, itemValue]
      : selected.filter((item) => item !== itemValue)
    setSelected(next)
    onChange?.(next, event)
  }

  return (
    <CheckboxGroupProvider
      value={{ value: selected, name, disabled, color, checkboxClass, setValue }}
    >
      <div
        ref={ref}
        role="group"
        data-vertical={vertical || undefined}
        data-color={color}
        data-disabled={disabled || undefined}
        className={classNames('dyl-checkbox-group', className)}
        {...rest}
      >
        {children}
      </div>
    </CheckboxGroupProvider>
  )
})

/**
 * Checkboxes let users select one or more options from a choice of list.
 */
export const Checkbox = Object.assign(CheckboxRoot, { Group })
