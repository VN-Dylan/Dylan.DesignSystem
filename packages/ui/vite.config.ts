import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@vn-dylan/tokens': resolve(__dirname, '../tokens/src/index.ts'),
      '@vn-dylan/utils': resolve(__dirname, '../utils/src/index.ts'),
      '@vn-dylan/icons': resolve(__dirname, '../icons/src/index.ts'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      cssFileName: 'styles',
    },
    cssCodeSplit: false,
    sourcemap: true,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        // Sibling workspace packages — the consumer installs these directly.
        /^@vn-dylan\//,
        // react-icons and every icon-set subpath (react-icons/tb, /hi2, /cg …).
        /^react-icons(\/.*)?$/,
        /^@floating-ui\//,
        /^@tanstack\//,
        'apexcharts',
        'react-apexcharts',
        'react-syntax-highlighter',
        /^react-syntax-highlighter\//,
        /^@tiptap\//,
        'jsvectormap',
        /^jsvectormap\//,
        'maplibre-gl',
        /^maplibre-gl\//,
      ],
      output: {
        // Per-module chunks so consumers tree-shake to just the components
        // they import instead of pulling the whole ~800 kB barrel.
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
  },
})
