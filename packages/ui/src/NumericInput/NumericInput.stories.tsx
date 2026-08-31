import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../Button'
import { NumericInput } from './NumericInput'
import type { NumberFormatValue } from '../CustomFormatInput'

const meta = {
  title: 'Forms/NumericInput',
  component: NumericInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
  args: { 'aria-label': 'Amount', placeholder: 'Amount' },
} satisfies Meta<typeof NumericInput>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState('0')
      return (
        <NumericInput
          aria-label="Amount"
          fixedDecimalScale
          value={value}
          decimalScale={2}
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
          <NumericInput
            aria-label="Amount"
            thousandSeparator
            placeholder="Amount"
            value={value}
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

export const FormNumericInput: Story = {
  args: { thousandSeparator: true, prefix: '$', decimalScale: 2, fixedDecimalScale: true },
}

export const ReactNumberFormat: Story = {
  name: 'React number format',
  render: () => {
    const Demo = () => {
      const [payload, setPayload] = useState<NumberFormatValue>()
      return (
        <div className="space-y-2">
          <NumericInput aria-label="Amount" thousandSeparator onValueChange={setPayload} />
          <p className="text-xs text-content-muted">{payload?.formattedValue || 'No value'}</p>
        </div>
      )
    }
    return <Demo />
  },
}
