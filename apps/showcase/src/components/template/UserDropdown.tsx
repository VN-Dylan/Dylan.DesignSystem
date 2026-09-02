import { useNavigate } from 'react-router-dom'
import { Avatar, Dropdown } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { useAuth } from '@/utils/hooks/useAuth'

/** User menu anchored to the header avatar. */
export function UserDropdown() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  return (
    <Dropdown
      placement="bottom-end"
      renderTitle={
        <button
          type="button"
          className="flex items-center gap-2 rounded-full p-1 hover:bg-surface-sunken"
          aria-label="Account menu"
        >
          <Avatar size="sm" shape="circle" src={user?.avatar} alt={user?.name} />
        </button>
      }
    >
      <Dropdown.Item variant="header">
        <div className="leading-tight">
          <p className="font-medium text-content">{user?.name ?? 'Guest'}</p>
          <p className="text-xs text-content-faint">{user?.email}</p>
        </div>
      </Dropdown.Item>
      <Dropdown.Item eventKey="profile" onSelect={() => navigate('/accounts/settings/profile')}>
        <Icon as={TbIcons.TbUser} size={16} className="me-2 inline" />
        Profile
      </Dropdown.Item>
      <Dropdown.Item eventKey="activity" onSelect={() => navigate('/accounts/activity')}>
        <Icon as={TbIcons.TbClipboardList} size={16} className="me-2 inline" />
        Activity log
      </Dropdown.Item>
      <Dropdown.Item variant="divider" />
      <Dropdown.Item
        eventKey="signout"
        onSelect={() => {
          signOut()
          navigate('/auth/sign-in')
        }}
      >
        <Icon as={TbIcons.TbLogout} size={16} className="me-2 inline" />
        Sign out
      </Dropdown.Item>
    </Dropdown>
  )
}
