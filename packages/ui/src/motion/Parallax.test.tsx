import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Parallax } from './Parallax'

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

describe('Parallax', () => {
  beforeEach(() => {
    mockReducedMotion(false)
  })

  afterEach(() => {
    mockReducedMotion(false)
  })

  it('renders its children', () => {
    render(<Parallax>Floating content</Parallax>)
    expect(screen.getByText('Floating content')).toBeInTheDocument()
  })

  it('renders a div root', () => {
    const { container } = render(<Parallax>Parallax content</Parallax>)
    expect(container.firstElementChild?.tagName).toBe('DIV')
  })

  it('renders without transform or opacity styles when reduced motion is preferred', () => {
    mockReducedMotion(true)
    const { container } = render(<Parallax>Reduced parallax</Parallax>)
    const element = container.firstElementChild as HTMLElement
    expect(element.style.transform).toBe('')
    expect(element.style.opacity).toBe('')
  })

  it('has no axe violations', async () => {
    const { container } = render(<Parallax>Accessible parallax</Parallax>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
