import type { Meta, StoryObj } from '@storybook/react'
import { Chart } from './Chart'

const meta = {
  title: 'Data Display/Chart',
  component: Chart,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Chart>

export default meta
type Story = StoryObj<typeof meta>

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

export const Line: Story = {
  args: {
    type: 'area',
    categories: months,
    series: [{ name: 'Revenue', data: [31, 40, 28, 51, 42, 60] }],
  },
}

export const Bar: Story = {
  args: {
    type: 'bar',
    categories: months,
    series: [{ name: 'Orders', data: [44, 55, 41, 67, 22, 43] }],
  },
}

export const Donut: Story = {
  args: {
    type: 'donut',
    series: [44, 55, 13, 33],
    options: { labels: ['Watches', 'Clothing', 'Gadgets', 'Other'] },
  },
}
