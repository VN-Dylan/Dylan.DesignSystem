import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Select } from '../Select'
import type { SelectOption } from '../Select'
import { Pagination } from './Pagination'

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

const pageSizeOptions: SelectOption[] = [
  { value: '5', label: '5 / page' },
  { value: '10', label: '10 / page' },
  { value: '20', label: '20 / page' },
  { value: '50', label: '50 / page' },
]

export const Basic: Story = {
  render: () => <Pagination />,
}

export const More: Story = {
  render: () => (
    <div className="space-y-4">
      <Pagination total={50} />
      <Pagination total={100} />
    </div>
  ),
}

export const Total: Story = {
  render: () => <Pagination displayTotal total={50} />,
}

export const PageSizes: Story = {
  render: () => {
    const Demo = () => {
      const [pageSize, setPageSize] = useState(5)
      return (
        <div className="flex flex-wrap items-center gap-3">
          <Pagination displayTotal pageSize={pageSize} total={100} />
          <div className="w-32">
            <Select
              size="sm"
              isSearchable={false}
              defaultValue={pageSizeOptions[0]}
              options={pageSizeOptions}
              aria-label="Page size"
              onChange={(selected) => {
                if (selected) setPageSize(Number(selected.value))
              }}
            />
          </div>
        </div>
      )
    }
    return <Demo />
  },
}

export const Controlled: Story = {
  render: () => {
    const Demo = () => {
      const [page, setPage] = useState(60)
      return <Pagination total={100} currentPage={page} onChange={setPage} />
    }
    return <Demo />
  },
}

export const PaginationStory: Story = {
  name: 'Pagination',
  args: { total: 50, displayTotal: true },
}
