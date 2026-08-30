export { dylanPreset, default as tailwindPreset } from './tailwind-preset'
export {
  presetThemeSchema,
  themeSchemaToCssVars,
  type ThemeSchema,
  type ThemeSchemaName,
  type ThemeSchemaValue,
  type ThemeSchemaVariable,
} from './preset-theme-schema'

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
] as const
