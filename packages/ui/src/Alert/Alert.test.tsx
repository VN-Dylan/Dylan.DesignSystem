import { act } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Alert } from './Alert'

describe('Alert', () => {
  it('renders an alert with description', () => {
    render(<Alert>Saved successfully</Alert>)
    expect(screen.getByRole('alert')).toHaveTextContent('Saved successfully')
  })

  it('renders title and type state', () => {
    render(
      <Alert type="danger" title="Error">
        Failed to save
      </Alert>,
    )
    expect(screen.getByRole('alert')).toHaveAttribute('data-type', 'danger')
    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  it('renders default and custom icons', () => {
    const { rerender } = render(<Alert showIcon>Heads up</Alert>)
    expect(screen.getByRole('alert').querySelector('.dyl-alert__icon')).toBeInTheDocument()

    rerender(
      <Alert showIcon customIcon={<span data-testid="custom-icon" />}>
        Heads up
      </Alert>,
    )
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('closes and calls onClose when closable', async () => {
    const onClose = vi.fn()
    render(
      <Alert closable onClose={onClose}>
        Closable
      </Alert>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Close alert' }))
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('dismisses toast alerts after duration', () => {
    vi.useFakeTimers()
    render(
      <Alert triggerByToast duration={10}>
        Toast alert
      </Alert>,
    )
    expect(screen.getByRole('alert')).toBeInTheDocument()
    act(() => {
      vi.advanceTimersByTime(10)
    })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    vi.useRealTimers()
  })

  it('forwards ref to the alert element', () => {
    const ref = vi.fn()
    render(<Alert ref={ref}>Alert</Alert>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Alert showIcon closable title="Warning">
        Additional description
      </Alert>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
