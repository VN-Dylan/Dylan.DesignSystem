import type { Meta, StoryObj } from '@storybook/react'
import { TbUser } from 'react-icons/tb'
import { Avatar } from '../Avatar'
import { Badge } from './Badge'

const meta = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    maxCount: { control: 'number' },
  },
  args: { content: 9, maxCount: 99 },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="flex items-center gap-5">
      <Badge content={9}>
        <Avatar icon={<TbUser />} />
      </Badge>
      <Badge content="New">
        <Avatar icon={<TbUser />} />
      </Badge>
    </div>
  ),
}

export const CountOverflow: Story = {
  render: () => (
    <div className="flex items-center gap-5">
      <Badge content={10} maxCount={9}>
        <Avatar icon={<TbUser />} />
      </Badge>
      <Badge content={100}>
        <Avatar icon={<TbUser />} />
      </Badge>
    </div>
  ),
}

export const Dot: Story = {
  render: () => (
    <Badge>
      <Avatar icon={<TbUser />} />
    </Badge>
  ),
}

export const Inline: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge />
      <Badge content={9} />
      <Badge content={99} />
      <Badge content="New" />
    </div>
  ),
}

export const Color: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge innerClass="bg-info" />
      <Badge content={9} innerClass="bg-success" />
      <Badge content={99} innerClass="bg-error-subtle text-error" />
      <Badge content="New" innerClass="bg-surface text-content" className="border border-border" />
    </div>
  ),
}

export const BadgeStory: Story = {}
