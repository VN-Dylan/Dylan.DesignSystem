import type { ElementType, HTMLAttributes } from 'react'

export interface AspectRatioProps extends HTMLAttributes<HTMLElement> {
  /** Width-to-height ratio. @default 16 / 9 */
  ratio?: number
  /** Element to render. @default 'div' */
  asElement?: ElementType
}
