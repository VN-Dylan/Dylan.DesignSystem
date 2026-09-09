import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { AvailabilityCalendar } from './AvailabilityCalendar'
import type { AvailabilityCalendarRangeValue } from './types'

const meta = {
  title: 'Forms/AvailabilityCalendar',
  component: AvailabilityCalendar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof AvailabilityCalendar>

export default meta
type Story = StoryObj<typeof meta>

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

const addDays = (date: Date, amount: number) => {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return startOfDay(next)
}

const today = startOfDay(new Date())

const priceForDate = (date: Date) => 120 + (date.getDay() === 5 || date.getDay() === 6 ? 40 : 0)

export const Default: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<AvailabilityCalendarRangeValue>([null, null])
      return <AvailabilityCalendar value={value} onChange={setValue} />
    }
    return <Demo />
  },
}

export const BlockedDates: Story = {
  args: {
    blockedDates: [addDays(today, 4), addDays(today, 5), addDays(today, 12)],
  },
}

export const NightlyPricing: Story = {
  args: {
    defaultValue: [addDays(today, 2), addDays(today, 6)],
    priceForDate,
  },
}

export const MinMaxNights: Story = {
  args: {
    minNights: 3,
    maxNights: 10,
  },
}

export const SingleMonth: Story = {
  args: {
    months: 1,
  },
}

export const Playground: Story = {
  args: {
    months: 2,
    minNights: 2,
    maxNights: 14,
    blockedDates: [addDays(today, 8)],
    priceForDate,
    currency: 'USD',
    locale: 'en-US',
  },
}
