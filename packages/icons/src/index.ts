export { Icon, type IconProps } from './Icon'
export type { IconType } from 'react-icons'

// Re-export the icon sets used by the design system so consumers pull glyphs
// from a single entry point. `tb` (Tabler) is the house set — thin, geometric,
// closest to the Eyris "linear" look.
export * as TbIcons from 'react-icons/tb'
export * as HiIcons from 'react-icons/hi2'
export * as CgIcons from 'react-icons/cg'
