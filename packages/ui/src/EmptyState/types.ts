import type { HTMLAttributes, ReactNode } from 'react'

export type EmptyStateVariant = 'wave' | 'grid' | 'dots'

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  /** The background pattern variant to display. @default 'wave' */
  variant?: EmptyStateVariant
  /** Size of the background container in pixels. @default 300 */
  size?: number
  /** Illustration or icon to display centered on the background. */
  illustration?: ReactNode
  /** Vertical offset for the content below the illustration. @default 0 */
  offset?: number
  /** Content to display below the background. */
  children?: ReactNode
}
