import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@dylan-ds/tokens': resolve(__dirname, '../tokens/src/index.ts'),
      '@dylan-ds/utils': resolve(__dirname, '../utils/src/index.ts'),
      '@dylan-ds/icons': resolve(__dirname, '../icons/src/index.ts'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'styles',
    },
    cssCodeSplit: false,
    sourcemap: true,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-icons',
        /^@floating-ui\//,
        /^@tanstack\//,
        'apexcharts',
        'react-apexcharts',
        'react-syntax-highlighter',
        /^react-syntax-highlighter\//,
      ],
      output: {
        preserveModules: false,
      },
    },
  },
})
