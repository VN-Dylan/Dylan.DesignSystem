import { forwardRef } from 'react'
import { classNames } from '@vn-dylan/utils'
import { Icon, TbIcons } from '@vn-dylan/icons'
import type {
  TableCellProps,
  TableHeadCellProps,
  TableProps,
  TableRowProps,
  TableSectionProps,
  TableTreeCellProps,
} from './types'
import './Table.scss'

const THead = forwardRef<HTMLTableSectionElement, TableSectionProps>(function THead(
  { className, ...rest },
  ref,
) {
  return <thead ref={ref} className={classNames('dyl-table__head', className)} {...rest} />
})

const TBody = forwardRef<HTMLTableSectionElement, TableSectionProps>(function TBody(
  { className, ...rest },
  ref,
) {
  return <tbody ref={ref} className={classNames('dyl-table__body', className)} {...rest} />
})

const TFoot = forwardRef<HTMLTableSectionElement, TableSectionProps>(function TFoot(
  { className, ...rest },
  ref,
) {
  return <tfoot ref={ref} className={classNames('dyl-table__foot', className)} {...rest} />
})

const Tr = forwardRef<HTMLTableRowElement, TableRowProps>(function Tr({ className, ...rest }, ref) {
  return <tr ref={ref} className={classNames('dyl-table__row', className)} {...rest} />
})

const Th = forwardRef<HTMLTableCellElement, TableHeadCellProps>(function Th(
  { className, sortable, sortDirection = false, onSort, children, ...rest },
  ref,
) {
  return (
    <th
      ref={ref}
      className={classNames('dyl-table__th', sortable && 'dyl-table__th--sortable', className)}
      aria-sort={
        sortable ? (sortDirection === false ? 'none' : `${sortDirection}ending`) : undefined
      }
      {...rest}
    >
      {sortable ? (
        <button type="button" className="dyl-table__sorter" onClick={onSort}>
          <span>{children}</span>
          <Icon
            as={
              sortDirection === 'asc'
                ? TbIcons.TbArrowUp
                : sortDirection === 'desc'
                  ? TbIcons.TbArrowDown
                  : TbIcons.TbArrowsSort
            }
            size={14}
            className={classNames(
              'dyl-table__sorter-icon',
              sortDirection && 'dyl-table__sorter-icon--active',
            )}
            aria-hidden
          />
        </button>
      ) : (
        children
      )}
    </th>
  )
})

const Td = forwardRef<HTMLTableCellElement, TableCellProps>(function Td(
  { className, ...rest },
  ref,
) {
  return <td ref={ref} className={classNames('dyl-table__td', className)} {...rest} />
})

/**
 * A body cell for hierarchical rows: indents by `level` and renders the
 * expand/collapse toggle. Put it in the first column; the consumer decides
 * which child rows to render.
 */
const TreeCell = forwardRef<HTMLTableCellElement, TableTreeCellProps>(function TreeCell(
  {
    level = 0,
    expandable = false,
    expanded = false,
    onToggle,
    toggleLabel = 'row',
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  return (
    <td
      ref={ref}
      className={classNames('dyl-table__td', 'dyl-table__tree-cell', className)}
      style={{ ...style, ['--dyl-tree-level' as string]: level }}
      {...rest}
    >
      <div className="dyl-table__tree">
        {expandable ? (
          <button
            type="button"
            className="dyl-table__tree-toggle"
            aria-expanded={expanded}
            aria-label={`${expanded ? 'Collapse' : 'Expand'} ${toggleLabel}`}
            onClick={onToggle}
          >
            <Icon as={TbIcons.TbChevronRight} size={14} aria-hidden />
          </button>
        ) : (
          <span className="dyl-table__tree-spacer" aria-hidden />
        )}
        <div className="dyl-table__tree-content">{children}</div>
      </div>
    </td>
  )
})

const TableRoot = forwardRef<HTMLTableElement, TableProps>(function Table(
  { compact = false, borderless = false, hoverable = false, className, ...rest },
  ref,
) {
  return (
    <div className="dyl-table-wrap">
      <table
        ref={ref}
        className={classNames('dyl-table', className)}
        data-compact={compact || undefined}
        data-borderless={borderless || undefined}
        data-hoverable={hoverable || undefined}
        {...rest}
      />
    </div>
  )
})

/**
 * Styled semantic table primitives. For data-grid behaviour (client/server
 * pagination, column defs, selection) use `DataTable` instead.
 */
export const Table = Object.assign(TableRoot, { THead, TBody, TFoot, Tr, Th, Td, TreeCell })
