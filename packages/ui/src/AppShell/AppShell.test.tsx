import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { AppShell } from './AppShell'
import { useAppShell } from './context'

const setViewport = (width: number) => {
  window.matchMedia = vi.fn((query: string) => ({
    media: query,
    matches: width >= Number(query.match(/\d+/)?.[0] ?? 0),
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

const Collapse = () => {
  const { collapsed, toggleCollapsed } = useAppShell()
  return (
    <button type="button" onClick={toggleCollapsed}>
      {collapsed ? 'Expand' : 'Collapse'}
    </button>
  )
}

const Shell = (props: Parameters<typeof AppShell>[0]) => (
  <AppShell {...props}>
    <AppShell.Sidebar aria-label="Primary">
      <a href="#a">Dashboard</a>
    </AppShell.Sidebar>
    <AppShell.Content>
      <AppShell.Header>
        <AppShell.MobileNavTrigger />
        <Collapse />
      </AppShell.Header>
      <AppShell.Main containerSize="default">Body</AppShell.Main>
      <AppShell.Footer>Footer</AppShell.Footer>
    </AppShell.Content>
  </AppShell>
)

describe('AppShell', () => {
  afterEach(() => vi.restoreAllMocks())

  it('renders a persistent sidebar on desktop and hides the mobile trigger', () => {
    setViewport(1280)
    render(<Shell />)
    expect(screen.getByRole('complementary', { name: 'Primary' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Open navigation' })).not.toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveTextContent('Body')
  })

  it('toggles collapsed state (uncontrolled)', async () => {
    setViewport(1280)
    render(<Shell />)
    const aside = screen.getByRole('complementary', { name: 'Primary' })
    expect(aside).not.toHaveAttribute('data-collapsed')
    await userEvent.click(screen.getByRole('button', { name: 'Collapse' }))
    expect(aside).toHaveAttribute('data-collapsed', 'true')
  })

  it('supports controlled collapsed state', async () => {
    setViewport(1280)
    const onChange = vi.fn()
    render(<Shell sidebarCollapsed={false} onSidebarCollapsedChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Collapse' }))
    expect(onChange).toHaveBeenCalledWith(true)
    expect(screen.getByRole('complementary', { name: 'Primary' })).not.toHaveAttribute(
      'data-collapsed',
    )
  })

  it('opens and closes the drawer below the breakpoint', async () => {
    setViewport(500)
    render(<Shell />)
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
    const trigger = screen.getByRole('button', { name: 'Open navigation' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })

  it('supports a controlled mobile drawer', async () => {
    setViewport(500)
    const onOpen = vi.fn()
    render(<Shell mobileNavOpen={false} onMobileNavOpenChange={onOpen} />)
    await userEvent.click(screen.getByRole('button', { name: 'Open navigation' }))
    expect(onOpen).toHaveBeenCalledWith(true)
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })

  it('throws when parts are used outside AppShell', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    expect(() => render(<AppShell.Sidebar>x</AppShell.Sidebar>)).toThrow(/inside <AppShell>/)
  })

  it('forwards refs', () => {
    setViewport(1280)
    const ref = vi.fn()
    render(<AppShell ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    setViewport(1280)
    const { container } = render(<Shell />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
