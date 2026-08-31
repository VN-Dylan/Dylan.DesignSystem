export type StatusTone = 'success' | 'warning' | 'error' | 'info' | 'neutral'

const TONE_CLASS: Record<StatusTone, string> = {
  success: 'bg-success-subtle text-success',
  warning: 'bg-warning-subtle text-warning',
  error: 'bg-error-subtle text-error',
  info: 'bg-info-subtle text-info',
  neutral: 'bg-surface-sunken text-content-muted',
}

export interface StatusTagProps {
  children: string
  tone?: StatusTone
}

/**
 * Coloured status pill. Pick a tone by semantic meaning, not by label.
 * Single-word labels (`active`, `paid`, …) are capitalised; multi-word labels
 * are shown verbatim.
 *
 * Rendered as a plain span rather than `<Tag>` so the tone background wins —
 * `.dyl-tag` sets its own `bg`/`text` that a utility class can't override.
 */
export function StatusTag({ children, tone = 'neutral' }: StatusTagProps) {
  const cased = children.includes(' ')
    ? children
    : children.charAt(0).toUpperCase() + children.slice(1)
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium leading-none ${TONE_CLASS[tone]}`}
    >
      {cased}
    </span>
  )
}
