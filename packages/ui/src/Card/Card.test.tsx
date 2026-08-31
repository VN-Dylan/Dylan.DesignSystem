import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Card } from './Card'

describe('Card', () => {
  it('renders body content', () => {
    render(<Card>Card body</Card>)
    expect(screen.getByText('Card body')).toBeInTheDocument()
  })

  it('renders header and footer config', () => {
    render(<Card header={{ content: 'Header', extra: 'Extra' }} footer={{ content: 'Footer' }} />)
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Extra')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('reflects bordered and clickable state', () => {
    const { container } = render(
      <Card bordered clickable>
        Body
      </Card>,
    )
    const card = container.querySelector('.dyl-card')
    expect(card).toHaveAttribute('data-bordered')
    expect(card).toHaveAttribute('data-clickable')
  })

  it('fires click and supports keyboard activation', async () => {
    const onClick = vi.fn()
    render(<Card onClick={onClick}>Open details</Card>)
    const card = screen.getByRole('button', { name: 'Open details' })

    await userEvent.click(card)
    card.focus()
    await userEvent.keyboard('{Enter}')

    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('applies body class', () => {
    render(<Card bodyClass="is-body">Body</Card>)
    expect(screen.getByText('Body')).toHaveClass('is-body')
  })

  it('forwards ref to the card element', () => {
    const ref = vi.fn()
    render(<Card ref={ref}>Card</Card>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Card header={{ content: 'Header' }} footer={{ content: 'Footer' }}>
        Body
      </Card>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
