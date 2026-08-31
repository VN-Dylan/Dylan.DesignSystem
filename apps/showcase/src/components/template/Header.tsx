import { Button } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { useThemeStore } from '@/store/themeStore'
import { useLayout } from '@/utils/hooks/useLayout'
import { UserDropdown } from './UserDropdown'

/** Top bar: nav toggle, search, quick actions, user menu. */
export function Header() {
  const { toggleNav, mode, toggleMode } = useLayout()
  const setConfigOpen = useThemeStore((s) => s.setConfigOpen)

  return (
    <header className="sticky top-0 z-sticky flex h-16 items-center gap-2 border-b border-border bg-surface/95 px-4 backdrop-blur">
      <Button
        size="sm"
        shape="circle"
        variant="plain"
        aria-label="Toggle navigation"
        icon={<Icon as={TbIcons.TbMenu2} size={20} />}
        onClick={toggleNav}
      />

      <label className="ml-1 hidden items-center gap-2 rounded-md bg-surface-sunken px-3 py-1.5 text-sm text-content-faint sm:flex">
        <Icon as={TbIcons.TbSearch} size={16} />
        <input
          type="search"
          name="app-search"
          placeholder="Search…"
          className="w-40 bg-transparent outline-none placeholder:text-content-faint"
          aria-label="Search"
        />
      </label>

      <div className="ml-auto flex items-center gap-1">
        <Button
          size="sm"
          shape="circle"
          variant="plain"
          aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          icon={<Icon as={mode === 'dark' ? TbIcons.TbSun : TbIcons.TbMoon} size={18} />}
          onClick={toggleMode}
        />
        <Button
          size="sm"
          shape="circle"
          variant="plain"
          aria-label="Notifications"
          icon={<Icon as={TbIcons.TbBell} size={18} />}
        />
        <Button
          size="sm"
          shape="circle"
          variant="plain"
          aria-label="Theme settings"
          icon={<Icon as={TbIcons.TbSettings} size={18} />}
          onClick={() => setConfigOpen(true)}
        />
        <UserDropdown />
      </div>
    </header>
  )
}
