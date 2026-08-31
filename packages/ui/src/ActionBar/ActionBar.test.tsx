import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { ActionBar } from './ActionBar'

describe('ActionBar', () => {
  it('renders nothing when closed', () => {
    render(
      <ActionBar open={false}>
        <button>Delete</button>
      </ActionBar>,
    )
    expect(screen.queryByRole('region', { name: 'Actions' })).not.toBeInTheDocument()
  })

  it('renders its actions when open', () => {
    render(
      <ActionBar open>
        <button>Delete</button>
      </ActionBar>,
    )
    expect(screen.getByRole('region', { name: 'Actions' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
  })

  it('closes on Escape', async () => {
    const onOpenChange = vi.fn()
    render(
      <ActionBar open onOpenChange={onOpenChange}>
        <button>Delete</button>
      </ActionBar>,
    )
    await userEvent.keyboard('{Escape}')
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('does not close on Escape when disabled', async () => {
    const onOpenChange = vi.fn()
    render(
      <ActionBar open shouldCloseOnEsc={false} onOpenChange={onOpenChange}>
        <button>Delete</button>
      </ActionBar>,
    )
    await userEvent.keyboard('{Escape}')
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it('applies an explicit width', () => {
    render(
      <ActionBar open width={480}>
        <button>Delete</button>
      </ActionBar>,
    )
    expect(screen.getByRole('region').firstChild).toHaveStyle({ width: '480px' })
  })

  it('has no axe violations', async () => {
    const { baseElement } = render(
      <ActionBar open>
        <button type="button">Delete</button>
      </ActionBar>,
    )
    expect(await axe(baseElement)).toHaveNoViolations()
  })
})
