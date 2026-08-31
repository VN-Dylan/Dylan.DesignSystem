import type { AnchorHTMLAttributes } from 'react'

export interface ActionLinkLocation {
  pathName: string
  search?: string
  hash?: string
}

export type ActionLinkTo = string | ActionLinkLocation

export interface ActionLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** When true, clicking the link replaces the current history entry. */
  replace?: boolean
  /** State to persist to the location as Link component in react-router. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state?: any
  /** Whether to apply theme color on this link. @default true */
  themeColor?: boolean
  /** Describes a location that is the destination of navigation. */
  to: ActionLinkTo
  /** Force normal document navigation for compatibility with react-router Link demos. */
  reloadDocument?: boolean
}
