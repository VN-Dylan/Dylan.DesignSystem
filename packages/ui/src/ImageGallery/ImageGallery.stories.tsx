import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../Button'
import { ImageGallery } from './ImageGallery'
import type { ImageGalleryItem } from './types'

// Local illustrations served from `.storybook/public` — no network, so the
// visual snapshots are deterministic. Relative URL works under any base path.
const fixture = (name: string) => `fixtures/gallery/${name}.svg`

const images: ImageGalleryItem[] = [
  {
    src: fixture('lounge-hills'),
    thumbnail: fixture('lounge-hills'),
    alt: 'Lounge with a view of green hills',
    caption: 'Main lounge overlooking the valley.',
  },
  {
    src: fixture('pool-dusk'),
    thumbnail: fixture('pool-dusk'),
    alt: 'Hotel pool at dusk',
    caption: 'Pool deck with evening service.',
  },
  {
    src: fixture('bedroom'),
    thumbnail: fixture('bedroom'),
    alt: 'Apartment bedroom with white linen',
    caption: 'Primary bedroom with city views.',
  },
  {
    src: fixture('dining'),
    thumbnail: fixture('dining'),
    alt: 'Open plan dining room',
  },
  {
    src: fixture('kitchen'),
    thumbnail: fixture('kitchen'),
    alt: 'Kitchen with marble island',
  },
  {
    src: fixture('reading-corner'),
    thumbnail: fixture('reading-corner'),
    alt: 'Reading corner beside a window',
  },
]

const meta = {
  title: 'Data Display/ImageGallery',
  component: ImageGallery,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    gap: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    aspectRatio: { control: 'text' },
    loop: { control: 'boolean' },
  },
  args: { images, gap: 'md', aspectRatio: '4 / 3', loop: true },
} satisfies Meta<typeof ImageGallery>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomColumns: Story = {
  args: {
    columns: { sm: 1, md: 2, lg: 3 },
  },
}

export const WithCaptions: Story = {
  args: {
    defaultOpenIndex: 1,
  },
}

export const ControlledLightbox: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState<number | null>(null)
      return (
        <div className="space-y-3">
          <div className="flex gap-2">
            <Button onClick={() => setOpen(0)}>Open first</Button>
            <Button onClick={() => setOpen(2)}>Open third</Button>
          </div>
          <ImageGallery images={images} open={open} onOpenChange={setOpen} />
        </div>
      )
    }
    return <Demo />
  },
}

export const Playground: Story = {}
