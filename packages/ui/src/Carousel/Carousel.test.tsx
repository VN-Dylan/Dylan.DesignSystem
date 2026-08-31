import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Carousel } from './Carousel'
import type { CarouselApi } from './types'

const Slides = ({ n = 3 }: { n?: number }) => (
  <Carousel.Content>
    {Array.from({ length: n }, (_, i) => (
      <Carousel.Item key={i}>Slide {i + 1}</Carousel.Item>
    ))}
  </Carousel.Content>
)

describe('Carousel', () => {
  it('renders slides with carousel semantics', () => {
    render(
      <Carousel>
        <Slides />
      </Carousel>,
    )
    expect(screen.getByRole('region')).toHaveAttribute('aria-roledescription', 'carousel')
    const slides = screen.getAllByRole('group')
    expect(slides).toHaveLength(3)
    expect(slides[0]).toHaveAttribute('aria-roledescription', 'slide')
  })

  it('advances with the Next control and disables at the ends', async () => {
    render(
      <Carousel>
        <Slides n={2} />
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel>,
    )
    const prev = screen.getByRole('button', { name: 'Previous slide' })
    const next = screen.getByRole('button', { name: 'Next slide' })
    expect(prev).toBeDisabled()
    await userEvent.click(next)
    expect(next).toBeDisabled()
    expect(prev).toBeEnabled()
  })

  it('exposes an imperative API via setApi', async () => {
    let api: CarouselApi | undefined
    render(
      <Carousel setApi={(a) => (api = a)}>
        <Slides n={3} />
      </Carousel>,
    )
    expect(api?.count).toBe(3)
    expect(api?.selectedIndex).toBe(0)
  })

  it('wraps around when loop is set', async () => {
    render(
      <Carousel opts={{ loop: true }}>
        <Slides n={2} />
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel>,
    )
    const prev = screen.getByRole('button', { name: 'Previous slide' })
    expect(prev).toBeEnabled()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Carousel>
        <Slides />
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
