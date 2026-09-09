import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { GuestSelector } from './GuestSelector'

describe('GuestSelector', () => {
  it('shows the placeholder initially and a summary after change', async () => {
    const user = userEvent.setup()
    render(<GuestSelector />)

    expect(screen.getByRole('button', { name: /Add guests/ })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Add guests/ }))
    const children = screen.getByRole('group', { name: 'Children' })
    await user.click(within(children).getByRole('button', { name: 'Increase value' }))

    expect(screen.getByRole('button', { name: /2 guests · 1 room/ })).toBeInTheDocument()
  })

  it('opens the popover with a stepper for each category', async () => {
    const user = userEvent.setup()
    render(<GuestSelector />)

    await user.click(screen.getByRole('button', { name: /Add guests/ }))

    expect(screen.getByRole('dialog', { name: 'Guest selector' })).toBeInTheDocument()
    expect(screen.getAllByLabelText(/controls$/)).toHaveLength(4)
  })

  it('respects category max and totalMax for increment buttons', async () => {
    const user = userEvent.setup()
    render(
      <GuestSelector
        totalMax={2}
        categories={[
          { key: 'adults', label: 'Adults', min: 1, max: 2 },
          { key: 'children', label: 'Children', max: 2 },
        ]}
      />,
    )

    await user.click(screen.getByRole('button', { name: /Add guests/ }))
    const adults = screen.getByRole('group', { name: 'Adults' })
    const children = screen.getByRole('group', { name: 'Children' })

    await user.click(within(adults).getByRole('button', { name: 'Increase value' }))

    expect(within(adults).getByRole('button', { name: 'Increase value' })).toBeDisabled()
    expect(within(children).getByRole('button', { name: 'Increase value' })).toBeDisabled()
  })

  it('respects category min for decrement buttons', async () => {
    const user = userEvent.setup()
    render(<GuestSelector />)

    await user.click(screen.getByRole('button', { name: /Add guests/ }))
    const adults = screen.getByRole('group', { name: 'Adults' })

    expect(within(adults).getByRole('button', { name: 'Decrease value' })).toBeDisabled()
  })

  it('fires onChange with updated counts', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<GuestSelector onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: /Add guests/ }))
    await user.click(
      within(screen.getByRole('group', { name: 'Children' })).getByRole('button', {
        name: 'Increase value',
      }),
    )

    expect(onChange).toHaveBeenCalledWith({ adults: 1, children: 1, infants: 0, rooms: 1 })
  })

  it('closes with Done and Escape', async () => {
    const user = userEvent.setup()
    render(<GuestSelector />)

    await user.click(screen.getByRole('button', { name: /Add guests/ }))
    await user.click(screen.getByRole('button', { name: 'Done' }))
    expect(screen.queryByRole('dialog', { name: 'Guest selector' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Add guests/ }))
    expect(screen.getByRole('dialog', { name: 'Guest selector' })).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog', { name: 'Guest selector' })).not.toBeInTheDocument()
  })

  it('forwards ref to the trigger wrapper', () => {
    const ref = vi.fn()
    render(<GuestSelector ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations when closed and open', async () => {
    const { baseElement, container } = render(<GuestSelector />)
    expect(await axe(container)).toHaveNoViolations()

    await userEvent.click(screen.getByRole('button', { name: /Add guests/ }))
    expect(await axe(baseElement)).toHaveNoViolations()
  })
})
