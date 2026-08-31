import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    animation: { control: 'boolean' },
    variant: { control: 'inline-radio', options: ['block', 'circle'] },
    width: { control: 'text' },
    height: { control: 'text' },
  },
  args: { animation: true, variant: 'block' },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Variant: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton variant="circle" />
      <Skeleton className="w-56" />
    </div>
  ),
}

export const Size: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Skeleton className="h-36" />
      <div className="flex items-center gap-2">
        <Skeleton variant="circle" className="h-9 w-9" />
        <div className="flex w-full flex-col gap-4">
          <Skeleton className="h-3" />
          <Skeleton className="h-3 w-3/5" />
        </div>
      </div>
    </div>
  ),
}

export const Animation: Story = {
  render: () => <Skeleton animation={false} className="w-56" />,
}

export const SkeletonStory: Story = {
  name: 'Skeleton',
  args: { className: 'w-56' },
}
