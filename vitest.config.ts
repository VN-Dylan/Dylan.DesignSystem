import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

const root = __dirname

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@dylan-ds/tokens/tailwind-preset': resolve(root, 'packages/tokens/src/tailwind-preset.ts'),
      '@dylan-ds/tokens': resolve(root, 'packages/tokens/src/index.ts'),
      '@dylan-ds/utils': resolve(root, 'packages/utils/src/index.ts'),
      '@dylan-ds/icons': resolve(root, 'packages/icons/src/index.ts'),
      '@dylan-ds/ui': resolve(root, 'packages/ui/src/index.ts'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['packages/**/src/**/*.{test,spec}.{ts,tsx}'],
    // Component styling is verified visually in Storybook, not in unit tests;
    // skipping CSS keeps the (Tailwind) transform out of the test path.
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['packages/*/src/**/*.{ts,tsx}'],
      exclude: ['**/*.stories.tsx', '**/index.ts', '**/*.d.ts'],
    },
  },
})
