import { forwardRef } from 'react'
import { classNames } from '@dylan-ds/utils'
import type {
  TableCellProps,
  TableHeadCellProps,
  TableProps,
  TableRowProps,
  TableSectionProps,
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
          <span
            className="dyl-table__sorter-icon"
            data-direction={sortDirection || 'none'}
            aria-hidden
          >
            ▲▼
          </span>
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
export const Table = Object.assign(TableRoot, { THead, TBody, TFoot, Tr, Th, Td })
