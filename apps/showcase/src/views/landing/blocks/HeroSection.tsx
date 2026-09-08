import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Input, Select, Switcher, Tag, type SelectOption } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { themeSchemaNames } from '@vn-dylan/tokens'
import { useThemeStore } from '@/store/themeStore'
import { Logo } from '@/components/template/Logo'
import { gallerySelectOptions } from '@/mock/gallery'

const REPO_URL = 'https://github.com/VN-Dylan/Dylan.DesignSystem'

/**
 * Landing hero: value proposition, primary CTAs and a live preview card wired to
 * a schema / mode switcher — flipping a swatch re-themes the whole page, this
 * card included, with no reload.
 */
export function HeroSection() {
  const navigate = useNavigate()
  const { mode, schema, toggleMode, setSchema } = useThemeStore()
  const [category, setCategory] = useState<SelectOption | null>(gallerySelectOptions[1] ?? null)
  const [notify, setNotify] = useState(true)

  return (
    <header className="mx-auto max-w-6xl px-4">
      <nav className="flex items-center justify-between py-5">
        <Logo />
        <div className="flex items-center gap-2">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-md p-2 text-content-muted transition hover:bg-surface-sunken hover:text-content"
            aria-label="Open the repository on GitHub"
          >
            <Icon as={TbIcons.TbBrandGithub} size={18} />
          </a>
          <Button variant="plain" onClick={() => navigate('/auth/sign-in')}>
            Sign in
          </Button>
          <Button variant="solid" onClick={() => navigate('/gallery')}>
            Component gallery
          </Button>
        </div>
      </nav>

      <div className="grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-20">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-content-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Internal reference build · v0.1.1
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-content sm:text-5xl">
            A complete admin design system, rebuilt in the open
          </h1>
          <p className="max-w-xl text-lg text-content-muted">
            84 React components, 32 utilities and a token layer that reproduces the Eyris admin
            template — Tailwind, SCSS and TypeScript, themed entirely through CSS variables.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" variant="solid" onClick={() => navigate('/gallery')}>
              Explore the gallery
            </Button>
            <Button size="lg" onClick={() => navigate('/sales/dashboard')}>
              Open the dashboards
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs text-content-faint">Theme</span>
            <Button
              size="xs"
              variant="default"
              icon={<Icon as={mode === 'dark' ? TbIcons.TbSun : TbIcons.TbMoon} size={14} />}
              onClick={toggleMode}
            >
              {mode === 'dark' ? 'Light' : 'Dark'}
            </Button>
            {themeSchemaNames.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={schema === name}
                onClick={() => setSchema(name)}
                className={`rounded-full border px-2.5 py-1 text-xs capitalize transition ${
                  schema === name
                    ? 'border-primary bg-primary-subtle text-primary'
                    : 'border-border text-content-muted hover:border-border-strong'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <Card
          className="shadow-sm"
          header={{ content: 'Live preview', extra: <Tag>{schema}</Tag> }}
        >
          <div className="space-y-4">
            <Input
              name="hero-project"
              prefix={<Icon as={TbIcons.TbSearch} size={16} />}
              placeholder="Search projects"
            />
            <Select
              options={gallerySelectOptions}
              value={category}
              onChange={setCategory}
              aria-label="Category"
            />
            <label className="flex items-center justify-between text-sm text-content">
              Email notifications
              <Switcher checked={notify} onChange={setNotify} aria-label="Email notifications" />
            </label>
            <div className="flex items-center gap-2">
              <Button variant="solid" size="sm">
                Save changes
              </Button>
              <Button variant="plain" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-border py-6 text-sm text-content-muted">
        <Link to="/gallery/forms" className="hover:text-content">
          Forms
        </Link>
        <Link to="/gallery/data-display" className="hover:text-content">
          Data display
        </Link>
        <Link to="/gallery/data-viz" className="hover:text-content">
          Data viz
        </Link>
        <Link to="/gallery/feedback" className="hover:text-content">
          Feedback &amp; overlay
        </Link>
        <Link to="/gallery" className="ms-auto font-medium text-primary hover:text-primary-deep">
          All 84 components →
        </Link>
      </div>
    </header>
  )
}
