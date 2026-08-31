import type { HTMLAttributes } from 'react'

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Render element. @default 'div' */
  asElement?: keyof JSX.IntrinsicElements
}
