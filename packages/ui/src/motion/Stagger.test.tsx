import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Stagger } from './Stagger'

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

const Items = () => (
  <>
    <Stagger.Item>First item</Stagger.Item>
    <Stagger.Item>Second item</Stagger.Item>
  </>
)

describe('Stagger', () => {
  beforeEach(() => {
    mockReducedMotion(false)
    mockIntersectionObserver()
  })

  afterEach(() => {
    mockReducedMotion(false)
  })

  it('renders its children', () => {
    render(
      <Stagger>
        <Items />
      </Stagger>,
    )
    expect(screen.getByText('First item')).toBeInTheDocument()
    expect(screen.getByText('Second item')).toBeInTheDocument()
  })

  it('supports the as prop on the root and items', () => {
    const { container } = render(
      <Stagger as="ul">
        <Stagger.Item as="li">List item</Stagger.Item>
      </Stagger>,
    )
    expect(container.querySelector('ul')).toBeInTheDocument()
    expect(container.querySelector('li')).toHaveTextContent('List item')
  })

  it('renders without transform or opacity styles when reduced motion is preferred', () => {
    mockReducedMotion(true)
    const { container } = render(
      <Stagger>
        <Stagger.Item>Reduced item</Stagger.Item>
      </Stagger>,
    )
    const root = container.firstElementChild as HTMLElement
    const item = screen.getByText('Reduced item') as HTMLElement
    expect(root.style.transform).toBe('')
    expect(root.style.opacity).toBe('')
    expect(item.style.transform).toBe('')
    expect(item.style.opacity).toBe('')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Stagger>
        <Items />
      </Stagger>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
