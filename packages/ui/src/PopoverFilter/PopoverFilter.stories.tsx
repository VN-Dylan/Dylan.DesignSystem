import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { PopoverFilter } from './PopoverFilter'

const meta = {
  title: 'Data Display/PopoverFilter',
  component: PopoverFilter,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof PopoverFilter>

export default meta
type Story = StoryObj<typeof meta>

const statuses = [
  { label: 'Active', value: 'active' },
  { label: 'Paused', value: 'paused' },
  { label: 'Learning', value: 'learning' },
  { label: 'Archived', value: 'archived' },
]

export const Basic: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<string[]>([])
      return (
        <div className="space-y-2 text-center">
          <PopoverFilter data={statuses} value={value} onChange={setValue} title="Status" />
          <p className="text-xs text-content-muted">{value.join(', ') || 'none'}</p>
        </div>
      )
    }
    return <Demo />
  },
}
