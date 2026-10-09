import type { ElementType, HTMLAttributes } from 'react'

export type ContainerSize = 'prose' | 'narrow' | 'default' | 'wide' | 'full'

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Maximum content width. @default 'default' */
  size?: ContainerSize
  /** Apply the responsive page gutter. @default true */
  gutter?: boolean
  /** Element to render. @default 'div' */
  asElement?: ElementType
}
