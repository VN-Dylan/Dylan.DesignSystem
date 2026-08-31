import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Select } from './Select'
import type { SelectOption } from './types'

const options: SelectOption[] = [
  { label: 'Watches', value: 'watches' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Gadgets', value: 'gadgets' },
  { label: 'Bags', value: 'bags' },
  { label: 'Shoes', value: 'shoes', disabled: true },
]

const meta = {
  title: 'Forms/Select',
  component: Select,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
  args: { options, 'aria-label': 'Category' },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const Searchable: Story = { args: { isSearchable: true } }

export const Sizes: Story = {
  render: () => (
    <div className="space-y-3">
      <Select options={options} size="sm" aria-label="sm" />
      <Select options={options} size="md" aria-label="md" />
      <Select options={options} size="lg" aria-label="lg" />
    </div>
  ),
}

export const Invalid: Story = { args: { invalid: true } }
export const Disabled: Story = { args: { disabled: true, defaultValue: options[0] } }

export const Multi: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<SelectOption[]>([])
      return (
        <div className="space-y-2">
          <Select.Multi
            options={options}
            value={value}
            onChange={setValue}
            aria-label="Categories"
          />
          <p className="text-xs text-content-muted">
            {value.map((v) => v.label).join(', ') || 'none'}
          </p>
        </div>
      )
    }
    return <Demo />
  },
}
