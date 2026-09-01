import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Dialog } from './Dialog'

describe('Dialog', () => {
  it('renders nothing when closed', () => {
    render(
      <Dialog isOpen={false} aria-label="X">
        content
      </Dialog>,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders a modal dialog when open', () => {
    render(
      <Dialog isOpen aria-label="Settings">
        content
      </Dialog>,
    )
    const dialog = screen.getByRole('dialog', { name: 'Settings' })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  })

  it('fires onOpen once', () => {
    const onOpen = vi.fn()
    const { rerender } = render(<Dialog isOpen={false} onOpen={onOpen} aria-label="X" />)
    rerender(<Dialog isOpen onOpen={onOpen} aria-label="X" />)
    expect(onOpen).toHaveBeenCalledOnce()
  })

  it('closes on Escape and on close button', async () => {
    const onClose = vi.fn()
    render(
      <Dialog isOpen onClose={onClose} aria-label="X">
        content
      </Dialog>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Close dialog' }))
    expect(onClose).toHaveBeenCalledWith('button')
    await userEvent.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledWith('escape')
  })

  it('does not close on Escape when disabled', async () => {
    const onClose = vi.fn()
    render(
      <Dialog isOpen onClose={onClose} shouldCloseOnEsc={false} closable={false} aria-label="X">
        content
      </Dialog>,
    )
    await userEvent.keyboard('{Escape}')
    expect(onClose).not.toHaveBeenCalled()
  })

  it('moves focus into the dialog on open and restores it to the opener on close', async () => {
    const user = userEvent.setup()
    function Harness() {
      const [open, setOpen] = useState(false)
      return (
        <>
          <button onClick={() => setOpen(true)}>Open</button>
          <Dialog isOpen={open} onClose={() => setOpen(false)} aria-label="X">
            <button>Inside</button>
          </Dialog>
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
      <Dialog isOpen aria-labelledby="t">
        <h2 id="t">Title</h2>
        <p>Body</p>
      </Dialog>,
    )
    expect(await axe(baseElement)).toHaveNoViolations()
  })
})
