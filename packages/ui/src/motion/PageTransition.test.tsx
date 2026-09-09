import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { PageTransition } from './PageTransition'

const mockReducedMotion = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    }),
  })
}

describe('PageTransition', () => {
  beforeEach(() => {
    mockReducedMotion(false)
  })

  afterEach(() => {
    mockReducedMotion(false)
  })

  it('renders its children', () => {
    render(<PageTransition transitionKey="home">Route content</PageTransition>)
    expect(screen.getByText('Route content')).toBeInTheDocument()
  })

  it('updates the keyed root when transitionKey changes', () => {
    const { container, rerender } = render(
      <PageTransition transitionKey="home">Home content</PageTransition>,
    )
    const firstRoot = container.firstElementChild
    rerender(<PageTransition transitionKey="settings">Settings content</PageTransition>)
    expect(container.firstElementChild).not.toBe(firstRoot)
    expect(screen.getByText('Settings content')).toBeInTheDocument()
  })

  it('renders without transform or opacity styles when reduced motion is preferred', () => {
    mockReducedMotion(true)
    const { container } = render(
      <PageTransition transitionKey="reduced">Reduced route</PageTransition>,
    )
    const element = container.firstElementChild as HTMLElement
    expect(element.style.transform).toBe('')
    expect(element.style.opacity).toBe('')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <PageTransition transitionKey="accessible">Accessible route</PageTransition>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
