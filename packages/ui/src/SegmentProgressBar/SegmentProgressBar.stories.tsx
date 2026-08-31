import type { Meta, StoryObj } from '@storybook/react'
import { SegmentProgressBar } from './SegmentProgressBar'

const meta = {
  title: 'Data Display/SegmentProgressBar',
  component: SegmentProgressBar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-96 space-y-4">
        <Story />
      </div>
    ),
  ],
  args: { segments: 40, percent: 40 },
} satisfies Meta<typeof SegmentProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="space-y-4">
      {[0, 40, 80, 100].map((percent) => (
        <div key={percent}>
          <p className="mb-2 text-sm text-content-muted">{percent}%</p>
          <SegmentProgressBar segments={40} percent={percent} />
        </div>
      ))}
    </div>
  ),
}

export const CustomStyles: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="text-sm text-content-muted">Custom height and gap</div>
      <SegmentProgressBar segments={50} percent={70} height={32} gap={2} filledClass="bg-primary" />
    </div>
  ),
}

export const SegmentProgressBarStory: Story = {
  name: 'SegmentProgressBar',
}
