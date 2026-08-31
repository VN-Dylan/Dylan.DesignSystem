import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  it('opens on hover and closes on unhover', async () => {
    render(
      <Tooltip title="Helpful hint">
        <button type="button">Hover me</button>
      </Tooltip>,
    )
    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Hover me' }).parentElement!)
    expect(await screen.findByText('Helpful hint')).toHaveAttribute('role', 'tooltip')
    fireEvent.mouseLeave(screen.getByRole('button', { name: 'Hover me' }).parentElement!)
    expect(screen.queryByText('Helpful hint')).not.toBeInTheDocument()
  })

  it('honors disabled', async () => {
    render(
      <Tooltip disabled title="Hidden">
        <button type="button">Hover me</button>
      </Tooltip>,
    )
    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Hover me' }).parentElement!)
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
  })

  it('supports default open state', async () => {
    render(
      <Tooltip open title="Visible">
        <button type="button">Target</button>
      </Tooltip>,
    )
    expect(await screen.findByText('Visible')).toHaveAttribute('role', 'tooltip')
  })

  it('forwards ref to the wrapper element', () => {
    const ref = vi.fn()
    render(
      <Tooltip ref={ref} title="X">
        <button type="button">Target</button>
      </Tooltip>,
    )
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Tooltip title="Accessible hint">
        <button type="button">Target</button>
      </Tooltip>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
