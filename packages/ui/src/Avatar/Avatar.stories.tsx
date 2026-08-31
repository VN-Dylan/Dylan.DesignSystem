import type { Meta, StoryObj } from '@storybook/react'
import { TbUser, TbBrandOpenai } from 'react-icons/tb'
import { Badge } from '../Badge'
import { Avatar } from './Avatar'

const meta = {
  title: 'Common/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    shape: { control: 'inline-radio', options: ['rounded-sm', 'square', 'circle'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  args: { children: 'A', shape: 'rounded-sm', size: 'md' },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Shape: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar shape="square" icon={<TbUser />} />
      <Avatar shape="rounded-sm" icon={<TbUser />} />
      <Avatar shape="circle" icon={<TbUser />} />
    </div>
  ),
}

export const Size: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm" icon={<TbUser />} />
      <Avatar size="md" icon={<TbUser />} />
      <Avatar size="lg" icon={<TbUser />} />
      <Avatar size={56}>XL</Avatar>
    </div>
  ),
}

export const Type: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar>DF</Avatar>
      <Avatar icon={<TbUser />} />
      <Avatar
        src="https://i.pravatar.cc/96?img=12"
        srcSet="https://i.pravatar.cc/192?img=12 2x"
        alt="Kristen Fisher"
      />
    </div>
  ),
}

export const Color: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="border-info bg-info-subtle text-info">A</Avatar>
      <Avatar className="border-primary bg-primary text-primary-fg" icon={<TbBrandOpenai />} />
    </div>
  ),
}

export const Status: Story = {
  render: () => (
    <div className="flex items-center gap-5">
      <Badge>
        <Avatar icon={<TbUser />} />
      </Badge>
      <Badge innerClass="bg-success">
        <Avatar icon={<TbUser />} />
      </Badge>
      <Badge content={99}>
        <Avatar icon={<TbUser />} />
      </Badge>
    </div>
  ),
}

export const AvatarGroup: Story = {
  render: () => (
    <Avatar.Group
      chained
      omittedAvatarTooltip
      maxCount={4}
      omittedAvatarProps={{ shape: 'circle' }}
    >
      <Avatar shape="circle" src="https://i.pravatar.cc/96?img=1" alt="Ada" />
      <Avatar shape="circle" src="https://i.pravatar.cc/96?img=2" alt="Grace" />
      <Avatar shape="circle" src="https://i.pravatar.cc/96?img=3" alt="Linus" />
      <Avatar shape="circle" src="https://i.pravatar.cc/96?img=4" alt="Margaret" />
      <Avatar shape="circle" src="https://i.pravatar.cc/96?img=5" alt="Alan" />
      <Avatar shape="circle" src="https://i.pravatar.cc/96?img=6" alt="Katherine" />
    </Avatar.Group>
  ),
}

export const AvatarStory: Story = {}
