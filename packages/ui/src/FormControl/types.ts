import type { FieldsetHTMLAttributes, FormHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export type FormLayout = 'horizontal' | 'vertical' | 'inline'
export type FormSize = 'sm' | 'md' | 'lg'
export type FormGroupColumns = 1 | 2 | 3 | 4

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /** Field arrangement. `horizontal` falls back to `vertical` below `sm`. @default 'vertical' */
  layout?: FormLayout
  /** Size applied to descendant form items. @default 'md' */
  size?: FormSize
  /** Label column width for `horizontal` layout. @default 100 */
  labelWidth?: string | number
}

export interface FormGroupProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'title'> {
  /** Group heading, rendered as the fieldset `legend`. */
  title?: ReactNode
  /** Supporting text under the title; also describes the group to assistive tech. */
  description?: ReactNode
  /** Content at the end of the header row (link, toggle). */
  extra?: ReactNode
  /**
   * Column count for the items. Always one column on mobile; 2+ columns from
   * `sm`, 3–4 columns from `lg`. Use `Form.Item span` to widen an item.
   * @default 1
   */
  columns?: FormGroupColumns
  /** Draw a top hairline to separate the group from the previous one. @default false */
  divided?: boolean
}

export interface FormItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Field label. */
  label?: ReactNode
  /** Extra content beside the label (hint, link). */
  extra?: ReactNode
  /** Helper text under the control. Replaced by `errorMessage` while invalid. */
  hint?: ReactNode
  /** Show a required marker. */
  asterisk?: boolean
  /** Error text — presence also flips the field to the invalid style. */
  errorMessage?: ReactNode
  /** Force the invalid style without an error message. */
  invalid?: boolean
  /**
   * `id` of the control this label points at. Optional with a single control
   * child: its `id` is used, or one is generated and passed down.
   */
  htmlFor?: string
  /** Columns to occupy inside a multi-column `Form.Group`; `full` spans the row. */
  span?: 2 | 3 | 4 | 'full'
  /** Override the inherited layout. */
  layout?: FormLayout
  /** Override the inherited size. */
  size?: FormSize
  children?: ReactNode
}
