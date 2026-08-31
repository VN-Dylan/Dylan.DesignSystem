import type { LiHTMLAttributes, OlHTMLAttributes, ReactNode } from 'react'

export type StepsStatus = 'complete' | 'pending' | 'in-progress' | 'error'

export interface StepsProps extends Omit<OlHTMLAttributes<HTMLOListElement>, 'onChange'> {
  /** The current step, counting from 0. @default 0 */
  current?: number
  /** Callback when Steps is changed. */
  onChange?: (index: number) => void
  /** Status of the current step. @default 'in-progress' */
  status?: StepsStatus
  /** Whether to display Steps vertically. @default false */
  vertical?: boolean
}

export interface StepsItemProps extends Omit<LiHTMLAttributes<HTMLLIElement>, 'title'> {
  /** Custom element for Step label. */
  customIcon?: ReactNode | string
  /** Step description, only available when Step is vertical. */
  description?: ReactNode | string
  /** Step title. */
  title?: ReactNode | string
}
