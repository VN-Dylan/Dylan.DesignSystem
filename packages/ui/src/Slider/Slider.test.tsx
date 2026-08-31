import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Slider } from './Slider'

describe('Slider', () => {
  it('renders an accessible range input', () => {
    render(<Slider defaultValue={40} thumbAriaLabel="Volume" />)
    expect(screen.getByRole('slider', { name: 'Volume' })).toHaveValue('40')
  })

  it('calls onChange with normalized values', () => {
    const onChange = vi.fn()
    render(<Slider defaultValue={0} step={5} onChange={onChange} />)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '12' } })
    expect(onChange).toHaveBeenCalledWith(10)
  })

  it('snaps to marks when stepOnMarks is enabled', () => {
    const onChange = vi.fn()
    render(
      <Slider
        defaultValue={0}
        stepOnMarks
        marks={[{ value: 0 }, { value: 26 }, { value: 37 }]}
        onChange={onChange}
      />,
    )
    fireEvent.change(screen.getByRole('slider'), { target: { value: '30' } })
    expect(onChange).toHaveBeenCalledWith(26)
  })

  it('supports constrained range changes', () => {
    const onChange = vi.fn()
    render(<Slider.Range defaultValue={[20, 50]} minRange={20} onChange={onChange} />)
    const [start] = screen.getAllByRole('slider')
    fireEvent.change(start!, { target: { value: '40' } })
    expect(onChange).toHaveBeenCalledWith([30, 50])
  })

  it('fires onDraggingStop', () => {
    const onDraggingStop = vi.fn()
    render(<Slider defaultValue={40} onDraggingStop={onDraggingStop} />)
    fireEvent.mouseUp(screen.getByRole('slider'))
    expect(onDraggingStop).toHaveBeenCalledWith(40)
  })

  it('forwards ref to the root element', () => {
    const ref = vi.fn()
    render(<Slider ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <Slider thumbAriaLabel="Value" defaultValue={25} />
        <Slider.Range thumbAriaLabelStart="Minimum" thumbAriaLabelEnd="Maximum" />
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
