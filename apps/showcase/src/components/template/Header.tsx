import { AppShell, Button, Inline } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { useThemeStore } from '@/store/themeStore'
import { useLayout } from '@/utils/hooks/useLayout'
import { useTranslation } from '@/i18n'
import { LanguageSwitcher } from './LanguageSwitcher'
import { UserDropdown } from './UserDropdown'

/** Top bar: nav toggle, search, quick actions, user menu. */
export function Header() {
  const { toggleNav, mode, toggleMode } = useLayout()
  const setConfigOpen = useThemeStore((s) => s.setConfigOpen)
  const { t } = useTranslation()

  return (
    <AppShell.Header>
      <Button
        size="sm"
        shape="circle"
        variant="plain"
        aria-label={t('header.toggleNav')}
        icon={<Icon as={TbIcons.TbMenu2} size={20} />}
        onClick={toggleNav}
      />

      <label className="ms-1 hidden items-center gap-2 rounded-md bg-surface-sunken px-3 py-2 text-sm text-content-faint sm:flex">
        <Icon as={TbIcons.TbSearch} size={16} />
        <input
          type="search"
          name="app-search"
          placeholder={t('header.search')}
          className="w-40 bg-transparent outline-none placeholder:text-content-faint"
          aria-label={t('header.search')}
        />
      </label>

      <Inline gap={1} className="ms-auto">
        <LanguageSwitcher />
        <Button
          size="sm"
          shape="circle"
          variant="plain"
          aria-label={mode === 'dark' ? t('header.lightMode') : t('header.darkMode')}
          icon={<Icon as={mode === 'dark' ? TbIcons.TbSun : TbIcons.TbMoon} size={18} />}
          onClick={toggleMode}
        />
        <Button
          size="sm"
          shape="circle"
          variant="plain"
          aria-label={t('header.notifications')}
          icon={<Icon as={TbIcons.TbBell} size={18} />}
        />
        <Button
          size="sm"
          shape="circle"
          variant="plain"
          aria-label={t('header.themeSettings')}
          icon={<Icon as={TbIcons.TbSettings} size={18} />}
          onClick={() => setConfigOpen(true)}
        />
        <UserDropdown />
      </Inline>
    </AppShell.Header>
  )
}
