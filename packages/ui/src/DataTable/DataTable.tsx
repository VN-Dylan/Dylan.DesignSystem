import { useEffect, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/react-table'
import { Table } from '../Table'
import { Checkbox } from '../Checkbox'
import { Pagination } from '../Pagination'
import { Spinner } from '../Spinner'
import type { DataTableProps } from './types'
import './DataTable.scss'

/**
 * A data grid over `@tanstack/react-table` with the design system's `Table`,
 * `Pagination`, `Checkbox` and `Spinner`. Server-driven: pass `pagingData` and
 * respond to `onPaginationChange` / `onSort` with fresh `data`.
 */
export function DataTable<TData>({
  columns,
  data,
  loading = false,
  pagingData,
  pageSizeOptions = [10, 25, 50],
  onPaginationChange,
  onPageSizeChange,
  onSort,
  selectable = false,
  onSelectChange,
  emptyMessage = 'No data',
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: Boolean(pagingData),
    manualSorting: Boolean(onSort),
    enableRowSelection: selectable,
  })

  useEffect(() => {
    if (!onSort) return
    const first = sorting[0]
    onSort(first ? { key: first.id, order: first.desc ? 'desc' : 'asc' } : { key: '', order: '' })
  }, [sorting, onSort])

  useEffect(() => {
    if (!onSelectChange) return
    onSelectChange(table.getSelectedRowModel().rows.map((r) => r.original))
  }, [rowSelection, onSelectChange, table])

  const rows = table.getRowModel().rows
  const totalPages = pagingData ? Math.max(1, Math.ceil(pagingData.total / pagingData.pageSize)) : 1

  const headerGroups = table.getHeaderGroups()

  return (
    <div className="dyl-data-table" data-loading={loading || undefined}>
      <Table hoverable>
        <Table.THead>
          {headerGroups.map((group) => (
            <Table.Tr key={group.id}>
              {selectable && (
                <Table.Th className="dyl-data-table__select-cell">
                  <Checkbox
                    checked={table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={(checked) => table.toggleAllRowsSelected(checked)}
                    aria-label="Select all rows"
                  />
                </Table.Th>
              )}
              {group.headers.map((header) => {
                const canSort = header.column.getCanSort()
                const dir = header.column.getIsSorted()
                return (
                  <Table.Th
                    key={header.id}
                    sortable={canSort}
                    sortDirection={dir === false ? false : dir}
                    onSort={() => header.column.toggleSorting()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </Table.Th>
                )
              })}
            </Table.Tr>
          ))}
        </Table.THead>
        <Table.TBody>
          {rows.length === 0 ? (
            <Table.Tr>
              <Table.Td
                className="dyl-data-table__empty"
                colSpan={columns.length + (selectable ? 1 : 0)}
              >
                {emptyMessage}
              </Table.Td>
            </Table.Tr>
          ) : (
            rows.map((row) => (
              <Table.Tr key={row.id} data-selected={row.getIsSelected() || undefined}>
                {selectable && (
                  <Table.Td className="dyl-data-table__select-cell">
                    <Checkbox
                      checked={row.getIsSelected()}
                      onChange={(checked) => row.toggleSelected(checked)}
                      aria-label={`Select row ${row.index + 1}`}
                    />
                  </Table.Td>
                )}
                {row.getVisibleCells().map((cell) => (
                  <Table.Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))
          )}
        </Table.TBody>
      </Table>

      {loading && (
        <div className="dyl-data-table__overlay" aria-hidden>
          <Spinner size={28} />
        </div>
      )}

      {pagingData && (
        <div className="dyl-data-table__footer">
          <label className="dyl-data-table__page-size">
            Rows per page
            <select
              value={pagingData.pageSize}
              onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
          <Pagination
            currentPage={pagingData.pageIndex}
            pageSize={pagingData.pageSize}
            total={pagingData.total}
            onChange={(page) => onPaginationChange?.(page)}
          />
          <span className="dyl-data-table__count">
            Page {pagingData.pageIndex} of {totalPages}
          </span>
        </div>
      )}
    </div>
  )
}
