import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Upload } from './Upload'

const file = (name: string, type = 'text/plain') => new File(['x'.repeat(1500)], name, { type })

describe('Upload', () => {
  it('adds selected files to the list and calls onChange', async () => {
    const onChange = vi.fn()
    const { container } = render(<Upload onChange={onChange} />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    await userEvent.upload(input, file('report.pdf'))
    expect(screen.getByText('report.pdf')).toBeInTheDocument()
    expect(onChange).toHaveBeenCalledWith([expect.any(File)])
  })

  it('removes a file', async () => {
    const onFileRemove = vi.fn()
    const { container } = render(<Upload onFileRemove={onFileRemove} />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    await userEvent.upload(input, file('a.txt'))
    await userEvent.click(screen.getByRole('button', { name: 'Remove a.txt' }))
    expect(screen.queryByText('a.txt')).not.toBeInTheDocument()
    expect(onFileRemove).toHaveBeenCalledWith(expect.any(File), [])
  })

  it('respects beforeUpload rejection', async () => {
    const { container } = render(<Upload beforeUpload={(f) => f.name.endsWith('.png')} />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    await userEvent.upload(input, [file('bad.txt'), file('ok.png', 'image/png')])
    expect(screen.queryByText('bad.txt')).not.toBeInTheDocument()
    expect(screen.getByText('ok.png')).toBeInTheDocument()
  })

  it('enforces uploadLimit', async () => {
    const { container } = render(<Upload uploadLimit={1} />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    await userEvent.upload(input, [file('1.txt'), file('2.txt')])
    expect(screen.getByText('1.txt')).toBeInTheDocument()
    expect(screen.queryByText('2.txt')).not.toBeInTheDocument()
  })

  it('renders a drag-and-drop zone', () => {
    render(<Upload draggable tip="Drop here" />)
    expect(screen.getByText('Drop here')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(<Upload draggable tip="Images only" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
