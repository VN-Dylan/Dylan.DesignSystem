import type { HTMLAttributes, ReactNode } from 'react'

export type IconFrameVariant = 'default' | 'thick' | 'layered'

export interface IconFrameProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual style variant of the icon frame. @default 'default' */
  variant?: IconFrameVariant
  /** Width and height of the icon frame in pixels. @default 40 */
  size?: number
  /** Icon or content to display inside the frame. */
  children?: ReactNode
  /** Additional CSS classes to apply to the frame. */
  className?: string
}
