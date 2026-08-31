import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DebounceInput } from './DebounceInput'

const meta = {
  title: 'Forms/DebounceInput',
  component: DebounceInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  args: { placeholder: 'Search...' },
} satisfies Meta<typeof DebounceInput>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState('')
      return (
        <div className="space-y-2">
          <DebounceInput
            placeholder="Search..."
            wait={1000}
            onChange={(event) => setValue(event.target.value)}
          />
          <p className="text-sm text-content-muted">{value || 'Waiting for input'}</p>
        </div>
      )
    }
    return <Demo />
  },
}

export const Container: Story = {
  render: () => (
    <div className="space-y-3">
      <DebounceInput placeholder="Small" size="sm" />
      <DebounceInput placeholder="Medium" size="md" />
      <DebounceInput placeholder="Large" size="lg" />
    </div>
  ),
}
