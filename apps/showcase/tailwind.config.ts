import type { Config } from 'tailwindcss'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { dylanPreset } from '@dylan-ds/tokens/tailwind-preset'

const here = dirname(fileURLToPath(import.meta.url))

export default {
  presets: [dylanPreset],
  content: [
    join(here, 'index.html'),
    join(here, 'src/**/*.{ts,tsx}'),
    join(here, '../../packages/ui/src/**/*.{ts,tsx}'),
  ],
  theme: { extend: {} },
  plugins: [],
} satisfies Config
