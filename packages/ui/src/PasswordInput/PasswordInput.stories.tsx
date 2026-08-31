import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { PasswordInput } from './PasswordInput'

const meta = {
  title: 'Forms/PasswordInput',
  component: PasswordInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
  args: { 'aria-label': 'Password', placeholder: 'Password' },
} satisfies Meta<typeof PasswordInput>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  render: () => {
    const Demo = () => {
      const [visible, setVisible] = useState(false)
      return (
        <div className="space-y-2">
          <PasswordInput aria-label="Password" onVisibleChange={setVisible} />
          <p className="text-xs text-content-muted">{visible ? 'Visible' : 'Hidden'}</p>
        </div>
      )
    }
    return <Demo />
  },
}

export const PasswordInputDemo: Story = {
  name: 'PasswordInput',
  args: { defaultValue: 'secret' },
}
