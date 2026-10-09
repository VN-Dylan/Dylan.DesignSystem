import { act, renderHook } from '@testing-library/react'
import { breakpoints } from '@vn-dylan/tokens'
import { renderToString } from 'react-dom/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useBreakpoint } from './useBreakpoint'
import { useMediaQuery } from './useMediaQuery'

type Listener = (event: MediaQueryListEvent) => void

const installMatchMedia = (initialWidth: number) => {
  let width = initialWidth
  const listeners = new Map<string, Set<Listener>>()
  const matches = (query: string) => width >= Number(query.match(/\d+/)?.[0] ?? 0)

  window.matchMedia = vi.fn((query: string) => ({
    media: query,
    matches: matches(query),
    onchange: null,
    addEventListener: (_type: string, listener: Listener) => {
      const queryListeners = listeners.get(query) ?? new Set<Listener>()
      queryListeners.add(listener)
      listeners.set(query, queryListeners)
    },
    removeEventListener: (_type: string, listener: Listener) =>
      listeners.get(query)?.delete(listener),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))

  return (nextWidth: number) => {
    width = nextWidth
    listeners.forEach((queryListeners, query) => {
      queryListeners.forEach((listener) =>
        listener({ matches: matches(query), media: query } as MediaQueryListEvent),
      )
    })
  }
}

describe('layout hooks', () => {
  beforeEach(() => installMatchMedia(500))
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('uses the default value during SSR without reading window', () => {
    const Probe = () =>
      String(useMediaQuery(`(min-width: ${breakpoints.md}px)`, { defaultValue: true }))
    vi.stubGlobal('window', undefined)
    expect(renderToString(<Probe />)).toContain('true')
  })

  it('subscribes to matchMedia changes', () => {
    const setWidth = installMatchMedia(500)
    const { result } = renderHook(() => useMediaQuery(`(min-width: ${breakpoints.md}px)`))
    expect(result.current).toBe(false)

    act(() => setWidth(900))
    expect(result.current).toBe(true)
  })

  it('returns the active breakpoint and up/down helpers', () => {
    const setWidth = installMatchMedia(800)
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current.active).toBe('md')
    expect(result.current.up('sm')).toBe(true)
    expect(result.current.down('lg')).toBe(true)

    act(() => setWidth(1300))
    expect(result.current.active).toBe('xl')
    expect(result.current.down('lg')).toBe(false)
  })
})
