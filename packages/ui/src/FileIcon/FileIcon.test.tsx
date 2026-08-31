import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { FileIcon } from './FileIcon'

describe('FileIcon', () => {
  it('detects the kind from the extension', () => {
    render(<FileIcon name="report.pdf" />)
    expect(screen.getByRole('img', { name: 'report.pdf file' })).toHaveAttribute('data-kind', 'pdf')
  })

  it('falls back to a generic file for unknown extensions', () => {
    render(<FileIcon name="thing.xyz" />)
    expect(screen.getByRole('img')).toHaveAttribute('data-kind', 'file')
  })

  it('honours an explicit type', () => {
    render(<FileIcon name="a.pdf" type="image" />)
    expect(screen.getByRole('img')).toHaveAttribute('data-kind', 'image')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<FileIcon name="a.txt" ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<FileIcon name="notes.docx" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
