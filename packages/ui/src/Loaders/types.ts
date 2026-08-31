import type { HTMLAttributes } from 'react'
import type { SkeletonProps } from '../Skeleton'

export interface MediaSkeletonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Whether to show the avatar skeleton. @default true */
  showAvatar?: boolean
  /** Props to pass to the avatar skeleton. */
  avatarProps?: SkeletonProps
  /** Props to pass to the title skeleton. */
  titleProps?: SkeletonProps
  /** Props to pass to the text skeleton. */
  textProps?: SkeletonProps
}

export interface TableRowSkeletonProps
  extends Omit<HTMLAttributes<HTMLTableSectionElement>, 'children'> {
  /** Number of columns per row. @default 1 */
  columns?: number
  /** Number of skeleton rows to render. @default 10 */
  rows?: number
  /** Column indices that should include an avatar skeleton. @default [] */
  avatarInColumns?: number[]
  /** Props to pass to avatar skeletons. */
  avatarProps?: SkeletonProps
}

export interface TextBlockSkeletonProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title'> {
  /** Number of text rows to render. @default 3 */
  rowCount?: number
  /** Whether to show a title skeleton. @default true */
  title?: boolean
  /** Width of the title skeleton. @default "40%" */
  titleWidth?: string | number
  /** Width of the last row skeleton. @default "60%" */
  lastChildWidth?: string | number
  /** Height of each skeleton row. */
  height?: string | number
}
