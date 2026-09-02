import { forwardRef, useEffect, useRef, useState, type ChangeEvent, type FocusEvent } from 'react'
import { TbIcons } from '@vn-dylan/icons'
import { classNames, useControllableState } from '@vn-dylan/utils'
import type {
  TimeInputFormat,
  TimeInputProps,
  TimeInputRangeProps,
  TimeInputRangeValue,
  TimeInputValue,
} from './types'
import './TimeInput.scss'

const pad = (value: number) => String(value).padStart(2, '0')
const digits = (value: string) => value.replace(/\D/g, '').slice(0, 2)
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const cloneBase = (value: TimeInputValue) => {
  const next = value ? new Date(value) : new Date()
  if (!value) next.setHours(0, 0, 0, 0)
  return next
}

const getPeriod = (value: TimeInputValue) => ((value?.getHours() ?? 0) >= 12 ? 'pm' : 'am')

const getHourValue = (value: TimeInputValue, format: TimeInputFormat) => {
  if (!value) return ''
  const hour = value.getHours()
  return pad(format === '12' ? hour % 12 || 12 : hour)
}

const toHour = (raw: number, format: TimeInputFormat, period: string) => {
  if (format === '24') return clamp(raw, 0, 23)
  const hour = clamp(raw, 1, 12)
  if (period === 'pm') return hour === 12 ? 12 : hour + 12
  return hour === 12 ? 0 : hour
}

interface TimeFieldsProps extends TimeInputProps {
  rootClassName?: string
}

const TimeFields = forwardRef<HTMLDivElement, TimeFieldsProps>(function TimeFields(
  {
    amLabel = 'am',
    clearable = true,
    defaultValue,
    disabled = false,
    format = '24',
    invalid = false,
    nextRef,
    onChange,
    pmLabel = 'pm',
    prefix,
    showSeconds = false,
    size = 'md',
    suffix = <TbIcons.TbClock />,
    timeFieldPlaceholder = '--',
    timeFieldClass,
    value,
    className,
    rootClassName,
    ...rest
  },
  ref,
) {
  const [current, setCurrent] = useControllableState<TimeInputValue>({
    value,
    defaultValue: defaultValue ?? null,
    onChange,
  })

  // Draft strings so a two-digit entry isn't re-padded mid-typing. The draft is
  // the display source of truth; `current` is the parsed value. It re-syncs only
  // when the value changes from outside (controlled prop or programmatic reset),
  // never from the user's own keystrokes.
  const draftFromValue = (source: TimeInputValue) => ({
    hour: getHourValue(source, format),
    minute: source ? pad(source.getMinutes()) : '',
    second: source ? pad(source.getSeconds()) : '',
    period: source ? getPeriod(source) : 'am',
  })

  const [draft, setDraft] = useState(() => draftFromValue(current))
  const lastExternal = useRef(current)
  const selfEdit = useRef(false)

  useEffect(() => {
    if (value === undefined) return
    if (selfEdit.current) {
      selfEdit.current = false
      lastExternal.current = value
      return
    }
    if (value === lastExternal.current) return
    lastExternal.current = value
    setDraft({
      hour: getHourValue(value, format),
      minute: value ? pad(value.getMinutes()) : '',
      second: value ? pad(value.getSeconds()) : '',
      period: value ? getPeriod(value) : 'am',
    })
  }, [value, format])

  const applyValue = (next: TimeInputValue) => {
    selfEdit.current = true
    setCurrent(next)
  }

  const hourRef = useRef<HTMLInputElement>(null)
  const minuteRef = useRef<HTMLInputElement>(null)
  const secondRef = useRef<HTMLInputElement>(null)
  const periodRef = useRef<HTMLSelectElement>(null)

  const focusAfter = (part: 'hour' | 'minute' | 'second') => {
    if (part === 'hour') {
      minuteRef.current?.focus()
      return
    }
    if (part === 'minute' && showSeconds) {
      secondRef.current?.focus()
      return
    }
    if (format === '12') {
      periodRef.current?.focus()
      return
    }
    nextRef?.current?.focus()
  }

  const commitPart = (part: 'hour' | 'minute' | 'second', raw: string) => {
    const nextDigits = digits(raw)
    setDraft((previous) => ({ ...previous, [part]: nextDigits }))

    if (nextDigits === '') {
      if (current) applyValue(null)
      return
    }

    const numeric = Number(nextDigits)
    const next = cloneBase(current)
    if (part === 'hour') next.setHours(toHour(numeric, format, getPeriod(current)))
    if (part === 'minute') next.setMinutes(clamp(numeric, 0, 59))
    if (part === 'second') next.setSeconds(clamp(numeric, 0, 59))
    applyValue(next)
    if (nextDigits.length === 2) focusAfter(part)
  }

  const normalizePart = (part: 'hour' | 'minute' | 'second') => {
    setDraft((previous) => {
      if (previous[part] === '') return previous
      if (!current) return previous
      const padded =
        part === 'hour'
          ? getHourValue(current, format)
          : part === 'minute'
            ? pad(current.getMinutes())
            : pad(current.getSeconds())
      return { ...previous, [part]: padded }
    })
  }

  const onFieldFocus = (event: FocusEvent<HTMLInputElement>) => event.currentTarget.select()

  const field = (
    part: 'hour' | 'minute' | 'second',
    label: string,
    fieldValue: string,
    fieldRef: React.RefObject<HTMLInputElement>,
  ) => (
    <input
      ref={fieldRef}
      className={classNames('dyl-time-input__field', timeFieldClass)}
      value={fieldValue}
      placeholder={timeFieldPlaceholder}
      inputMode="numeric"
      maxLength={2}
      disabled={disabled}
      aria-label={label}
      aria-invalid={invalid || undefined}
      onFocus={onFieldFocus}
      onBlur={() => normalizePart(part)}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        commitPart(part, event.currentTarget.value)
      }
    />
  )

  return (
    <div
      ref={ref}
      data-size={size}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      data-format={format}
      className={classNames('dyl-time-input', rootClassName, className)}
      {...rest}
    >
      {prefix != null && <span className="dyl-time-input__affix">{prefix}</span>}
      <span className="dyl-time-input__fields">
        {field('hour', 'Hour', draft.hour, hourRef)}
        <span className="dyl-time-input__separator" aria-hidden>
          :
        </span>
        {field('minute', 'Minute', draft.minute, minuteRef)}
        {showSeconds && (
          <>
            <span className="dyl-time-input__separator" aria-hidden>
              :
            </span>
            {field('second', 'Second', draft.second, secondRef)}
          </>
        )}
        {format === '12' && (
          <select
            ref={periodRef}
            className="dyl-time-input__period"
            value={current ? getPeriod(current) : draft.period}
            disabled={disabled}
            aria-label="Period"
            onChange={(event) => {
              const period = event.currentTarget.value
              setDraft((previous) => ({ ...previous, period }))
              const next = cloneBase(current)
              const displayHour = Number(getHourValue(current ?? next, '12') || 12)
              next.setHours(toHour(displayHour, '12', period))
              applyValue(next)
              nextRef?.current?.focus()
            }}
          >
            <option value="am">{amLabel}</option>
            <option value="pm">{pmLabel}</option>
          </select>
        )}
      </span>
      {clearable && current && !disabled && (
        <button
          type="button"
          className="dyl-time-input__clear"
          aria-label="Clear time"
          onClick={() => applyValue(null)}
        >
          <TbIcons.TbX aria-hidden />
        </button>
      )}
      {suffix != null && <span className="dyl-time-input__affix">{suffix}</span>}
    </div>
  )
})

