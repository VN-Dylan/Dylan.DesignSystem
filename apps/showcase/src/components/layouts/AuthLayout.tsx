import type { ReactNode } from 'react'
import { Logo } from '@/components/template/Logo'

export type AuthLayoutVariant = 'simple' | 'side' | 'split'

export interface AuthLayoutProps {
  variant?: AuthLayoutVariant
  children: ReactNode
}

const Aside = () => (
  <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-fg lg:flex">
    <Logo className="text-primary-fg [&_span]:text-primary-fg" />
    <div className="space-y-3">
      <p className="text-2xl font-semibold leading-snug">
        The Dylan Design System, rebuilt from the Eyris admin template.
      </p>
      <p className="text-primary-fg/80">
        84 components, 32 utilities, runtime theming — exercised by this showcase.
      </p>
    </div>
    <p className="text-xs text-primary-fg/70">Internal reference build · no real accounts</p>
    <div
      aria-hidden
      className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10"
    />
  </div>
)

/**
 * Layout for authentication screens. Three presentations from the Eyris demo:
 * - `simple` — centred card on a plain background
 * - `side`   — card left, brand panel right
 * - `split`  — brand panel left, card right
 */
export function AuthLayout({ variant = 'simple', children }: AuthLayoutProps) {
  if (variant === 'simple') {
    return (
      <div className="grid min-h-screen place-items-center bg-bg px-4 py-10">
        <div className="w-full max-w-sm space-y-6">
          <Logo />
          {children}
        </div>
      </div>
    )
  }

  const card = (
    <div className="grid place-items-center bg-bg px-4 py-10">
      <div className="w-full max-w-sm space-y-6">
        <Logo className="lg:hidden" />
        {children}
      </div>
    </div>
  )

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {variant === 'split' ? (
        <>
          <Aside />
          {card}
        </>
      ) : (
        <>
          {card}
          <Aside />
        </>
      )}
    </div>
  )
}
