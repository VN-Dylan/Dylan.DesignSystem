import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../Button'
import { ImageGallery } from './ImageGallery'
import type { ImageGalleryItem } from './types'

const images: ImageGalleryItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    thumbnail: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600',
    alt: 'Lounge with a view of green hills',
    caption: 'Main lounge overlooking the valley.',
  },
  {
    src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
    alt: 'Hotel pool at dusk',
    caption: 'Pool deck with evening service.',
  },
  {
    src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600',
    alt: 'Apartment bedroom with white linen',
    caption: 'Primary bedroom with city views.',
  },
  {
    src: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
    thumbnail: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600',
    alt: 'Open plan dining room',
  },
  {
    src: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
    thumbnail: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600',
    alt: 'Kitchen with marble island',
  },
  {
    src: 'https://images.unsplash.com/photo-1554995207-c18c203602cb',
    thumbnail: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600',
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
