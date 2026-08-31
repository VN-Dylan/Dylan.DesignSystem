import type { HTMLAttributes, InputHTMLAttributes, MouseEvent, ReactNode, Ref } from 'react'

export type CheckboxValue = string | number

/** State passed to a `className` callback. */
export interface CheckboxClassNameState {
  checked: boolean
  disabled: boolean
  indeterminate: boolean
}

export interface CheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'checked' | 'defaultChecked' | 'disabled' | 'value' | 'onChange' | 'className' | 'type'
  > {
  /** Whether the Checkbox is checked. */
  checked?: boolean
  /** Whether the Checkbox initial state is checked. */
  defaultChecked?: boolean
  /** Whether the Checkbox is disabled. */
  disabled?: boolean
  /** Whether the Checkbox is indeterminate. */
  indeterminate?: boolean
  /** The value of the selected state. */
  value?: CheckboxValue
  /** Ref of Checkbox label element. */
  labelRef?: Ref<HTMLLabelElement>
  /** Custom css for Checkbox. */
  checkboxClass?: string
  /** Callback when Checkbox value is changed. */
  onChange?: (checked: boolean, e: MouseEvent<HTMLInputElement>) => void
  /** The name of the Checkbox input field. */
  name?: string
  /** Label content. */
  children?: ReactNode
  /** String, or a callback receiving checkbox state. */
  className?: string | ((state: CheckboxClassNameState) => string)
}

export interface CheckboxGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /** Display list of checkbox in vertical. @default false */
  vertical?: boolean
  /** Custom color for all checkboxes in the group. */
  color?: string
  /** Specify selected value of checkboxes. */
  value?: CheckboxValue[]
  /** Callback when value is changed. */
  onChange?: (values: CheckboxValue[], e: MouseEvent<HTMLInputElement>) => void
  /** Name of all checkboxes input field under the group. */
  name?: string
  /** Custom css for all checkboxes in the group. */
  checkboxClass?: string
  /** Whether to disable all checkboxes. */
  disabled?: boolean
}
