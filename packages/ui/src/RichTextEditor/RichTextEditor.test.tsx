import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { RichTextEditor } from './RichTextEditor'

describe('RichTextEditor', () => {
  it('renders the toolbar and editable region', () => {
    render(<RichTextEditor value="<p>Hello</p>" aria-label="Notes" />)
    expect(screen.getByRole('toolbar', { name: 'Formatting' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Notes' })).toBeInTheDocument()
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('toggles a mark and reports HTML via onChange', async () => {
    const onChange = vi.fn()
    render(<RichTextEditor value="<p>abc</p>" onChange={onChange} />)
    const editor = screen.getByRole('textbox')
    await userEvent.click(editor)
    await userEvent.keyboard('{Control>}a{/Control}')
    await userEvent.click(screen.getByRole('button', { name: 'Bold' }))
    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.lastCall?.[0]).toContain('<strong>')
  })

  it('is not editable when disabled', () => {
    render(<RichTextEditor value="<p>x</p>" disabled />)
    expect(screen.getByRole('textbox')).toHaveAttribute('contenteditable', 'false')
  })

  it('has no axe violations', async () => {
    const { container } = render(<RichTextEditor value="<p>Hi</p>" aria-label="Notes" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
