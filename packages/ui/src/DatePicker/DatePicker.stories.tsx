import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TbIcons } from '@dylan-ds/icons'
import { Button } from '../Button'
import { DatePicker } from './DatePicker'

const meta = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

const addDays = (date: Date, amount: number) => {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

export const Basic: Story = {
  args: { placeholder: 'Pick a date' },
}

export const RangePicker: Story = {
  render: () => <DatePicker.DatePickerRange placeholder="Select dates range" />,
}

export const DateTimePicker: Story = {
  render: () => <DatePicker.DateTimepicker placeholder="Pick date and time" />,
}

export const Controlled: Story = {
  render: () => {
    const Demo = () => {
      const [date, setDate] = useState<Date | null>(new Date())
      const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
        new Date(2022, 11, 1),
        new Date(2022, 11, 5),
      ])
      const [dateTime, setDateTime] = useState<Date | null>(new Date())

      return (
        <div className="flex flex-col gap-5">
          <DatePicker placeholder="Pick a date" value={date} onChange={setDate} />
          <DatePicker.DatePickerRange
            placeholder="Select dates range"
            value={dateRange}
            onChange={setDateRange}
          />
          <DatePicker.DateTimepicker
            placeholder="Pick date and time"
            value={dateTime}
            onChange={setDateTime}
          />
        </div>
      )
    }
    return <Demo />
  },
}

export const Format: Story = {
  args: { defaultValue: new Date(), inputFormat: 'DD MMM YYYY' },
}

export const CustomRender: Story = {
  args: {
    defaultValue: new Date(),
    renderDay: (date) => <span>{date.getDate()}</span>,
  },
}

export const DisableOutOfPeriodDate: Story = {
  render: () => {
    const minDate = addDays(new Date(), -7)
    const maxDate = addDays(new Date(), 7)
    return <DatePicker placeholder="Pick a date" minDate={minDate} maxDate={maxDate} />
  },
}

export const DisabledCertainDate: Story = {
  args: {
    defaultValue: new Date(),
    placeholder: 'Pick your date',
    disabledDate: (date) => [7, 15, 21].includes(date.getDate()),
  },
}

export const MultipleDateView: Story = {
  render: () => <DatePicker.DatePickerRange dateViewCount={2} placeholder="Multiple date view" />,
}

export const DisabledInput: Story = {
  render: () => (
    <div>
      <DatePicker disabled className="mb-4" placeholder="Select a date" />
      <DatePicker disabled className="mb-4" value={new Date()} />
    </div>
  ),
}

export const Inputtable: Story = {
  args: { inputtable: true, inputtableBlurClose: false, placeholder: 'Pick date' },
}

export const InputSize: Story = {
  render: () => {
    const date = new Date()
    return (
      <div>
        <DatePicker className="mb-4" placeholder="Select a date" defaultValue={date} size="sm" />
        <DatePicker className="mb-4" placeholder="Select a date" defaultValue={date} />
        <DatePicker className="mb-4" placeholder="Select a date" defaultValue={date} size="lg" />
      </div>
    )
  },
}

export const InputAffix: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <DatePicker inputPrefix={<TbIcons.TbCalendar />} inputSuffix={null} />
      <DatePicker inputSuffix={<TbIcons.TbCalendarStats />} />
    </div>
  ),
}

export const ClearButton: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <DatePicker defaultValue={new Date()} clearable={false} />
      <DatePicker defaultValue={new Date()} clearButton={<Button size="sm">Clear</Button>} />
    </div>
  ),
}

export const Localization: Story = {
  args: { locale: 'ko', defaultValue: new Date(), inputFormat: 'LL' },
}

export const DatePickerStory: Story = {}
