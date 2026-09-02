import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

const root = resolve(__dirname, '../..')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@vn-dylan/ui': resolve(root, 'packages/ui/src/index.ts'),
      '@vn-dylan/tokens/tailwind-preset': resolve(root, 'packages/tokens/src/tailwind-preset.ts'),
      '@vn-dylan/tokens': resolve(root, 'packages/tokens/src/index.ts'),
      '@vn-dylan/utils': resolve(root, 'packages/utils/src/index.ts'),
      '@vn-dylan/icons': resolve(root, 'packages/icons/src/index.ts'),
    },
  },
  server: { port: 5173 },
})
