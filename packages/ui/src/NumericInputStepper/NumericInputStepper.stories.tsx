import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Input } from '../Input'
import { NumericInputStepper } from './NumericInputStepper'

const meta = {
  title: 'Forms/NumericInputStepper',
  component: NumericInputStepper,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { value: 5 },
} satisfies Meta<typeof NumericInputStepper>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState(5)
      return (
        <div className="w-72">
          <Input
            aria-label="Quantity"
            value={value}
            readOnly
            className="text-center"
            suffix={<NumericInputStepper value={value} onChange={setValue} />}
          />
        </div>
      )
    }
    return <Demo />
  },
}

export const WithConstraints: Story = {
  name: 'With Constraints',
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState(50)
      return (
        <div className="w-72 space-y-2">
          <Input
            aria-label="Percent"
            value={value}
            readOnly
            className="text-center"
            suffix={
              <NumericInputStepper value={value} onChange={setValue} min={0} max={100} step={10} />
            }
          />
          <p className="text-sm text-content-muted">Min 0, max 100, step 10</p>
        </div>
      )
    }
    return <Demo />
  },
}

export const NumericInputStepperDemo: Story = {
  name: 'NumericInputStepper',
  args: { value: 2, min: 0, max: 4 },
}
