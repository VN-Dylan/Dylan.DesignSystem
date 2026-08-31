import type { Meta, StoryObj } from '@storybook/react'
import { GrowShrinkTag } from './GrowShrinkTag'

const meta = {
  title: 'Data Display/GrowShrinkTag',
  component: GrowShrinkTag,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number' },
    showIcon: { control: 'boolean' },
  },
  args: { value: 0, showIcon: true },
} satisfies Meta<typeof GrowShrinkTag>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GrowShrinkTag value={12.5} suffix="%" />
      <GrowShrinkTag value={-8.3} suffix="%" />
      <GrowShrinkTag value={0} suffix="%" />
    </div>
  ),
}

export const WithoutIcon: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GrowShrinkTag value={25} showIcon={false} prefix="+" suffix=" units" />
      <GrowShrinkTag value={-15} showIcon={false} suffix=" units" />
    </div>
  ),
}

export const GrowShrinkTagStory: Story = {
  name: 'GrowShrinkTag',
  args: { value: 12.5, suffix: '%' },
}
