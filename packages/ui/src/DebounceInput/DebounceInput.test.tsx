import { describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { DebounceInput } from './DebounceInput'

describe('DebounceInput', () => {
  it('debounces onChange until wait elapses', async () => {
    vi.useFakeTimers()
    const onChange = vi.fn()
    try {
      render(<DebounceInput aria-label="Search" wait={500} onChange={onChange} />)

      fireEvent.change(screen.getByRole('textbox', { name: 'Search' }), {
        target: { value: 'abc' },
      })
      expect(onChange).not.toHaveBeenCalled()

      act(() => vi.advanceTimersByTime(500))
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange.mock.calls[0]?.[0].target).toHaveValue('abc')
    } finally {
      vi.useRealTimers()
    }
  })

  it('supports textarea mode', () => {
    render(<DebounceInput textArea aria-label="Message" />)
    expect(screen.getByRole('textbox', { name: 'Message' }).tagName).toBe('TEXTAREA')
  })

  it('forwards ref to the input element', () => {
    const ref = vi.fn()
    render(<DebounceInput aria-label="Search" ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<DebounceInput aria-label="Search" prefix="Q" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
