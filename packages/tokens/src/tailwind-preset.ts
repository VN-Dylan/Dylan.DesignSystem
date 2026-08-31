import type { Config } from 'tailwindcss'

/**
 * Tailwind preset for the Dylan Design System.
 *
 * Every colour resolves to a CSS custom property declared by
 * `@dylan-ds/tokens/css`, so utilities stay theme-reactive (dark mode +
 * preset schemas) without regenerating CSS.
 */
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
          DEFAULT: 'var(--dyl-text)',
          muted: 'var(--dyl-text-muted)',
          faint: 'var(--dyl-text-faint)',
          inverted: 'var(--dyl-text-inverted)',
        },
        primary: {
          DEFAULT: 'var(--dyl-primary)',
          deep: 'var(--dyl-primary-deep)',
          mild: 'var(--dyl-primary-mild)',
          subtle: 'var(--dyl-primary-subtle)',
          fg: 'var(--dyl-on-primary)',
        },
        success: { DEFAULT: 'var(--dyl-success)', subtle: 'var(--dyl-success-subtle)' },
        error: { DEFAULT: 'var(--dyl-error)', subtle: 'var(--dyl-error-subtle)' },
        info: { DEFAULT: 'var(--dyl-info)', subtle: 'var(--dyl-info-subtle)' },
        warning: { DEFAULT: 'var(--dyl-warning)', subtle: 'var(--dyl-warning-subtle)' },
        gray: {
          50: 'var(--dyl-gray-50)',
          100: 'var(--dyl-gray-100)',
          200: 'var(--dyl-gray-200)',
          300: 'var(--dyl-gray-300)',
          400: 'var(--dyl-gray-400)',
          500: 'var(--dyl-gray-500)',
          600: 'var(--dyl-gray-600)',
          700: 'var(--dyl-gray-700)',
          800: 'var(--dyl-gray-800)',
          900: 'var(--dyl-gray-900)',
          950: 'var(--dyl-gray-950)',
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
