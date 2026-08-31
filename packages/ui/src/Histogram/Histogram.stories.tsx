import type { Meta, StoryObj } from '@storybook/react'
import { Histogram } from './Histogram'

const meta = {
  title: 'Data Display/Histogram',
  component: Histogram,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Histogram>

export default meta
type Story = StoryObj<typeof meta>

// A rough normal-ish sample.
const sample = Array.from({ length: 400 }, () => {
  const s = Array.from({ length: 6 }, () => Math.random()).reduce((a, b) => a + b, 0)
  return Math.round((s / 6) * 100)
})

export const Basic: Story = {
  args: { data: sample, bins: 12 },
}
