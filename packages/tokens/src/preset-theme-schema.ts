/**
 * The 8 preset colour schemas (ported from Eyris `preset-theme-schema.config`).
 * Each schema overrides only the primary family + `muted` for light and dark.
 * Apply at runtime by writing these onto `document.documentElement.style`
 * (see `@vn-dylan/utils` → `useThemeSchema`).
 */

export type ThemeSchemaVariable =
  | 'primary'
  | 'primaryDeep'
  | 'primaryMild'
  | 'primarySubtle'
  | 'muted'

export type ThemeSchemaValue = Record<ThemeSchemaVariable, string>
export type ThemeSchema = Record<'light' | 'dark', ThemeSchemaValue>

/**
 * `#rrggbb` → `"r g b"`, matching the tokens layer's `to-channel()` Sass
 * function. Feeds the `--dyl-primary*-channel` vars the Tailwind alpha
 * modifier (`bg-primary/40`) reads — applying a schema at runtime must keep
 * those in sync with the hex value, or `/NN` freezes on the default hue.
 */
const hexToChannel = (hex: string): string => {
  const match = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex)
  if (!match) return '0 0 0'
  const [, r, g, b] = match
  return [r, g, b].map((h) => parseInt(h!, 16)).join(' ')
}

const build = (primary: string, deep: string, mild: string, subtle: string): ThemeSchema => {
  const value: ThemeSchemaValue = {
    primary,
    primaryDeep: deep,
    primaryMild: mild,
    primarySubtle: subtle,
    muted: '#ffffff',
  }
  return { light: value, dark: value }
}

export const presetThemeSchema = {
  default: build('#286cf0', '#1f56c0', '#4c86f4', 'rgba(40,108,240,0.1)'),
  dark: build('#1f2937', '#111827', '#374151', 'rgba(31,41,55,0.12)'),
  green: build('#0cbf7a', '#0a9962', '#3dcc95', 'rgba(12,191,122,0.1)'),
  purple: build('#9d5cfb', '#7d3fe0', '#b483fc', 'rgba(157,92,251,0.1)'),
  orange: build('#fb732c', '#e2591a', '#fc9257', 'rgba(251,115,44,0.1)'),
  cyan: build('#07b9e7', '#0596bc', '#43cef0', 'rgba(7,185,231,0.1)'),
  gold: build('#f3a027', '#d5841a', '#f6b757', 'rgba(243,160,39,0.1)'),
  pink: build('#f93f90', '#dc1f72', '#fb6faf', 'rgba(249,63,144,0.1)'),
  booking: build('#14b8a6', '#0f766e', '#5eead4', 'rgba(20,184,166,0.1)'),
} satisfies Record<string, ThemeSchema>

export type ThemeSchemaName = keyof typeof presetThemeSchema

/** Maps a schema value onto the CSS custom properties the tokens layer reads. */
export const themeSchemaToCssVars = (value: ThemeSchemaValue): Record<string, string> => ({
  '--dyl-primary': value.primary,
  '--dyl-primary-channel': hexToChannel(value.primary),
  '--dyl-primary-deep': value.primaryDeep,
  '--dyl-primary-deep-channel': hexToChannel(value.primaryDeep),
  '--dyl-primary-mild': value.primaryMild,
  '--dyl-primary-mild-channel': hexToChannel(value.primaryMild),
  '--dyl-primary-subtle': value.primarySubtle,
})
