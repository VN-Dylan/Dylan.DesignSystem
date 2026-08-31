import { forwardRef, type CSSProperties } from 'react'
import { classNames } from '@dylan-ds/utils'
import type { ClockProgressProps } from './types'
import './ClockProgress.scss'

type ClockProgressStyle = CSSProperties & {
  '--dyl-clock-progress-angle': string
}

const clamp = (value: number | undefined) => Math.min(100, Math.max(0, value ?? 0))

/**
 * ClockProgress displays percentage progress as a circular clock-face fill.
 */
export const ClockProgress = forwardRef<HTMLDivElement, ClockProgressProps>(function ClockProgress(
  { value, size = 40, className, style, role = 'progressbar', 'aria-label': ariaLabel, ...rest },
  ref,
) {
  const progress = clamp(value)
  const progressStyle = {
    ...style,
    width: size,
    height: size,
    '--dyl-clock-progress-angle': `${progress * 3.6}deg`,
  } satisfies ClockProgressStyle

  return (
    <div
      ref={ref}
      role={role}
      aria-label={ariaLabel ?? 'Progress'}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value == null ? undefined : progress}
      data-complete={progress === 100 || undefined}
      className={classNames('dyl-clock-progress', className)}
      style={progressStyle}
      {...rest}
    />
  )
})
