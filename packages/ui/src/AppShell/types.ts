import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import type { ContainerSize } from '../Container'
import type { ActiveBreakpoint } from '../hooks'

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  /** Controlled collapsed state of the desktop sidebar. */
  sidebarCollapsed?: boolean
  /** Initial collapsed state when uncontrolled. @default false */
  defaultSidebarCollapsed?: boolean
  onSidebarCollapsedChange?: (collapsed: boolean) => void
  /** Controlled open state of the mobile navigation drawer. */
  mobileNavOpen?: boolean
  /** Initial mobile drawer state when uncontrolled. @default false */
  defaultMobileNavOpen?: boolean
  onMobileNavOpenChange?: (open: boolean) => void
  /** Viewport width at (and above) which the sidebar is persistent. @default 'lg' */
  mobileBreakpoint?: Exclude<ActiveBreakpoint, 'base'>
}

export interface AppShellSidebarProps extends HTMLAttributes<HTMLElement> {
  /** Accessible name of the navigation landmark. @default 'Navigation' */
  'aria-label'?: string
}

export type AppShellContentProps = HTMLAttributes<HTMLDivElement>

export type AppShellHeaderProps = HTMLAttributes<HTMLElement>

export interface AppShellMainProps extends HTMLAttributes<HTMLElement> {
  /**
   * Centre content in a Container of this size. Omit (default) for the fluid
   * app layout — content spans from the sidebar to the viewport edge.
   */
  containerSize?: ContainerSize
}

export type AppShellFooterProps = HTMLAttributes<HTMLElement>

export interface AppShellMobileNavTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Custom icon; defaults to a menu glyph. */
  icon?: ReactNode
}
