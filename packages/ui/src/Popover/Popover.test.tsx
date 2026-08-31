import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Popover } from './Popover'

describe('Popover', () => {
  it('opens on click and closes on outside click', async () => {
    render(
      <div>
        <Popover title="Details">
          <p>Popover content</p>
        </Popover>
        <button type="button">Outside</button>
      </div>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Details' }))
    expect(await screen.findByText('Popover content')).toBeInTheDocument()
    expect(document.querySelector('[role="dialog"]')).toHaveAttribute('aria-label', 'Details')
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }))
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
  })

  it('supports controlled open state callbacks', async () => {
    const onOpenChange = vi.fn()
    render(
      <Popover title="Details" open={false} onOpenChange={onOpenChange}>
        <p>Popover content</p>
      </Popover>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Details' }))
    expect(onOpenChange).toHaveBeenCalledWith(true)
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
  })

  it('supports hover trigger', async () => {
    render(
      <Popover title="Hover details" trigger="hover">
        <p>Hover content</p>
      </Popover>,
    )
    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Hover details' }))
    expect(await screen.findByText('Hover content')).toBeInTheDocument()
  })

  it('forwards ref to the popover panel', async () => {
    const ref = vi.fn()
    render(
      <Popover ref={ref} title="Details" open>
        <p>Popover content</p>
      </Popover>,
    )
    expect(await screen.findByText('Popover content')).toBeInTheDocument()
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { baseElement } = render(
      <Popover title="Details" open>
        <p>Popover content</p>
      </Popover>,
    )
    await screen.findByText('Popover content')
    expect(await axe(baseElement)).toHaveNoViolations()
  })
})
