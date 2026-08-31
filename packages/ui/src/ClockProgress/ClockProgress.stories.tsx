import type { Meta, StoryObj } from '@storybook/react'
import { ClockProgress } from './ClockProgress'

const meta = {
  title: 'Feedback/ClockProgress',
  component: ClockProgress,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 5 } },
    size: { control: 'number' },
  },
  args: { value: 60, size: 40 },
} satisfies Meta<typeof ClockProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {[0, 25, 50, 75, 100].map((value) => (
        <ClockProgress key={value} value={value} aria-label={`${value}% complete`} />
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {[24, 40, 56, 72].map((size) => (
        <ClockProgress key={size} value={60} size={size} aria-label={`${size} size progress`} />
      ))}
    </div>
  ),
}

export const ClockProgressStory: Story = {
  name: 'ClockProgress',
}
