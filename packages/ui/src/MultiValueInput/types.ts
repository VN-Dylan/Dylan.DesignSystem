import type { HTMLAttributes } from 'react'

export type MultiValueInputSize = 'sm' | 'md' | 'lg'

export interface MultiValueInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /** Current value for controlled usage. */
  value?: string[]
  /** Default value for uncontrolled usage. @default [] */
  defaultValue?: string[]
  /** Called when tags change. */
  onChange?: (tags: string[]) => void
  /** Input placeholder text. */
  placeholder?: string
  /** Disable the entire component. @default false */
  disabled?: boolean
  /** Maximum number of tags allowed. */
  maxTags?: number
  /** Function to validate new tags. */
  validate?: (tag: string) => boolean
  /** Called when a tag is added. */
  onTagAdd?: (tag: string, allTags: string[]) => void
  /** Called when a tag is removed. */
  onTagRemove?: (tag: string, allTags: string[]) => void
  /** Whether the input is in invalid state. */
  invalid?: boolean
  /** Size of the input. */
  size?: MultiValueInputSize
  /** Whether the input is read-only. */
  readOnly?: boolean
}
