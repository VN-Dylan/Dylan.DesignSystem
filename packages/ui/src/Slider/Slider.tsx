import { forwardRef, useState, type CSSProperties, type ChangeEvent } from 'react'
import { classNames as cx, useControllableState } from '@vn-dylan/utils'
import type { SliderMark, SliderProps, SliderRangeProps, SliderRangeValue } from './types'
import './Slider.scss'

type SliderStyle = CSSProperties & Record<string, string>

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const toPercent = (value: number, min: number, max: number) => {
  if (max <= min) return 0
  return clamp(((value - min) / (max - min)) * 100, 0, 100)
}

const snapToMark = (value: number, marks: SliderMark[]) =>
  marks.reduce((nearest, mark) =>
    Math.abs(mark.value - value) < Math.abs(nearest.value - value) ? mark : nearest,
  ).value

const normalizeValue = ({
  value,
  min,
  max,
  step,
  precision,
  stepOnMarks,
  marks,
}: {
  value: number
  min: number
  max: number
  step: number
  precision?: number
  stepOnMarks: boolean
  marks: SliderMark[]
}) => {
  const snapped =
    stepOnMarks && marks.length > 0
      ? snapToMark(value, marks)
      : Math.round((value - min) / step) * step + min
  const clamped = clamp(snapped, min, max)
  return precision === undefined ? clamped : Number(clamped.toFixed(precision))
}

const renderTooltip = <T,>(
  tooltip: SliderProps['tooltip'] | SliderRangeProps['tooltip'],
  value: T,
) => (typeof tooltip === 'function' ? tooltip(value as never) : (tooltip ?? String(value)))

const renderMarks = ({
  marks,
  min,
  max,
  isFilled,
  className,
}: {
  marks: SliderMark[]
  min: number
  max: number
  isFilled: (value: number) => boolean
  className?: string | ((isFilled: boolean) => string)
}) => (
  <div className="dyl-slider__marks">
    {marks.map((mark) => {
      const filled = isFilled(mark.value)
      const markClassName = typeof className === 'function' ? className(filled) : className
      return (
        <span
          key={mark.value}
          className={cx('dyl-slider__mark', markClassName)}
          data-filled={filled || undefined}
          style={{ '--dyl-slider-mark': `${toPercent(mark.value, min, max)}%` } as SliderStyle}
        >
          <span className="dyl-slider__mark-dot" aria-hidden />
          {mark.label != null && <span className="dyl-slider__mark-label">{mark.label}</span>}
        </span>
      )
    })}
  </div>
)

const SliderRoot = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    alwaysShowTooltip = false,
    classNames,
    defaultValue,
    disabled = false,
    inputProps,
    marks = [],
    max = 100,
    min = 0,
    name,
    onChange,
    onDraggingStop,
    precision,
    showTooltipOnHover = false,
    step = 1,
    stepOnMarks = false,
    thumbAriaLabel,
    tooltip,
    value,
    className,
    ...rest
  },
  ref,
) {
  const [current, setCurrent] = useControllableState<number>({
    value,
    defaultValue: defaultValue ?? min,
    onChange,
  })
  const [active, setActive] = useState(false)

  const normalized = normalizeValue({
    value: current,
    min,
    max,
    step,
    precision,
    stepOnMarks,
    marks,
  })
  const percent = toPercent(normalized, min, max)
  const showTooltip = alwaysShowTooltip || (showTooltipOnHover && active)
  const {
    className: inputClassName,
    onChange: inputOnChange,
    onMouseUp: inputOnMouseUp,
    onTouchEnd: inputOnTouchEnd,
    onKeyUp: inputOnKeyUp,
    ...restInputProps
  } = inputProps ?? {}

  const commit = (raw: number) =>
    setCurrent(normalizeValue({ value: raw, min, max, step, precision, stepOnMarks, marks }))

  return (
    <div
      ref={ref}
      data-disabled={disabled || undefined}
      data-show-tooltip={showTooltip || undefined}
      className={cx('dyl-slider', className)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      {...rest}
    >
      <div className={cx('dyl-slider__track', classNames?.track)}>
        <span
          className={cx('dyl-slider__bar', classNames?.bar)}
          style={
            {
              '--dyl-slider-start': '0%',
              '--dyl-slider-end': `${percent}%`,
            } as SliderStyle
          }
        />
        <span
          className={cx('dyl-slider__thumb', classNames?.thumb)}
          style={{ '--dyl-slider-thumb': `${percent}%` } as SliderStyle}
        >
          {showTooltip && (
            <span className="dyl-slider__tooltip">{renderTooltip(tooltip, normalized)}</span>
          )}
        </span>
        <input
          {...restInputProps}
          type="range"
          min={min}
          max={max}
          step={stepOnMarks ? 'any' : step}
          name={name}
          value={normalized}
          disabled={disabled}
          aria-label={thumbAriaLabel ?? 'Slider value'}
          className={cx('dyl-slider__input', inputClassName)}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            inputOnChange?.(event)
            commit(event.currentTarget.valueAsNumber)
          }}
          onMouseUp={(event) => {
            inputOnMouseUp?.(event)
            onDraggingStop?.(normalized)
          }}
          onTouchEnd={(event) => {
            inputOnTouchEnd?.(event)
            onDraggingStop?.(normalized)
          }}
          onKeyUp={(event) => {
            inputOnKeyUp?.(event)
            onDraggingStop?.(normalized)
          }}
        />
      </div>
      {marks.length > 0 &&
        renderMarks({
          marks,
          min,
          max,
          isFilled: (markValue) => markValue <= normalized,
          className: classNames?.mark,
        })}
    </div>
  )
})

