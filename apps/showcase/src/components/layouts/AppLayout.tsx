import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Drawer } from '@dylan-ds/ui'
import { useLayout } from '@/utils/hooks/useLayout'
import { Header } from '@/components/template/Header'
import { Footer } from '@/components/template/Footer'
import { SideNav } from '@/components/template/SideNav'
import { ThemeConfigDrawer } from '@/components/template/ThemeConfigDrawer'

/**
 * Primary application shell: persistent side nav + sticky header + scrolling
 * content. Below the `lg` breakpoint the side nav becomes an overlay drawer
 * toggled from the header.
 */
export function AppLayout() {
  const { isMobile, sideNavCollapsed, mobileNavOpen, setMobileNavOpen } = useLayout()
  const { pathname } = useLocation()

  // Close the mobile overlay after navigating.
  useEffect(() => {
    setMobileNavOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div className="flex min-h-screen bg-bg text-content">
      {!isMobile && (
        <aside
          className="sticky top-0 h-screen shrink-0 transition-[width] duration-200"
          style={{ width: sideNavCollapsed ? 72 : 260 }}
        >
          <SideNav collapsed={sideNavCollapsed} />
        </aside>
      )}

      {isMobile && (
        <Drawer
          isOpen={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
          placement="left"
          width={260}
          closable={false}
          bodyClass="p-0"
          aria-label="Navigation"
        >
          <SideNav />
        </Drawer>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 px-4 py-6 sm:px-6">
          <Outlet />
        </main>
        <Footer />
      </div>

      <ThemeConfigDrawer />
    </div>
  )
}
