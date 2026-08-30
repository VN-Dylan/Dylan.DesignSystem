import type { Preview } from '@storybook/react'
import { withThemeByClassName } from '@storybook/addon-themes'
import '../packages/ui/src/styles/index.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    backgrounds: { disable: true },
    a11y: { test: 'error' },
  },
  decorators: [
    withThemeByClassName({
      themes: { light: '', dark: 'dark' },
      defaultTheme: 'light',
      parentSelector: 'html',
    }),
    (Story) => (
      <div style={{ background: 'var(--dyl-bg)', color: 'var(--dyl-text)', padding: '1.5rem' }}>
        <Story />
      </div>
    ),
  ],
}

export default preview
