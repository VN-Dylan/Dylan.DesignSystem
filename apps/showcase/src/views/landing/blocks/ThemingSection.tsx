import { Tag } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { themeSchemaNames } from '@vn-dylan/tokens'
import { useThemeStore } from '@/store/themeStore'
import { CodeBlock } from '@/views/landing/blocks/CodeBlock'
import { LandingSection } from '@/views/landing/blocks/LandingSection'

const themingSnippet = `
// tailwind.config.ts
import { dylanPreset } from '@vn-dylan/tokens/tailwind-preset'

export default {
  presets: [dylanPreset],
  darkMode: 'class',
}

// ThemeBootstrap.tsx
import { useThemeSchema } from '@vn-dylan/utils'

export function ThemeBootstrap() {
  useThemeSchema('green', 'light')
  return null
}
`

/** Landing theming section with live schema controls. */
export function ThemingSection() {
  const { schema, setSchema } = useThemeStore()

  return (
    <LandingSection
      id="theming"
      eyebrow="Theming"
      title="Eight schemas, one token contract."
      description="Schema buttons write to the same store the app shell uses, so the landing page and component gallery re-theme together."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
        <div className="rounded-lg border border-border bg-surface p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="space-y-1 text-start">
              <h3 className="font-semibold text-content">Live schema</h3>
              <p className="text-sm text-content-muted">Current preset: {schema}</p>
            </div>
            <Tag>{themeSchemaNames.length} presets</Tag>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {themeSchemaNames.map((name) => {
              const active = schema === name
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSchema(name)}
                  className={`flex items-center justify-between gap-3 rounded-md border p-3 text-start transition ${
                    active
                      ? 'border-primary bg-primary-subtle text-primary'
                      : 'border-border bg-surface-sunken text-content hover:border-border-strong'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-fg">
                      <Icon as={TbIcons.TbColorSwatch} size={16} />
                    </span>
                    <span className="font-medium capitalize">{name}</span>
                  </span>
                  {active && <Icon as={TbIcons.TbCheck} size={18} />}
                </button>
              )
            })}
          </div>

          <div className="mt-5 rounded-md bg-surface-sunken p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-content">
              <Icon as={TbIcons.TbSparkles} size={16} />
              Preview tokens
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              <span className="rounded-md bg-primary p-3 text-sm font-medium text-primary-contrast">
                Primary
              </span>
              <span className="rounded-md bg-success-subtle p-3 text-sm font-medium text-success">
                Success
              </span>
              <span className="rounded-md bg-warning-subtle p-3 text-sm font-medium text-warning">
                Warning
              </span>
            </div>
          </div>
        </div>

        <CodeBlock showLineNumbers>{themingSnippet}</CodeBlock>
      </div>
    </LandingSection>
  )
}
