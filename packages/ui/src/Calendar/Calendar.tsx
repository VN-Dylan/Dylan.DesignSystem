import { forwardRef, useMemo, useState } from 'react'
import { TbIcons } from '@dylan-ds/icons'
import { classNames, useControllableState } from '@dylan-ds/utils'
import type {
  CalendarDayModifiers,
  CalendarFirstDayOfWeek,
  CalendarProps,
  CalendarRangeValue,
  CalendarSharedProps,
  CalendarValue,
  RangeCalendarProps,
} from './types'
import './Calendar.scss'

const WEEKDAY_INDEX: Record<CalendarFirstDayOfWeek, number> = { sunday: 0, monday: 1 }

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

const isSameDay = (a: Date | null | undefined, b: Date | null | undefined) =>
  Boolean(a && b && startOfDay(a).getTime() === startOfDay(b).getTime())

const isBeforeDay = (a: Date, b: Date) => startOfDay(a).getTime() < startOfDay(b).getTime()
const isAfterDay = (a: Date, b: Date) => startOfDay(a).getTime() > startOfDay(b).getTime()

const addDays = (date: Date, amount: number) => {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

const addMonths = (date: Date, amount: number) => {
  const next = new Date(date.getFullYear(), date.getMonth(), 1)
  next.setMonth(next.getMonth() + amount)
  return next
}

const getVisibleDays = (month: Date, firstDayOfWeek: CalendarFirstDayOfWeek) => {
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const offset = (first.getDay() - WEEKDAY_INDEX[firstDayOfWeek] + 7) % 7
  const start = addDays(first, -offset)
  return Array.from({ length: 42 }, (_, index) => addDays(start, index))
}

const getWeekdays = (locale: string, firstDayOfWeek: CalendarFirstDayOfWeek) => {
  const sunday = new Date(2024, 0, 7)
  const days = Array.from({ length: 7 }, (_, index) => addDays(sunday, index))
  const shifted = firstDayOfWeek === 'monday' ? [...days.slice(1), days[0]!] : days
  return shifted.map((date) =>
    new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date).slice(0, 2),
  )
}

const formatHeaderLabel = (date: Date, locale: string) =>
  `${new Intl.DateTimeFormat(locale, { month: 'long' }).format(date)} ${date.getFullYear()}`

const formatDayLabel = (date: Date, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)

const getDisplaySeed = (
  value: CalendarValue | CalendarRangeValue | undefined,
  defaultMonth: Date | undefined,
) => {
  if (defaultMonth) return defaultMonth
  if (value instanceof Date) return value
  if (Array.isArray(value))
    return value.find((item): item is Date => item instanceof Date) ?? new Date()
  return new Date()
}

const splitPanelProps = <T extends CalendarSharedProps>({
  dayClassName,
  dayStyle,
  disabledDate,
  disableDate,
  disableOutOfMonth,
  enableHeaderLabel,
  firstDayOfWeek,
  hideOutOfMonthDates,
  hideWeekdays,
  isDateFirstInRange,
  isDateInRange,
  isDateLastInRange,
  labelFormat,
  locale,
  maxDate,
  minDate,
  monthLabelFormat,
  onDayMouseEnter,
  preventFocus,
  range,
  renderDay,
  weekdayLabelFormat,
  weekendDays,
  yearLabelFormat,
  ...rootProps
}: T) =>
  [
    {
      dayClassName,
      dayStyle,
      disabledDate,
      disableDate,
      disableOutOfMonth,
      enableHeaderLabel,
      firstDayOfWeek,
      hideOutOfMonthDates,
      hideWeekdays,
      isDateFirstInRange,
      isDateInRange,
      isDateLastInRange,
      labelFormat,
      locale,
      maxDate,
      minDate,
      monthLabelFormat,
      onDayMouseEnter,
      preventFocus,
      range,
      renderDay,
      weekdayLabelFormat,
      weekendDays,
      yearLabelFormat,
    },
    rootProps,
  ] as const

const isInRange = (date: Date, range: CalendarRangeValue | undefined) => {
  const [start, end] = range ?? [null, null]
  if (!start || !end) return false
  const time = startOfDay(date).getTime()
  return time > startOfDay(start).getTime() && time < startOfDay(end).getTime()
}

const isSelectedInRange = (date: Date, range: CalendarRangeValue | undefined) => {
  const [start, end] = range ?? [null, null]
  return isSameDay(date, start) || isSameDay(date, end)
}

interface CalendarPanelProps extends CalendarSharedProps {
  currentMonth: Date
  canGoPrevious: boolean
  canGoNext: boolean
  onPrevious: () => void
  onNext: () => void
  onSelectDate: (date: Date) => void
  selectedValue?: CalendarValue
}

