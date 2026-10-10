import { Button, Dropdown } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { locales, useTranslation } from '@/i18n'

/** Header language menu. The choice is persisted and applied app-wide. */
export function LanguageSwitcher() {
  const { locale, setLocale, t } = useTranslation()

  return (
    <Dropdown
      placement="bottom-end"
      renderTitle={
        <Button
          size="sm"
          variant="plain"
          aria-label={t('header.language')}
          icon={<Icon as={TbIcons.TbLanguage} size={18} />}
        >
          <span className="hidden text-xs font-semibold uppercase sm:inline">{locale}</span>
        </Button>
      }
    >
      {locales.map((option) => (
        <Dropdown.Item
          key={option.code}
          eventKey={option.code}
          active={option.code === locale}
          onSelect={() => setLocale(option.code)}
        >
          <span lang={option.intl}>{option.label}</span>
        </Dropdown.Item>
      ))}
    </Dropdown>
  )
}
