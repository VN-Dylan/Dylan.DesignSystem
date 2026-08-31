import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Scroll } from './Scroll'

afterEach(() => {
  vi.useRealTimers()
})

describe('Scroll', () => {
  it('renders scroll content with default vertical scrollbars', () => {
    render(
      <Scroll data-testid="scroll">
        <p>Scrollable content</p>
      </Scroll>,
    )
    expect(screen.getByTestId('scroll')).toHaveAttribute('data-scrollbars', 'vertical')
    expect(screen.getByText('Scrollable content')).toBeInTheDocument()
  })

  it('passes viewport props and viewport ref', () => {
    const viewportRef = vi.fn()
    render(
      <Scroll viewportRef={viewportRef} viewportProps={{ 'aria-label': 'Viewport', tabIndex: 0 }}>
        Content
      </Scroll>,
    )
    expect(screen.getByLabelText('Viewport')).toBeInTheDocument()
    expect(viewportRef).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('reports scroll position and top reached', () => {
    const onScrollPositionChange = vi.fn()
    const onTopReached = vi.fn()
    render(
      <Scroll
        viewportProps={{ 'aria-label': 'Viewport' }}
        onScrollPositionChange={onScrollPositionChange}
        onTopReached={onTopReached}
      >
        Content
      </Scroll>,
    )
    fireEvent.scroll(screen.getByLabelText('Viewport'))
    expect(onScrollPositionChange).toHaveBeenCalledWith({ x: 0, y: 0 })
    expect(onTopReached).toHaveBeenCalled()
  })

  it('fires bottom reached when scrolled to the bottom', () => {
    const onBottomReached = vi.fn()
    render(
      <Scroll viewportProps={{ 'aria-label': 'Viewport' }} onBottomReached={onBottomReached}>
        Content
      </Scroll>,
    )
    const viewport = screen.getByLabelText('Viewport')
    Object.defineProperties(viewport, {
      scrollTop: { configurable: true, value: 80 },
      clientHeight: { configurable: true, value: 20 },
      scrollHeight: { configurable: true, value: 100 },
    })
    fireEvent.scroll(viewport)
    expect(onBottomReached).toHaveBeenCalled()
  })

  it('hides scrolling state after the configured delay', () => {
    vi.useFakeTimers()
    render(
      <Scroll data-testid="scroll" scrollHideDelay={250} viewportProps={{ tabIndex: 0 }}>
        Content
      </Scroll>,
    )
    const viewport = screen.getByText('Content').closest('.dyl-scroll__viewport') as HTMLDivElement
    fireEvent.scroll(viewport)
    expect(screen.getByTestId('scroll')).toHaveAttribute('data-scrolling', 'true')
    act(() => {
      vi.advanceTimersByTime(250)
    })
    expect(screen.getByTestId('scroll')).not.toHaveAttribute('data-scrolling')
  })

  it('forwards ref to the root element', () => {
    const ref = vi.fn()
    render(<Scroll ref={ref}>Content</Scroll>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Scroll className="h-32" viewportProps={{ 'aria-label': 'Workspace updates', tabIndex: 0 }}>
        <p>Workspace content</p>
      </Scroll>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
