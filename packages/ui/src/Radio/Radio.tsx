import { forwardRef, useId } from 'react'
import type { MouseEvent } from 'react'
import { classNames, useControllableState } from '@dylan-ds/utils'
import { RadioGroupProvider, useRadioGroupContext } from './context'
import type { RadioGroupProps, RadioProps, RadioValue } from './types'
import './Radio.scss'

const RadioRoot = forwardRef<HTMLInputElement, RadioProps>(function RadioRoot(
  {
    checked,
    radioClass,
    defaultChecked,
    disabled = false,
    labelRef,
    name,
    onChange,
    value,
    vertical = false,
    className,
    children,
    onClick,
    ...rest
  },
  ref,
) {
  const group = useRadioGroupContext()
  const groupChecked = group ? Object.is(group.value, value) : undefined
  const [selfChecked, setSelfChecked] = useControllableState<boolean>({
    value: groupChecked ?? checked,
    defaultValue: defaultChecked ?? false,
  })
  const isDisabled = disabled || group?.disabled || false
  const resolvedClassName =
    typeof className === 'function'
      ? className({ checked: selfChecked, disabled: isDisabled })
      : className

  const commit = (event: MouseEvent<HTMLInputElement>) => {
    if (!event.currentTarget.checked || selfChecked) {
      onClick?.(event)
      return
    }
    if (group) group.setValue(value, event)
    else setSelfChecked(true)
    onChange?.(value, event)
    onClick?.(event)
  }

  return (
    <label
      ref={labelRef}
      data-checked={selfChecked || undefined}
      data-disabled={isDisabled || undefined}
      data-vertical={vertical || undefined}
      data-color={group?.color}
      className={classNames('dyl-radio', resolvedClassName)}
    >
      <input
        ref={ref}
        type="radio"
        className="dyl-radio__input"
        checked={selfChecked}
        disabled={isDisabled}
        value={typeof value === 'string' || typeof value === 'number' ? value : undefined}
        name={name ?? group?.name}
        onChange={() => undefined}
        onClick={commit}
        {...rest}
      />
      <span className={classNames('dyl-radio__control', group?.radioClass, radioClass)} aria-hidden>
        <span className="dyl-radio__dot" />
      </span>
      {children != null && <span className="dyl-radio__label">{children}</span>}
    </label>
  )
})

const Group = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  {
    color,
    disabled = false,
    name,
    onChange,
    value,
    vertical = false,
    radioClass,
    className,
    children,
    ...rest
  },
  ref,
) {
  const generatedName = useId()
  const [selected, setSelected] = useControllableState<RadioValue | undefined>({
    value,
    defaultValue: undefined,
  })

  const setValue = (next: RadioValue, event: MouseEvent<HTMLInputElement>) => {
    setSelected(next)
    onChange?.(next, event)
  }

  return (
    <RadioGroupProvider
      value={{
        value: selected,
        name: name ?? generatedName,
        disabled,
        color,
        radioClass,
        setValue,
      }}
    >
      <div
        ref={ref}
        role="radiogroup"
        data-vertical={vertical || undefined}
        data-color={color}
        data-disabled={disabled || undefined}
        className={classNames('dyl-radio-group', className)}
        {...rest}
      >
        {children}
      </div>
    </RadioGroupProvider>
  )
})

/**
 * Radios let users choose a single option in a series of options.
 */
export const Radio = Object.assign(RadioRoot, { Group })
