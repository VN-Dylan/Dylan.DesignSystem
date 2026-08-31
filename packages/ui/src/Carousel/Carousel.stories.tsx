import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Carousel } from './Carousel'
import type { CarouselApi } from './types'

const meta = {
  title: 'Data Display/Carousel',
  component: Carousel,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

const Slide = ({ n }: { n: number }) => (
  <div className="flex h-40 items-center justify-center bg-surface-sunken text-3xl font-bold text-content-muted">
    {n}
  </div>
)

export const Basic: Story = {
  render: () => (
    <Carousel>
      <div className="flex items-center gap-3">
        <Carousel.Previous />
        <Carousel.Content>
          {[1, 2, 3, 4].map((n) => (
            <Carousel.Item key={n}>
              <Slide n={n} />
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.Next />
      </div>
    </Carousel>
  ),
}

export const Loop: Story = {
  render: () => (
    <Carousel opts={{ loop: true }}>
      <Carousel.Content>
        {[1, 2, 3].map((n) => (
          <Carousel.Item key={n}>
            <Slide n={n} />
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <div className="mt-3 flex justify-center gap-2">
        <Carousel.Previous />
        <Carousel.Next />
      </div>
    </Carousel>
  ),
}

export const WithApi: Story = {
  render: () => {
    const Demo = () => {
      const [api, setApi] = useState<CarouselApi | null>(null)
      return (
        <Carousel setApi={setApi} opts={{ startIndex: 1 }}>
          <Carousel.Content>
            {[1, 2, 3].map((n) => (
              <Carousel.Item key={n}>
                <Slide n={n} />
              </Carousel.Item>
            ))}
          </Carousel.Content>
          <p className="mt-2 text-center text-sm text-content-muted">
            Slide {(api?.selectedIndex ?? 0) + 1} of {api?.count ?? 0}
          </p>
        </Carousel>
      )
    }
    return <Demo />
  },
}
