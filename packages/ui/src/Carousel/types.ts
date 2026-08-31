import type { HTMLAttributes, ReactNode } from 'react'
import type { ButtonProps } from '../Button'

export type CarouselOrientation = 'horizontal' | 'vertical'

export interface CarouselOptions {
  loop?: boolean
  startIndex?: number
}

export interface CarouselApi {
  selectedIndex: number
  count: number
  canScrollPrev: boolean
  canScrollNext: boolean
  scrollTo: (index: number) => void
  scrollPrev: () => void
  scrollNext: () => void
}

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  /** @default 'horizontal' */
  orientation?: CarouselOrientation
  /** `{ loop, startIndex }`. */
  opts?: CarouselOptions
  /** Receive the imperative carousel API. */
  setApi?: (api: CarouselApi) => void
  children?: ReactNode
}

export type CarouselContentProps = HTMLAttributes<HTMLDivElement>
export type CarouselItemProps = HTMLAttributes<HTMLDivElement>
export type CarouselControlProps = Omit<ButtonProps, 'onClick'>
