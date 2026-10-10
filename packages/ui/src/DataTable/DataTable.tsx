import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type DragEvent,
} from 'react'
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnOrderState,
  type ColumnPinningState,
  type ExpandedState,
  type Header,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { Checkbox } from '../Checkbox'
import { Dropdown } from '../Dropdown'
import { Input } from '../Input'
import { Pagination } from '../Pagination'
import { Spinner } from '../Spinner'
import { Table } from '../Table'
import { useUiMessages } from '../LocaleProvider'
import { ColumnMenu } from './ColumnMenu'
import type { DataTableLayout, DataTableProps } from './types'
import './DataTable.scss'

type PinOffsets = Record<string, number>

const columnLabel = <TData,>(column: Column<TData, unknown>) => {
  const header = column.columnDef.header
  return typeof header === 'string' ? header : column.id
}

/** Move `from` to the slot currently held by `to` (array-move semantics). */
const moveId = (order: string[], from: string, to: string) => {
  const next = order.filter((id) => id !== from)
  const fromIndex = order.indexOf(from)
  const toIndex = order.indexOf(to)
  next.splice(fromIndex < toIndex ? next.indexOf(to) + 1 : next.indexOf(to), 0, from)
  return next
}

/**
 * A data grid over `@tanstack/react-table` built from the design system's
 * `Table`, `Input`, `Dropdown`, `Pagination`, `Checkbox` and `Spinner`.
 *
 * - **Toolbar**: search, filter slot, column visibility menu.
 * - **Columns**: sort, pin to start/end, reorder by drag or menu, hide.
 * - **Footer**: range summary at the start; rows-per-page + pagination at the end.
 *
 * Client mode (default) sorts, filters and paginates `data` itself. Pass
 * `pagingData` / `onSort` / `onSearchChange` to drive any of those from a server.
 */
