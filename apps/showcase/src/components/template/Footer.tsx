/** App footer — kept minimal and out of the way. */
export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-4 text-xs text-content-faint">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} Dylan Design System — showcase</span>
        <span>Rebuilt from the Eyris admin template · internal reference</span>
      </div>
    </footer>
  )
}
