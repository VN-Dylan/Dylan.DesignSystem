import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Reveal } from './Reveal'

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

const mockIntersectionObserver = () => {
  class TestIntersectionObserver {
    observe = () => undefined
    unobserve = () => undefined
    disconnect = () => undefined
    takeRecords = () => []
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: TestIntersectionObserver,
  })
  Object.defineProperty(globalThis, 'IntersectionObserver', {
    writable: true,
    value: TestIntersectionObserver,
  })
}

describe('Reveal', () => {
  beforeEach(() => {
    mockReducedMotion(false)
    mockIntersectionObserver()
  })

  afterEach(() => {
    mockReducedMotion(false)
  })

  it('renders its children', () => {
    render(<Reveal>Motion content</Reveal>)
    expect(screen.getByText('Motion content')).toBeInTheDocument()
  })

  it('supports the as prop', () => {
    const { container } = render(<Reveal as="section">Section content</Reveal>)
    expect(container.querySelector('section')).toHaveTextContent('Section content')
  })

  it('renders without transform or opacity styles when reduced motion is preferred', () => {
    mockReducedMotion(true)
    const { container } = render(<Reveal>Reduced content</Reveal>)
    const element = container.firstElementChild as HTMLElement
    expect(element.style.transform).toBe('')
    expect(element.style.opacity).toBe('')
  })

  it('has no axe violations', async () => {
    const { container } = render(<Reveal>Accessible content</Reveal>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
