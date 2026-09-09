export { dylanPreset, default as tailwindPreset } from './tailwind-preset'
export {
  presetThemeSchema,
  themeSchemaToCssVars,
  type ThemeSchema,
  type ThemeSchemaName,
  type ThemeSchemaValue,
  type ThemeSchemaVariable,
} from './preset-theme-schema'

/** CSS custom properties emitted by the opt-in booking brand pack. */
export const brandBookingCssVars = {
  '--dyl-radius-none': '0',
  '--dyl-radius-sm': '0.375rem',
  '--dyl-radius-base': '0.5rem',
  '--dyl-radius-md': '0.75rem',
  '--dyl-radius-lg': '1rem',
  '--dyl-radius-xl': '1.5rem',
  '--dyl-radius-2xl': '2rem',
  '--dyl-radius-full': '9999px',
  '--dyl-shadow-sm': '0 2px 8px -2px rgba(16, 24, 40, 0.08)',
  '--dyl-shadow-md':
    '0 8px 24px -6px rgba(16, 24, 40, 0.12), 0 2px 6px -2px rgba(16, 24, 40, 0.08)',
  '--dyl-shadow-lg': '0 24px 56px -12px rgba(16, 24, 40, 0.22)',
  '--dyl-font-display': "'Sora', 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  '--dyl-accent': '#fb7185',
  '--dyl-accent-channel': '251 113 133',
  '--dyl-accent-deep': '#e11d64',
  '--dyl-accent-mild': '#fda4af',
  '--dyl-accent-subtle': 'rgba(251, 113, 133, 0.12)',
  '--dyl-on-accent': '#ffffff',
} as const

/** Names of the shipped preset schemas, in display order. */
export const themeSchemaNames = [
  'default',
  'dark',
  'green',
  'purple',
  'orange',
  'cyan',
  'gold',
  'pink',
  'booking',
] as const
