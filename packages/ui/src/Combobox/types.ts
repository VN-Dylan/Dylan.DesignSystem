import type { InputHTMLAttributes, ReactNode } from 'react'

export interface ComboboxOption {
  value: string
  label: string
  /** Secondary line under the label. */
  description?: string
  disabled?: boolean
}

export interface ComboboxLoadContext {
  /** Aborted when a newer query supersedes this one or the component unmounts. */
  signal: AbortSignal
}

interface ComboboxBaseProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange' | 'size' | 'prefix' | 'type' | 'multiple'
  > {
  /** Static options, filtered by label as the user types. Ignored when `loadOptions` is set. */
  options?: ComboboxOption[]
  /**
   * Fetch options for a query (debounced). Older requests are aborted via
   * `signal`; only the latest result is shown.
   */
  loadOptions?: (query: string, context: ComboboxLoadContext) => Promise<ComboboxOption[]>
  /** Debounce for `loadOptions`, in ms. @default 300 */
  debounce?: number
  /** Do not search until the query has this many characters. @default 0 */
  minQueryLength?: number
  /** Custom option content. */
  renderOption?: (option: ComboboxOption, state: { selected: boolean }) => ReactNode
  /** Show a clear button when there is a value. @default true */
  clearable?: boolean
  /** Mark the field invalid. */
  invalid?: boolean
  /** @default 'No results' */
  emptyMessage?: ReactNode
  /** @default 'Loading…' */
  loadingMessage?: ReactNode
  /** @default 'Could not load options' */
  errorMessage?: ReactNode
  /** Field class (the bordered box). */
  className?: string
}

export interface ComboboxSingleProps extends ComboboxBaseProps {
  multiple?: false
  value?: ComboboxOption | null
  defaultValue?: ComboboxOption | null
  onChange?: (option: ComboboxOption | null) => void
}

export interface ComboboxMultipleProps extends ComboboxBaseProps {
  /** Pick several options, shown as removable tags inside the field. */
  multiple: true
  value?: ComboboxOption[]
  defaultValue?: ComboboxOption[]
  onChange?: (options: ComboboxOption[]) => void
  /** Collapse tags beyond this count into "+N". */
  maxTags?: number
}

export type ComboboxProps = ComboboxSingleProps | ComboboxMultipleProps
