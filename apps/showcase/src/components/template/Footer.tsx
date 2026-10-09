import { AppShell, Inline } from '@vn-dylan/ui'

/** App footer — kept minimal and out of the way. */
export function Footer() {
  return (
    <AppShell.Footer>
      <Inline wrap justify="between" gap="tight">
        <span>© {new Date().getFullYear()} Dylan Design System — showcase</span>
        <span>Rebuilt from the Eyris admin template · internal reference</span>
      </Inline>
    </AppShell.Footer>
  )
}
