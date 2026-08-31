import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../Button'
import { CustomFormatInput } from './CustomFormatInput'
import type { NumberFormatValue } from './types'

const currencyFormat = (value: string) => {
  if (value === '') return ''
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(value))
}

const meta = {
  title: 'Forms/CustomFormatInput',
  component: CustomFormatInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
  args: { 'aria-label': 'Amount', placeholder: '$0' },
} satisfies Meta<typeof CustomFormatInput>

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState('1200')
      return (
        <CustomFormatInput
          aria-label="Amount"
          value={value}
          format={currencyFormat}
          onValueChange={(event) => setValue(event.value)}
        />
      )
    }
    return <Demo />
  },
}

export const WithForm: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState('')
      return (
        <form
          className="space-y-3"
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          <CustomFormatInput
            aria-label="Expiration date"
            placeholder="MM/YY"
            value={value}
            format={(next) => `${next.slice(0, 2)}${next.length > 2 ? `/${next.slice(2, 4)}` : ''}`}
            onValueChange={(event) => setValue(event.value)}
          />
          <Button variant="solid" type="submit" block>
            Submit
          </Button>
        </form>
      )
    }
    return <Demo />
  },
}

export const FormCustomFormatInput: Story = {
  args: { defaultValue: '5000', format: currencyFormat, inputPrefix: 'USD' },
}

export const ReactNumberFormat: Story = {
  name: 'React number format',
  render: () => {
    const Demo = () => {
      const [payload, setPayload] = useState<NumberFormatValue>()
      return (
        <div className="space-y-2">
          <CustomFormatInput
            aria-label="Amount"
            format={currencyFormat}
            onValueChange={setPayload}
          />
          <p className="text-xs text-content-muted">{payload?.formattedValue || 'No value'}</p>
        </div>
      )
    }
    return <Demo />
  },
}
