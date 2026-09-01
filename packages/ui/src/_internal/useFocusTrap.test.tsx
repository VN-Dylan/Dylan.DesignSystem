import { useRef, useState } from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useFocusTrap } from './useFocusTrap'

/** A trap target that only mounts one tick after activation — mirrors a portal. */
function DeferredTrap() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [mounted, setMounted] = useState(false)

  useFocusTrap(ref, active)

  return (
    <div>
      <button
        onClick={() => {
          setActive(true)
          // node appears only on a later render
          setTimeout(() => setMounted(true), 0)
        }}
      >
        Open
      </button>
      {active && mounted && (
        <div ref={ref} tabIndex={-1} data-testid="trap">
          <button>Inside</button>
        </div>
      )}
    </div>
  )
}

describe('useFocusTrap', () => {
  it('activates once the node appears, even if it mounts after the effect runs', async () => {
    const user = userEvent.setup()
    render(<DeferredTrap />)
    const opener = screen.getByRole('button', { name: 'Open' })
    opener.focus()
    await user.click(opener)

    const trap = await screen.findByTestId('trap')
    await waitFor(() => expect(trap.contains(document.activeElement)).toBe(true))
  })

  it('restores focus to the previously focused element on deactivation', async () => {
    const user = userEvent.setup()
    function Harness() {
      const ref = useRef<HTMLDivElement>(null)
      const [active, setActive] = useState(false)
      useFocusTrap(ref, active)
      return (
        <div>
          <button onClick={() => setActive(true)}>Open</button>
          {active && (
            <div ref={ref} tabIndex={-1}>
              <button onClick={() => setActive(false)}>Close</button>
            </div>
          )}
        </div>
      )
    }
    render(<Harness />)
    const opener = screen.getByRole('button', { name: 'Open' })
    opener.focus()
    await user.click(opener)
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(opener).toHaveFocus()
  })
})
