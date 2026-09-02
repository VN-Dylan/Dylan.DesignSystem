import type { Config } from 'tailwindcss'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { dylanPreset } from '@vn-dylan/tokens/tailwind-preset'

const here = dirname(fileURLToPath(import.meta.url))

/**
 * Tailwind config for the component library. Content globs are absolute so the
 * config resolves identically whether Tailwind runs from `packages/ui` (build)
 * or the repo root (Storybook).
 */
export default {
  presets: [dylanPreset],
  content: [join(here, 'src/**/*.{ts,tsx}')],
  theme: { extend: {} },
  plugins: [],
} satisfies Config
