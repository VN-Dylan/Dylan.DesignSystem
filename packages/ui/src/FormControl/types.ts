import type { FormHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export type FormLayout = 'horizontal' | 'vertical' | 'inline'
export type FormSize = 'sm' | 'md' | 'lg'

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /** Field arrangement. @default 'vertical' */
  layout?: FormLayout
  /** Size applied to descendant form items. @default 'md' */
  size?: FormSize
  /** Label column width for `horizontal` layout. @default 100 */
  labelWidth?: string | number
}

export interface FormItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Field label. */
  label?: ReactNode
  /** Extra content beside the label (hint, link). */
  extra?: ReactNode
  /** Show a required marker. */
  asterisk?: boolean
  /** Error text — presence also flips the field to the invalid style. */
  errorMessage?: ReactNode
  /** Force the invalid style without an error message. */
  invalid?: boolean
  /** `id` of the control this label points at. */
  htmlFor?: string
  /** Override the inherited layout. */
  layout?: FormLayout
  /** Override the inherited size. */
  size?: FormSize
  children?: ReactNode
}
