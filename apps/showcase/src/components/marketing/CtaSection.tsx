import type { ReactNode } from 'react'
import { Button, Reveal } from '@vn-dylan/ui'
import { runMarketingAction, type MarketingAction } from './actions'

export interface CtaSectionProps {
  title: ReactNode
  description?: ReactNode
  primary: MarketingAction
  secondary?: MarketingAction
  align?: 'center' | 'start'
  tone?: 'brand' | 'surface'
}

/**
 * Full-width call-to-action banner with brand or surface tone, designed for
 * landing and booking reference pages.
 */
export function CtaSection({
  title,
  description,
  primary,
  secondary,
  align = 'center',
  tone = 'brand',
}: CtaSectionProps) {
  const brand = tone === 'brand'
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-start'

  return (
    <Reveal>
      <section
        className={`rounded-lg border p-6 shadow-sm sm:p-8 ${
          brand
            ? 'border-primary bg-primary text-primary-fg'
            : 'border-border bg-surface text-content'
        }`}
      >
        <div className={`flex flex-col gap-5 ${alignment}`}>
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
            {description && (
              <p className={brand ? 'text-primary-fg' : 'text-content-muted'}>{description}</p>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant={brand ? 'default' : 'solid'}
              className={brand ? 'bg-surface text-content hover:bg-surface-sunken' : undefined}
              onClick={() => runMarketingAction(primary)}
            >
              {primary.label}
            </Button>
            {secondary && (
              <Button
                variant={brand ? 'plain' : 'default'}
                className={brand ? 'text-primary-fg hover:bg-primary-deep' : undefined}
                onClick={() => runMarketingAction(secondary)}
              >
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </section>
    </Reveal>
  )
}
