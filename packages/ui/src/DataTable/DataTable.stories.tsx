import type { Meta, StoryObj } from '@storybook/react'
import { useMemo, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './DataTable'

const meta = {
  title: 'Data Display/DataTable',
  component: DataTable,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

interface Person {
  firstName: string
  lastName: string
  age: number
  visits: number
}

const ALL: Person[] = Array.from({ length: 47 }, (_, i) => ({
  firstName: ['Ada', 'Grace', 'Alan', 'Edsger', 'Barbara'][i % 5]!,
  lastName: ['Lovelace', 'Hopper', 'Turing', 'Dijkstra', 'Liskov'][i % 5]!,
  age: 20 + (i % 40),
  visits: (i * 7) % 100,
}))

const columns: ColumnDef<Person, unknown>[] = [
  { accessorKey: 'firstName', header: 'First name' },
  { accessorKey: 'lastName', header: 'Last name' },
  { accessorKey: 'age', header: 'Age' },
  { accessorKey: 'visits', header: 'Visits' },
]

export const ServerPaginated: Story = {
  render: () => {
    const Demo = () => {
      const [pageIndex, setPageIndex] = useState(1)
      const [pageSize, setPageSize] = useState(10)
      const [selected, setSelected] = useState<Person[]>([])
      const page = useMemo(
        () => ALL.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
        [pageIndex, pageSize],
      )
      return (
        <div className="space-y-2">
          <DataTable
            columns={columns}
            data={page}
            selectable
            onSelectChange={setSelected}
            pagingData={{ pageIndex, pageSize, total: ALL.length }}
            onPaginationChange={setPageIndex}
            onPageSizeChange={(s) => {
              setPageSize(s)
              setPageIndex(1)
            }}
          />
          <p className="text-xs text-content-muted">{selected.length} selected</p>
        </div>
      )
    }
    return <Demo />
  },
}

export const Loading: Story = {
  args: { columns, data: [], loading: true },
}