const TimeInputRange = forwardRef<HTMLDivElement, TimeInputRangeProps>(function TimeInputRange(
  {
    defaultValue,
    value,
    onChange,
    separator = '~',
    prefix,
    suffix = <TbIcons.TbClock />,
    clearable = true,
    disabled = false,
    invalid = false,
    size = 'md',
    className,
    ...rest
  },
  ref,
) {
  const [range, setRange] = useControllableState<TimeInputRangeValue>({
    value,
    defaultValue: defaultValue ?? [null, null],
    onChange,
  })

  const updateRange = (index: 0 | 1, nextValue: TimeInputValue) => {
    setRange((previous) => (index === 0 ? [nextValue, previous[1]] : [previous[0], nextValue]))
  }

  return (
    <div
      ref={ref}
      data-size={size}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      className={classNames('dyl-time-input-range', className)}
    >
      {prefix != null && <span className="dyl-time-input-range__affix">{prefix}</span>}
      <TimeFields
        {...rest}
        value={range[0]}
        onChange={(nextValue) => updateRange(0, nextValue)}
        clearable={false}
        disabled={disabled}
        invalid={invalid}
        size={size}
        suffix={null}
        aria-label="Start time"
        rootClassName="dyl-time-input--range-field"
      />
      <span className="dyl-time-input-range__separator">{separator}</span>
      <TimeFields
        {...rest}
        value={range[1]}
        onChange={(nextValue) => updateRange(1, nextValue)}
        clearable={false}
        disabled={disabled}
        invalid={invalid}
        size={size}
        suffix={null}
        aria-label="End time"
        rootClassName="dyl-time-input--range-field"
      />
      {clearable && (range[0] || range[1]) && !disabled && (
        <button
          type="button"
          className="dyl-time-input-range__clear"
          aria-label="Clear time range"
          onClick={() => setRange([null, null])}
        >
          <TbIcons.TbX aria-hidden />
        </button>
      )}
      {suffix != null && <span className="dyl-time-input-range__affix">{suffix}</span>}
    </div>
  )
})

/**
 * TimeInput lets users enter a specific time with segmented fields.
 */
export const TimeInput = Object.assign(TimeFields, { TimeInputRange })
