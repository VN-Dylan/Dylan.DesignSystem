import { forwardRef, type CSSProperties } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { SegmentProgressBarProps } from './types'
import './SegmentProgressBar.scss'

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/**
 * SegmentProgressBar displays progress as discrete filled segments.
 */
export const SegmentProgressBar = forwardRef<HTMLDivElement, SegmentProgressBarProps>(
  function SegmentProgressBar(
    {
      segments,
      percent,
      filledClass = 'bg-emerald-500',
      className,
      gap = 4,
      height = 16,
      'aria-label': ariaLabel = 'Segment progress',
      style,
      ...rest
    },
    ref,
  ) {
    const safeSegments = Math.max(0, Math.floor(segments))
    const value = clamp(percent, 0, 100)
    const filledSegments = Math.round((safeSegments * value) / 100)
    const segmentStyle = { height } satisfies CSSProperties
    const rootStyle = { gap } satisfies CSSProperties

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-label={ariaLabel}
        className="dyl-segment-progress-bar"
        style={{ ...rootStyle, ...style }}
        {...rest}
      >
        {Array.from({ length: safeSegments }, (_, index) => {
          const filled = index < filledSegments
          return (
            <span
              key={index}
              aria-hidden
              data-filled={filled || undefined}
              className={classNames(
                'dyl-segment-progress-bar__segment',
                className,
                filled && filledClass,
              )}
              style={segmentStyle}
            />
          )
        })}
      </div>
    )
  },
)
