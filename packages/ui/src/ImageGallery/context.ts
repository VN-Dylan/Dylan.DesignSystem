import { createContext, useContext } from 'react'
import type { ImageGalleryItem } from './types'

export interface ImageGalleryContextValue {
  images: ImageGalleryItem[]
  currentIndex: number
  setCurrentIndex: (index: number | null) => void
  loop: boolean
}

export const ImageGalleryContext = createContext<ImageGalleryContextValue | null>(null)

export function useImageGallery(part: string): ImageGalleryContextValue {
  const ctx = useContext(ImageGalleryContext)
  if (!ctx) throw new Error(`${part} must be used inside <ImageGallery>`)
  return ctx
}
