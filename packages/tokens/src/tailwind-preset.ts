import type { Config } from 'tailwindcss'

/**
 * Tailwind preset for the Dylan Design System.
 *
 * Every colour resolves to a CSS custom property declared by
 * `@vn-dylan/tokens/css`, so utilities stay theme-reactive (dark mode +
 * preset schemas) without regenerating CSS.
 *
 * A handful of colours (brand, status, body text, grey ramp) additionally
 * ship a `--dyl-*-channel` R G B triplet, so those go through `withAlpha` —
 * Tailwind's documented `rgb(var(...) / <alpha-value>)` pattern — and support
 * the `/NN` opacity modifier (`bg-primary/40`). Colours without a channel
 * variable (surface, border, bg, overlay) resolve to the plain custom
 * property and do **not** support an opacity modifier; use the `-subtle`
 * step, `overlay`, or a `brightness-*` utility instead.
 */
const withAlpha = (channelVar: string) => `rgb(var(${channelVar}) / <alpha-value>)`
export const dylanPreset = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // semantic
        bg: 'var(--dyl-bg)',
        overlay: 'var(--dyl-overlay)',
        surface: {
          DEFAULT: 'var(--dyl-surface)',
          raised: 'var(--dyl-surface-raised)',
          sunken: 'var(--dyl-surface-sunken)',
        },
        border: {
          DEFAULT: 'var(--dyl-border)',
          strong: 'var(--dyl-border-strong)',
        },
        content: {
          DEFAULT: withAlpha('--dyl-text-channel'),
          muted: withAlpha('--dyl-text-muted-channel'),
          faint: withAlpha('--dyl-text-faint-channel'),
          inverted: 'var(--dyl-text-inverted)',
        },
        primary: {
          DEFAULT: withAlpha('--dyl-primary-channel'),
          deep: withAlpha('--dyl-primary-deep-channel'),
          mild: withAlpha('--dyl-primary-mild-channel'),
          subtle: 'var(--dyl-primary-subtle)',
          fg: 'var(--dyl-on-primary)',
        },
        accent: {
          DEFAULT: withAlpha('--dyl-accent-channel'),
          deep: 'var(--dyl-accent-deep)',
          mild: 'var(--dyl-accent-mild)',
          subtle: 'var(--dyl-accent-subtle)',
          fg: 'var(--dyl-on-accent)',
        },
        success: {
          DEFAULT: withAlpha('--dyl-success-channel'),
          subtle: 'var(--dyl-success-subtle)',
        },
        error: { DEFAULT: withAlpha('--dyl-error-channel'), subtle: 'var(--dyl-error-subtle)' },
        info: { DEFAULT: withAlpha('--dyl-info-channel'), subtle: 'var(--dyl-info-subtle)' },
        warning: {
          DEFAULT: withAlpha('--dyl-warning-channel'),
          subtle: 'var(--dyl-warning-subtle)',
        },
        gray: {
          50: withAlpha('--dyl-gray-50-channel'),
          100: withAlpha('--dyl-gray-100-channel'),
          200: withAlpha('--dyl-gray-200-channel'),
          300: withAlpha('--dyl-gray-300-channel'),
          400: withAlpha('--dyl-gray-400-channel'),
          500: withAlpha('--dyl-gray-500-channel'),
          600: withAlpha('--dyl-gray-600-channel'),
          700: withAlpha('--dyl-gray-700-channel'),
          800: withAlpha('--dyl-gray-800-channel'),
          900: withAlpha('--dyl-gray-900-channel'),
          950: withAlpha('--dyl-gray-950-channel'),
        },
      },
      borderRadius: {
        sm: 'var(--dyl-radius-sm)',
        DEFAULT: 'var(--dyl-radius-base)',
        md: 'var(--dyl-radius-md)',
        lg: 'var(--dyl-radius-lg)',
        xl: 'var(--dyl-radius-xl)',
        '2xl': 'var(--dyl-radius-2xl)',
        full: 'var(--dyl-radius-full)',
      },
      fontFamily: {
        sans: 'var(--dyl-font-sans)',
        mono: 'var(--dyl-font-mono)',
        display: 'var(--dyl-font-display)',
      },
      boxShadow: {
        sm: 'var(--dyl-shadow-sm)',
        DEFAULT: 'var(--dyl-shadow-md)',
        md: 'var(--dyl-shadow-md)',
        lg: 'var(--dyl-shadow-lg)',
      },
      zIndex: {
        dropdown: 'var(--dyl-z-dropdown)',
        sticky: 'var(--dyl-z-sticky)',
        drawer: 'var(--dyl-z-drawer)',
        dialog: 'var(--dyl-z-dialog)',
        popover: 'var(--dyl-z-popover)',
        toast: 'var(--dyl-z-toast)',
        tooltip: 'var(--dyl-z-tooltip)',
      },
      transitionTimingFunction: {
        standard: 'var(--dyl-ease-standard)',
        emphasized: 'var(--dyl-ease-emphasized)',
        exit: 'var(--dyl-ease-exit)',
      },
      transitionDuration: {
        fast: 'var(--dyl-duration-fast)',
        DEFAULT: 'var(--dyl-duration-base)',
        slow: 'var(--dyl-duration-slow)',
      },
      ringColor: {
        DEFAULT: 'var(--dyl-primary)',
      },
    },
  },
} satisfies Partial<Config>

export default dylanPreset
