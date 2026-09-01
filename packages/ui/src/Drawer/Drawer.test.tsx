import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Drawer } from './Drawer'

describe('Drawer', () => {
  it('renders nothing when closed', () => {
    render(
      <Drawer isOpen={false} aria-label="Panel">
        body
      </Drawer>,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders a modal dialog with placement', () => {
    render(
      <Drawer isOpen placement="left" aria-label="Nav">
        body
      </Drawer>,
    )
    const dialog = screen.getByRole('dialog', { name: 'Nav' })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('data-placement', 'left')
  })

  it('closes on Escape, backdrop and close button', async () => {
    const onClose = vi.fn()
    render(
      <Drawer isOpen onClose={onClose} title="Filters">
        body
      </Drawer>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Close drawer' }))
    expect(onClose).toHaveBeenCalledWith('button')
    await userEvent.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledWith('escape')
  })

  it('fires onOpen once', () => {
    const onOpen = vi.fn()
    const { rerender } = render(<Drawer isOpen={false} onOpen={onOpen} aria-label="X" />)
    rerender(<Drawer isOpen onOpen={onOpen} aria-label="X" />)
    expect(onOpen).toHaveBeenCalledOnce()
  })

  it('renders title and footer slots', () => {
    render(
      <Drawer isOpen title="Settings" footer={<span>Footer text</span>}>
        body
      </Drawer>,
    )
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Footer text')).toBeInTheDocument()
  })

  it('moves focus into the drawer on open and restores it on close', async () => {
    const user = userEvent.setup()
    function Harness() {
      const [open, setOpen] = useState(false)
      return (
        <>
          <button onClick={() => setOpen(true)}>Open</button>
          <Drawer isOpen={open} onClose={() => setOpen(false)} title="Filters">
            <button>Inside</button>
          </Drawer>
        </>
      )
    }
    render(<Harness />)
    const opener = screen.getByRole('button', { name: 'Open' })
    opener.focus()
    await user.click(opener)

    const dialog = screen.getByRole('dialog')
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true))

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(opener).toHaveFocus()
  })

  it('has no axe violations', async () => {
    const { baseElement } = render(
      <Drawer isOpen title="Filters">
        <p>Body</p>
      </Drawer>,
    )
    expect(await axe(baseElement)).toHaveNoViolations()
  })
})
