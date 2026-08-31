import { EmptyState } from '@dylan-ds/ui'
import { PageHeader } from '@/components/shared/PageHeader'

export interface PagePlaceholderProps {
  title: string
  /** Which P4 batch will build this screen out. */
  area: string
}

/**
 * Stand-in for an app screen that is routed but not yet built. Replaced by the
 * real view in the corresponding P4 area batch.
 */
export function PagePlaceholder({ title, area }: PagePlaceholderProps) {
  return (
    <div>
      <PageHeader title={title} description={`Showcase area: ${area}`} />
      <EmptyState>
        <div className="space-y-1 text-center">
          <p className="font-medium text-content">Screen not built yet</p>
          <p className="text-sm text-content-muted">
            This route is wired so navigation works. The {area} screens land in a later P4 batch.
          </p>
        </div>
      </EmptyState>
    </div>
  )
}