const Range = forwardRef<HTMLDivElement, SliderRangeProps>(function SliderRange(
  {
    alwaysShowTooltip = false,
    defaultValue,
    disabled = false,
    inputProps,
    marks = [],
    max = 100,
    maxRange,
    min = 0,
    minRange = 0,
    name,
    precision,
    onChange,
    onDraggingStop,
    showTooltipOnHover = false,
    step = 1,
    stepOnMarks = false,
    thumbAriaLabelStart,
    thumbAriaLabelEnd,
    tooltip,
    value,
    className,
    ...rest
  },
  ref,
) {
  const [values, setValues] = useControllableState<SliderRangeValue>({
    value,
    defaultValue: defaultValue ?? [min, max],
    onChange,
  })
  const [active, setActive] = useState(false)

  const normalize = (raw: number) =>
    normalizeValue({ value: raw, min, max, step, precision, stepOnMarks, marks })

  const applyConstraints = (next: SliderRangeValue, moving: 'start' | 'end'): SliderRangeValue => {
    const start = normalize(next[0])
    const end = normalize(next[1])
    if (moving === 'start') {
      const upper = Math.min(end - minRange, maxRange === undefined ? max : end - maxRange)
      return [clamp(start, min, upper), end]
    }

    const lower = Math.max(start + minRange, maxRange === undefined ? min : start + maxRange)
    return [start, clamp(end, lower, max)]
  }

  const current: SliderRangeValue =
    values[0]! <= values[1]! ? [values[0]!, values[1]!] : [values[1]!, values[0]!]
  const startPercent = toPercent(current[0], min, max)
  const endPercent = toPercent(current[1], min, max)
  const showTooltip = alwaysShowTooltip || (showTooltipOnHover && active)
  const {
    className: inputClassName,
    onChange: inputOnChange,
    onMouseUp: inputOnMouseUp,
    onTouchEnd: inputOnTouchEnd,
    onKeyUp: inputOnKeyUp,
    ...restInputProps
  } = inputProps ?? {}

  const update = (nextValue: number, moving: 'start' | 'end') => {
    setValues((previous) => {
      const ordered: SliderRangeValue =
        previous[0]! <= previous[1]! ? [previous[0]!, previous[1]!] : [previous[1]!, previous[0]!]
      return applyConstraints(
        moving === 'start' ? [nextValue, ordered[1]] : [ordered[0], nextValue],
        moving,
      )
    })
  }

  const stop = () => onDraggingStop?.(current)

  return (
    <div
      ref={ref}
      data-disabled={disabled || undefined}
      data-show-tooltip={showTooltip || undefined}
      className={cx('dyl-slider dyl-slider--range', className)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      {...rest}
    >
      <div className="dyl-slider__track">
        <span
          className="dyl-slider__bar"
          style={
            {
              '--dyl-slider-start': `${startPercent}%`,
              '--dyl-slider-end': `${endPercent}%`,
            } as SliderStyle
          }
        />
        <span
          className="dyl-slider__thumb"
          data-thumb="start"
          style={{ '--dyl-slider-thumb': `${startPercent}%` } as SliderStyle}
        >
          {showTooltip && (
            <span className="dyl-slider__tooltip">{renderTooltip(tooltip, current)}</span>
          )}
        </span>
        <span
          className="dyl-slider__thumb"
          data-thumb="end"
          style={{ '--dyl-slider-thumb': `${endPercent}%` } as SliderStyle}
        />
        <input
          {...restInputProps}
          type="range"
          min={min}
          max={max}
          step={stepOnMarks ? 'any' : step}
          name={name ? `${name}-start` : undefined}
          value={current[0]}
          disabled={disabled}
          aria-label={thumbAriaLabelStart ?? 'Start value'}
          className={cx('dyl-slider__input', inputClassName)}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            inputOnChange?.(event)
            update(event.currentTarget.valueAsNumber, 'start')
          }}
          onMouseUp={(event) => {
            inputOnMouseUp?.(event)
            stop()
          }}
          onTouchEnd={(event) => {
            inputOnTouchEnd?.(event)
            stop()
          }}
          onKeyUp={(event) => {
            inputOnKeyUp?.(event)
            stop()
          }}
        />
        <input
          {...restInputProps}
          type="range"
          min={min}
          max={max}
          step={stepOnMarks ? 'any' : step}
          name={name ? `${name}-end` : undefined}
          value={current[1]}
          disabled={disabled}
          aria-label={thumbAriaLabelEnd ?? 'End value'}
          className={cx('dyl-slider__input', inputClassName)}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            inputOnChange?.(event)
            update(event.currentTarget.valueAsNumber, 'end')
          }}
          onMouseUp={(event) => {
            inputOnMouseUp?.(event)
            stop()
          }}
          onTouchEnd={(event) => {
            inputOnTouchEnd?.(event)
            stop()
          }}
          onKeyUp={(event) => {
            inputOnKeyUp?.(event)
            stop()
          }}
        />
      </div>
      {marks.length > 0 &&
        renderMarks({
          marks,
          min,
          max,
          isFilled: (markValue) => markValue >= current[0] && markValue <= current[1],
        })}
    </div>
  )
})

/**
 * Slider selects a value within a numeric range.
 */
export const Slider = Object.assign(SliderRoot, { Range })
