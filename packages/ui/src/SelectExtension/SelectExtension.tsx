import { forwardRef } from 'react'
import { TbIcons } from '@dylan-ds/icons'
import { classNames } from '@dylan-ds/utils'
import type {
  SelectExtensionProps,
  SelectInputWithPrefixProps,
  SelectOptionWithPrefixProps,
} from './types'
import './SelectExtension.scss'

export const SelectInputWithPrefix = forwardRef<HTMLSpanElement, SelectInputWithPrefixProps>(
  function SelectInputWithPrefix({ label, prefix, showPrefix = true, className, ...rest }, ref) {
    return (
      <span
        ref={ref}
        data-prefix={showPrefix && prefix != null ? true : undefined}
        className={classNames('dyl-select-ext-input', className)}
        {...rest}
      >
        {showPrefix && prefix != null && (
          <span className="dyl-select-ext-input__prefix" aria-hidden>
            {prefix}
          </span>
        )}
        <span className="dyl-select-ext-input__label">{label}</span>
      </span>
    )
  },
)

export const SelectOptionWithPrefix = forwardRef<HTMLSpanElement, SelectOptionWithPrefixProps>(
  function SelectOptionWithPrefix(
    { prefix, label, selected = false, checkIcon, className, ...rest },
    ref,
  ) {
    return (
      <span
        ref={ref}
        data-selected={selected || undefined}
        data-prefix={prefix != null ? true : undefined}
        className={classNames('dyl-select-ext-option', className)}
        {...rest}
      >
        {prefix != null && (
          <span className="dyl-select-ext-option__prefix" aria-hidden>
            {prefix}
          </span>
        )}
        <span className="dyl-select-ext-option__label">{label}</span>
        {selected && (
          <span className="dyl-select-ext-option__check" aria-hidden>
            {checkIcon ?? <TbIcons.TbCheck />}
          </span>
        )}
      </span>
    )
  },
)

/**
 * SelectExtension exposes helper renderers for custom Select displays.
 */
export const SelectExtension = Object.assign(
  forwardRef<HTMLSpanElement, SelectExtensionProps>(function SelectExtension(props, ref) {
    return <SelectInputWithPrefix ref={ref} {...props} />
  }),
  {
    InputWithPrefix: SelectInputWithPrefix,
    OptionWithPrefix: SelectOptionWithPrefix,
  },
)
