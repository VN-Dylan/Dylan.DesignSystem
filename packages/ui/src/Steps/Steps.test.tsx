import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Steps } from './Steps'

const renderSteps = (props?: Partial<Parameters<typeof Steps>[0]>) =>
  render(
    <Steps current={1} {...props}>
      <Steps.Item title="Login" />
      <Steps.Item title="Review" description="Review the order" />
      <Steps.Item title="Approve" />
    </Steps>,
  )

describe('Steps', () => {
  it('marks complete, current, and pending steps', () => {
    renderSteps()
    expect(screen.getByText('Login').closest('li')).toHaveAttribute('data-status', 'complete')
    expect(screen.getByText('Review').closest('li')).toHaveAttribute('data-status', 'in-progress')
    expect(screen.getByText('Approve').closest('li')).toHaveAttribute('data-status', 'pending')
  })

  it('applies error status to the current step', () => {
    renderSteps({ status: 'error' })
    expect(screen.getByText('Review').closest('li')).toHaveAttribute('data-status', 'error')
  })

  it('calls onChange when clickable steps are selected', async () => {
    const onChange = vi.fn()
    renderSteps({ onChange })

    await userEvent.click(screen.getByRole('button', { name: /approve/i }))
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('shows descriptions in vertical mode', () => {
    renderSteps({ vertical: true })
    expect(screen.getByText('Review the order')).toBeInTheDocument()
  })

  it('forwards ref to the steps list', () => {
    const ref = vi.fn()
    render(<Steps ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLOListElement))
  })

  it('has no axe violations', async () => {
    const { container } = renderSteps({ vertical: true })
    expect(await axe(container)).toHaveNoViolations()
  })
})