function CalendarPanel({
  currentMonth,
  canGoPrevious,
  canGoNext,
  dayClassName,
  dayStyle,
  disabledDate,
  disableDate,
  disableOutOfMonth = false,
  enableHeaderLabel = true,
  firstDayOfWeek = 'monday',
  hideOutOfMonthDates = false,
  hideWeekdays = false,
  isDateFirstInRange,
  isDateInRange,
  isDateLastInRange,
  locale = 'en',
  maxDate,
  minDate,
  onDayMouseEnter,
  onNext,
  onPrevious,
  onSelectDate,
  preventFocus = false,
  range,
  renderDay = false,
  selectedValue,
  weekendDays = [0, 6],
}: CalendarPanelProps) {
  const weekdays = getWeekdays(locale, firstDayOfWeek)
  const days = getVisibleDays(currentMonth, firstDayOfWeek)

  const isDateDisabled = (date: Date, outOfMonth: boolean) =>
    Boolean(
      (disableOutOfMonth && outOfMonth) ||
        (minDate && isBeforeDay(date, minDate)) ||
        (maxDate && isAfterDay(date, maxDate)) ||
        disabledDate?.(date) ||
        disableDate?.(date),
    )

  const getModifiers = (date: Date): CalendarDayModifiers => {
    const outOfMonth = date.getMonth() !== currentMonth.getMonth()
    const disabled = isDateDisabled(date, outOfMonth)
    const selected = Array.isArray(selectedValue)
      ? selectedValue.some((item) => isSameDay(item, date))
      : isSameDay(selectedValue, date)
    const base = {
      disabled,
      weekend: weekendDays.includes(date.getDay()),
      selectedInRange: isSelectedInRange(date, range),
      selected,
      inRange: isInRange(date, range),
      firstInRange: isSameDay(date, range?.[0]),
      lastInRange: isSameDay(date, range?.[1]),
      outOfMonth,
    }

    const withCustomRange = {
      ...base,
      inRange: base.inRange || Boolean(isDateInRange?.(date, base)),
      firstInRange: base.firstInRange || Boolean(isDateFirstInRange?.(date, base)),
      lastInRange: base.lastInRange || Boolean(isDateLastInRange?.(date, base)),
    }

    return {
      ...withCustomRange,
      selectedInRange:
        withCustomRange.selectedInRange ||
        withCustomRange.firstInRange ||
        withCustomRange.lastInRange,
    }
  }

  return (
    <section className="dyl-calendar__panel" aria-label={formatHeaderLabel(currentMonth, locale)}>
      <div className="dyl-calendar__header">
        {canGoPrevious ? (
          <button
            type="button"
            className="dyl-calendar__nav"
            aria-label="Previous month"
            onClick={onPrevious}
          >
            <TbIcons.TbChevronLeft aria-hidden />
          </button>
        ) : (
          <span className="dyl-calendar__nav-spacer" aria-hidden />
        )}
        <button
          type="button"
          className="dyl-calendar__label"
          disabled={!enableHeaderLabel}
          data-disabled={!enableHeaderLabel || undefined}
        >
          {formatHeaderLabel(currentMonth, locale)}
        </button>
        {canGoNext ? (
          <button
            type="button"
            className="dyl-calendar__nav"
            aria-label="Next month"
            onClick={onNext}
          >
            <TbIcons.TbChevronRight aria-hidden />
          </button>
        ) : (
          <span className="dyl-calendar__nav-spacer" aria-hidden />
        )}
      </div>

      {!hideWeekdays && (
        <div className="dyl-calendar__weekdays" aria-hidden>
          {weekdays.map((weekday) => (
            <span key={weekday} className="dyl-calendar__weekday">
              {weekday}
            </span>
          ))}
        </div>
      )}

      <div className="dyl-calendar__grid" role="group" aria-label="Days">
        {days.map((date) => {
          const modifiers = getModifiers(date)
          const hidden = hideOutOfMonthDates && modifiers.outOfMonth
          const customClassName = dayClassName?.(date, modifiers)
          const customStyle = dayStyle?.(date, modifiers)

          if (hidden) {
            return (
              <span
                key={date.toISOString()}
                className="dyl-calendar__day"
                data-hidden
                aria-hidden
              />
            )
          }

          return (
            <button
              key={date.toISOString()}
              type="button"
              className={classNames('dyl-calendar__day', customClassName)}
              style={customStyle}
              disabled={modifiers.disabled}
              aria-label={formatDayLabel(date, locale)}
              aria-pressed={modifiers.selected || modifiers.selectedInRange || undefined}
              data-disabled={modifiers.disabled || undefined}
              data-weekend={modifiers.weekend || undefined}
              data-selected={modifiers.selected || undefined}
              data-selected-in-range={modifiers.selectedInRange || undefined}
              data-in-range={modifiers.inRange || undefined}
              data-first-in-range={modifiers.firstInRange || undefined}
              data-last-in-range={modifiers.lastInRange || undefined}
              data-out-of-month={modifiers.outOfMonth || undefined}
              onMouseDown={(event) => {
                if (preventFocus) event.preventDefault()
              }}
              onMouseEnter={() => onDayMouseEnter?.(date)}
              onClick={() => onSelectDate(date)}
            >
              {renderDay ? renderDay(date) : date.getDate()}
            </button>
          )
        })}
      </div>
    </section>
  )
}

