import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { GuestSelector } from './GuestSelector'
import type { GuestCounts } from './types'

const meta = {
  title: 'Forms/GuestSelector',
  component: GuestSelector,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof GuestSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomCategories: Story = {
  args: {
    categories: [
      { key: 'adults', label: 'Adults', min: 1 },
      { key: 'pets', label: 'Pets', description: 'Service animals excluded', max: 3 },
    ],
  },
}

export const ControlledWithTotalMax: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<GuestCounts>({
        adults: 2,
        children: 0,
        infants: 0,
        rooms: 1,
      })
      return <GuestSelector value={value} onChange={setValue} totalMax={5} />
    }
    return <Demo />
  },
}

export const CustomSummary: Story = {
  args: {
    defaultValue: { adults: 2, children: 1, infants: 1, rooms: 2 },
    renderSummary: (value) =>
      `${value.rooms ?? 0} rooms for ${(value.adults ?? 0) + (value.children ?? 0)} travelers`,
  },
}

export const Playground: Story = {
  args: {
    placeholder: 'Who is staying?',
    totalMax: 8,
  },
}
