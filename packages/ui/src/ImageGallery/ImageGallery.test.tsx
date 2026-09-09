import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { ImageGallery } from './ImageGallery'
import type { ImageGalleryItem } from './types'

const images: ImageGalleryItem[] = [
  { src: '/image-one.jpg', thumbnail: '/thumb-one.jpg', alt: 'Bedroom', caption: 'Bedroom view' },
  { src: '/image-two.jpg', thumbnail: '/thumb-two.jpg', alt: 'Pool', caption: 'Pool view' },
  { src: '/image-three.jpg', thumbnail: '/thumb-three.jpg', alt: 'Kitchen' },
]

describe('ImageGallery', () => {
  it('renders one button per image', () => {
    render(<ImageGallery images={images} />)
    expect(screen.getAllByRole('button')).toHaveLength(images.length)
  })

  it('clicking a tile opens the dialog at that index', async () => {
    render(<ImageGallery images={images} />)

    await userEvent.click(screen.getByRole('button', { name: 'View image 2: Pool' }))

    expect(await screen.findByRole('dialog', { name: 'Image viewer' })).toBeInTheDocument()
    expect(screen.getByText('2 / 3')).toBeInTheDocument()
    expect(screen.getAllByRole('img', { name: 'Pool' })).toHaveLength(2)
  })

  it('ArrowRight advances in the lightbox', async () => {
    render(<ImageGallery images={images} />)

    await userEvent.click(screen.getByRole('button', { name: 'View image 1: Bedroom' }))
    await screen.findByRole('dialog', { name: 'Image viewer' })
    await userEvent.keyboard('{ArrowRight}')

    await waitFor(() => expect(screen.getByText('2 / 3')).toBeInTheDocument())
  })

  it('Escape closes and restores focus to the tile', async () => {
    render(<ImageGallery images={images} />)
    const tile = screen.getByRole('button', { name: 'View image 1: Bedroom' })

    await userEvent.click(tile)
    await screen.findByRole('dialog', { name: 'Image viewer' })
    await userEvent.keyboard('{Escape}')

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(tile).toHaveFocus()
  })

  it('thumbnail click jumps to that image', async () => {
    render(<ImageGallery images={images} />)

    await userEvent.click(screen.getByRole('button', { name: 'View image 1: Bedroom' }))
    await screen.findByRole('dialog', { name: 'Image viewer' })
    await userEvent.click(screen.getAllByRole('button', { name: 'View image 3: Kitchen' })[1]!)

    expect(screen.getByText('3 / 3')).toBeInTheDocument()
  })

  it('loop=false disables Previous on the first image', async () => {
    render(<ImageGallery images={images} loop={false} />)

    await userEvent.click(screen.getByRole('button', { name: 'View image 1: Bedroom' }))
    await screen.findByRole('dialog', { name: 'Image viewer' })

    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeDisabled()
  })

  it('forwards ref to the grid root', () => {
    const ref = vi.fn()
    render(<ImageGallery ref={ref} images={images} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations when closed', async () => {
    const { container } = render(<ImageGallery images={images} />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no axe violations when open', async () => {
    const { baseElement } = render(<ImageGallery images={images} defaultOpenIndex={0} />)
    await screen.findByRole('dialog', { name: 'Image viewer' })
    expect(await axe(baseElement)).toHaveNoViolations()
  })
})
