import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('renders page buttons from total and pageSize', () => {
    render(<Pagination total={10} pageSize={2} />)
    expect(screen.getByRole('button', { name: 'Page 5' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page')
  })

  it('calls onChange when a page is selected', async () => {
    const onChange = vi.fn()
    render(<Pagination total={10} pageSize={2} onChange={onChange} />)

    await userEvent.click(screen.getByRole('button', { name: 'Page 3' }))
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('supports controlled current page', () => {
    render(<Pagination total={10} pageSize={2} currentPage={4} />)
    expect(screen.getByRole('button', { name: 'Page 4' })).toHaveAttribute('aria-current', 'page')
  })

  it('displays totals when requested', () => {
    render(<Pagination displayTotal total={25} />)
    expect(screen.getByText('Total 25 items')).toBeInTheDocument()
  })

  it('moves with previous and next buttons', async () => {
    const onChange = vi.fn()
    render(<Pagination total={5} currentPage={2} onChange={onChange} />)

    await userEvent.click(screen.getByRole('button', { name: 'Previous page' }))
    await userEvent.click(screen.getByRole('button', { name: 'Next page' }))
    expect(onChange).toHaveBeenCalledWith(1)
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('forwards ref to the pagination nav', () => {
    const ref = vi.fn()
    render(<Pagination ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<Pagination displayTotal total={50} currentPage={5} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
