import type { Meta, StoryObj } from '@storybook/react'
import { Center } from './Center'

const meta = {
  title: 'Primitives/Center',
  component: Center,
  tags: ['autodocs'],
  args: { children: 'Centered content' },
} satisfies Meta<typeof Center>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: (args) => (
    <Center {...args} className="min-h-24 border border-border bg-surface-sunken" />
  ),
}

export const CustomElement: Story = {
  args: { asElement: 'section', 'aria-label': 'Centered section' },
}

export const RightToLeft: Story = {
  args: { dir: 'rtl', children: 'محتوى في المنتصف' },
}
