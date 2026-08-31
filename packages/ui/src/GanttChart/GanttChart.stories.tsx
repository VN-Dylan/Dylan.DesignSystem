import type { Meta, StoryObj } from '@storybook/react'
import { GanttChart } from './GanttChart'

const meta = {
  title: 'Data Display/GanttChart',
  component: GanttChart,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof GanttChart>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    tasks: [
      { id: '1', name: 'Research', start: '2026-01-05', end: '2026-01-09', progress: 100 },
      { id: '2', name: 'Design', start: '2026-01-08', end: '2026-01-15', progress: 70 },
      {
        id: '3',
        name: 'Build',
        start: '2026-01-14',
        end: '2026-01-26',
        progress: 30,
        dependencies: ['2'],
      },
      { id: '4', name: 'QA', start: '2026-01-24', end: '2026-01-30', progress: 0 },
    ],
  },
}
