import { describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useControllableState } from './useControllableState'
import { useTimeOutMessage } from './useTimeOutMessage'
import { useDebounce } from './useDebounce'

describe('useControllableState', () => {
  it('manages state when uncontrolled', () => {
    const { result } = renderHook(() => useControllableState({ defaultValue: 'a' }))
    act(() => result.current[1]('b'))
    expect(result.current[0]).toBe('b')
  })

  it('defers to the controlled value and still fires onChange', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useControllableState({ value: 'x', defaultValue: 'a', onChange }),
    )
    act(() => result.current[1]('y'))
    expect(result.current[0]).toBe('x')
    expect(onChange).toHaveBeenCalledWith('y')
  })
})

describe('useTimeOutMessage', () => {
  it('clears the message after the interval', () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useTimeOutMessage(1000))
    act(() => result.current[1]('boom'))
    expect(result.current[0]).toBe('boom')
    act(() => vi.advanceTimersByTime(1000))
    expect(result.current[0]).toBe('')
    vi.useRealTimers()
  })
})

describe('useDebounce', () => {
  it('invokes only after the wait window', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const { result } = renderHook(() => useDebounce(fn, 200))
    act(() => {
      result.current('a')
      result.current('b')
    })
    expect(fn).not.toHaveBeenCalled()
    act(() => vi.advanceTimersByTime(200))
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('b')
    vi.useRealTimers()
  })
})
