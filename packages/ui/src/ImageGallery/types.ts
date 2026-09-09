import type { HTMLAttributes, ReactNode } from 'react'

export interface ImageGalleryItem {
  /** Full-size image source used in the lightbox. */
  src: string
  /** Optional thumbnail source used in the grid and thumbnail strip. */
  thumbnail?: string
  /** Accessible text for the image. */
  alt: string
  /** Optional caption rendered below the lightbox image. */
  caption?: ReactNode
}

export type ImageGalleryColumns =
  | number
  | {
      sm?: number
      md?: number
      lg?: number
    }

export type ImageGalleryGap = 'sm' | 'md' | 'lg'

export interface ImageGalleryProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> {
  /** Images rendered in the grid and lightbox. */
  images: ImageGalleryItem[]
  /** Grid columns. Defaults to a responsive 2 / 3 / 4 layout. */
  columns?: ImageGalleryColumns
  /** Space between grid tiles. @default 'md' */
  gap?: ImageGalleryGap
  /** CSS aspect-ratio for grid tiles. @default '4 / 3' */
  aspectRatio?: string
  /** Initial lightbox index for uncontrolled usage. */
  defaultOpenIndex?: number
  /** Controlled lightbox index, or null when closed. */
  open?: number | null
  /** Called when the lightbox index changes or closes. */
  onOpenChange?: (index: number | null) => void
  /** Wrap previous / next navigation at the ends. @default true */
  loop?: boolean
}
