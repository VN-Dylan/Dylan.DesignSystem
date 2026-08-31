import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './DataTable'

interface Row {
  name: string
  age: number
}
const data: Row[] = [
  { name: 'Ada', age: 36 },
  { name: 'Grace', age: 40 },
]
const columns: ColumnDef<Row, unknown>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'age', header: 'Age' },
]

describe('DataTable', () => {
  it('renders rows and headers', () => {
    render(<DataTable columns={columns} data={data} />)
    expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Ada' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Grace' })).toBeInTheDocument()
  })

  it('shows the empty message', () => {
    render(<DataTable columns={columns} data={[]} emptyMessage="Nothing here" />)
    expect(screen.getByText('Nothing here')).toBeInTheDocument()
  })

  it('selects rows and reports the selection', async () => {
    const onSelectChange = vi.fn()
    render(<DataTable columns={columns} data={data} selectable onSelectChange={onSelectChange} />)
    await userEvent.click(screen.getByLabelText('Select row 1'))
    expect(onSelectChange).toHaveBeenLastCalledWith([{ name: 'Ada', age: 36 }])
    await userEvent.click(screen.getByLabelText('Select all rows'))
    expect(onSelectChange).toHaveBeenLastCalledWith(data)
  })

  it('reports sort changes', async () => {
    const onSort = vi.fn()
    render(<DataTable columns={columns} data={data} onSort={onSort} />)
    await userEvent.click(screen.getByRole('button', { name: /name/i }))
    expect(onSort).toHaveBeenLastCalledWith({ key: 'name', order: 'asc' })
  })

  it('drives server pagination', async () => {
    const onPaginationChange = vi.fn()
    render(
      <DataTable
        columns={columns}
        data={data}
        pagingData={{ pageIndex: 1, pageSize: 2, total: 6 }}
        onPaginationChange={onPaginationChange}
      />,
    )
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(<DataTable columns={columns} data={data} selectable />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
