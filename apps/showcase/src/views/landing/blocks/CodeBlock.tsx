import { SyntaxHighlighter } from '@vn-dylan/ui'

export interface CodeBlockProps {
  children: string
  /** `tsx` (default), `bash`, `ini`, `json`, … */
  language?: string
  showLineNumbers?: boolean
}

/**
 * Landing-page code sample — the design system's own `SyntaxHighlighter`, boxed
 * to match the surrounding cards.
 */
export function CodeBlock({ children, language = 'tsx', showLineNumbers = false }: CodeBlockProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <SyntaxHighlighter language={language} showLineNumbers={showLineNumbers}>
        {children.trim()}
      </SyntaxHighlighter>
    </div>
  )
}
