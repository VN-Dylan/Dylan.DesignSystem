import { useNavigate } from 'react-router-dom'
import { Avatar, Dropdown } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { useTranslation } from '@/i18n'
import { useAuth } from '@/utils/hooks/useAuth'

/** User menu anchored to the header avatar. */
export function UserDropdown() {
  const navigate = useNavigate()
  const { user, roles, signOut } = useAuth()
  const { t } = useTranslation()
  const roleLabel = roles.map((role) => t(`roles.${role}`)).join(', ')

  return (
    <Dropdown
      placement="bottom-end"
      renderTitle={
        <button
          type="button"
          className="flex items-center gap-2 rounded-full p-1 hover:bg-surface-sunken"
          aria-label={t('userMenu.label')}
        >
          <Avatar size="sm" shape="circle" src={user?.avatar} alt={user?.name} />
        </button>
      }
    >
      <Dropdown.Item variant="header">
        <div className="leading-tight">
          <p className="font-medium text-content">{user?.name ?? t('userMenu.guest')}</p>
          <p className="text-xs text-content-faint">{user?.email}</p>
          {roleLabel && (
            <p className="mt-1 text-xs text-content-muted">
              {t('userMenu.role', { role: roleLabel })}
            </p>
          )}
        </div>
      </Dropdown.Item>
      <Dropdown.Item eventKey="profile" onSelect={() => navigate('/accounts/settings/profile')}>
        <Icon as={TbIcons.TbUser} size={16} className="me-2 inline" />
        {t('userMenu.profile')}
      </Dropdown.Item>
      <Dropdown.Item eventKey="activity" onSelect={() => navigate('/accounts/activity')}>
        <Icon as={TbIcons.TbClipboardList} size={16} className="me-2 inline" />
        {t('userMenu.activity')}
      </Dropdown.Item>
      <Dropdown.Item variant="divider" />
      <Dropdown.Item
        eventKey="signout"
        onSelect={async () => {
          await signOut()
          navigate('/auth/sign-in')
        }}
      >
        <Icon as={TbIcons.TbLogout} size={16} className="me-2 inline" />
        {t('userMenu.signOut')}
      </Dropdown.Item>
    </Dropdown>
  )
}