const CalendarRoot = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  {
    className,
    dateViewCount = 1,
    defaultMonth,
    defaultView = 'date',
    onChange,
    paginateBy,
    value,
    multipleSelection = false,
    ...rest
  },
  ref,
) {
  const [current, setCurrent] = useControllableState<CalendarValue>({
    value,
    defaultValue: multipleSelection ? [] : null,
    onChange,
  })
  const [displayMonth, setDisplayMonth] = useState(
    () =>
      new Date(
        getDisplaySeed(value ?? current, defaultMonth).getFullYear(),
        getDisplaySeed(value ?? current, defaultMonth).getMonth(),
        1,
      ),
  )
  const views = Math.max(1, dateViewCount)
  const step = paginateBy ?? views

  const months = useMemo(
    () => Array.from({ length: views }, (_, index) => addMonths(displayMonth, index)),
    [displayMonth, views],
  )
  const [panelProps, rootProps] = splitPanelProps(rest)

  const selectDate = (date: Date) => {
    const nextDate = startOfDay(date)
    if (multipleSelection) {
      setCurrent((previous) => {
        const list = Array.isArray(previous) ? previous : []
        return list.some((item) => isSameDay(item, nextDate))
          ? list.filter((item) => !isSameDay(item, nextDate))
          : [...list, nextDate]
      })
      return
    }
    setCurrent(nextDate)
  }

  return (
    <div
      ref={ref}
      className={classNames('dyl-calendar', className)}
      data-view={defaultView}
      data-view-count={views}
      style={{ '--dyl-calendar-view-count': views } as React.CSSProperties}
      {...rootProps}
    >
      {months.map((month, index) => (
        <CalendarPanel
          key={`${month.getFullYear()}-${month.getMonth()}`}
          {...panelProps}
          currentMonth={month}
          canGoPrevious={index === 0}
          canGoNext={index === months.length - 1}
          onPrevious={() => setDisplayMonth((previous) => addMonths(previous, -step))}
          onNext={() => setDisplayMonth((previous) => addMonths(previous, step))}
          onSelectDate={selectDate}
          selectedValue={current}
        />
      ))}
    </div>
  )
})

const RangeCalendar = forwardRef<HTMLDivElement, RangeCalendarProps>(function RangeCalendar(
  {
    className,
    dateViewCount = 1,
    defaultMonth,
    defaultView = 'date',
    onChange,
    paginateBy,
    range,
    singleDate = false,
    value,
    ...rest
  },
  ref,
) {
  const [current, setCurrent] = useControllableState<CalendarRangeValue>({
    value,
    defaultValue: [null, null],
    onChange,
  })
  const [hovered, setHovered] = useState<Date | null>(null)
  const [displayMonth, setDisplayMonth] = useState(
    () =>
      new Date(
        getDisplaySeed(value ?? current, defaultMonth).getFullYear(),
        getDisplaySeed(value ?? current, defaultMonth).getMonth(),
        1,
      ),
  )
  const views = Math.max(1, dateViewCount)
  const step = paginateBy ?? views
  const displayRange =
    range ??
    (current[0] && !current[1] && hovered
      ? ([current[0], hovered].sort((a, b) => a.getTime() - b.getTime()) as CalendarRangeValue)
      : current)

  const months = useMemo(
    () => Array.from({ length: views }, (_, index) => addMonths(displayMonth, index)),
    [displayMonth, views],
  )
  const [panelProps, rootProps] = splitPanelProps(rest)

  const selectDate = (date: Date) => {
    const nextDate = startOfDay(date)
    setCurrent(([start, end]) => {
      if (singleDate) return [nextDate, nextDate]
      if (!start || end) return [nextDate, null]
      return isBeforeDay(nextDate, start) ? [nextDate, start] : [start, nextDate]
    })
  }

  return (
    <div
      ref={ref}
      className={classNames('dyl-calendar', className)}
      data-range
      data-view={defaultView}
      data-view-count={views}
      style={{ '--dyl-calendar-view-count': views } as React.CSSProperties}
      {...rootProps}
    >
      {months.map((month, index) => (
        <CalendarPanel
          key={`${month.getFullYear()}-${month.getMonth()}`}
          {...panelProps}
          currentMonth={month}
          canGoPrevious={index === 0}
          canGoNext={index === months.length - 1}
          onPrevious={() => setDisplayMonth((previous) => addMonths(previous, -step))}
          onNext={() => setDisplayMonth((previous) => addMonths(previous, step))}
          onSelectDate={selectDate}
          onDayMouseEnter={(date) => {
            setHovered(date)
            panelProps.onDayMouseEnter?.(date)
          }}
          range={displayRange}
          selectedValue={current.filter((item): item is Date => item instanceof Date)}
        />
      ))}
    </div>
  )
})

export const Calendar = Object.assign(CalendarRoot, { RangeCalendar })
export { RangeCalendar }
