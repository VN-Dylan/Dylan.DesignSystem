import { useId, useState, type ReactNode } from 'react'
import { Button, SyntaxHighlighter } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'

export interface DemoProps {
  /** Component name or scenario, e.g. `Button` or `Button — loading`. */
  title: string
  /** Optional one-line note about what the example shows. */
  description?: ReactNode
  /**
   * Source snippet revealed by the "Code" toggle. Written by hand — keep it to
   * the shape a consumer would copy, not the demo's mock wiring.
   */
  code?: string
  /** Snippet language for the highlighter. @default 'tsx' */
  language?: string
  /** The live example. */
  children: ReactNode
}

/**
 * A single gallery example: a titled card on `bg-surface` holding the live
 * component, with an optional collapsible source snippet rendered through the
 * design system's own `SyntaxHighlighter`.
 */
export function Demo({ title, description, code, language = 'tsx', children }: DemoProps) {
  const [showCode, setShowCode] = useState(false)
  const codeRegionId = useId()

  return (
    <section className="overflow-hidden rounded-lg border border-border bg-surface">
      <header className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
        <div className="space-y-0.5">
          <h3 className="text-sm font-semibold text-content">{title}</h3>
          {description && <p className="text-xs text-content-muted">{description}</p>}
        </div>
        {code && (
          <Button
            size="xs"
            variant="plain"
            aria-expanded={showCode}
            aria-controls={codeRegionId}
            icon={<Icon as={showCode ? TbIcons.TbX : TbIcons.TbCode} size={16} />}
            onClick={() => setShowCode((open) => !open)}
          >
            Code
          </Button>
        )}
      </header>

      <div className="flex flex-wrap items-start gap-4 bg-surface-sunken px-4 py-6">{children}</div>

      {code && showCode && (
        <div id={codeRegionId} className="border-t border-border">
          <SyntaxHighlighter language={language} showLineNumbers>
            {code.trim()}
          </SyntaxHighlighter>
        </div>
      )}
    </section>
  )
}

/** Horizontal cluster for variant / size / state rows. */
Demo.Row = function DemoRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>
}

/** Responsive grid for side-by-side examples. */
Demo.Grid = function DemoGrid({ children }: { children: ReactNode }) {
  return <div className="grid w-full gap-4 sm:grid-cols-2">{children}</div>
}

/** Full-width stack — for inputs and anything that should not sit inline. */
Demo.Stack = function DemoStack({ children }: { children: ReactNode }) {
  return <div className="w-full max-w-sm space-y-3">{children}</div>
}
