import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Form } from './FormControl'
import { Input } from '../Input'

describe('Form / Form.Item', () => {
  it('associates label with the control via htmlFor', () => {
    render(
      <Form>
        <Form.Item label="Name" htmlFor="name">
          <Input id="name" />
        </Form.Item>
      </Form>,
    )
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
  })

  it('renders the required marker and error message', () => {
    render(
      <Form>
        <Form.Item label="Email" htmlFor="email" asterisk errorMessage="Required">
          <Input id="email" />
        </Form.Item>
      </Form>,
    )
    expect(screen.getByText('*')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
  })

  it('flips to the invalid state when an error message is present', () => {
    const { container } = render(
      <Form>
        <Form.Item label="X" errorMessage="Bad">
          <Input aria-label="X" />
        </Form.Item>
      </Form>,
    )
    expect(container.querySelector('.dyl-form-item')).toHaveAttribute('data-invalid')
  })

  it('propagates layout and size from Form context', () => {
    const { container } = render(
      <Form layout="horizontal" size="lg">
        <Form.Item label="X">
          <Input aria-label="X" />
        </Form.Item>
      </Form>,
    )
    const item = container.querySelector('.dyl-form-item')
    expect(item).toHaveAttribute('data-layout', 'horizontal')
    expect(item).toHaveAttribute('data-size', 'lg')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Form>
        <Form.Item label="Name" htmlFor="n">
          <Input id="n" />
        </Form.Item>
        <Form.Item label="Email" htmlFor="e" errorMessage="Required">
          <Input id="e" />
        </Form.Item>
      </Form>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
