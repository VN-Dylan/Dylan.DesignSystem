import { galleryComponentCount } from '@/views/gallery/galleryConfig'
import { LandingSection } from '@/views/landing/blocks/LandingSection'

const stats = [
  { value: galleryComponentCount.toString(), label: 'components' },
  { value: '42', label: 'base' },
  { value: '42', label: 'composite' },
  { value: '32', label: 'utilities' },
  { value: '8', label: 'schemas' },
  { value: '84/84', label: 'a11y' },
]

/** Landing stats band with the library inventory at a glance. */
export function StatsBand() {
  return (
    <LandingSection className="py-10 sm:py-12">
      <div className="grid gap-3 rounded-lg border border-border bg-surface p-3 shadow-sm sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-md bg-surface-sunken px-4 py-5 text-center">
            <div className="text-2xl font-bold text-content">{stat.value}</div>
            <div className="mt-1 text-xs uppercase tracking-wide text-content-muted">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </LandingSection>
  )
}
