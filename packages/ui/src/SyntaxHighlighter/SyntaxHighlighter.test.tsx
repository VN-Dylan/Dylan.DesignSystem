import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { SyntaxHighlighter } from './SyntaxHighlighter'

describe('SyntaxHighlighter', () => {
  it('renders the code content', () => {
    render(<SyntaxHighlighter language="ts">const x = 1</SyntaxHighlighter>)
    expect(screen.getByText(/const/)).toBeInTheDocument()
  })

  it('copies to the clipboard', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })
    render(<SyntaxHighlighter language="ts">const x = 1</SyntaxHighlighter>)
    await userEvent.click(screen.getByRole('button', { name: 'Copy code' }))
    expect(writeText).toHaveBeenCalledWith('const x = 1')
  })

  it('can hide the copy button', () => {
    render(
      <SyntaxHighlighter language="ts" copyable={false}>
        const x = 1
      </SyntaxHighlighter>,
    )
    expect(screen.queryByRole('button', { name: 'Copy code' })).not.toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(<SyntaxHighlighter language="ts">const x = 1</SyntaxHighlighter>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
