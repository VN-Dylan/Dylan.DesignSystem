import { Link } from 'react-router-dom'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { galleryCategories } from '@/views/gallery/galleryConfig'
import { LandingSection } from '@/views/landing/blocks/LandingSection'

/** Landing category montage linking into every gallery section. */
export function CategoryMontage() {
  return (
    <LandingSection
      id="gallery"
      eyebrow="Gallery"
      title="Browse by product surface."
      description="Each category page adapts the component stories into dense, copyable demos with deterministic showcase data."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {galleryCategories.map((category) => (
          <Link
            key={category.slug}
            to={`/gallery/${category.slug}`}
            className="group rounded-lg border border-border bg-surface p-5 transition hover:border-primary hover:shadow-sm"
          >
            <div className="flex items-start gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary-subtle text-primary">
                <Icon as={category.icon} size={22} />
              </span>
              <div className="min-w-0 flex-1 text-start">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-content group-hover:text-primary">
                    {category.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {category.components.length}
                    <Icon as={TbIcons.TbChevronRight} size={16} />
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-content-muted">{category.blurb}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </LandingSection>
  )
}
