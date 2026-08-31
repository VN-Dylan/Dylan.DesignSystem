import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'

export type InputSize = 'sm' | 'md' | 'lg'

type NativeInput = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>
type NativeTextarea = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'prefix'>

export interface InputProps extends NativeInput, Pick<NativeTextarea, 'rows'> {
  /** @default 'md' */
  size?: InputSize
  /** Error styling + `aria-invalid`. */
  invalid?: boolean
  /** Content rendered inside the field, before the input. */
  prefix?: ReactNode
  /** Content rendered inside the field, after the input. */
  suffix?: ReactNode
  /** Render a `<textarea>` instead of an `<input>`. */
  textArea?: boolean
  /** Strip the default field chrome (border, padding, ring). */
  unstyle?: boolean
}
