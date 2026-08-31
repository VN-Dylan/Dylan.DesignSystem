import type { ReactNode } from 'react'

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export type SelectSize = 'sm' | 'md' | 'lg'

interface SelectBaseProps {
  /** Selectable options. */
  options: SelectOption[]
  /** @default 'md' */
  size?: SelectSize
  /** Placeholder shown when nothing is selected. @default 'Select…' */
  placeholder?: string
  /** Disable the control. */
  disabled?: boolean
  /** Error styling + `aria-invalid`. */
  invalid?: boolean
  /** Show a type-to-filter input in the menu. */
  isSearchable?: boolean
  /** Show a clear affordance. @default true */
  isClearable?: boolean
  /** Show a loading indicator in the menu. */
  isLoading?: boolean
  /** Message when the filtered list is empty. @default 'No options' */
  noOptionsMessage?: ReactNode
  /** Accessible label for the control. */
  'aria-label'?: string
  className?: string
  id?: string
}

export interface SelectProps extends SelectBaseProps {
  value?: SelectOption | null
  defaultValue?: SelectOption | null
  onChange?: (option: SelectOption | null) => void
}

export interface SelectMultiProps extends SelectBaseProps {
  value?: SelectOption[]
  defaultValue?: SelectOption[]
  onChange?: (options: SelectOption[]) => void
}
