import type { HTMLAttributes, ReactNode } from 'react'

export interface StatisticCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  /** Whether to use the inset variant with a subtle background. */
  inset?: boolean
  /** Content to display in the card header. */
  header?: ReactNode | string
  /** Content to display in the card footer. */
  footer?: ReactNode | string
  /** Additional CSS classes for the card body. */
  bodyClass?: string
  /** Additional CSS classes for the card container. */
  className?: string
}
