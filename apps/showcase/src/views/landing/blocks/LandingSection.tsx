import type { ReactNode } from 'react'
import { Reveal } from '@/views/landing/blocks/Reveal'

export interface LandingSectionProps {
  id?: string
  /** Small eyebrow label above the heading. */
  eyebrow?: string
  title?: string
  description?: ReactNode
  children: ReactNode
  className?: string
}

/**
 * A vertical rhythm wrapper for landing-page sections: centred max-width column,
 * optional eyebrow / heading / lede, and a `Reveal` entrance.
 */
export function LandingSection({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: LandingSectionProps) {
  return (
    <section id={id} className={`mx-auto max-w-5xl px-4 py-16 sm:py-20 ${className ?? ''}`}>
      <Reveal>
        {(eyebrow || title || description) && (
          <div className="mb-10 max-w-2xl space-y-3">
            {eyebrow && (
              <p className="font-mono text-xs uppercase tracking-widest text-primary">{eyebrow}</p>
            )}
            {title && (
              <h2 className="text-2xl font-bold tracking-tight text-content sm:text-3xl">
                {title}
              </h2>
            )}
            {description && <p className="text-content-muted">{description}</p>}
          </div>
        )}
        {children}
      </Reveal>
    </section>
  )
}
