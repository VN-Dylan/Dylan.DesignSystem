import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'

const { importMaplibre } = vi.hoisted(() => ({
  importMaplibre: vi.fn(),
}))

vi.mock('maplibre-gl', () => {
  importMaplibre()
  return {
    Map: vi.fn(),
    Marker: vi.fn(),
    Popup: vi.fn(),
  }
})

import { MapView } from './MapView'

describe('MapView', () => {
  it('renders the fallback when no styleUrl is available', () => {
    render(<MapView center={[0, 0]} />)
    expect(screen.getByText('Map unavailable')).toBeInTheDocument()
  })

  it('renders the region role and aria-label', () => {
    render(<MapView center={[0, 0]} aria-label="Search area map" />)
    expect(screen.getByRole('region', { name: 'Search area map' })).toBeInTheDocument()
  })

  it('renders the screen-reader marker list', () => {
    render(
      <MapView
        center={[0, 0]}
        markers={[
          { id: 'Apartment A', lng: 1, lat: 2 },
          { id: 'Apartment B', lng: 3, lat: 4 },
        ]}
      />,
    )
    expect(screen.getByText('Apartment A')).toBeInTheDocument()
    expect(screen.getByText('Apartment B')).toBeInTheDocument()
  })

  it('forwards ref to the container div', () => {
    const ref = vi.fn()
    render(<MapView ref={ref} center={[0, 0]} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('does not import maplibre when no styleUrl is available', () => {
    render(<MapView center={[0, 0]} />)
    expect(importMaplibre).not.toHaveBeenCalled()
  })

  it('has no axe violations in the fallback state', async () => {
    const { container } = render(<MapView center={[0, 0]} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
