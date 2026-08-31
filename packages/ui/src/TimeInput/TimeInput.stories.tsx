import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TbIcons } from '@dylan-ds/icons'
import { TimeInput } from './TimeInput'
import type { TimeInputRangeValue, TimeInputValue } from './types'

const addMinutes = (date: Date, minutes: number) => {
  const next = new Date(date)
  next.setMinutes(next.getMinutes() + minutes)
  return next
}

const meta = {
  title: 'Forms/TimeInput',
  component: TimeInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    format: { control: 'inline-radio', options: ['12', '24'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof TimeInput>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = { args: { defaultValue: new Date() } }

export const TimeRangeInput: Story = {
  name: 'Time range input',
  render: () => (
    <TimeInput.TimeInputRange defaultValue={[new Date(), addMinutes(new Date(), 60)]} />
  ),
}

export const Controlled: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<TimeInputValue>(new Date())
      const [range, setRange] = useState<TimeInputRangeValue>([
        new Date(),
        addMinutes(new Date(), 60),
      ])
      return (
        <div className="space-y-5">
          <TimeInput value={value} onChange={setValue} />
          <p className="text-sm text-content-muted">{value?.toLocaleTimeString() ?? 'No time'}</p>
          <TimeInput.TimeInputRange value={range} onChange={setRange} />
        </div>
      )
    }
    return <Demo />
  },
}

export const DisplaySeconds: Story = { args: { showSeconds: true, defaultValue: new Date() } }

export const DisplayAmOrPm: Story = { args: { format: '12', defaultValue: new Date() } }

export const Sizes: Story = {
  render: () => (
    <div className="space-y-3">
      <TimeInput size="sm" defaultValue={new Date()} />
      <TimeInput size="md" defaultValue={new Date()} />
      <TimeInput size="lg" defaultValue={new Date()} />
    </div>
  ),
}

export const Disabled: Story = { args: { disabled: true } }

export const Affix: Story = {
  render: () => (
    <div className="space-y-3">
      <TimeInput prefix={<TbIcons.TbClockHour4 />} suffix={null} />
      <TimeInput suffix={<TbIcons.TbClock />} />
    </div>
  ),
}

export const InvalidState: Story = { args: { invalid: true } }

export const TimeInputDemo: Story = {
  name: 'TimeInput',
  args: { defaultValue: new Date(), clearable: true },
}
