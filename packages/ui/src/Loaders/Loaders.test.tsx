import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Table } from '../Table'
import { MediaSkeleton, TableRowSkeleton, TextBlockSkeleton } from './Loaders'

describe('Loaders', () => {
  it('renders media skeleton with optional avatar', () => {
    const { rerender } = render(<MediaSkeleton data-testid="media" />)
    expect(screen.getByTestId('media').querySelectorAll('.dyl-skeleton')).toHaveLength(3)

    rerender(<MediaSkeleton showAvatar={false} data-testid="media" />)
    expect(screen.getByTestId('media').querySelectorAll('.dyl-skeleton')).toHaveLength(2)
  })

  it('renders table skeleton rows and avatar columns', () => {
    render(
      <Table>
        <TableRowSkeleton columns={3} rows={2} avatarInColumns={[0]} />
      </Table>,
    )
    expect(screen.getAllByRole('row')).toHaveLength(2)
    expect(document.querySelectorAll('.dyl-table-row-skeleton__avatar')).toHaveLength(2)
  })

  it('renders text rows with optional title', () => {
    render(<TextBlockSkeleton rowCount={2} title={false} data-testid="text" />)
    expect(screen.getByTestId('text').querySelectorAll('.dyl-skeleton')).toHaveLength(2)
  })

  it('forwards refs', () => {
    const mediaRef = vi.fn()
    const tableRef = vi.fn()
    const textRef = vi.fn()

    render(
      <>
        <MediaSkeleton ref={mediaRef} />
        <Table>
          <TableRowSkeleton ref={tableRef} />
        </Table>
        <TextBlockSkeleton ref={textRef} />
      </>,
    )

    expect(mediaRef).toHaveBeenCalledWith(expect.any(HTMLDivElement))
    expect(tableRef).toHaveBeenCalledWith(expect.any(HTMLTableSectionElement))
    expect(textRef).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Table>
        <Table.THead>
          <Table.Tr>
            <Table.Th>User</Table.Th>
          </Table.Tr>
        </Table.THead>
        <TableRowSkeleton columns={1} rows={1} />
      </Table>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
