import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Segment } from './Segment'

const renderSegment = () =>
  render(
    <Segment defaultValue="left" aria-label="Alignment">
      <Segment.Item value="left">Left</Segment.Item>
      <Segment.Item value="center">Center</Segment.Item>
      <Segment.Item value="right" disabled>
        Right
      </Segment.Item>
    </Segment>,
  )

describe('Segment', () => {
  it('renders a single-selection segment', () => {
    renderSegment()
    expect(screen.getByRole('radio', { name: 'Left' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: 'Center' })).toHaveAttribute('aria-checked', 'false')
  })

  it('changes selected item in uncontrolled mode', async () => {
    const onChange = vi.fn()
    render(
      <Segment defaultValue="left" onChange={onChange} aria-label="Alignment">
        <Segment.Item value="left">Left</Segment.Item>
        <Segment.Item value="center">Center</Segment.Item>
      </Segment>,
    )
    await userEvent.click(screen.getByRole('radio', { name: 'Center' }))
    expect(onChange).toHaveBeenCalledWith('center')
    expect(screen.getByRole('radio', { name: 'Center' })).toHaveAttribute('aria-checked', 'true')
  })

  it('toggles multiple selection', async () => {
    const onChange = vi.fn()
    render(
      <Segment
        selectionType="multiple"
        defaultValue={['left']}
        onChange={onChange}
        aria-label="Alignment"
      >
        <Segment.Item value="left">Left</Segment.Item>
        <Segment.Item value="center">Center</Segment.Item>
      </Segment>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Center' }))
    expect(onChange).toHaveBeenCalledWith(['left', 'center'])
    expect(screen.getByRole('button', { name: 'Center' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('does not activate disabled items', async () => {
    const onChange = vi.fn()
    render(
      <Segment defaultValue="left" onChange={onChange} aria-label="Alignment">
        <Segment.Item value="left">Left</Segment.Item>
        <Segment.Item value="right" disabled>
          Right
        </Segment.Item>
      </Segment>,
    )
    await userEvent.click(screen.getByRole('radio', { name: 'Right' }))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('supports controlled value', () => {
    render(
      <Segment value="center" aria-label="Alignment">
        <Segment.Item value="left">Left</Segment.Item>
        <Segment.Item value="center">Center</Segment.Item>
      </Segment>,
    )
    expect(screen.getByRole('radio', { name: 'Center' })).toHaveAttribute('aria-checked', 'true')
  })

  it('forwards ref to the segment root', () => {
    const ref = vi.fn()
    render(<Segment ref={ref} aria-label="Alignment" />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('forwards item ref to the item node', () => {
    const ref = vi.fn()
    render(
      <Segment aria-label="Alignment">
        <Segment.Item ref={ref} value="left">
          Left
        </Segment.Item>
      </Segment>,
    )
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
  })

  it('moves selection with arrow keys in a single-select group and skips disabled', async () => {
    const onChange = vi.fn()
    render(
      <Segment defaultValue="left" onChange={onChange} aria-label="Alignment">
        <Segment.Item value="left">Left</Segment.Item>
        <Segment.Item value="center">Center</Segment.Item>
        <Segment.Item value="right" disabled>
          Right
        </Segment.Item>
      </Segment>,
    )
    screen.getByRole('radio', { name: 'Left' }).focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(onChange).toHaveBeenLastCalledWith('center')
    expect(screen.getByRole('radio', { name: 'Center' })).toHaveFocus()

    // wraps past the disabled item back to the first
    await userEvent.keyboard('{ArrowRight}')
    expect(onChange).toHaveBeenLastCalledWith('left')
    expect(screen.getByRole('radio', { name: 'Left' })).toHaveFocus()

    await userEvent.keyboard('{End}')
    expect(screen.getByRole('radio', { name: 'Center' })).toHaveFocus()
  })

  it('moves focus but not selection with arrow keys in a multiple-select group', async () => {
    const onChange = vi.fn()
    render(
      <Segment selectionType="multiple" defaultValue={[]} onChange={onChange} aria-label="Views">
        <Segment.Item value="a">A</Segment.Item>
        <Segment.Item value="b">B</Segment.Item>
      </Segment>,
    )
    screen.getByRole('button', { name: 'A' }).focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getByRole('button', { name: 'B' })).toHaveFocus()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('has no axe violations', async () => {
    const { container } = renderSegment()
    expect(await axe(container)).toHaveNoViolations()
  })
})
