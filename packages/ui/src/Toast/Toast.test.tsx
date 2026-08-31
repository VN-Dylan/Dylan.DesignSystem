import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Toaster } from './Toaster'
import { Notification } from './Notification'
import { toast } from './store'

afterEach(() => {
  act(() => toast.removeAll())
})

describe('toast + Toaster', () => {
  it('renders a pushed notification', () => {
    render(<Toaster />)
    act(() => {
      toast.push(<Notification title="Hi">Body</Notification>, { duration: 0 })
    })
    expect(screen.getByText('Hi')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
  })

  it('auto-dismisses after the duration', () => {
    vi.useFakeTimers()
    render(<Toaster />)
    act(() => {
      toast.push(<Notification>Temporary</Notification>, { duration: 1000 })
    })
    expect(screen.getByText('Temporary')).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(1000))
    expect(screen.queryByText('Temporary')).not.toBeInTheDocument()
    vi.useRealTimers()
  })

  it('groups toasts by placement', () => {
    render(<Toaster />)
    act(() => {
      toast.push(<Notification>A</Notification>, { duration: 0, placement: 'bottom-center' })
    })
    expect(screen.getByText('A').closest('.dyl-toast')).toHaveAttribute(
      'data-placement',
      'bottom-center',
    )
  })

  it('removes a toast via the Notification close button', async () => {
    render(<Toaster />)
    act(() => {
      const id = toast.push(
        <Notification onClose={() => toast.remove(id)}>Closable</Notification>,
        { duration: 0 },
      )
    })
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }))
    expect(screen.queryByText('Closable')).not.toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { baseElement } = render(<Toaster />)
    act(() => {
      toast.push(
        <Notification title="Saved" type="success">
          Done
        </Notification>,
        { duration: 0 },
      )
    })
    expect(await axe(baseElement)).toHaveNoViolations()
  })
})
