import type { Meta, StoryObj } from '@storybook/react'
import { SyntaxHighlighter } from './SyntaxHighlighter'

const meta = {
  title: 'Data Display/SyntaxHighlighter',
  component: SyntaxHighlighter,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SyntaxHighlighter>

export default meta
type Story = StoryObj<typeof meta>

export const Tsx: Story = {
  args: {
    language: 'tsx',
    showLineNumbers: true,
    children: `import { Button } from '@dylan-ds/ui'

export function Save() {
  return <Button variant="solid">Save</Button>
}
`,
  },
}

export const Bash: Story = {
  args: {
    language: 'bash',
    children: 'pnpm add @dylan-ds/ui\npnpm storybook',
  },
}
