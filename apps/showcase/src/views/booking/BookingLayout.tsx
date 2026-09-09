import { useMemo, type CSSProperties } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { presetThemeSchema, themeSchemaToCssVars } from '@vn-dylan/tokens'
import { Button, PageTransition } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { useThemeStore } from '@/store/themeStore'

export function BookingLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const mode = useThemeStore((state) => state.mode)
  const schemaVars = useMemo(
    () => themeSchemaToCssVars(presetThemeSchema.booking[mode]) as CSSProperties,
    [mode],
  )

  return (
    <div
      data-brand="booking"
      data-theme-schema="booking"
      style={schemaVars}
      className="min-h-screen bg-bg text-content"
    >
      <header className="sticky top-0 z-sticky border-b border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/booking" className="flex items-center gap-3 font-display font-bold text-content">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-fg">
              <Icon as={TbIcons.TbBed} aria-hidden />
            </span>
            <span>Dylan Stays</span>
          </Link>
          <nav className="flex items-center gap-2" aria-label="Booking">
            <Button variant="plain" onClick={() => navigate('/booking/results')}>
              Stays
            </Button>
            <Button variant="default" icon={<Icon as={TbIcons.TbHomePlus} aria-hidden />}>
              List your place
            </Button>
          </nav>
        </div>
      </header>

      <PageTransition transitionKey={pathname}>
        <Outlet />
      </PageTransition>
    </div>
  )
}
