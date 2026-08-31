import type { CSSProperties, ElementType, HTMLAttributes } from 'react'

export type SkeletonVariant = 'block' | 'circle'

export interface SkeletonProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Whether to active animation. @default true */
  animation?: boolean
  /** Render element. @default 'span' */
  asElement?: ElementType
  /** Height of Skeleton. */
  height?: CSSProperties['height']
  /** Appearance of Skeleton. @default 'block' */
  variant?: SkeletonVariant
  /** Width of Skeleton. */
  width?: CSSProperties['width']
}
