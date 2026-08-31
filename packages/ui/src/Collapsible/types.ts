import type { HTMLAttributes, ReactNode } from 'react'

export interface CollapsibleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  /** Controlled open state. */
  open?: boolean
  /** Default open state for uncontrolled usage. @default false */
  defaultOpen?: boolean
  /** Callback when the open state changes. */
  onOpenChange?: (open: boolean) => void
  className?: string
  children?: ReactNode
}

export interface CollapsibleTriggerProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  /** Trigger content, or a render function receiving `{ isOpen, toggle }`. */
  children?: ReactNode | ((props: { isOpen: boolean; toggle: () => void }) => ReactNode)
  className?: string
}

export interface CollapsibleContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  /** Apply `overflow: hidden` during the height animation. @default true */
  defaultOverflowHidden?: boolean
  className?: string
  children?: ReactNode
}
