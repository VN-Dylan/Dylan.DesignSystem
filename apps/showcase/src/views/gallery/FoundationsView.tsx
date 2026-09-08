import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { themeSchemaNames } from '@vn-dylan/tokens'
import { galleryCategories, galleryComponentCount } from '@/views/gallery/galleryConfig'

const surfaceTokens = [
  { class: 'bg-bg', label: 'bg' },
  { class: 'bg-surface', label: 'surface' },
  { class: 'bg-surface-raised', label: 'surface-raised' },
  { class: 'bg-surface-sunken', label: 'surface-sunken' },
]

const brandTokens = [
  { class: 'bg-primary', label: 'primary' },
  { class: 'bg-primary-deep', label: 'primary-deep' },
  { class: 'bg-primary-mild', label: 'primary-mild' },
  { class: 'bg-primary-subtle', label: 'primary-subtle' },
]

const statusTokens = [
  { class: 'bg-success', label: 'success' },
  { class: 'bg-warning', label: 'warning' },
  { class: 'bg-error', label: 'error' },
  { class: 'bg-info', label: 'info' },
]

const grayRamp = [
  { class: 'bg-gray-50', label: '50' },
  { class: 'bg-gray-100', label: '100' },
  { class: 'bg-gray-200', label: '200' },
  { class: 'bg-gray-300', label: '300' },
  { class: 'bg-gray-400', label: '400' },
  { class: 'bg-gray-500', label: '500' },
  { class: 'bg-gray-600', label: '600' },
  { class: 'bg-gray-700', label: '700' },
  { class: 'bg-gray-800', label: '800' },
  { class: 'bg-gray-900', label: '900' },
]

const radii = [
  { class: 'rounded-sm', label: 'sm' },
  { class: 'rounded-md', label: 'md' },
  { class: 'rounded-lg', label: 'lg' },
  { class: 'rounded-xl', label: 'xl' },
  { class: 'rounded-full', label: 'full' },
]

const spacing = [1, 2, 3, 4, 6, 8, 12] as const

function Swatch({ className, label }: { className: string; label: string }) {
  return (
    <div className="space-y-1.5">
      <div className={`h-14 rounded-md border border-border ${className}`} />
      <p className="font-mono text-xs text-content-muted">{label}</p>
    </div>
  )
}

function Panel({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="space-y-4 rounded-lg border border-border bg-surface p-5">
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-content">{title}</h2>
        {description && <p className="text-sm text-content-muted">{description}</p>}
      </div>
      {children}
    </section>
  )
}

/** Gallery landing page: token foundations plus an index of every category. */
export function FoundationsView() {
  return (
    <div className="space-y-8">
      <header className="space-y-2 border-b border-border pb-6">
        <p className="font-mono text-xs uppercase tracking-widest text-content-faint">
          Foundations
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-content">The Dylan Design System</h1>
        <p className="max-w-2xl text-content-muted">
          {galleryComponentCount} components across {galleryCategories.length} categories, every one
          rendered live against the theme you pick in the top bar — {themeSchemaNames.length} preset
          schemas, light / dark and RTL. Nothing here contains a literal colour: it all resolves
          through CSS custom properties.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel
          title="Surfaces"
          description="Elevation from the page background up to raised panels."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {surfaceTokens.map((token) => (
              <Swatch key={token.label} className={token.class} label={token.label} />
            ))}
          </div>
        </Panel>

        <Panel title="Brand" description="Primary ramp — buttons, links, active states.">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {brandTokens.map((token) => (
              <Swatch key={token.label} className={token.class} label={token.label} />
            ))}
          </div>
        </Panel>

        <Panel title="Status" description="Semantic feedback colours, each with a `-subtle` pair.">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {statusTokens.map((token) => (
              <Swatch key={token.label} className={token.class} label={token.label} />
            ))}
          </div>
        </Panel>

        <Panel title="Neutral ramp" description="`gray-50` … `gray-900`, theme-aware.">
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
            {grayRamp.map((step) => (
              <div key={step.label} className="space-y-1">
                <div className={`h-10 rounded border border-border ${step.class}`} />
                <p className="text-center font-mono text-xs text-content-faint">{step.label}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Type scale">
          <div className="space-y-2">
            <p className="text-3xl font-bold text-content">Display</p>
            <p className="text-xl font-semibold text-content">Heading</p>
            <p className="text-base text-content">Body — the quick brown fox.</p>
            <p className="text-sm text-content-muted">Muted small print.</p>
            <p className="font-mono text-xs text-content-faint">mono / caption</p>
          </div>
        </Panel>

        <Panel title="Radius">
          <div className="flex flex-wrap gap-3">
            {radii.map((radius) => (
              <div key={radius.label} className="space-y-1.5">
                <div
                  className={`h-14 w-14 border border-border bg-primary-subtle ${radius.class}`}
                />
                <p className="font-mono text-xs text-content-muted">{radius.label}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Spacing" description="4px base scale.">
          <div className="space-y-2">
            {spacing.map((step) => (
              <div key={step} className="flex items-center gap-3">
                <span className="w-6 font-mono text-xs text-content-faint">{step}</span>
                <span className="h-3 bg-primary" style={{ width: `${step * 0.25}rem` }} />
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-content">Browse the library</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {galleryCategories.map((category) => (
            <Link
              key={category.slug}
              to={`/gallery/${category.slug}`}
              className="group flex items-start gap-3 rounded-lg border border-border bg-surface p-4 transition hover:border-border-strong"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary-subtle text-primary">
                <Icon as={category.icon} size={20} />
              </span>
              <span className="min-w-0 space-y-0.5">
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-content">{category.title}</span>
                  <span className="font-mono text-xs text-content-faint">
                    {category.components.length}
                  </span>
                </span>
                <span className="block text-sm text-content-muted">{category.blurb}</span>
              </span>
              <Icon
                as={TbIcons.TbArrowRight}
                size={16}
                className="ms-auto mt-1 shrink-0 text-content-faint transition group-hover:text-content"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
