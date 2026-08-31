import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu } from '@dylan-ds/ui'
import { Icon } from '@dylan-ds/icons'
import { navigationConfig, type NavItem } from '@/configs/navigation.config'
import { useMenuActive } from '@/utils/hooks/useMenuActive'
import { useAuth } from '@/utils/hooks/useAuth'
import { Logo } from './Logo'

export interface SideNavProps {
  /** Icon rail only. */
  collapsed?: boolean
}

/** Left navigation: grouped, single-open accordion, active-item accent. */
export function SideNav({ collapsed = false }: SideNavProps) {
  const navigate = useNavigate()
  const { can } = useAuth()
  const { activeKey, parentKey } = useMenuActive()
  // Single-open accordion: the group holding the active route, or a group the
  // user opened. Follows the route when it changes.
  const [openKey, setOpenKey] = useState<string | null>(parentKey)

  useEffect(() => {
    if (parentKey) setOpenKey(parentKey)
  }, [parentKey])

  const visible = (item: NavItem) => can(item.authority)

  const go = (path?: string) => {
    if (path) navigate(path)
  }

  return (
    <nav
      aria-label="Primary"
      data-collapsed={collapsed || undefined}
      className="flex h-full w-full flex-col border-r border-border bg-surface"
    >
      <div className="flex h-16 shrink-0 items-center px-4">
        <Logo compact={collapsed} />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
        <Menu sideCollapsed={collapsed} defaultActiveKeys={activeKey ? [activeKey] : []}>
          {navigationConfig.filter(visible).map((group) => {
            const children = (group.children ?? []).filter(visible)
            if (children.length === 0 && !group.path) return null

            if (children.length === 0) {
              return (
                <Menu.MenuItem
                  key={group.key}
                  eventKey={group.key}
                  isActive={activeKey === group.key}
                  onSelect={() => go(group.path)}
                >
                  {group.icon && (
                    <Icon as={group.icon} size={18} className="mr-2 inline shrink-0" />
                  )}
                  {group.title}
                </Menu.MenuItem>
              )
            }

            return (
              <Menu.MenuCollapse
                key={group.key}
                eventKey={group.key}
                label={
                  <span className="flex items-center gap-2">
                    {group.icon && <Icon as={group.icon} size={18} className="shrink-0" />}
                    {!collapsed && group.title}
                  </span>
                }
                expanded={openKey === group.key}
                onToggle={(open) => setOpenKey(open ? group.key : null)}
              >
                {children.map((child) => (
                  <Menu.MenuItem
                    key={child.key}
                    eventKey={child.key}
                    isActive={activeKey === child.key}
                    onSelect={() => go(child.path)}
                  >
                    {child.title}
                  </Menu.MenuItem>
                ))}
              </Menu.MenuCollapse>
            )
          })}
        </Menu>
      </div>
    </nav>
  )
}
