import type { Meta, StoryObj } from '@storybook/react'
import { InfoBar } from './InfoBar'

const meta = {
  title: 'Common/InfoBar',
  component: InfoBar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    level: { control: 'inline-radio', options: ['low', 'medium', 'high'] },
    height: { control: 'number' },
  },
  args: { level: 'high', height: 15 },
} satisfies Meta<typeof InfoBar>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-2">
        <span className="text-sm">Low:</span>
        <InfoBar level="low" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Medium:</span>
        <InfoBar level="medium" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">High:</span>
        <InfoBar level="high" />
      </div>
    </div>
  ),
}

export const CustomHeight: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-2">
        <InfoBar level="low" height={20} />
        <span className="text-sm text-error">Weak signal</span>
      </div>
      <div className="flex items-center gap-2">
        <InfoBar level="medium" height={20} />
        <span className="text-sm text-warning">Moderate signal</span>
      </div>
      <div className="flex items-center gap-2">
        <InfoBar level="high" height={20} />
        <span className="text-sm text-success">Strong signal</span>
      </div>
    </div>
  ),
}

export const InfoBarStory: Story = {
  name: 'InfoBar',
}
