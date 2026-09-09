import type { Meta, StoryObj } from '@storybook/react'
import { PriceTag } from './PriceTag'

const meta = {
  title: 'Data Display/PriceTag',
  component: PriceTag,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    amount: { control: 'number' },
    currency: { control: 'text' },
    locale: { control: 'text' },
    original: { control: 'number' },
    unit: { control: 'text' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
  },
  args: { amount: 129, currency: 'USD', size: 'md', align: 'start' },
} satisfies Meta<typeof PriceTag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithUnit: Story = {
  args: { unit: 'night' },
}

export const Discounted: Story = {
  args: { amount: 129, original: 189, unit: 'night' },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <PriceTag amount={129} size="sm" />
      <PriceTag amount={129} size="md" />
      <PriceTag amount={129} size="lg" />
    </div>
  ),
}

export const Currencies: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <PriceTag amount={129} currency="USD" locale="en-US" />
      <PriceTag amount={129} currency="EUR" locale="de-DE" />
      <PriceTag amount={1290000} currency="VND" locale="vi-VN" />
      <PriceTag amount={12900} currency="JPY" locale="ja-JP" />
    </div>
  ),
}

export const Playground: Story = {}
