import { beforeEach, describe, expect, it } from 'vitest'
import { act, render, renderHook, screen } from '@testing-library/react'
import { useAppendQueryParams } from './useAppendQueryParams'
import { useQueryParamPagingState } from './useQueryParamPagingState'
import { useDataTableState } from './useDataTableState'
import { withHeaderItem } from './withHeaderItem'

beforeEach(() => {
  window.history.replaceState(null, '', '/')
})

describe('useAppendQueryParams', () => {
  it('merges params, preserving existing ones', () => {
    window.history.replaceState(null, '', '/products?existing=value')
    const { result } = renderHook(() => useAppendQueryParams())
    act(() => result.current.onAppendQueryParams({ filter: 'new', page: 1 }))
    expect(window.location.search).toBe('?existing=value&filter=new&page=1')
  })

  it('override:true drops existing params', () => {
    window.history.replaceState(null, '', '/products?existing=value&page=3')
    const { result } = renderHook(() => useAppendQueryParams())
    act(() => result.current.onAppendQueryParams({ page: 1 }, { override: true }))
    expect(window.location.search).toBe('?page=1')
  })

  it('an empty value removes the key', () => {
    window.history.replaceState(null, '', '/x?q=hello')
    const { result } = renderHook(() => useAppendQueryParams())
    act(() => result.current.onAppendQueryParams({ q: '' }))
    expect(window.location.search).toBe('')
  })

  it('replace:true does not push a history entry', () => {
    const before = window.history.length
    const { result } = renderHook(() => useAppendQueryParams())
    act(() => result.current.onAppendQueryParams({ a: '1' }, { replace: true }))
    expect(window.history.length).toBe(before)
  })
})

describe('useQueryParamPagingState', () => {
  it('reads paging + filter state out of the URL', () => {
    window.history.replaceState(null, '', '/users?pageIndex=2&pageSize=20&status=active')
    const { result } = renderHook(() => useQueryParamPagingState())
    expect(result.current.pagingState.pageIndex).toBe(2)
    expect(result.current.pagingState.pageSize).toBe(20)
    expect(result.current.filterState).toEqual({ status: 'active' })
  })

  it('falls back to defaults, then reflects setQueryParams', () => {
    const { result } = renderHook(() => useQueryParamPagingState({ pageSize: 25 }))
    expect(result.current.pagingState.pageSize).toBe(25)
    act(() => result.current.setQueryParams({ pageIndex: 4 }))
    expect(result.current.pagingState.pageIndex).toBe(4)
    expect(window.location.search).toContain('pageIndex=4')
  })
})

describe('useDataTableState', () => {
  it('page-size change resets to page 1 and sort is captured', () => {
    const { result } = renderHook(() => useDataTableState<{ id: number }>())
    act(() => result.current.onPaginationChange(5))
    expect(result.current.tableData.pageIndex).toBe(5)
    act(() => result.current.onPageSizeChange(50))
    expect(result.current.tableData).toMatchObject({ pageSize: 50, pageIndex: 1 })
    act(() => result.current.onSort({ key: 'name', order: 'desc' }))
    expect(result.current.tableData).toMatchObject({ sortKey: 'name', sortOrder: 'desc' })
  })

  it('tracks and resets the selection', () => {
    const { result } = renderHook(() => useDataTableState<{ id: number }>())
    act(() => result.current.onSelectChange([{ id: 1 }, { id: 2 }]))
    expect(result.current.selectedRows).toHaveLength(2)
    act(() => result.current.resetSelection())
    expect(result.current.selectedRows).toHaveLength(0)
  })
})

describe('withHeaderItem', () => {
  it('wraps a component as a keyboard-operable button', async () => {
    const Label = ({ children }: { children?: React.ReactNode }) => <span>{children}</span>
    const Item = withHeaderItem(Label)
    let clicks = 0
    render(<Item onClick={() => (clicks += 1)}>Alerts</Item>)
    const btn = screen.getByRole('button', { name: 'Alerts' })
    expect(btn).toHaveClass('dyl-header-item', 'dyl-header-item--hoverable')
    act(() => btn.focus())
    act(() => btn.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })))
    expect(clicks).toBe(1)
  })
})
