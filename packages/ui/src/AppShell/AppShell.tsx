import { forwardRef, useCallback, useId, useMemo } from 'react'
import { classNames, useControllableState } from '@vn-dylan/utils'
import { Container } from '../Container'
import { Drawer } from '../Drawer'
import { useBreakpoint } from '../hooks'
import { AppShellContext, useAppShell } from './context'
import type {
  AppShellContentProps,
  AppShellFooterProps,
  AppShellHeaderProps,
  AppShellMainProps,
  AppShellMobileNavTriggerProps,
  AppShellProps,
  AppShellSidebarProps,
} from './types'
import './AppShell.scss'

const AppShellRoot = forwardRef<HTMLDivElement, AppShellProps>(function AppShell(
  {
    sidebarCollapsed,
    defaultSidebarCollapsed = false,
    onSidebarCollapsedChange,
    mobileNavOpen,
    defaultMobileNavOpen = false,
    onMobileNavOpenChange,
    mobileBreakpoint = 'lg',
    className,
    children,
    ...rest
  },
  ref,
) {
  const navId = useId()
  const { up } = useBreakpoint()
  const isMobile = !up(mobileBreakpoint)
  const [collapsed, setCollapsed] = useControllableState<boolean>({
    value: sidebarCollapsed,
    defaultValue: defaultSidebarCollapsed,
    onChange: onSidebarCollapsedChange,
  })
  const [navOpen, setNavOpen] = useControllableState<boolean>({
    value: mobileNavOpen,
    defaultValue: defaultMobileNavOpen,
    onChange: onMobileNavOpenChange,
  })
  const toggleCollapsed = useCallback(() => setCollapsed((prev) => !prev), [setCollapsed])

  const value = useMemo(
    () => ({
      collapsed,
      setCollapsed,
      toggleCollapsed,
      mobileNavOpen: navOpen,
      setMobileNavOpen: setNavOpen,
      isMobile,
      mobileNavId: `${navId}-nav`,
    }),
    [collapsed, isMobile, navId, navOpen, setCollapsed, setNavOpen, toggleCollapsed],
  )

  return (
    <AppShellContext.Provider value={value}>
      <div
        ref={ref}
        data-collapsed={collapsed || undefined}
        data-mobile={isMobile || undefined}
        className={classNames('dyl-app-shell', className)}
        {...rest}
      >
        {children}
      </div>
    </AppShellContext.Provider>
  )
})

const Sidebar = forwardRef<HTMLElement, AppShellSidebarProps>(function AppShellSidebar(
  { 'aria-label': ariaLabel = 'Navigation', className, children, ...rest },
  ref,
) {
  const { collapsed, isMobile, mobileNavOpen, setMobileNavOpen, mobileNavId } =
    useAppShell('AppShell.Sidebar')

  if (isMobile) {
    return (
      <Drawer
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        placement="left"
        width="var(--dyl-sidenav-width)"
        closable={false}
        bodyClass="p-0"
        aria-label={ariaLabel}
      >
        <div id={mobileNavId} className={classNames('dyl-app-shell__nav', className)}>
          {children}
        </div>
      </Drawer>
    )
  }

  return (
    <aside
      ref={ref}
      data-collapsed={collapsed || undefined}
      aria-label={ariaLabel}
      className={classNames('dyl-app-shell__sidebar', className)}
      {...rest}
    >
      {children}
    </aside>
  )
})

const Content = forwardRef<HTMLDivElement, AppShellContentProps>(function AppShellContent(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={classNames('dyl-app-shell__content', className)} {...rest} />
})

const Header = forwardRef<HTMLElement, AppShellHeaderProps>(function AppShellHeader(
  { className, ...rest },
  ref,
) {
  return <header ref={ref} className={classNames('dyl-app-shell__header', className)} {...rest} />
})

const Main = forwardRef<HTMLElement, AppShellMainProps>(function AppShellMain(
  { containerSize, transitionKey, className, children, ...rest },
  ref,
) {
  const content =
    transitionKey == null ? (
      children
    ) : (
      // Remounts on every key change, which replays the entrance animation.
      <div key={transitionKey} className="dyl-app-shell__page">
        {children}
      </div>
    )
  return (
    <main
      ref={ref}
      data-contained={containerSize ? true : undefined}
      className={classNames('dyl-app-shell__main', className)}
      {...rest}
    >
      {containerSize ? <Container size={containerSize}>{content}</Container> : content}
    </main>
  )
})

const Footer = forwardRef<HTMLElement, AppShellFooterProps>(function AppShellFooter(
  { className, ...rest },
  ref,
) {
  return <footer ref={ref} className={classNames('dyl-app-shell__footer', className)} {...rest} />
})

const MobileNavTrigger = forwardRef<HTMLButtonElement, AppShellMobileNavTriggerProps>(
  function AppShellMobileNavTrigger(
    { icon, className, onClick, 'aria-label': ariaLabel = 'Open navigation', ...rest },
    ref,
  ) {
    const { isMobile, mobileNavOpen, setMobileNavOpen, mobileNavId } = useAppShell(
      'AppShell.MobileNavTrigger',
    )
    if (!isMobile) return null

    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        aria-expanded={mobileNavOpen}
        aria-controls={mobileNavId}
        className={classNames('dyl-app-shell__trigger', className)}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) setMobileNavOpen(!mobileNavOpen)
        }}
        {...rest}
      >
        {icon ?? (
          <svg
            viewBox="0 0 24 24"
            width="1.25em"
            height="1.25em"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>
    )
  },
)

/**
 * AppShell is the page frame: persistent sidebar (drawer below the breakpoint),
 * sticky header, scrolling main and footer.
 */
export const AppShell = Object.assign(AppShellRoot, {
  Sidebar,
  Content,
  Header,
  Main,
  Footer,
  MobileNavTrigger,
})
