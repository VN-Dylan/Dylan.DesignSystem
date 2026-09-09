import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Rating } from './Rating'

const meta = {
  title: 'Data Display/Rating',
  component: Rating,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number' },
    defaultValue: { control: 'number' },
    max: { control: 'number' },
    allowHalf: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  args: { defaultValue: 3, max: 5, size: 'md', 'aria-label': 'Rating' },
} satisfies Meta<typeof Rating>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Interactive: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState(3)
      return <Rating value={value} onChange={setValue} aria-label="Stay rating" />
    }
    return <Demo />
  },
}

export const HalfStars: Story = {
  args: { defaultValue: 3.5, allowHalf: true },
}

export const ReadOnly: Story = {
  args: { value: 4, readOnly: true },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Rating defaultValue={3} size="sm" aria-label="Small rating" />
      <Rating defaultValue={3} size="md" aria-label="Medium rating" />
      <Rating defaultValue={3} size="lg" aria-label="Large rating" />
    </div>
  ),
}

export const Playground: Story = {}
