import type { Meta, StoryObj } from '@storybook/react'
import { TbCheck, TbTruck, TbPackage } from 'react-icons/tb'
import { Timeline } from './Timeline'

const meta = {
  title: 'Data Display/Timeline',
  component: Timeline,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <Timeline>
      <Timeline.Item>
        <p className="font-medium">Order placed</p>
        <p className="text-content-muted">Jan 2, 09:14</p>
      </Timeline.Item>
      <Timeline.Item>
        <p className="font-medium">Payment confirmed</p>
        <p className="text-content-muted">Jan 2, 09:15</p>
      </Timeline.Item>
      <Timeline.Item>
        <p className="font-medium">Shipped</p>
        <p className="text-content-muted">Jan 3, 12:40</p>
      </Timeline.Item>
    </Timeline>
  ),
}

const frame = (icon: React.ReactNode) => (
  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-sunken text-content-muted">
    {icon}
  </span>
)

export const Advance: Story = {
  render: () => (
    <Timeline>
      <Timeline.Item media={frame(<TbCheck />)}>
        <p className="font-medium">Order confirmed</p>
      </Timeline.Item>
      <Timeline.Item media={frame(<TbPackage />)}>
        <p className="font-medium">Packed</p>
      </Timeline.Item>
      <Timeline.Item media={frame(<TbTruck />)}>
        <p className="font-medium">Out for delivery</p>
      </Timeline.Item>
    </Timeline>
  ),
}
