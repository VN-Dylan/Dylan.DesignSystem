import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AppShell } from '@vn-dylan/ui'
import { useLayout } from '@/utils/hooks/useLayout'
import { Header } from '@/components/template/Header'
import { Footer } from '@/components/template/Footer'
import { SideNav } from '@/components/template/SideNav'
import { ThemeConfigDrawer } from '@/components/template/ThemeConfigDrawer'

/**
 * Primary application shell: persistent side nav + sticky header + scrolling
 * content. Below the `lg` breakpoint the side nav becomes an overlay drawer
 * toggled from the header. The frame itself is the library `AppShell`; layout
 * state stays in the persisted theme store.
 */
export function AppLayout() {
  const { sideNavCollapsed, setSideNavCollapsed, mobileNavOpen, setMobileNavOpen } = useLayout()
  const { pathname } = useLocation()

  // Close the mobile overlay after navigating.
  useEffect(() => {
    setMobileNavOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <AppShell
      sidebarCollapsed={sideNavCollapsed}
      onSidebarCollapsedChange={setSideNavCollapsed}
      mobileNavOpen={mobileNavOpen}
      onMobileNavOpenChange={setMobileNavOpen}
    >
      <AppShell.Sidebar aria-label="Navigation">
        <SideNav collapsed={sideNavCollapsed} />
      </AppShell.Sidebar>

      <AppShell.Content>
        <Header />
        <AppShell.Main transitionKey={pathname}>
          <Outlet />
        </AppShell.Main>
        <Footer />
      </AppShell.Content>

      <ThemeConfigDrawer />
    </AppShell>
  )
}
