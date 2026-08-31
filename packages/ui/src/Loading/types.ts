import type { ElementType, HTMLAttributes, ReactNode } from 'react'

export interface LoadingProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Render element. @default 'div' */
  asElement?: ElementType
  /** Custom loader. */
  customLoader?: ReactNode
  /** Whether is loading state. @default false */
  loading?: boolean
  /** Extra class for default spinner. */
  spinnerClass?: string
  children?: ReactNode
}
