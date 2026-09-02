import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import { resolve } from 'node:path'

const root = resolve(__dirname, '..')

const config: StorybookConfig = {
  stories: [
    '../packages/ui/src/**/*.mdx',
    '../packages/ui/src/**/*.stories.@(ts|tsx)',
    '../docs/**/*.mdx',
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y', '@storybook/addon-themes'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: { disableTelemetry: true },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  async viteFinal(cfg) {
    return mergeConfig(cfg, {
      resolve: {
        alias: {
          '@vn-dylan/tokens/tailwind-preset': resolve(
            root,
            'packages/tokens/src/tailwind-preset.ts',
          ),
          '@vn-dylan/tokens': resolve(root, 'packages/tokens/src/index.ts'),
          '@vn-dylan/utils': resolve(root, 'packages/utils/src/index.ts'),
          '@vn-dylan/icons': resolve(root, 'packages/icons/src/index.ts'),
        },
      },
    })
  },
}

export default config
