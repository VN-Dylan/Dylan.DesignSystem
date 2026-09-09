import type { ReactNode } from 'react'
import { Reveal, Stagger } from '@vn-dylan/ui'

export interface LogoCloudItem {
  name: string
  src?: string
  node?: ReactNode
}

export interface LogoCloudProps {
  logos: LogoCloudItem[]
  title?: string
}

/**
 * Responsive greyscale logo cloud for social proof bands, accepting image
 * sources or custom logo nodes.
 */
export function LogoCloud({ logos, title }: LogoCloudProps) {
  return (
    <Reveal>
      <section className="space-y-6">
        {title && (
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-content-muted">
            {title}
          </h2>
        )}
        <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo) => (
            <Stagger.Item key={logo.name}>
              <div className="flex h-20 items-center justify-center rounded-lg border border-border bg-surface px-4 grayscale transition hover:grayscale-0">
                {logo.node ?? (
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-h-8 max-w-full object-contain"
                  />
                )}
              </div>
            </Stagger.Item>
          ))}
        </Stagger>
      </section>
    </Reveal>
  )
}
