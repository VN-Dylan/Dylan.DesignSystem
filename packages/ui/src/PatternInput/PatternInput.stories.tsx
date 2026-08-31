import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../Button'
import { PatternInput } from './PatternInput'
import type { NumberFormatValue } from '../CustomFormatInput'

const meta = {
  title: 'Forms/PatternInput',
  component: PatternInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
  args: { 'aria-label': 'Card number', format: '#### #### #### ####', placeholder: 'Card number' },
} satisfies Meta<typeof PatternInput>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState('123456')
      return (
        <PatternInput
          aria-label="Code"
          value={value}
          format="### ###"
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
          <PatternInput
            aria-label="Card number"
            format="#### #### #### ####"
            mask="_"
            placeholder="Card number"
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

export const PatternInputDoc: Story = {
  args: { allowEmptyFormatting: true, format: '### ###', mask: '_' },
}

export const ReactNumberFormat: Story = {
  name: 'React number format',
  render: () => {
    const Demo = () => {
      const [payload, setPayload] = useState<NumberFormatValue>()
      return (
        <div className="space-y-2">
          <PatternInput aria-label="Code" format="### ###" onValueChange={setPayload} />
          <p className="text-xs text-content-muted">{payload?.formattedValue || 'No value'}</p>
        </div>
      )
    }
    return <Demo />
  },
}
