import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Badge } from '../Badge'
import { Calendar, RangeCalendar } from './Calendar'

const meta = {
  title: 'Data Display/Calendar',
  component: Calendar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

const addDays = (date: Date, amount: number) => {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

export const Basic: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<Date | null>(null)
      return <Calendar value={value} onChange={(next) => setValue(next as Date | null)} />
    }
    return <Demo />
  },
}

export const Range: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<[Date | null, Date | null]>([
        new Date(),
        addDays(new Date(), 5),
      ])
      return <RangeCalendar value={value} onChange={setValue} />
    }
    return <Demo />
  },
}

export const CustomRender: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<Date | null>(null)
      return (
        <Calendar
          value={value}
          dayClassName={(date, { selected }) => {
            if (date.getDate() === 12 && !selected) return 'text-error'
            if (selected) return 'text-primary-fg'
            return 'text-content'
          }}
          renderDay={(date) => {
            const day = date.getDate()
            if (day !== 12) return <span>{day}</span>
            return (
              <span className="relative flex h-full w-full items-center justify-center">
                {day}
                <Badge className="absolute bottom-1" innerClass="h-1 w-1" />
              </span>
            )
          }}
          onChange={(next) => setValue(next as Date | null)}
        />
      )
    }
    return <Demo />
  },
}

export const DisabledCertainDate: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<Date | null>(null)
      const disableCertainDate = (date: Date) => [7, 15, 21].includes(date.getDate())
      return (
        <Calendar
          value={value}
          disabledDate={disableCertainDate}
          onChange={(next) => setValue(next as Date | null)}
        />
      )
    }
    return <Demo />
  },
}

export const DisableOutOfPeriodDate: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<Date | null>(null)
      const minDate = addDays(new Date(), -7)
      const maxDate = addDays(new Date(), 7)
      return (
        <Calendar
          value={value}
          minDate={minDate}
          maxDate={maxDate}
          onChange={(next) => setValue(next as Date | null)}
        />
      )
    }
    return <Demo />
  },
}

export const MultipleDateView: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<Date | null>(null)
      return (
        <Calendar value={value} dateViewCount={2} onChange={(next) => setValue(next as Date)} />
      )
    }
    return <Demo />
  },
}

export const MultipleSelection: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<Date[]>([])
      return (
        <Calendar
          multipleSelection
          value={value}
          onChange={(next) => setValue(Array.isArray(next) ? next : [])}
        />
      )
    }
    return <Demo />
  },
}

export const CalendarStory: Story = {}

export const RangeCalendarStory: Story = {
  render: () => <RangeCalendar />,
}
