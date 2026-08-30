// Root PostCSS config — used by Storybook (which runs from the repo root).
// Package builds resolve their own colocated postcss.config.js instead.
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [tailwindcss({ config: './packages/ui/tailwind.config.ts' }), autoprefixer()],
}
