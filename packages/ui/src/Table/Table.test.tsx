import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Table } from './Table'

const renderTable = (props?: Parameters<typeof Table>[0]) =>
  render(
    <Table {...props}>
      <Table.THead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
        </Table.Tr>
      </Table.THead>
      <Table.TBody>
        <Table.Tr>
          <Table.Td>Ada</Table.Td>
        </Table.Tr>
      </Table.TBody>
    </Table>,
  )

describe('Table', () => {
  it('renders semantic table structure', () => {
    renderTable()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Ada' })).toBeInTheDocument()
  })

  it('reflects sort state via aria-sort and calls onSort', async () => {
    const onSort = vi.fn()
    render(
      <Table>
        <Table.THead>
          <Table.Tr>
            <Table.Th sortable sortDirection="asc" onSort={onSort}>
              Name
            </Table.Th>
          </Table.Tr>
        </Table.THead>
        <Table.TBody>
          <Table.Tr>
            <Table.Td>Ada</Table.Td>
          </Table.Tr>
        </Table.TBody>
      </Table>,
    )
    expect(screen.getByRole('columnheader')).toHaveAttribute('aria-sort', 'ascending')
    await userEvent.click(screen.getByRole('button', { name: /name/i }))
    expect(onSort).toHaveBeenCalledOnce()
  })

  it('has no axe violations', async () => {
    const { container } = renderTable({ hoverable: true, compact: true })
    expect(await axe(container)).toHaveNoViolations()
  })
})
