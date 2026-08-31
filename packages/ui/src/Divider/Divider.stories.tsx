import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from './Divider'

const meta = {
  title: 'Common/Divider',
  component: Divider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
  args: { orientation: 'horizontal' },
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <div className="w-72">
      <p className="text-sm text-content-muted">Content above the divider</p>
      <Divider />
      <p className="text-sm text-content-muted">Content below the divider</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center">
      <span className="text-sm text-content-muted">Left content</span>
      <Divider orientation="vertical" />
      <span className="text-sm text-content-muted">Right content</span>
    </div>
  ),
}

export const DividerStory: Story = {
  name: 'Divider',
  args: { 'aria-label': 'Section divider' },
}
