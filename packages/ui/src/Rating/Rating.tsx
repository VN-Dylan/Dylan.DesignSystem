import { forwardRef, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, MouseEvent } from 'react'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { classNames, useControllableState } from '@vn-dylan/utils'
import type { RatingProps } from './types'
import './Rating.scss'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const formatRatingValue = (value: number) => Number(value.toFixed(2)).toString()

const getClickValue = (
  event: MouseEvent<HTMLButtonElement>,
  starValue: number,
  allowHalf: boolean,
) => {
  if (!allowHalf) return starValue

  const rect = event.currentTarget.getBoundingClientRect()
  if (rect.width === 0) return starValue

  const isRtl =
    event.currentTarget.closest('[dir="rtl"]') != null || document.documentElement.dir === 'rtl'
  const distance = isRtl ? rect.right - event.clientX : event.clientX - rect.left
  return distance <= rect.width / 2 ? starValue - 0.5 : starValue
}

/**
 * Rating displays a star score and can collect a single rating value.
 */
export const Rating = forwardRef<HTMLSpanElement, RatingProps>(function Rating(
  {
    value,
    defaultValue = 0,
    onChange,
    max = 5,
    allowHalf = false,
    readOnly = false,
    disabled = false,
    size = 'md',
    onHoverChange,
    name,
    className,
    onKeyDown,
    onMouseLeave,
    'aria-label': ariaLabel = 'Rating',
    ...rest
  },
  ref,
) {
  const starCount = Math.max(1, Math.floor(max))
  const step = allowHalf ? 0.5 : 1
  const [ratingValue, setRatingValue] = useControllableState<number>({
    value,
    defaultValue,
    onChange,
  })
  const [hoverValue, setHoverValue] = useState<number | null>(null)
  const starRefs = useRef<Array<HTMLButtonElement | null>>([])
  const interactive = !readOnly
  const currentValue = clamp(ratingValue, 0, starCount)
  const displayValue = hoverValue ?? currentValue

  const focusStarForValue = (nextValue: number) => {
    const index = nextValue === 0 ? 0 : Math.ceil(nextValue) - 1
    starRefs.current[index]?.focus()
  }

  const commitValue = (nextValue: number) => {
    const clamped = clamp(nextValue, 0, starCount)
    if (clamped !== currentValue) setRatingValue(clamped)
  }

  const previewValue = (nextValue: number | null) => {
    setHoverValue(nextValue)
    onHoverChange?.(nextValue)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (!disabled) {
      const keys = ['ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp', 'Home', 'End']
      if (keys.includes(event.key)) {
        event.preventDefault()
        const nextValue =
          event.key === 'Home'
            ? step
            : event.key === 'End'
              ? starCount
              : event.key === 'ArrowLeft' || event.key === 'ArrowDown'
                ? currentValue - step
                : currentValue + step
        const clamped = clamp(nextValue, 0, starCount)
        commitValue(clamped)
        focusStarForValue(clamped)
      }
    }
    onKeyDown?.(event)
  }

  const renderStar = (starValue: number) => {
    const fill = clamp(displayValue - (starValue - 1), 0, 1)
    const filledStyle: CSSProperties = { width: `${fill * 100}%` }
    const checked =
      currentValue === starValue ||
      (allowHalf && currentValue > starValue - 1 && currentValue < starValue)
    const content = (
      <span className="dyl-rating__star">
        <Icon as={TbIcons.TbStar} className="dyl-rating__empty" />
        <span className="dyl-rating__filled" style={filledStyle} aria-hidden>
          <Icon as={TbIcons.TbStarFilled} className="dyl-rating__filled-icon" />
        </span>
      </span>
    )

    if (!interactive) return <span key={starValue}>{content}</span>

    return (
      <button
        key={starValue}
        ref={(node) => {
          starRefs.current[starValue - 1] = node
        }}
        type="button"
        role="radio"
        aria-checked={checked}
        aria-label={`${starValue} stars`}
        disabled={disabled}
        tabIndex={
          disabled ? undefined : checked || (currentValue === 0 && starValue === 1) ? 0 : -1
        }
        className="dyl-rating__button"
        onClick={(event) => {
          const nextValue = getClickValue(event, starValue, allowHalf)
          commitValue(nextValue === currentValue ? 0 : nextValue)
        }}
        onMouseEnter={(event) => previewValue(getClickValue(event, starValue, allowHalf))}
        onMouseMove={(event) => previewValue(getClickValue(event, starValue, allowHalf))}
      >
        {content}
      </button>
    )
  }

  if (!interactive) {
    return (
      <span
        ref={ref}
        role="img"
        aria-label={`${formatRatingValue(currentValue)} out of ${starCount}`}
        data-size={size}
        className={classNames('dyl-rating', className)}
        {...rest}
      >
        {Array.from({ length: starCount }, (_, index) => renderStar(index + 1))}
      </span>
    )
  }

  return (
    <span
      ref={ref}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      data-size={size}
      data-disabled={disabled || undefined}
      className={classNames('dyl-rating', className)}
      onKeyDown={handleKeyDown}
      onMouseLeave={(event) => {
        previewValue(null)
        onMouseLeave?.(event)
      }}
      {...rest}
    >
      {name && <input type="hidden" name={name} value={currentValue} disabled={disabled} />}
      {Array.from({ length: starCount }, (_, index) => renderStar(index + 1))}
    </span>
  )
})
