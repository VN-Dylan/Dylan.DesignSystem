import type { HTMLAttributes } from 'react'

export type InputGroupSize = 'sm' | 'md' | 'lg'

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** InputGroup size. */
  size?: InputGroupSize
}

export interface InputGroupAddonProps extends HTMLAttributes<HTMLSpanElement> {
  /** Addon size. */
  size?: InputGroupSize
}
