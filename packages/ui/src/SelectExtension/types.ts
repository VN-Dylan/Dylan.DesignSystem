import type { HTMLAttributes, ReactNode } from 'react'

export interface SelectInputWithPrefixProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'prefix'> {
  /** Selected value label to display. */
  label?: string | ReactNode
  /** Prefix icon or element. */
  prefix?: string | ReactNode
  /** Controls prefix visibility. @default true */
  showPrefix?: boolean
}

export interface SelectOptionWithPrefixProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'prefix'> {
  /** Prefix icon or element for option. */
  prefix?: string | ReactNode
  /** Option label text. */
  label?: string | ReactNode
  /** Whether option is currently selected. */
  selected?: boolean
  /** Custom check icon for selected state. */
  checkIcon?: ReactNode
}

export type SelectExtensionProps = SelectInputWithPrefixProps
