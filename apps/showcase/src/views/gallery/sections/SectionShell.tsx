import type { ReactNode } from 'react'
import { getGalleryCategory } from '@/views/gallery/galleryConfig'

export interface SectionShellProps {
  /** Category slug from `galleryConfig` — supplies the heading, blurb and count. */
  slug: string
  children: ReactNode
}

/**
 * Standard wrapper for a category page: an anchored heading with the category
 * blurb and component count, then a stack of `<Demo>` cards.
 */
export function SectionShell({ slug, children }: SectionShellProps) {
  const category = getGalleryCategory(slug)
  if (!category) return null

  return (
    <section aria-labelledby={`cat-${slug}`} className="space-y-6">
      <div className="space-y-1 border-b border-border pb-4">
        <p className="font-mono text-xs uppercase tracking-widest text-content-faint">
          {category.components.length} components
        </p>
        <h1 id={`cat-${slug}`} className="text-2xl font-bold tracking-tight text-content">
          {category.title}
        </h1>
        <p className="max-w-2xl text-sm text-content-muted">{category.blurb}</p>
      </div>
      <div className="space-y-8">{children}</div>
    </section>
  )
}
