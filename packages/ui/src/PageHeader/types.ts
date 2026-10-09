import type { HTMLAttributes, ReactNode } from 'react'

export type PageHeaderHeading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Page title. */
  title: ReactNode
  /** Supporting text displayed below the title. */
  description?: ReactNode
  /** Page-level actions aligned opposite the title. */
  actions?: ReactNode
  /** Breadcrumb slot displayed above the title row. */
  breadcrumb?: ReactNode
  /** Back-navigation slot displayed before the title block. */
  back?: ReactNode
  /** Heading element. @default 'h1' */
  as?: PageHeaderHeading
}
