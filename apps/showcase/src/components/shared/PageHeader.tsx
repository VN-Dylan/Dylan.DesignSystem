import type { ReactNode } from 'react'

export interface PageHeaderProps {
  title: string
  description?: string
  /** Right-aligned actions (buttons, filters). */
  actions?: ReactNode
}

/** Consistent page title block for app screens. */
export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight text-content">{title}</h1>
        {description && <p className="text-sm text-content-muted">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
