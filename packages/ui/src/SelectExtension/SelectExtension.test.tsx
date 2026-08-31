import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { SelectExtension, SelectInputWithPrefix, SelectOptionWithPrefix } from './SelectExtension'

describe('SelectExtension', () => {
  it('renders input display label and prefix', () => {
    render(<SelectInputWithPrefix prefix="P" label="Profile" />)
    expect(screen.getByText('P')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
  })

  it('can hide the input prefix', () => {
    render(<SelectInputWithPrefix prefix="P" label="Profile" showPrefix={false} />)
    expect(screen.queryByText('P')).not.toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
  })

  it('renders selected option check affordance', () => {
    render(<SelectOptionWithPrefix prefix="S" label="Settings" selected checkIcon="Selected" />)
    expect(screen.getByText('Selected')).toBeInTheDocument()
  })

  it('forwards refs to helper roots', () => {
    const inputRef = vi.fn()
    const optionRef = vi.fn()
    render(
      <>
        <SelectInputWithPrefix ref={inputRef} label="Input" />
        <SelectOptionWithPrefix ref={optionRef} label="Option" />
      </>,
    )
    expect(inputRef).toHaveBeenCalledWith(expect.any(HTMLSpanElement))
    expect(optionRef).toHaveBeenCalledWith(expect.any(HTMLSpanElement))
  })

  it('exposes the root alias as input display', () => {
    render(<SelectExtension label="Alias" />)
    expect(screen.getByText('Alias')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <SelectInputWithPrefix prefix="P" label="Profile" />
        <SelectOptionWithPrefix prefix="S" label="Settings" selected />
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
