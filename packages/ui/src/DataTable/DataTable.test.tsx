import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
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

const many: Row[] = Array.from({ length: 23 }, (_, i) => ({
  name: `Person ${String(i + 1).padStart(2, '0')}`,
  age: 20 + i,
}))

const headerNames = () =>
  screen.getAllByRole('columnheader').map((th) => th.textContent?.replace(/\s+/g, ' ').trim())

const bodyCells = (column: number) =>
  screen
    .getAllByRole('row')
    .slice(1)
    .map((row) => within(row).getAllByRole('cell')[column]?.textContent)

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

  it('reports sort changes (server sorting)', async () => {
    const onSort = vi.fn()
    render(<DataTable columns={columns} data={data} onSort={onSort} />)
    await userEvent.click(screen.getByRole('button', { name: 'Name' }))
    expect(onSort).toHaveBeenLastCalledWith({ key: 'name', order: 'asc' })
  })

  it('sorts client-side and exposes aria-sort', async () => {
    render(<DataTable columns={columns} data={data} />)
    await userEvent.click(screen.getByRole('button', { name: 'Age' }))
    await userEvent.click(screen.getByRole('button', { name: 'Age' }))
    expect(screen.getByRole('columnheader', { name: /age/i })).toHaveAttribute(
      'aria-sort',
      'descending',
    )
    expect(bodyCells(0)).toEqual(['Grace', 'Ada'])
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
    expect(screen.getByText('Showing 1–2 of 6')).toBeInTheDocument()
  })

  it('paginates client-side and changes the page size', async () => {
    const onPageSizeChange = vi.fn()
    render(
      <DataTable
        columns={columns}
        data={many}
        pagination
        pageSizeOptions={[10, 25]}
        onPageSizeChange={onPageSizeChange}
      />,
    )
    expect(screen.getByText('Showing 1–10 of 23')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(11)

    await userEvent.selectOptions(screen.getByLabelText('Rows per page'), '25')
    expect(onPageSizeChange).toHaveBeenCalledWith(25)
    expect(screen.getByText('Showing 1–23 of 23')).toBeInTheDocument()
  })

  it('filters with the search box', async () => {
    render(<DataTable columns={columns} data={many} searchable pagination />)
    await userEvent.type(screen.getByRole('searchbox', { name: 'Search…' }), 'Person 07')
    expect(bodyCells(0)).toEqual(['Person 07'])
    expect(screen.getByText('Showing 1–1 of 1')).toBeInTheDocument()
  })

  it('hands search to the server when onSearchChange is set', async () => {
    const onSearchChange = vi.fn()
    render(<DataTable columns={columns} data={data} searchable onSearchChange={onSearchChange} />)
    await userEvent.type(screen.getByRole('searchbox'), 'Zed')
    expect(onSearchChange).toHaveBeenLastCalledWith('Zed')
    expect(bodyCells(0)).toEqual(['Ada', 'Grace'])
  })

  it('renders filter and toolbar slots', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        filters={<button type="button">Status</button>}
        toolbarEnd={<button type="button">Export</button>}
      />,
    )
    const toolbar = screen.getByRole('toolbar', { name: 'Table controls' })
    expect(within(toolbar).getByRole('button', { name: 'Status' })).toBeInTheDocument()
    expect(within(toolbar).getByRole('button', { name: 'Export' })).toBeInTheDocument()
  })

  it('pins a column to the start via the column menu', async () => {
    const onLayoutChange = vi.fn()
    render(<DataTable columns={columns} data={data} onLayoutChange={onLayoutChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Age options' }))
    await userEvent.click(await screen.findByText('Pin to start'))

    expect(headerNames()).toEqual(['Age', 'Name'])
    expect(screen.getByRole('columnheader', { name: /age/i })).toHaveAttribute(
      'data-pinned',
      'start',
    )
    expect(onLayoutChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ columnPinning: { left: ['age'], right: [] } }),
    )
  })

  it('moves and hides columns via the column menu', async () => {
    render(<DataTable columns={columns} data={data} />)
    await userEvent.click(screen.getByRole('button', { name: 'Name options' }))
    await userEvent.click(await screen.findByText('Move right'))
    expect(headerNames()).toEqual(['Age', 'Name'])

    await userEvent.click(screen.getByRole('button', { name: 'Age options' }))
    await userEvent.click(await screen.findByText('Hide column'))
    expect(headerNames()).toEqual(['Name'])
  })

  it('reorders columns by dragging a header', () => {
    render(<DataTable columns={columns} data={data} />)
    const [name, age] = screen.getAllByRole('columnheader')
    const dataTransfer = { setData: vi.fn(), effectAllowed: '', dropEffect: '' }
    fireEvent.dragStart(name!, { dataTransfer })
    fireEvent.dragOver(age!, { dataTransfer })
    fireEvent.drop(age!, { dataTransfer })
    expect(headerNames()).toEqual(['Age', 'Name'])
  })

  it('respects initialState', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        initialState={{
          sorting: { key: 'age', order: 'desc' },
          columnVisibility: { age: false },
        }}
      />,
    )
    expect(headerNames()).toEqual(['Name'])
    expect(bodyCells(0)).toEqual(['Grace', 'Ada'])
  })

  describe('tree mode', () => {
    interface Node {
      name: string
      size: number
      children?: Node[]
    }
    const tree: Node[] = [
      {
        name: 'src',
        size: 30,
        children: [
          { name: 'index.ts', size: 10 },
          { name: 'lib', size: 20, children: [{ name: 'util.ts', size: 20 }] },
        ],
      },
      { name: 'README.md', size: 5 },
    ]
    const treeColumns: ColumnDef<Node, unknown>[] = [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'size', header: 'Size' },
    ]
    const renderTree = (props: Partial<Parameters<typeof DataTable<Node>>[0]> = {}) =>
      render(
        <DataTable<Node>
          columns={treeColumns}
          data={tree}
          getSubRows={(n) => n.children}
          {...props}
        />,
      )

    it('renders top-level rows collapsed and expands on toggle', async () => {
      renderTree()
      expect(bodyCells(0)).toEqual(['src', 'README.md'])
      await userEvent.click(screen.getByRole('button', { name: 'Expand src' }))
      expect(bodyCells(0)).toEqual(['src', 'index.ts', 'lib', 'README.md'])
      expect(screen.getByRole('button', { name: 'Collapse src' })).toHaveAttribute(
        'aria-expanded',
        'true',
      )
    })

    it('expands and collapses every row from the header', async () => {
      renderTree()
      await userEvent.click(screen.getByRole('button', { name: 'Expand all rows' }))
      expect(bodyCells(0)).toEqual(['src', 'index.ts', 'lib', 'util.ts', 'README.md'])
      await userEvent.click(screen.getByRole('button', { name: 'Collapse all rows' }))
      expect(bodyCells(0)).toEqual(['src', 'README.md'])
    })

    it('indents by depth', () => {
      renderTree({ initialState: { expanded: true } })
      const util = screen.getByRole('cell', { name: /util\.ts/ })
      expect(util.style.getPropertyValue('--dyl-tree-level')).toBe('2')
    })

    it('keeps ancestors of a search hit and opens their branches', async () => {
      renderTree({ searchable: true })
      await userEvent.type(screen.getByRole('searchbox'), 'util')
      expect(bodyCells(0)).toEqual(['src', 'lib', 'util.ts'])
    })

    it('paginates top-level rows and keeps children with their parent', () => {
      renderTree({ pagination: true, pageSizeOptions: [1], initialState: { expanded: true } })
      expect(bodyCells(0)).toEqual(['src', 'index.ts', 'lib', 'util.ts'])
      expect(screen.getByText('Page 1 of 2')).toBeInTheDocument()
    })

    it('sorts within each level', async () => {
      renderTree({ initialState: { expanded: true } })
      await userEvent.click(screen.getByRole('button', { name: 'Size' }))
      await userEvent.click(screen.getByRole('button', { name: 'Size' }))
      expect(bodyCells(0)).toEqual(['src', 'lib', 'util.ts', 'index.ts', 'README.md'])
    })

    it('has no axe violations', async () => {
      const { container } = renderTree({ initialState: { expanded: true }, selectable: true })
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <DataTable columns={columns} data={many} selectable searchable pagination />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
