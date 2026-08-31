import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { AutoComplete } from './AutoComplete'

type Country = {
  name: string
  code: string
}

const countries: Country[] = [
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'Canada', code: 'CA' },
  { name: 'Australia', code: 'AU' },
  { name: 'Germany', code: 'DE' },
  { name: 'France', code: 'FR' },
  { name: 'Japan', code: 'JP' },
  { name: 'China', code: 'CN' },
  { name: 'India', code: 'IN' },
  { name: 'Brazil', code: 'BR' },
]

const meta = {
  title: 'Forms/AutoComplete',
  component: AutoComplete,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AutoComplete>

export default meta
type Story = StoryObj<typeof meta>

const BasicDemo = () => {
  const [value, setValue] = useState('')
  const [selected, setSelected] = useState<Country | null>(null)

  return (
    <div className="space-y-2">
      <AutoComplete
        data={countries}
        optionKey={(country) => country.name}
        value={value}
        onInputChange={setValue}
        onOptionSelected={setSelected}
        placeholder="Search countries..."
        aria-label="Country"
        renderOption={(country) => (
          <span className="flex items-center justify-between gap-3">
            <span className="font-medium">{country.name}</span>
            <span className="text-content-muted">{country.code}</span>
          </span>
        )}
      />
      {selected && <p className="text-sm text-content-muted">Selected: {selected.name}</p>}
    </div>
  )
}

export const Basic: Story = {
  render: () => <BasicDemo />,
}

export const AutoCompleteStory: Story = {
  name: 'AutoComplete',
  render: () => <BasicDemo />,
}
