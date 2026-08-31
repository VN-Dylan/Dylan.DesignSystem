import type { Meta, StoryObj } from '@storybook/react'
import { FullCalendar } from './FullCalendar'

const meta = {
  title: 'Data Display/FullCalendar',
  component: FullCalendar,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof FullCalendar>

export default meta
type Story = StoryObj<typeof meta>

const base = new Date()
const day = (n: number) => new Date(base.getFullYear(), base.getMonth(), n)

export const Basic: Story = {
  args: {
    defaultMonth: base,
    events: [
      { id: '1', title: 'Design review', start: day(4) },
      { id: '2', title: 'Sprint planning', start: day(8), end: day(9) },
      { id: '3', title: 'Release', start: day(15), color: 'var(--dyl-success)' },
      { id: '4', title: 'Retro', start: day(15) },
      { id: '5', title: '1:1', start: day(15) },
      { id: '6', title: 'Extra', start: day(15) },
    ],
  },
}
