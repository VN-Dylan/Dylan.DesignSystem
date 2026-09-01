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

// A rough normal-ish sample. Seeded (mulberry32) so the story renders the same
// bars on every load — keeps the visual-regression snapshot stable.
const mulberry32 = (seed: number) => () => {
  seed |= 0
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}
const rand = mulberry32(20260615)
const sample = Array.from({ length: 400 }, () => {
  const s = Array.from({ length: 6 }, () => rand()).reduce((a, b) => a + b, 0)
  return Math.round((s / 6) * 100)
})

export const Basic: Story = {
  args: { data: sample, bins: 12 },
}
