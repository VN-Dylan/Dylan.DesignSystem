import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { TbUser } from 'react-icons/tb'
import { Avatar } from './Avatar'

describe('Avatar', () => {
  it('renders text content', () => {
    render(<Avatar>AB</Avatar>)
    expect(screen.getByText('AB')).toBeInTheDocument()
  })

  it('renders an icon avatar', () => {
    render(<Avatar icon={<TbUser data-testid="avatar-icon" />} />)
    expect(screen.getByTestId('avatar-icon')).toBeInTheDocument()
  })

  it('renders an image with alt and srcSet', () => {
    render(<Avatar src="/avatar.jpg" srcSet="/avatar@2x.jpg 2x" alt="Ada Lovelace" />)
    const image = screen.getByRole('img', { name: 'Ada Lovelace' })
    expect(image).toHaveAttribute('src', '/avatar.jpg')
    expect(image).toHaveAttribute('srcset', '/avatar@2x.jpg 2x')
  })

  it('applies shape and size data attributes', () => {
    render(
      <Avatar shape="circle" size="lg">
        A
      </Avatar>,
    )
    expect(screen.getByText('A').closest('.dyl-avatar')).toHaveAttribute('data-shape', 'circle')
    expect(screen.getByText('A').closest('.dyl-avatar')).toHaveAttribute('data-size', 'lg')
  })

  it('applies numeric size inline', () => {
    render(<Avatar size={48}>A</Avatar>)
    const avatar = screen.getByText('A').closest('.dyl-avatar')
    expect(avatar?.style.width).toContain('48')
    expect(avatar?.style.height).toContain('48')
  })

  it('limits Avatar.Group and renders omitted avatar', async () => {
    const onOmittedAvatarClick = vi.fn()
    render(
      <Avatar.Group maxCount={2} onOmittedAvatarClick={onOmittedAvatarClick}>
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
        <Avatar>C</Avatar>
      </Avatar.Group>,
    )

    expect(screen.getByText('+1')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: '1 more avatars' }))
    expect(onOmittedAvatarClick).toHaveBeenCalledTimes(1)
  })

  it('forwards ref to the avatar element', () => {
    const ref = vi.fn()
    render(<Avatar ref={ref}>A</Avatar>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <Avatar src="/avatar.jpg" alt="Ada Lovelace" />
        <Avatar.Group maxCount={1}>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
        </Avatar.Group>
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
