import type { ElementType, HTMLAttributes } from 'react'
import type { ContainerSize } from '../Container'

export type SectionSpacing = 'base' | 'loose' | 'none'
export type SectionTone = 'default' | 'subtle'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Vertical section spacing. @default 'base' */
  spacing?: SectionSpacing
  /** Surface treatment. @default 'default' */
  tone?: SectionTone
  /** Wrap children in a Container. @default true */
  contained?: boolean
  /** Width used by the inner Container. @default 'default' */
  containerSize?: ContainerSize
  /** Element to render. @default 'section' */
  asElement?: ElementType
}
