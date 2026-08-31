import { forwardRef, type CSSProperties } from 'react'
import { classNames } from '@dylan-ds/utils'
import type { ProgressGapPosition, ProgressProps } from './types'
import './Progress.scss'

const clampPercent = (value: number) => Math.min(100, Math.max(0, value))

const rotationByGapPosition: Record<ProgressGapPosition, number> = {
  top: -90,
  right: 0,
  bottom: 90,
  left: 180,
}

/**
 * Visual progress indicator for determinate operations.
 */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  {
    customInfo,
    gapDegree = 0,
    gapPosition = 'top',
    percent = 0,
    showInfo = true,
    size = 'md',
    strokeClass,
    strokeLinecap = 'round',
    strokeWidth = 6,
    trailClass,
    variant = 'line',
    width = 'line',
    className,
    'aria-label': ariaLabel = 'Progress',
    ...rest
  },
  ref,
) {
  const value = clampPercent(percent)
  const info = customInfo ?? `${value}%`

  const circleWidth = variant === 'circle' && width !== 'line' ? width : undefined
  const circleStyle = { width: circleWidth, height: circleWidth } satisfies CSSProperties
  const gap = Math.min(360, Math.max(0, gapDegree))
  const visibleDegree = 360 - gap
  const radius = 50 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  const visibleLength = circumference * (visibleDegree / 360)
  const hiddenLength = circumference - visibleLength
  const progressOffset = visibleLength * (1 - value / 100)
  // SVG transform attribute (not CSS) so rotation pivots on the circle centre,
  // not the SVG origin.
  const circleRotation = `rotate(${rotationByGapPosition[gapPosition]} 50 50)`

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      aria-label={ariaLabel}
      data-variant={variant}
      data-size={size}
      className={classNames('dyl-progress', className)}
      {...rest}
    >
      {variant === 'circle' ? (
        <div className="dyl-progress__circle" style={circleStyle}>
          <svg className="dyl-progress__svg" viewBox="0 0 100 100" aria-hidden>
            <g transform={circleRotation}>
              <circle
                className={classNames('dyl-progress__circle-trail', trailClass)}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                strokeWidth={strokeWidth}
                strokeDasharray={`${visibleLength} ${hiddenLength}`}
                strokeLinecap={strokeLinecap}
              />
              <circle
                className={classNames('dyl-progress__circle-value', strokeClass)}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                strokeWidth={strokeWidth}
                strokeDasharray={`${visibleLength} ${hiddenLength}`}
                strokeDashoffset={progressOffset}
                strokeLinecap={strokeLinecap}
              />
            </g>
          </svg>
          {showInfo && <span className="dyl-progress__circle-info">{info}</span>}
        </div>
      ) : (
        <>
          <div className={classNames('dyl-progress__line-trail', trailClass)}>
            <div
              className={classNames('dyl-progress__line-value', strokeClass)}
              style={{ width: `${value}%` }}
            />
          </div>
          {showInfo && <span className="dyl-progress__line-info">{info}</span>}
        </>
      )}
    </div>
  )
})
