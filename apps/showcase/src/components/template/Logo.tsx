import { Link } from 'react-router-dom'

export interface LogoProps {
  /** Icon-only mark, for the collapsed side rail. */
  compact?: boolean
  className?: string
}

/** Brand mark for the showcase app. Placeholder identity — not a real brand. */
export function Logo({ compact = false, className }: LogoProps) {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2 font-semibold tracking-tight text-content ${className ?? ''}`}
    >
      <span
        aria-hidden
        className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary text-primary-fg"
      >
        D
      </span>
      {!compact && <span className="text-base">Dylan DS</span>}
    </Link>
  )
}
