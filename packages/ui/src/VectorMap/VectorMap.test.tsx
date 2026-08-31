import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'

const { ctor, destroy } = vi.hoisted(() => {
  const destroy = vi.fn()
  const ctor = vi.fn(function MockMap(this: unknown) {
    return { destroy }
  })
  return { ctor, destroy }
})
vi.mock('jsvectormap', () => ({ default: ctor }))
vi.mock('jsvectormap/dist/maps/world.js', () => ({}))

import { VectorMap } from './VectorMap'

describe('VectorMap', () => {
  it('instantiates jsvectormap with the map name and series', () => {
    render(<VectorMap map="world" data={{ US: 10, GB: 5 }} aria-label="Sales map" />)
    expect(ctor).toHaveBeenCalledTimes(1)
    const opts = ctor.mock.calls[0]![0] as Record<string, unknown>
    expect(opts.map).toBe('world')
    expect(opts.series).toBeDefined()
  })

  it('exposes an accessible label', () => {
    render(<VectorMap aria-label="Sales map" />)
    expect(screen.getByRole('img', { name: 'Sales map' })).toBeInTheDocument()
  })

  it('destroys the instance on unmount', () => {
    const { unmount } = render(<VectorMap />)
    unmount()
    expect(destroy).toHaveBeenCalled()
  })

  it('has no axe violations', async () => {
    const { container } = render(<VectorMap aria-label="Map" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
