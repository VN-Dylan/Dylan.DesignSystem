import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RichTextEditor } from './RichTextEditor'

const meta = {
  title: 'Forms/RichTextEditor',
  component: RichTextEditor,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RichTextEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => {
    const Demo = () => {
      const [html, setHtml] = useState('<p>Write something <strong>bold</strong>…</p>')
      return (
        <div className="space-y-2">
          <RichTextEditor value={html} onChange={setHtml} placeholder="Start typing…" />
          <pre className="rounded bg-surface-sunken p-2 text-xs">{html}</pre>
        </div>
      )
    }
    return <Demo />
  },
}

export const Disabled: Story = {
  args: { value: '<p>Read only content.</p>', disabled: true },
}
