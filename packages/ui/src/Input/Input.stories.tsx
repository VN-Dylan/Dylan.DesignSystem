import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TbSearch, TbMail } from 'react-icons/tb'
import { Input } from './Input'

const meta = {
  title: 'Forms/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { placeholder: 'Type here…' },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-3">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
}

export const Affix: Story = {
  render: () => (
    <div className="space-y-3">
      <Input prefix={<TbSearch />} placeholder="Search" />
      <Input suffix=".00" prefix="$" placeholder="0" inputMode="decimal" />
      <Input prefix={<TbMail />} suffix="@dylan.dev" placeholder="username" />
    </div>
  ),
}

export const Invalid: Story = {
  args: { invalid: true, defaultValue: 'not-an-email' },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Read only' },
}

export const Textarea: Story = {
  args: { textArea: true, placeholder: 'Write a message…', rows: 4 },
}

export const Controlled: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState('')
      return (
        <div className="space-y-2">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Controlled"
          />
          <p className="text-xs text-content-muted">Value: {value || '—'}</p>
        </div>
      )
    }
    return <Demo />
  },
}