export function DataTable<TData>({
  columns,
  data,
  loading = false,
  emptyMessage: emptyMessageProp,
  getRowId,
  getSubRows,
  searchable = false,
  searchPlaceholder: searchPlaceholderProp,
  onSearchChange,
  filters,
  toolbarEnd,
  columnsToggle,
  columnMenu = true,
  reorderable = true,
  pinnable = true,
  initialState,
  onLayoutChange,
  pagination = false,
  pagingData,
  pageSizeOptions = [10, 25, 50],
  onPaginationChange,
  onPageSizeChange,
  onSort,
  selectable = false,
  onSelectChange,
}: DataTableProps<TData>) {
  const serverPaging = Boolean(pagingData)
  const clientPaging = pagination && !serverPaging
  const t = useUiMessages('dataTable')
  const emptyMessage = emptyMessageProp ?? t.empty
  const searchPlaceholder = searchPlaceholderProp ?? t.search
  const initialSort = initialState?.sorting

  const [sorting, setSorting] = useState<SortingState>(
    initialSort?.key && initialSort.order
      ? [{ id: initialSort.key, desc: initialSort.order === 'desc' }]
      : [],
  )
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(initialState?.columnOrder ?? [])
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: initialState?.columnPinning?.left ?? [],
    right: initialState?.columnPinning?.right ?? [],
  })
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialState?.columnVisibility ?? {},
  )
  const [expanded, setExpanded] = useState<ExpandedState>(initialState?.expanded ?? {})
  const isTree = Boolean(getSubRows)
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialState?.pageSize ?? pageSizeOptions[0] ?? 10,
  })

  const table = useReactTable({
    data,
    columns,
    getRowId,
    getSubRows,
    state: {
      // While searching a tree, open every branch so matches are visible.
      expanded: isTree && globalFilter ? true : expanded,
      sorting,
      rowSelection,
      globalFilter,
      columnOrder,
      columnPinning,
      columnVisibility,
      ...(clientPaging ? { pagination: paginationState } : {}),
    },
    onExpandedChange: setExpanded,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPaginationState,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: onSort ? undefined : getSortedRowModel(),
    getFilteredRowModel: onSearchChange ? undefined : getFilteredRowModel(),
    getPaginationRowModel: clientPaging ? getPaginationRowModel() : undefined,
    getExpandedRowModel: isTree ? getExpandedRowModel() : undefined,
    // Tree: a search hit keeps its ancestors. With client paging, pages count
    // top-level rows so a parent is never split from its children (the
    // pagination model expands each page; without it, expansion happens here).
    filterFromLeafRows: isTree,
    paginateExpandedRows: !(isTree && clientPaging),
    // First click always sorts ascending, numeric columns included.
    sortDescFirst: false,
    manualSorting: Boolean(onSort),
    manualFiltering: Boolean(onSearchChange),
    manualPagination: !clientPaging,
    enableRowSelection: selectable,
    enableColumnPinning: pinnable,
  })

  /* ------------------------------------------------------------ callbacks */
  useEffect(() => {
    if (!onSort) return
    const first = sorting[0]
    onSort(first ? { key: first.id, order: first.desc ? 'desc' : 'asc' } : { key: '', order: '' })
  }, [sorting, onSort])

  useEffect(() => {
    if (!onSelectChange) return
    onSelectChange(table.getSelectedRowModel().rows.map((r) => r.original))
  }, [rowSelection, onSelectChange, table])

  const layoutMounted = useRef(false)
  useEffect(() => {
    if (!layoutMounted.current) {
      layoutMounted.current = true
      return
    }
    const layout: DataTableLayout = {
      columnOrder: table.getAllLeafColumns().map((c) => c.id),
      columnPinning: { left: columnPinning.left ?? [], right: columnPinning.right ?? [] },
      columnVisibility,
    }
    onLayoutChange?.(layout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnOrder, columnPinning, columnVisibility])

  /* -------------------------------------------------------------- columns */
  const leftHeaders = table.getLeftFlatHeaders()
  const centerHeaders = table.getCenterFlatHeaders()
  const rightHeaders = table.getRightFlatHeaders()
  const orderedHeaders = [...leftHeaders, ...centerHeaders, ...rightHeaders]
  const visibleCount = orderedHeaders.length + (selectable ? 1 : 0)
  const hasLeftPins = leftHeaders.length > 0

  const fullOrder = () =>
    columnOrder.length ? columnOrder : table.getAllLeafColumns().map((c) => c.id)

  const moveColumn = useCallback(
    (from: string, to: string) => {
      if (from === to) return
      setColumnOrder((current) =>
        moveId(current.length ? current : table.getAllLeafColumns().map((c) => c.id), from, to),
      )
    },
    [table],
  )

  const moveBy = (id: string, direction: -1 | 1) => {
    const ids = centerHeaders.map((h) => h.column.id)
    const neighbour = ids[ids.indexOf(id) + direction]
    if (neighbour) moveColumn(id, neighbour)
  }

  /* ------------------------------------------------------- pinned offsets */
  const tableRef = useRef<HTMLTableElement>(null)
  const thRefs = useRef(new Map<string, HTMLTableCellElement>())
  const selectThRef = useRef<HTMLTableCellElement>(null)
  const [offsets, setOffsets] = useState<PinOffsets>({})
  const pinKey = `${(columnPinning.left ?? []).join()}|${(columnPinning.right ?? []).join()}|${fullOrder().join()}|${Object.keys(
    columnVisibility,
  )
    .filter((k) => columnVisibility[k] === false)
    .join()}`

  useLayoutEffect(() => {
    const measure = () => {
      const next: PinOffsets = {}
      let start = hasLeftPins && selectable ? (selectThRef.current?.offsetWidth ?? 0) : 0
      for (const h of leftHeaders) {
        next[h.column.id] = start
        start += thRefs.current.get(h.column.id)?.offsetWidth ?? 0
      }
      let end = 0
      for (const h of [...rightHeaders].reverse()) {
        next[h.column.id] = end
        end += thRefs.current.get(h.column.id)?.offsetWidth ?? 0
      }
      setOffsets((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next))
    }
    measure()
    if (typeof ResizeObserver === 'undefined' || !tableRef.current) return
    const observer = new ResizeObserver(measure)
    observer.observe(tableRef.current)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinKey, selectable, data])

  const pinProps = (column: Column<TData, unknown>) => {
    const side = column.getIsPinned()
    if (!side) return {}
    const isEdge =
      side === 'left' ? column.getIsLastColumn('left') : column.getIsFirstColumn('right')
    const style: CSSProperties =
      side === 'left'
        ? { insetInlineStart: offsets[column.id] ?? 0 }
        : { insetInlineEnd: offsets[column.id] ?? 0 }
    return {
      'data-pinned': side === 'left' ? 'start' : 'end',
      'data-pin-edge': isEdge || undefined,
      style,
    }
  }

  /* --------------------------------------------------------- drag & drop */
  const [dragId, setDragId] = useState<string | null>(null)
  const [dropId, setDropId] = useState<string | null>(null)

  const dragProps = (header: Header<TData, unknown>) => {
    if (!reorderable || header.column.getIsPinned()) return {}
    const id = header.column.id
    return {
      draggable: true,
      'data-dragging': dragId === id || undefined,
      'data-drop-target': (dropId === id && dragId !== id) || undefined,
      onDragStart: (e: DragEvent<HTMLTableCellElement>) => {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', id)
        setDragId(id)
      },
      onDragOver: (e: DragEvent<HTMLTableCellElement>) => {
        if (!dragId) return
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
        if (dropId !== id) setDropId(id)
      },
      onDrop: (e: DragEvent<HTMLTableCellElement>) => {
        e.preventDefault()
        if (dragId) moveColumn(dragId, id)
        setDragId(null)
        setDropId(null)
      },
      onDragEnd: () => {
        setDragId(null)
        setDropId(null)
      },
    }
  }

  /* ------------------------------------------------------------- paging */
  const filteredTotal = table.getPrePaginationRowModel().rows.length
  const pageIndex = serverPaging ? pagingData!.pageIndex : paginationState.pageIndex + 1
  const pageSize = serverPaging ? pagingData!.pageSize : paginationState.pageSize
  const total = serverPaging ? pagingData!.total : filteredTotal
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const rangeStart = total === 0 ? 0 : (pageIndex - 1) * pageSize + 1
  const rangeEnd = Math.min(total, pageIndex * pageSize)
  const showFooter = serverPaging || clientPaging

  const changePage = (page: number) => {
    if (serverPaging) onPaginationChange?.(page)
    else table.setPageIndex(page - 1)
  }
  const changePageSize = (size: number) => {
    if (!serverPaging) table.setPageSize(size)
    onPageSizeChange?.(size)
  }

  /* ------------------------------------------------------------ toolbar */
  const showToolbar = searchable || filters != null || toolbarEnd != null || columnsToggle === true
  const showColumnsToggle = columnsToggle ?? showToolbar
  const hideableColumns = table.getAllLeafColumns().filter((c) => c.getCanHide())
  const resetLayout = () => {
    setColumnOrder([])
    setColumnPinning({ left: [], right: [] })
    setColumnVisibility({})
  }

  const rows = table.getRowModel().rows

  return (
    <div className="dyl-data-table" data-loading={loading || undefined}>
      {showToolbar && (
        <div className="dyl-data-table__toolbar" role="toolbar" aria-label={t.controls}>
          {searchable && (
            <Input
              type="search"
              className="dyl-data-table__search"
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              prefix={<Icon as={TbIcons.TbSearch} size={16} aria-hidden />}
              value={globalFilter}
              onChange={(e) => {
                setGlobalFilter(e.target.value)
                onSearchChange?.(e.target.value)
              }}
            />
          )}
          {filters != null && <div className="dyl-data-table__filters">{filters}</div>}
          {(toolbarEnd != null || showColumnsToggle) && (
            <div className="dyl-data-table__toolbar-end">
              {toolbarEnd}
              {showColumnsToggle && hideableColumns.length > 0 && (
                <Dropdown
                  placement="bottom-end"
                  renderTitle={
                    <button type="button" className="dyl-data-table__columns-btn">
                      <Icon as={TbIcons.TbColumns3} size={16} aria-hidden />
                      {t.columns}
                    </button>
                  }
                >
                  {hideableColumns.map((column) => (
                    <Dropdown.Item
                      key={column.id}
                      eventKey={`col-${column.id}`}
                      onSelect={() => column.toggleVisibility()}
                    >
                      <Icon
                        as={column.getIsVisible() ? TbIcons.TbSquareCheck : TbIcons.TbSquare}
                        size={16}
                        className="dyl-data-table__menu-icon"
                        aria-hidden
                      />
                      {columnLabel(column)}
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Item variant="divider" />
                  <Dropdown.Item eventKey="reset-layout" onSelect={resetLayout}>
                    <Icon
                      as={TbIcons.TbRestore}
                      size={16}
                      className="dyl-data-table__menu-icon"
                      aria-hidden
                    />
                    {t.resetColumns}
                  </Dropdown.Item>
                </Dropdown>
              )}
            </div>
          )}
        </div>
      )}

      <Table hoverable ref={tableRef}>
        <Table.THead>
          <Table.Tr>
            {selectable && (
              <Table.Th
                ref={selectThRef}
                className="dyl-data-table__select-cell"
                data-pinned={hasLeftPins ? 'start' : undefined}
                style={hasLeftPins ? { insetInlineStart: 0 } : undefined}
              >
                <Checkbox
                  checked={table.getIsAllRowsSelected()}
                  indeterminate={table.getIsSomeRowsSelected()}
                  onChange={(checked) => table.toggleAllRowsSelected(checked)}
                  aria-label={t.selectAll}
                />
              </Table.Th>
            )}
            {orderedHeaders.map((header, headerIndex) => {
              const { column } = header
              const treeHeader = isTree && headerIndex === 0
              const canSort = column.getCanSort()
              const dir = column.getIsSorted()
              const label = columnLabel(column)
              const centerIds = centerHeaders.map((h) => h.column.id)
              const centerIndex = centerIds.indexOf(column.id)
              return (
                <Table.Th
                  key={header.id}
                  ref={(node) => {
                    if (node) thRefs.current.set(column.id, node)
                    else thRefs.current.delete(column.id)
                  }}
                  aria-sort={canSort ? (dir ? `${dir}ending` : 'none') : undefined}
                  className="dyl-data-table__th"
                  {...pinProps(column)}
                  {...dragProps(header)}
                >
                  <div className="dyl-data-table__th-inner">
                    {treeHeader && (
                      <button
                        type="button"
                        className="dyl-table__tree-toggle dyl-data-table__expand-all"
                        aria-expanded={table.getIsAllRowsExpanded()}
                        aria-label={table.getIsAllRowsExpanded() ? t.collapseAll : t.expandAll}
                        onClick={table.getToggleAllRowsExpandedHandler()}
                      >
                        <Icon as={TbIcons.TbChevronRight} size={14} aria-hidden />
                      </button>
                    )}
                    {canSort ? (
                      <button
                        type="button"
                        className="dyl-data-table__sorter"
                        onClick={column.getToggleSortingHandler()}
                      >
                        <span>
                          {header.isPlaceholder
                            ? null
                            : flexRender(column.columnDef.header, header.getContext())}
                        </span>
                        <Icon
                          as={
                            dir === 'asc'
                              ? TbIcons.TbArrowUp
                              : dir === 'desc'
                                ? TbIcons.TbArrowDown
                                : TbIcons.TbArrowsSort
                          }
                          size={14}
                          className="dyl-data-table__sort-icon"
                          data-active={dir ? true : undefined}
                          aria-hidden
                        />
                      </button>
                    ) : (
                      <span className="dyl-data-table__label">
                        {header.isPlaceholder
                          ? null
                          : flexRender(column.columnDef.header, header.getContext())}
                      </span>
                    )}
                    {column.getIsPinned() && (
                      <Icon
                        as={TbIcons.TbPinnedFilled}
                        size={12}
                        className="dyl-data-table__pin-icon"
                        aria-label={t.pinned}
                      />
                    )}
                    {columnMenu && (
                      <ColumnMenu
                        column={column}
                        label={label}
                        pinnable={pinnable}
                        canMoveStart={centerIndex > 0}
                        canMoveEnd={centerIndex >= 0 && centerIndex < centerIds.length - 1}
                        onMove={(direction) => moveBy(column.id, direction)}
                      />
                    )}
                  </div>
                </Table.Th>
              )
            })}
          </Table.Tr>
        </Table.THead>
        <Table.TBody>
          {rows.length === 0 ? (
            <Table.Tr>
              <Table.Td className="dyl-data-table__empty" colSpan={visibleCount}>
                {emptyMessage}
              </Table.Td>
            </Table.Tr>
          ) : (
            rows.map((row) => {
              const cells = [
                ...row.getLeftVisibleCells(),
                ...row.getCenterVisibleCells(),
                ...row.getRightVisibleCells(),
              ]
              return (
                <Table.Tr
                  key={row.id}
                  data-selected={row.getIsSelected() || undefined}
                  data-depth={isTree ? row.depth : undefined}
                >
                  {selectable && (
                    <Table.Td
                      className="dyl-data-table__select-cell"
                      data-pinned={hasLeftPins ? 'start' : undefined}
                      style={hasLeftPins ? { insetInlineStart: 0 } : undefined}
                    >
                      <Checkbox
                        checked={row.getIsSelected()}
                        onChange={(checked) => row.toggleSelected(checked)}
                        aria-label={t.selectRow(row.index + 1)}
                      />
                    </Table.Td>
                  )}
                  {cells.map((cell, cellIndex) =>
                    isTree && cellIndex === 0 ? (
                      <Table.TreeCell
                        key={cell.id}
                        level={row.depth}
                        expandable={row.getCanExpand()}
                        expanded={row.getIsExpanded()}
                        onToggle={row.getToggleExpandedHandler()}
                        toggleLabel={String(cell.getValue() ?? `row ${row.id}`)}
                        {...pinProps(cell.column)}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Table.TreeCell>
                    ) : (
                      <Table.Td key={cell.id} {...pinProps(cell.column)}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Table.Td>
                    ),
                  )}
                </Table.Tr>
              )
            })
          )}
        </Table.TBody>
      </Table>

      {loading && (
        <div className="dyl-data-table__overlay" aria-hidden>
          <Spinner size={28} />
        </div>
      )}

      {showFooter && (
        <div className="dyl-data-table__footer">
          <span className="dyl-data-table__range" aria-live="polite">
            {total === 0 ? t.noResults : t.range(rangeStart, rangeEnd, total)}
          </span>
          <div className="dyl-data-table__footer-end">
            <label className="dyl-data-table__page-size">
              {t.rowsPerPage}
              <select
                aria-label={t.rowsPerPage}
                value={pageSize}
                onChange={(e) => changePageSize(Number(e.target.value))}
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
            <span className="dyl-data-table__count">{t.page(pageIndex, totalPages)}</span>
            <Pagination
              currentPage={pageIndex}
              pageSize={pageSize}
              total={total}
              onChange={changePage}
            />
          </div>
        </div>
      )}
    </div>
  )
}
