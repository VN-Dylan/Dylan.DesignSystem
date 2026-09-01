import {
  forwardRef,
  useMemo,
  useState,
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
} from 'react'
import { TbIcons } from '@dylan-ds/icons'
import { classNames, useControllableState } from '@dylan-ds/utils'
import type {
  CalendarDayModifiers,
  CalendarFirstDayOfWeek,
  CalendarProps,
  CalendarRangeValue,
  CalendarSharedProps,
  CalendarValue,
  CalendarView,
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

const addYears = (date: Date, amount: number) => addMonths(date, amount * 12)

// The month/year grids page a dozen at a time — 12 months (a year), 12 years
// (a "dozen" — not a calendar decade, so a page always starts on a /12 line).
const GRID_SIZE = 12
const GRID_COLS = 3

const getDozenStart = (year: number) => Math.floor(year / GRID_SIZE) * GRID_SIZE

const getMonthCells = (year: number, locale: string) =>
  Array.from({ length: GRID_SIZE }, (_, month) => {
    const date = new Date(year, month, 1)
    return { date, label: new Intl.DateTimeFormat(locale, { month: 'short' }).format(date) }
  })

const getYearCells = (dozenStart: number) =>
  Array.from({ length: GRID_SIZE }, (_, index) => dozenStart + index)

const formatDozenLabel = (dozenStart: number) => `${dozenStart}–${dozenStart + GRID_SIZE - 1}`

/** Roving-tab-stop arrow/Home/End navigation over a fixed-column button grid. */
const createGridKeyDownHandler =
  (cols: number, cellSelector: string) => (event: KeyboardEvent<HTMLDivElement>) => {
    const step: Record<string, number> = {
      ArrowRight: 1,
      ArrowLeft: -1,
      ArrowDown: cols,
      ArrowUp: -cols,
    }
    const rtl = typeof document !== 'undefined' && document.dir === 'rtl'
    let delta =
      event.key === 'ArrowRight' || event.key === 'ArrowLeft'
        ? (rtl ? -1 : 1) * step[event.key]!
        : step[event.key]
    if (event.key === 'Home' || event.key === 'End') delta = 0
    else if (delta === undefined) return

    const cells = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>(cellSelector))
    const currentCell = (event.target as HTMLElement).closest<HTMLButtonElement>(cellSelector)
    const currentIndex = currentCell ? cells.indexOf(currentCell) : -1
    if (currentIndex < 0) return

    const nextIndex =
      event.key === 'Home' ? 0 : event.key === 'End' ? cells.length - 1 : currentIndex + delta!
    const next = cells[nextIndex]
    if (!next) return
    event.preventDefault()
    next.focus()
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

const onMonthGridKeyDown = createGridKeyDownHandler(
  GRID_COLS,
  'button.dyl-calendar__cell:not([disabled])',
)

interface MonthGridProps {
  currentMonth: Date
  locale: string
  isSelected: (date: Date) => boolean
  onSelectMonth: (date: Date) => void
}

function MonthGrid({ currentMonth, locale, isSelected, onSelectMonth }: MonthGridProps) {
  const cells = useMemo(
    () => getMonthCells(currentMonth.getFullYear(), locale),
    [currentMonth, locale],
  )
  const today = new Date()
  const tabbableIndex =
    cells.findIndex((cell) => isSelected(cell.date)) >= 0
      ? cells.findIndex((cell) => isSelected(cell.date))
      : cells.findIndex(
          (cell) =>
            cell.date.getMonth() === today.getMonth() &&
            cell.date.getFullYear() === today.getFullYear(),
        )

  return (
    <div
      className="dyl-calendar__cell-grid"
      role="group"
      aria-label="Months"
      onKeyDown={onMonthGridKeyDown}
    >
      {cells.map((cell, index) => (
        <button
          key={cell.label}
          type="button"
          className="dyl-calendar__cell"
          tabIndex={index === (tabbableIndex >= 0 ? tabbableIndex : 0) ? 0 : -1}
          data-selected={isSelected(cell.date) || undefined}
          onClick={() => onSelectMonth(cell.date)}
        >
          {cell.label}
        </button>
      ))}
    </div>
  )
}

interface YearGridProps {
  dozenStart: number
  isSelected: (year: number) => boolean
  onSelectYear: (year: number) => void
}

function YearGrid({ dozenStart, isSelected, onSelectYear }: YearGridProps) {
  const years = getYearCells(dozenStart)
  const today = new Date().getFullYear()
  const tabbableIndex =
    years.findIndex(isSelected) >= 0 ? years.findIndex(isSelected) : years.indexOf(today)

  return (
    <div
      className="dyl-calendar__cell-grid"
      role="group"
      aria-label="Years"
      onKeyDown={onMonthGridKeyDown}
    >
      {years.map((year, index) => (
        <button
          key={year}
          type="button"
          className="dyl-calendar__cell"
          tabIndex={index === (tabbableIndex >= 0 ? tabbableIndex : 0) ? 0 : -1}
          data-selected={isSelected(year) || undefined}
          onClick={() => onSelectYear(year)}
        >
          {year}
        </button>
      ))}
    </div>
  )
}

interface CalendarPanelProps extends CalendarSharedProps {
  currentMonth: Date
  canGoPrevious: boolean
  canGoNext: boolean
  onPrevious: () => void
  onNext: () => void
  onSelectDate: (date: Date) => void
  selectedValue?: CalendarValue
  view: CalendarView
  onLabelClick: () => void
  onSelectMonth: (date: Date) => void
  onSelectYear: (year: number) => void
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
  onLabelClick,
  onNext,
  onPrevious,
  onSelectDate,
  onSelectMonth,
  onSelectYear,
  preventFocus = false,
  range,
  renderDay = false,
  selectedValue,
  view,
  weekendDays = [0, 6],
}: CalendarPanelProps) {
  const weekdays = getWeekdays(locale, firstDayOfWeek)
  const days = getVisibleDays(currentMonth, firstDayOfWeek)

  const isDateSelected = (date: Date) =>
    Array.isArray(selectedValue)
      ? selectedValue.some((item) => isSameDay(item, date))
      : isSameDay(selectedValue, date)

  const isMonthSelected = (date: Date) => {
    const check = (item: Date | null | undefined) =>
      Boolean(
        item && item.getFullYear() === date.getFullYear() && item.getMonth() === date.getMonth(),
      )
    return Array.isArray(selectedValue) ? selectedValue.some(check) : check(selectedValue)
  }

  const isYearSelected = (year: number) => {
    const check = (item: Date | null | undefined) => Boolean(item && item.getFullYear() === year)
    return Array.isArray(selectedValue) ? selectedValue.some(check) : check(selectedValue)
  }

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
    const selected = isDateSelected(date)
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

  // Roving tab stop: exactly one day is tabbable — the selected day if visible,
  // else today (this month), else the first focusable day of the month.
  const inMonth = (date: Date) => date.getMonth() === currentMonth.getMonth()
  const focusableDays = days.filter((date) => !isDateDisabled(date, !inMonth(date)))
  const today = new Date()
  const tabbableDate =
    focusableDays.find(isDateSelected) ??
    focusableDays.find((date) => inMonth(date) && isSameDay(date, today)) ??
    focusableDays.find(inMonth) ??
    focusableDays[0]

  const onGridKeyDown = createGridKeyDownHandler(7, 'button.dyl-calendar__day:not([disabled])')

  const dozenStart = getDozenStart(currentMonth.getFullYear())
  const headerLabel =
    view === 'date'
      ? formatHeaderLabel(currentMonth, locale)
      : view === 'month'
        ? String(currentMonth.getFullYear())
        : formatDozenLabel(dozenStart)
  const navLabel = view === 'date' ? 'month' : view === 'month' ? 'year' : `${GRID_SIZE} years`

  return (
    <section className="dyl-calendar__panel" aria-label={headerLabel}>
      <div className="dyl-calendar__header">
        {canGoPrevious ? (
          <button
            type="button"
            className="dyl-calendar__nav"
            aria-label={`Previous ${navLabel}`}
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
          disabled={!enableHeaderLabel || view === 'year'}
          data-disabled={!enableHeaderLabel || undefined}
          onClick={enableHeaderLabel ? onLabelClick : undefined}
        >
          {headerLabel}
        </button>
        {canGoNext ? (
          <button
            type="button"
            className="dyl-calendar__nav"
            aria-label={`Next ${navLabel}`}
            onClick={onNext}
          >
            <TbIcons.TbChevronRight aria-hidden />
          </button>
        ) : (
          <span className="dyl-calendar__nav-spacer" aria-hidden />
        )}
      </div>

      {view === 'month' && (
        <MonthGrid
          currentMonth={currentMonth}
          locale={locale}
          isSelected={isMonthSelected}
          onSelectMonth={onSelectMonth}
        />
      )}

      {view === 'year' && (
        <YearGrid dozenStart={dozenStart} isSelected={isYearSelected} onSelectYear={onSelectYear} />
      )}

      {view === 'date' && !hideWeekdays && (
        <div className="dyl-calendar__weekdays" aria-hidden>
          {weekdays.map((weekday) => (
            <span key={weekday} className="dyl-calendar__weekday">
              {weekday}
            </span>
          ))}
        </div>
      )}

      {view === 'date' && (
        <div
          className="dyl-calendar__grid"
          role="group"
          aria-label="Days"
          onKeyDown={onGridKeyDown}
        >
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
                tabIndex={isSameDay(date, tabbableDate) ? 0 : -1}
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
      )}
    </section>
  )
}

type DisplayMonthSetter = Dispatch<SetStateAction<Date>>

/**
 * Shared date → month → year view-navigation state for `Calendar` /
 * `RangeCalendar`. `panelIndex` accounts for a multi-panel calendar
 * (`dateViewCount > 1`): each panel is `displayMonth` offset by its index, so
 * a month/year picked from panel N must subtract N back out.
 */
function useCalendarNav(
  defaultView: CalendarView,
  step: number,
  setDisplayMonth: DisplayMonthSetter,
) {
  const [view, setView] = useState<CalendarView>(defaultView)

  const onPrevious = () =>
    setDisplayMonth((previous) =>
      view === 'date'
        ? addMonths(previous, -step)
        : view === 'month'
          ? addYears(previous, -1)
          : addYears(previous, -GRID_SIZE),
    )
  const onNext = () =>
    setDisplayMonth((previous) =>
      view === 'date'
        ? addMonths(previous, step)
        : view === 'month'
          ? addYears(previous, 1)
          : addYears(previous, GRID_SIZE),
    )
  const onLabelClick = () => setView((current) => (current === 'date' ? 'month' : 'year'))

  const selectMonth = (date: Date, panelIndex: number) => {
    setDisplayMonth(addMonths(date, -panelIndex))
    setView('date')
  }
  const selectYear = (year: number, panelIndex: number, monthOfYear: number) => {
    setDisplayMonth(addMonths(new Date(year, monthOfYear, 1), -panelIndex))
    setView('month')
  }

  return { view, onPrevious, onNext, onLabelClick, selectMonth, selectYear }
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
  const { view, onPrevious, onNext, onLabelClick, selectMonth, selectYear } = useCalendarNav(
    defaultView,
    step,
    setDisplayMonth,
  )

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
      data-view={view}
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
          onPrevious={onPrevious}
          onNext={onNext}
          onSelectDate={selectDate}
          selectedValue={current}
          view={view}
          onLabelClick={onLabelClick}
          onSelectMonth={(date) => selectMonth(date, index)}
          onSelectYear={(year) => selectYear(year, index, month.getMonth())}
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
  const { view, onPrevious, onNext, onLabelClick, selectMonth, selectYear } = useCalendarNav(
    defaultView,
    step,
    setDisplayMonth,
  )
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
      data-view={view}
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
          onPrevious={onPrevious}
          onNext={onNext}
          onSelectDate={selectDate}
          onDayMouseEnter={(date) => {
            setHovered(date)
            panelProps.onDayMouseEnter?.(date)
          }}
          range={displayRange}
          selectedValue={current.filter((item): item is Date => item instanceof Date)}
          view={view}
          onLabelClick={onLabelClick}
          onSelectMonth={(date) => selectMonth(date, index)}
          onSelectYear={(year) => selectYear(year, index, month.getMonth())}
        />
      ))}
    </div>
  )
})

export const Calendar = Object.assign(CalendarRoot, { RangeCalendar })
export { RangeCalendar }
