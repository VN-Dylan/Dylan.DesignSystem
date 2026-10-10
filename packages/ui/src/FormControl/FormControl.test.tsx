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

  it('wires a single control to its label, hint and error without explicit ids', () => {
    const { rerender } = render(
      <Form>
        <Form.Item label="Phone" hint="Include the country code.">
          <Input />
        </Form.Item>
      </Form>,
    )
    const input = screen.getByLabelText('Phone')
    expect(input).toHaveAccessibleDescription('Include the country code.')

    rerender(
      <Form>
        <Form.Item label="Phone" hint="Include the country code." errorMessage="Invalid number">
          <Input />
        </Form.Item>
      </Form>,
    )
    expect(screen.getByLabelText('Phone')).toHaveAccessibleDescription('Invalid number')
    expect(screen.queryByText('Include the country code.')).not.toBeInTheDocument()
  })

  it('keeps an explicit control id and aria-describedby', () => {
    render(
      <Form>
        <p id="extra-note">Note</p>
        <Form.Item label="Code" hint="Six digits">
          <Input id="code" aria-describedby="extra-note" />
        </Form.Item>
      </Form>,
    )
    const input = screen.getByLabelText('Code')
    expect(input).toHaveAttribute('id', 'code')
    expect(input).toHaveAccessibleDescription('Note Six digits')
  })

  it('renders Form.Group as a titled, described fieldset with columns and spans', () => {
    const { container } = render(
      <Form>
        <Form.Group title="Contact" description="How we reach the customer." columns={2}>
          <Form.Item label="Name">
            <Input />
          </Form.Item>
          <Form.Item label="Notes" span="full">
            <Input textArea />
          </Form.Item>
        </Form.Group>
      </Form>,
    )
    const group = screen.getByRole('group', { name: 'Contact' })
    expect(group).toHaveAccessibleDescription('How we reach the customer.')
    expect(group).toHaveAttribute('data-columns', '2')
    expect(container.querySelectorAll('.dyl-form-item')[1]).toHaveAttribute('data-span', 'full')
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
        <Form.Group title="Address" description="Billing address" columns={2}>
          <Form.Item label="City" hint="As printed on the invoice">
            <Input />
          </Form.Item>
        </Form.Group>
      </Form>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
