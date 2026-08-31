import {
  createElement,
  forwardRef,
  useCallback,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'
import { classNames } from '@dylan-ds/utils'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { MenuProvider, useMenuContext } from './context'
import type { MenuCollapseProps, MenuGroupProps, MenuItemProps, MenuProps } from './types'
import './Menu.scss'

const toSet = (items: string[] | undefined) => new Set(items ?? [])

const MenuItem = forwardRef<HTMLElement, MenuItemProps>(function MenuItem(
  {
    asElement = 'div',
    disabled = false,
    hierarchyIndicator = false,
    eventKey,
    isActive = false,
    menuItemHeight,
    onSelect,
    onClick,
    onKeyDown,
    className,
    children,
    style,
    ...rest
  },
  ref,
) {
  const context = useMenuContext()
  const selected = isActive || (eventKey != null && context?.activeKeys.has(eventKey))
  const itemHeight = menuItemHeight ?? context?.menuItemHeight ?? 40

  const commit = (event: MouseEvent<HTMLElement>) => {
    if (disabled) return
    onClick?.(event)
    if (event.defaultPrevented) return
    const resolvedKey = eventKey ?? ''
    onSelect?.(resolvedKey, event)
    context?.onSelect(event, resolvedKey)
  }

  return createElement(
    asElement,
    {
      ref,
      role: 'menuitem',
      tabIndex: disabled ? -1 : 0,
      'aria-disabled': disabled || undefined,
      'data-active': selected || undefined,
      'data-disabled': disabled || undefined,
      'data-hierarchy-indicator': hierarchyIndicator || undefined,
      className: classNames('dyl-menu__item', className),
      style: { ...style, height: itemHeight } satisfies CSSProperties,
      onClick: commit,
      onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          commit(event as unknown as MouseEvent<HTMLElement>)
        }
        onKeyDown?.(event)
      },
      ...rest,
    },
    <>
      {hierarchyIndicator && <span className="dyl-menu__indicator" aria-hidden />}
      <span className="dyl-menu__label">{children}</span>
    </>,
  )
})

const MenuCollapse = forwardRef<HTMLDivElement, MenuCollapseProps>(function MenuCollapse(
  {
    active = true,
    eventKey,
    expanded,
    indent = true,
    label,
    onToggle,
    className,
    children,
    ...rest
  },
  ref,
) {
  const context = useMenuContext()
  const fallbackExpanded = expanded ?? false
  const [localExpanded, setLocalExpanded] = useState(fallbackExpanded)
  const contentId = useId()
  const isExpanded =
    expanded ?? (eventKey != null && context?.expandedKeys.has(eventKey)) ?? localExpanded
  const isActive = active && eventKey != null && context?.collapseActiveKeys.has(eventKey)
  const itemHeight = context?.menuItemHeight ?? 40

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next = !isExpanded
    if (eventKey != null) context?.onToggle(eventKey, next)
    else setLocalExpanded(next)
    onToggle?.(next, event)
  }

  return (
    <div
      ref={ref}
      className={classNames('dyl-menu__collapse', className)}
      data-expanded={isExpanded || undefined}
      data-active={isActive || undefined}
      {...rest}
    >
      <button
        type="button"
        role="menuitem"
        aria-expanded={isExpanded}
        aria-controls={contentId}
        data-active={isActive || undefined}
        className="dyl-menu__collapse-trigger"
        style={{ height: itemHeight }}
        onClick={toggle}
      >
        <span className="dyl-menu__label">{label}</span>
        <span className="dyl-menu__caret" aria-hidden>
          <Icon as={TbIcons.TbChevronRight} />
        </span>
      </button>
      <div
        id={contentId}
        role="group"
        hidden={!isExpanded}
        data-indent={indent || undefined}
        className="dyl-menu__collapse-content"
      >
        {children}
      </div>
    </div>
  )
})

const MenuGroup = forwardRef<HTMLDivElement, MenuGroupProps>(function MenuGroup(
  { label, className, children, ...rest },
  ref,
) {
  const ariaLabel = typeof label === 'string' ? label : undefined

  return (
    <div
      ref={ref}
      role="group"
      aria-label={ariaLabel}
      className={classNames('dyl-menu__group', className)}
      {...rest}
    >
      {label != null && <div className="dyl-menu__group-label">{label}</div>}
      {children}
    </div>
  )
})

const MenuRoot = forwardRef<HTMLDivElement, MenuProps>(function MenuRoot(
  {
    defaultActiveKeys = [],
    defaultCollapseActiveKeys = [],
    defaultExpandedKeys = [],
    menuItemHeight = 40,
    onSelect,
    sideCollapsed = false,
    variant = 'light',
    className,
    children,
    ...rest
  },
  ref,
) {
  const [activeKeys, setActiveKeys] = useState(() => toSet(defaultActiveKeys))
  const [expandedKeys, setExpandedKeys] = useState(() => toSet(defaultExpandedKeys))
  const collapseActiveKeys = useMemo(
    () => toSet(defaultCollapseActiveKeys),
    [defaultCollapseActiveKeys],
  )

  const handleSelect = useCallback(
    (event: MouseEvent<HTMLElement>, eventKey: string) => {
      setActiveKeys(new Set([eventKey]))
      onSelect?.(event, eventKey)
    },
    [onSelect],
  )

  const handleToggle = useCallback((eventKey: string, next: boolean) => {
    setExpandedKeys((previous) => {
      const resolved = new Set(previous)
      if (next) resolved.add(eventKey)
      else resolved.delete(eventKey)
      return resolved
    })
  }, [])

  const contextValue = useMemo(
    () => ({
      activeKeys,
      collapseActiveKeys,
      expandedKeys,
      menuItemHeight,
      sideCollapsed,
      variant,
      onSelect: handleSelect,
      onToggle: handleToggle,
    }),
    [
      activeKeys,
      collapseActiveKeys,
      expandedKeys,
      menuItemHeight,
      sideCollapsed,
      variant,
      handleSelect,
      handleToggle,
    ],
  )

  return (
    <MenuProvider value={contextValue}>
      <div
        ref={ref}
        role="menu"
        data-variant={variant}
        data-side-collapsed={sideCollapsed || undefined}
        className={classNames('dyl-menu', className)}
        {...rest}
      >
        {children}
      </div>
    </MenuProvider>
  )
})

/**
 * Menu lets users select a single item from a grouped navigation list.
 */
export const Menu = Object.assign(MenuRoot, { MenuCollapse, MenuGroup, MenuItem })
