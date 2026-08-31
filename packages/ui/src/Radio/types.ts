import type { HTMLAttributes, InputHTMLAttributes, MouseEvent, ReactNode, Ref } from 'react'

export type RadioValue = unknown

/** State passed to a `className` callback. */
export interface RadioClassNameState {
  checked: boolean
  disabled: boolean
}

export interface RadioProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'checked' | 'defaultChecked' | 'disabled' | 'value' | 'onChange' | 'className' | 'type'
  > {
  /** Whether the Radio is checked. */
  checked?: boolean
  /** Custom css for Radio. */
  radioClass?: string
  /** Whether the Radio initial state is checked. */
  defaultChecked?: boolean
  /** Whether the Radio is disabled. */
  disabled?: boolean
  /** Ref of Radio label element. */
  labelRef?: Ref<HTMLLabelElement>
  /** The name of the Radio input field. */
  name?: string
  /** Callback when Radio value is changed. */
  onChange?: (value: RadioValue, e: MouseEvent<HTMLInputElement>) => void
  /** Value of Radio. */
  value?: RadioValue
  /** Display Radio in vertical. */
  vertical?: boolean
  /** Label content. */
  children?: ReactNode
  /** String, or a callback receiving radio state. */
  className?: string | ((state: RadioClassNameState) => string)
}

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Custom color for all radio in the group. */
  color?: string
  /** Whether to disable all radios. */
  disabled?: boolean
  /** Name of radios under radio group. */
  name?: string
  /** Callback when value is changed. */
  onChange?: (value: RadioValue, e: MouseEvent<HTMLInputElement>) => void
  /** Specify selected value of radios. */
  value?: RadioValue
  /** Display list of radios in vertical. @default false */
  vertical?: boolean
  /** Custom css for all radios in the group. */
  radioClass?: string
}
