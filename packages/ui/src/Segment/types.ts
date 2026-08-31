import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react'

export type SegmentSelectionType = 'single' | 'multiple'
export type SegmentSize = 'lg' | 'md' | 'sm' | 'xs'
export type SegmentValue = string | string[]

export interface SegmentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /** Initial value for uncontrolled Segment. */
  defaultValue?: SegmentValue
  /** Callback when Segment value is changed. */
  onChange?: (segmentValue: SegmentValue) => void
  /** Whether a single or multiple items can be selected at a time. @default 'single' */
  selectionType?: SegmentSelectionType
  /** Size of all segment item. @default 'md' */
  size?: SegmentSize
  /** Controlled value of the Segment item to activate. */
  value?: SegmentValue
}

export interface SegmentItemRenderProps {
  active: boolean
  disabled: boolean
  value: string
  ref: string
  onSegmentItemClick: () => void
}

export interface SegmentItemProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Children of Segment item. */
  children?: ReactNode | ((state: SegmentItemRenderProps) => ReactNode)
  /** Whether to disable Segment item. */
  disabled?: boolean
  /** Size of the segment item. @default 'md' */
  size?: SegmentSize
  /** An unique value for Segment item. */
  value: string
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void
}
