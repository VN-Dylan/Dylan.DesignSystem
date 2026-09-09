import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Rating } from './Rating'

describe('Rating', () => {
  it('renders max stars', () => {
    render(<Rating max={7} aria-label="Rating" />)
    expect(screen.getAllByRole('radio')).toHaveLength(7)
  })

  it('commits a clicked value and fires onChange once', async () => {
    const onChange = vi.fn()
    render(<Rating onChange={onChange} aria-label="Rating" />)

    await userEvent.click(screen.getByRole('radio', { name: '3 stars' }))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(3)
    expect(screen.getByRole('radio', { name: '3 stars' })).toHaveAttribute('aria-checked', 'true')
  })

  it('clears when clicking the current value', async () => {
    const onChange = vi.fn()
    render(<Rating defaultValue={3} onChange={onChange} aria-label="Rating" />)

    await userEvent.click(screen.getByRole('radio', { name: '3 stars' }))

    expect(onChange).toHaveBeenCalledWith(0)
    expect(screen.getByRole('radio', { name: '1 stars' })).toHaveAttribute('aria-checked', 'false')
  })

  it('changes value with keyboard arrows', async () => {
    const onChange = vi.fn()
    render(<Rating defaultValue={2} onChange={onChange} aria-label="Rating" />)

    screen.getByRole('radio', { name: '2 stars' }).focus()
    await userEvent.keyboard('{ArrowRight}')

    expect(onChange).toHaveBeenCalledWith(3)
    expect(screen.getByRole('radio', { name: '3 stars' })).toHaveFocus()
  })

  it('renders readOnly without a radiogroup or tab stop', () => {
    render(<Rating value={3.5} max={5} readOnly />)

    expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument()
    expect(screen.getByRole('img', { name: '3.5 out of 5' })).toBeInTheDocument()
    expect(screen.queryAllByRole('radio')).toHaveLength(0)
  })

  it('forwards ref to the root', () => {
    const ref = vi.fn()
    render(<Rating ref={ref} aria-label="Rating" />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement))
  })

  it('uses a half-step for allowHalf keyboard changes', async () => {
    const onChange = vi.fn()
    render(<Rating defaultValue={2} allowHalf onChange={onChange} aria-label="Rating" />)

    screen.getByRole('radio', { name: '2 stars' }).focus()
    await userEvent.keyboard('{ArrowRight}')

    expect(onChange).toHaveBeenCalledWith(2.5)
  })

  it('has no axe violations', async () => {
    const { container } = render(<Rating defaultValue={3} aria-label="Rating" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
