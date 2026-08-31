import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { navigationConfig, type NavItem } from '@/configs/navigation.config'

export interface MenuActive {
  /** Key of the deepest nav item matching the current route. */
  activeKey: string | null
  /** Key of its parent group, for keeping the group expanded. */
  parentKey: string | null
}

const scorePath = (routePath: string, itemPath: string): number => {
  if (routePath === itemPath) return itemPath.length + 1
  if (routePath.startsWith(itemPath + '/')) return itemPath.length
  return 0
}

/**
 * Resolves which side-nav item is active for the current route (Eyris
 * `useMenuActive`). Uses a longest-prefix match so `/sales/orders/42` still
 * lights up the `Orders` item.
 */
export function useMenuActive(items: NavItem[] = navigationConfig): MenuActive {
  const { pathname } = useLocation()

  return useMemo(() => {
    let best: MenuActive = { activeKey: null, parentKey: null }
    let bestScore = 0

    for (const group of items) {
      for (const child of group.children ?? []) {
        if (!child.path) continue
        const score = scorePath(pathname, child.path)
        if (score > bestScore) {
          bestScore = score
          best = { activeKey: child.key, parentKey: group.key }
        }
      }
      if (group.path) {
        const score = scorePath(pathname, group.path)
        if (score > bestScore) {
          bestScore = score
          best = { activeKey: group.key, parentKey: null }
        }
      }
    }

    return best
  }, [pathname, items])
}
