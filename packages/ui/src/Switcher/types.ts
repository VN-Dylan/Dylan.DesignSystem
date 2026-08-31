import type { InputHTMLAttributes, MouseEvent, ReactNode, Ref } from 'react'

/** State passed to a `className` callback. */
export interface SwitcherClassNameState {
  checked: boolean
  disabled: boolean
  loading: boolean
  readOnly: boolean
}

export interface SwitcherProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'checked' | 'defaultChecked' | 'disabled' | 'onChange' | 'className' | 'type'
  > {
  /** Whether the Switcher is checked. */
  checked?: boolean
  /** Content to be shown when the state is checked. */
  checkedContent?: string | ReactNode
  /** Whether the Switcher initial state is checked. */
  defaultChecked?: boolean
  /** Whether the Switcher is disabled. */
  disabled?: boolean
  /** Whether the checkbox is loading. @default false */
  isLoading?: boolean
  /** Ref of Checkbox label element. */
  labelRef?: Ref<HTMLLabelElement>
  /** The name of the switcher input field. */
  name?: string
  /** Callback when Switcher value is changed. */
  onChange?: (checked: boolean, e: MouseEvent<HTMLInputElement>) => void
  /** Whether the Switcher is read only. */
  readOnly?: boolean
  /** Custom css for Switcher toggled. */
  toggledClass?: string
  /** Content to be shown when the state is unchecked. */
  unCheckedContent?: string | ReactNode
  /** String, or a callback receiving switcher state. */
  className?: string | ((state: SwitcherClassNameState) => string)
}
