import { Outlet } from 'react-router-dom'

/** Chrome-free layout — used by the landing page and standalone screens. */
export function BlankLayout() {
  return (
    <div className="min-h-screen bg-bg text-content">
      <Outlet />
    </div>
  )
}
