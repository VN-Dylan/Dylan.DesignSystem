import { useState } from 'react'
import { VisuallyHidden } from '@dylan-ds/ui'
import { themeSchemaNames, themeSchemaToCssVars, presetThemeSchema } from '@dylan-ds/tokens'
import type { ThemeSchemaName } from '@dylan-ds/tokens'

/**
 * P0 placeholder screen. It exists to prove the toolchain end to end:
 * tokens → Tailwind preset → SCSS → component library → app.
 * Real Eyris screens are rebuilt here in P4.
 */
export function App() {
  const [dark, setDark] = useState(false)
  const [schema, setSchema] = useState<ThemeSchemaName>('default')

  const applyDark = (next: boolean) => {
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
  }

  const applySchema = (next: ThemeSchemaName) => {
    setSchema(next)
    const vars = themeSchemaToCssVars(presetThemeSchema[next][dark ? 'dark' : 'light'])
    for (const [key, value] of Object.entries(vars)) {
      document.documentElement.style.setProperty(key, value)
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-10">
      <p className="font-mono text-xs uppercase tracking-widest text-content-faint">
        Dylan Design System · P0
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-content">Toolchain online</h1>
      <p className="mt-3 text-content-muted">
        Tokens, Tailwind preset, SCSS pipeline and the component library are wired together. Rating{' '}
        <VisuallyHidden>4 out of 5</VisuallyHidden>
        <span aria-hidden>★★★★☆</span>
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => applyDark(!dark)}
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-content shadow-sm transition hover:border-border-strong"
        >
          {dark ? 'Switch to light' : 'Switch to dark'}
        </button>

        <label className="flex items-center gap-2 text-sm text-content-muted">
          Schema
          <select
            value={schema}
            onChange={(e) => applySchema(e.target.value as ThemeSchemaName)}
            className="rounded-md border border-border bg-surface px-2 py-1 text-sm text-content"
          >
            {themeSchemaNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(['primary', 'success', 'warning', 'error'] as const).map((tone) => (
          <div key={tone} className="rounded-lg border border-border bg-surface p-4 shadow-sm">
            <div className="h-10 w-full rounded" style={{ background: `var(--dyl-${tone})` }} />
            <p className="mt-2 font-mono text-xs text-content-muted">{tone}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
