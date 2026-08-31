import type { ChangeEvent, ChangeEventHandler } from 'react'
import type { InputProps, InputSize } from '../Input'

export type DebounceInputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

export interface DebounceInputProps extends Omit<InputProps, 'onChange' | 'size'> {
  /** Time interval before invoking onChange after the user stops typing. @default 500 */
  wait?: number
  /** Callback when Input value changed. */
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  /** Input size. @default 'md' */
  size?: InputSize
}
