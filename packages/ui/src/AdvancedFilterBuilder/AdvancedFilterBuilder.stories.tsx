import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { AdvancedFilterBuilder } from './AdvancedFilterBuilder'
import type { FilterQuery } from './types'

const meta = {
  title: 'Data Display/AdvancedFilterBuilder',
  component: AdvancedFilterBuilder,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AdvancedFilterBuilder>

export default meta
type Story = StoryObj<typeof meta>

const fields = [
  { label: 'Name', value: 'name' },
  { label: 'Status', value: 'status' },
  { label: 'Revenue', value: 'revenue', operators: ['gt', 'lt', 'gte', 'lte'] as const },
]

export const Basic: Story = {
  render: () => {
    const Demo = () => {
      const [query, setQuery] = useState<FilterQuery>({
        combinator: 'and',
        rules: [{ id: 'r1', field: 'name', operator: 'contains', value: 'acme' }],
      })
      return (
        <div className="space-y-3">
          <AdvancedFilterBuilder
            fields={fields.map((f) => ({
              ...f,
              operators: f.operators ? [...f.operators] : undefined,
            }))}
            value={query}
            onChange={setQuery}
            onApply={(q) => console.log('apply', q)}
          />
          <pre className="rounded bg-surface-sunken p-3 text-xs">
            {JSON.stringify(query, null, 2)}
          </pre>
        </div>
      )
    }
    return <Demo />
  },
}
