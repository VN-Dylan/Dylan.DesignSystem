import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { ConfirmDialog } from './ConfirmDialog'

describe('ConfirmDialog', () => {
  it('renders a modal confirmation dialog', () => {
    render(
      <ConfirmDialog isOpen title="Delete" type="danger">
        <p>Are you sure?</p>
      </ConfirmDialog>,
    )
    expect(screen.getByRole('dialog', { name: 'Delete' })).toHaveAttribute('aria-modal', 'true')
    expect(screen.getByText('Are you sure?')).toBeInTheDocument()
  })

  it('fires cancel and confirm callbacks', async () => {
    const onCancel = vi.fn()
    const onConfirm = vi.fn()
    render(
      <ConfirmDialog isOpen title="Confirm" onCancel={onCancel} onConfirm={onConfirm}>
        <p>Continue?</p>
      </ConfirmDialog>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    await userEvent.click(screen.getByRole('button', { name: 'Confirm' }))
    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('passes button props to action buttons', () => {
    render(
      <ConfirmDialog
        isOpen
        title="Confirm"
        cancelButtonProps={{ disabled: true }}
        confirmButtonProps={{ children: 'Remove' }}
      />,
    )
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument()
  })

  it('forwards ref to the confirmation content element', () => {
    const ref = vi.fn()
    render(<ConfirmDialog isOpen title="Confirm" ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { baseElement } = render(
      <ConfirmDialog isOpen title="Confirm">
        <p>Continue?</p>
      </ConfirmDialog>,
    )
    expect(await axe(baseElement)).toHaveNoViolations()
  })
})
