import { Drawer, Segment } from '@dylan-ds/ui'
import { themeSchemaNames } from '@dylan-ds/tokens'
import { useThemeStore } from '@/store/themeStore'

/** Runtime theme controls: colour mode, preset schema, text direction. */
export function ThemeConfigDrawer() {
  const { mode, schema, direction, configOpen, setConfigOpen, setMode, setSchema, setDirection } =
    useThemeStore()

  return (
    <Drawer
      isOpen={configOpen}
      onClose={() => setConfigOpen(false)}
      placement="right"
      width={320}
      title="Theme"
      aria-label="Theme configuration"
    >
      <div className="space-y-6 p-1">
        <section className="space-y-2">
          <h3 className="text-sm font-semibold text-content">Colour mode</h3>
          <Segment
            value={mode}
            onChange={(v) => setMode(v === 'dark' ? 'dark' : 'light')}
            className="w-full"
          >
            <Segment.Item value="light">Light</Segment.Item>
            <Segment.Item value="dark">Dark</Segment.Item>
          </Segment>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-semibold text-content">Direction</h3>
          <Segment
            value={direction}
            onChange={(v) => setDirection(v === 'rtl' ? 'rtl' : 'ltr')}
            className="w-full"
          >
            <Segment.Item value="ltr">LTR</Segment.Item>
            <Segment.Item value="rtl">RTL</Segment.Item>
          </Segment>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-semibold text-content">Preset schema</h3>
          <div className="grid grid-cols-4 gap-2">
            {themeSchemaNames.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setSchema(name)}
                aria-pressed={schema === name}
                className={`rounded-md border px-2 py-2 text-xs capitalize transition ${
                  schema === name
                    ? 'border-primary bg-primary-subtle text-primary'
                    : 'border-border text-content-muted hover:border-border-strong'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </section>
      </div>
    </Drawer>
  )
}
