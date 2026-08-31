import { forwardRef } from 'react'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { classNames } from '@dylan-ds/utils'
import type { NumericInputStepperProps } from './types'
import './NumericInputStepper.scss'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

/**
 * Increment and decrement controls for numeric input values.
 */
export const NumericInputStepper = forwardRef<HTMLDivElement, NumericInputStepperProps>(
  function NumericInputStepper(
    {
      value = 0,
      onChange,
      min = 0,
      max = Infinity,
      step = 1,
      disabled = false,
      className = '',
      ...rest
    },
    ref,
  ) {
    const decrementDisabled = disabled || value <= min
    const incrementDisabled = disabled || value >= max

    return (
      <div
        ref={ref}
        className={classNames('dyl-numeric-input-stepper', className)}
        data-disabled={disabled || undefined}
        {...rest}
      >
        <button
          type="button"
          className="dyl-numeric-input-stepper__button"
          aria-label="Increase value"
          disabled={incrementDisabled}
          onClick={() => onChange?.(clamp(value + step, min, max))}
        >
          <Icon as={TbIcons.TbChevronUp} />
        </button>
        <button
          type="button"
          className="dyl-numeric-input-stepper__button"
          aria-label="Decrease value"
          disabled={decrementDisabled}
          onClick={() => onChange?.(clamp(value - step, min, max))}
        >
          <Icon as={TbIcons.TbChevronDown} />
        </button>
      </div>
    )
  },
)
