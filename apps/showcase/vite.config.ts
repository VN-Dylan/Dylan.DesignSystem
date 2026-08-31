import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

const root = resolve(__dirname, '../..')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@dylan-ds/ui': resolve(root, 'packages/ui/src/index.ts'),
      '@dylan-ds/tokens/tailwind-preset': resolve(root, 'packages/tokens/src/tailwind-preset.ts'),
      '@dylan-ds/tokens': resolve(root, 'packages/tokens/src/index.ts'),
      '@dylan-ds/utils': resolve(root, 'packages/utils/src/index.ts'),
      '@dylan-ds/icons': resolve(root, 'packages/icons/src/index.ts'),
    },
  },
  server: { port: 5173 },
})
