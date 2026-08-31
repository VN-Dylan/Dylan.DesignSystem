import { createContext, useContext } from 'react'
import type { CarouselApi, CarouselOrientation } from './types'

export interface CarouselContextValue extends CarouselApi {
  orientation: CarouselOrientation
  registerItem: () => () => void
}

export const CarouselContext = createContext<CarouselContextValue | null>(null)

export function useCarousel(part: string): CarouselContextValue {
  const ctx = useContext(CarouselContext)
  if (!ctx) throw new Error(`${part} must be used inside <Carousel>`)
  return ctx
}
