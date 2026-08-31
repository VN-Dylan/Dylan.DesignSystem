import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { OtpInput } from './OtpInput'

const meta = {
  title: 'Forms/OtpInput',
  component: OtpInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { length: 6 },
} satisfies Meta<typeof OtpInput>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState('')
      return (
        <div className="space-y-2">
          <OtpInput value={value} onChange={setValue} />
          <p className="text-xs text-content-muted">{value || 'No code'}</p>
        </div>
      )
    }
    return <Demo />
  },
}

export const Length: Story = {
  args: { length: 4, placeholder: '0' },
}

export const FormNumericInput: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState('')
      return (
        <OtpInput
          autoFocus
          length={6}
          invalid={value.length > 0 && value.length < 6}
          value={value}
          onChange={setValue}
        />
      )
    }
    return <Demo />
  },
}
