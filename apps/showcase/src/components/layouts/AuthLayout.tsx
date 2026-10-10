import type { ReactNode } from 'react'
import { Stack } from '@vn-dylan/ui'
import { Logo } from '@/components/template/Logo'

export type AuthLayoutVariant = 'simple' | 'side' | 'split'

export interface AuthLayoutProps {
  variant?: AuthLayoutVariant
  children: ReactNode
}

const Aside = () => (
  <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 text-primary-fg lg:flex">
    <Logo className="text-primary-fg [&_span]:text-primary-fg" />
    <Stack gap={3}>
      <p className="text-2xl font-semibold leading-snug">
        The Dylan Design System for admin and booking products.
      </p>
      <p className="text-primary-fg/80">
        84 components, 32 utilities, runtime theming — exercised by this showcase.
      </p>
    </Stack>
    <p className="text-xs text-primary-fg/70">Internal reference build · no real accounts</p>
    <div
      aria-hidden
      className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full bg-white/10"
    />
  </div>
)

/**
 * Layout for authentication screens, in three presentations:
 * - `simple` — centred card on a plain background
 * - `side`   — card left, brand panel right
 * - `split`  — brand panel left, card right
 */
/** Surface panel that holds the auth form on every variant. */
const FormCard = ({ children }: { children: ReactNode }) => (
  <div className="rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8">{children}</div>
)

export function AuthLayout({ variant = 'simple', children }: AuthLayoutProps) {
  if (variant === 'simple') {
    return (
      <div className="grid min-h-screen place-items-center bg-bg px-4 py-12">
        <Stack gap="loose" className="w-full max-w-sm">
          <Logo />
          <FormCard>{children}</FormCard>
        </Stack>
      </div>
    )
  }

  const card = (
    <div className="grid place-items-center bg-bg px-4 py-12">
      <Stack gap="loose" className="w-full max-w-sm">
        <Logo className="lg:hidden" />
        <FormCard>{children}</FormCard>
      </Stack>
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
