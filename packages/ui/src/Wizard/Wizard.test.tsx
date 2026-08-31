import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Wizard } from './Wizard'

const steps = [
  { title: 'One', content: <p>First panel</p> },
  { title: 'Two', content: <p>Second panel</p> },
  { title: 'Three', content: <p>Third panel</p> },
]

describe('Wizard', () => {
  it('advances and goes back through steps', async () => {
    const onChange = vi.fn()
    render(<Wizard steps={steps} onChange={onChange} />)
    expect(screen.getByText('First panel')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled()

    await userEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(onChange).toHaveBeenCalledWith(1)
    expect(screen.getByText('Second panel')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(screen.getByText('First panel')).toBeInTheDocument()
  })

  it('shows Finish on the last step and calls onFinish', async () => {
    const onFinish = vi.fn()
    render(<Wizard steps={steps} defaultCurrent={2} onFinish={onFinish} />)
    await userEvent.click(screen.getByRole('button', { name: 'Finish' }))
    expect(onFinish).toHaveBeenCalledOnce()
  })

  it('has no axe violations', async () => {
    const { container } = render(<Wizard steps={steps} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
