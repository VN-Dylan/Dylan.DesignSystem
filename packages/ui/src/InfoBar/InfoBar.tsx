import { forwardRef, type CSSProperties } from 'react'
import { classNames } from '@dylan-ds/utils'
import type { InfoBarLevel, InfoBarProps } from './types'
import './InfoBar.scss'

const levelValue: Record<InfoBarLevel, number> = {
  low: 1,
  medium: 2,
  high: 3,
}

/**
 * InfoBar displays a compact three-bar signal strength indicator.
 */
export const InfoBar = forwardRef<HTMLSpanElement, InfoBarProps>(function InfoBar(
  { level, height = 15, className, style, role = 'meter', 'aria-label': ariaLabel, ...rest },
  ref,
) {
  const value = levelValue[level]
  const infoBarStyle = {
    ...style,
    height,
  } satisfies CSSProperties

  return (
    <span
      ref={ref}
      role={role}
      aria-label={ariaLabel ?? `${level} signal`}
      aria-valuemin={0}
      aria-valuemax={3}
      aria-valuenow={value}
      data-level={level}
      className={classNames('dyl-info-bar', className)}
      style={infoBarStyle}
      {...rest}
    >
      {[1, 2, 3].map((bar) => (
        <span
          key={bar}
          className="dyl-info-bar__bar"
          data-index={bar}
          data-active={bar <= value || undefined}
          aria-hidden
        />
      ))}
    </span>
  )
})
