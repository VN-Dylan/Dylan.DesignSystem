import { useNavigate } from 'react-router-dom'
import { Button } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { Logo } from '@/components/template/Logo'

const features = [
  {
    icon: TbIcons.TbComponents,
    title: '84 components',
    body: '42 base + 42 composite, each with types, tests and a Storybook page.',
  },
  {
    icon: TbIcons.TbPalette,
    title: 'Runtime theming',
    body: 'Light / dark / RTL and 8 preset colour schemas, all driven by CSS variables.',
  },
  {
    icon: TbIcons.TbToolsKitchen2,
    title: '32 utilities',
    body: 'Framework hooks and formatting helpers ported from the Eyris utility surface.',
  },
  {
    icon: TbIcons.TbAccessible,
    title: 'Accessible by default',
    body: 'Focus management, keyboard nav and axe checks baked into every component.',
  },
]

/** Public landing page — chrome-free (BlankLayout). */
export function LandingView() {
  const navigate = useNavigate()
  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <header className="flex items-center justify-between py-4">
        <Logo />
        <div className="flex items-center gap-2">
          <Button variant="plain" onClick={() => navigate('/auth/sign-in')}>
            Sign in
          </Button>
          <Button variant="solid" onClick={() => navigate('/sales/dashboard')}>
            Open the app
          </Button>
        </div>
      </header>

      <section className="py-16 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-content-faint">
          Internal reference build
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-bold tracking-tight text-content sm:text-5xl">
          A complete admin design system, rebuilt in the open
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-content-muted">
          The Dylan Design System reverse-engineers the Eyris admin template into React, Tailwind
          and SCSS — components, utilities, tokens and this showcase app.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button size="lg" variant="solid" onClick={() => navigate('/sales/dashboard')}>
            Explore the dashboards
          </Button>
          <Button size="lg" variant="default" onClick={() => navigate('/dev/components')}>
            Component gallery
          </Button>
        </div>
      </section>

      <section className="grid gap-4 pb-20 sm:grid-cols-2">
        {features.map((f) => (
          <div key={f.title} className="rounded-lg border border-border bg-surface p-5">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-primary-subtle text-primary">
              <Icon as={f.icon} size={20} />
            </span>
            <h2 className="mt-3 font-semibold text-content">{f.title}</h2>
            <p className="mt-1 text-sm text-content-muted">{f.body}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
