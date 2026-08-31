import { forwardRef } from 'react'
import { classNames, useControllableState } from '@dylan-ds/utils'
import type { SwitcherProps } from './types'
import './Switcher.scss'

/**
 * Switcher is an alternative to a single checkbox for enabled / disabled state.
 */
export const Switcher = forwardRef<HTMLInputElement, SwitcherProps>(function Switcher(
  {
    checked,
    checkedContent,
    defaultChecked,
    disabled = false,
    isLoading = false,
    labelRef,
    name,
    onChange,
    readOnly = false,
    toggledClass,
    unCheckedContent,
    className,
    onClick,
    onKeyDown,
    onMouseDown,
    ...rest
  },
  ref,
) {
  const [selfChecked, setSelfChecked] = useControllableState<boolean>({
    value: checked,
    defaultValue: defaultChecked ?? false,
  })
  const isDisabled = disabled || isLoading
  const interactionDisabled = isDisabled || readOnly
  const resolvedClassName =
    typeof className === 'function'
      ? className({
          checked: selfChecked,
          disabled: interactionDisabled,
          loading: isLoading,
          readOnly,
        })
      : className

  return (
    <label
      ref={labelRef}
      data-checked={selfChecked || undefined}
      data-disabled={isDisabled || undefined}
      data-loading={isLoading || undefined}
      data-readonly={readOnly || undefined}
      className={classNames('dyl-switcher', resolvedClassName)}
    >
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        className="dyl-switcher__input"
        checked={selfChecked}
        disabled={interactionDisabled}
        readOnly={readOnly}
        name={name}
        aria-checked={selfChecked}
        aria-busy={isLoading || undefined}
        onChange={(event) => {
          if (readOnly) {
            event.preventDefault()
            event.currentTarget.checked = selfChecked
          }
        }}
        onMouseDown={(event) => {
          if (readOnly) event.preventDefault()
          onMouseDown?.(event)
        }}
        onKeyDown={(event) => {
          if (readOnly && event.key === ' ') event.preventDefault()
          onKeyDown?.(event)
        }}
        onClick={(event) => {
          if (readOnly) {
            event.preventDefault()
            onClick?.(event)
            return
          }
          const nextChecked = event.currentTarget.checked
          setSelfChecked(nextChecked)
          onChange?.(nextChecked, event)
          onClick?.(event)
        }}
        {...rest}
      />
      <span className={classNames('dyl-switcher__track', selfChecked && toggledClass)} aria-hidden>
        {(checkedContent != null || unCheckedContent != null) && (
          <span className="dyl-switcher__content">
            {selfChecked ? checkedContent : unCheckedContent}
          </span>
        )}
        {isLoading && <span className="dyl-switcher__loader" />}
        <span className="dyl-switcher__thumb" />
      </span>
    </label>
  )
})
