// `React` is imported explicitly: Storybook compiles this preview config with the
// classic JSX runtime, unlike the stories (automatic runtime), so the direction
// decorator below uses `React.createElement` and needs `React` in scope.
import React, { useEffect } from 'react'
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
    options: {
      storySort: {
        order: [
          'Handbook',
          [
            'Introduction',
            'Architecture',
            'Principles',
            'Design Tokens',
            'Theming & Modes',
            'Accessibility',
            'Component API',
            'When to Use What',
            'Contributing',
            'Eyris Mapping',
          ],
          'Common',
          'Data Display',
          'Forms',
          'Feedback',
          'Navigation',
          'Primitives',
          'Composite',
        ],
      },
    },
  },
  initialGlobals: {
    direction: 'ltr',
  },
  globalTypes: {
    direction: {
      description: 'Writing direction',
      toolbar: {
        title: 'Direction',
        icon: 'transfer',
        items: [
          { value: 'ltr', title: 'LTR' },
          { value: 'rtl', title: 'RTL' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: { light: '', dark: 'dark' },
      defaultTheme: 'light',
      parentSelector: 'html',
    }),
    (Story, context) => {
      const dir = context.globals.direction === 'rtl' ? 'rtl' : 'ltr'
      useEffect(() => {
        document.documentElement.dir = dir
        return () => {
          document.documentElement.dir = 'ltr'
        }
      }, [dir])
      // Storybook transpiles the preview config with the classic JSX runtime, so
      // this decorator is authored with createElement rather than JSX to keep the
      // `React` import genuinely referenced (see the import note at the top).
      return React.createElement(
        'div',
        {
          dir,
          style: { background: 'var(--dyl-bg)', color: 'var(--dyl-text)', padding: '1.5rem' },
        },
        React.createElement(Story),
      )
    },
  ],
}

export default preview
