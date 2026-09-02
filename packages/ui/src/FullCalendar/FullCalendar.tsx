import { useMemo, useState } from 'react'
import { TbIcons } from '@vn-dylan/icons'
import { classNames, useControllableState } from '@vn-dylan/utils'
import { Button } from '../Button'
import './FullCalendar.scss'

export interface CalendarEvent {
  id: string
  title: string
  start: Date | string
  end?: Date | string
  /** Any CSS colour; defaults to the primary token. */
  color?: string
}

export interface FullCalendarProps {
  events?: CalendarEvent[]
  /** Month shown (controlled) — any date within it. */
  month?: Date
  /** Initial month for uncontrolled usage. @default now */
  defaultMonth?: Date
  /** Called when the visible month changes. */
  onMonthChange?: (month: Date) => void
  /** Called with the clicked day. */
  onDateClick?: (date: Date) => void
  /** Called with the clicked event. */
  onEventClick?: (event: CalendarEvent) => void
  /** Sunday-first when `'sunday'`. @default 'sunday' */
  firstDayOfWeek?: 'sunday' | 'monday'
  className?: string
}

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const toDate = (v: Date | string) => (v instanceof Date ? v : new Date(v))
const sameDay = (a: Date, b: Date) => startOfDay(a).getTime() === startOfDay(b).getTime()

/**
 * A month-view event calendar. A focused, dependency-free take on FullCalendar —
 * week/day/list views and drag-resize are not included.
 */
export function FullCalendar({
  events = [],
  month,
  defaultMonth,
  onMonthChange,
  onDateClick,
  onEventClick,
  firstDayOfWeek = 'sunday',
  className,
}: FullCalendarProps) {
  const [current, setCurrent] = useControllableState<Date>({
    value: month,
    defaultValue: defaultMonth ?? new Date(),
    onChange: onMonthChange,
  })
  const [today] = useState(() => new Date())

  const offset = firstDayOfWeek === 'monday' ? 1 : 0
  const weekdays = useMemo(() => {
    const base = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return [...base.slice(offset), ...base.slice(0, offset)]
  }, [offset])

  const weeks = useMemo(() => {
    const first = new Date(current.getFullYear(), current.getMonth(), 1)
    const lead = (first.getDay() - offset + 7) % 7
    const gridStart = new Date(first)
    gridStart.setDate(first.getDate() - lead)
    const cells: Date[] = []
    for (let i = 0; i < 42; i += 1) {
      cells.push(new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i))
    }
    return Array.from({ length: 6 }, (_, w) => cells.slice(w * 7, w * 7 + 7))
  }, [current, offset])

  const eventsOn = (day: Date) =>
    events.filter((e) => {
      const s = startOfDay(toDate(e.start))
      const end = startOfDay(toDate(e.end ?? e.start))
      const d = startOfDay(day).getTime()
      return d >= s.getTime() && d <= end.getTime()
    })

  const shiftMonth = (delta: number) =>
    setCurrent(new Date(current.getFullYear(), current.getMonth() + delta, 1))

  return (
    <div className={classNames('dyl-full-calendar', className)}>
      <div className="dyl-full-calendar__header">
        <h3 className="dyl-full-calendar__title">
          {current.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
        </h3>
        <div className="dyl-full-calendar__nav">
          <Button
            size="sm"
            shape="circle"
            aria-label="Previous month"
            icon={<TbIcons.TbChevronLeft />}
            onClick={() => shiftMonth(-1)}
          />
          <Button size="sm" onClick={() => setCurrent(new Date())}>
            Today
          </Button>
          <Button
            size="sm"
            shape="circle"
            aria-label="Next month"
            icon={<TbIcons.TbChevronRight />}
            onClick={() => shiftMonth(1)}
          />
        </div>
      </div>

      <div className="dyl-full-calendar__grid" role="grid">
        <div className="dyl-full-calendar__weekdays" role="row">
          {weekdays.map((wd) => (
            <span key={wd} role="columnheader">
              {wd}
            </span>
          ))}
        </div>
        {weeks.map((week, wi) => (
          <div key={wi} className="dyl-full-calendar__week" role="row">
            {week.map((day) => {
              const outside = day.getMonth() !== current.getMonth()
              const dayEvents = eventsOn(day)
              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  role="gridcell"
                  className="dyl-full-calendar__day"
                  data-outside={outside || undefined}
                  data-today={sameDay(day, today) || undefined}
                  onClick={() => onDateClick?.(day)}
                >
                  <span className="dyl-full-calendar__date">{day.getDate()}</span>
                  <span className="dyl-full-calendar__events">
                    {dayEvents.slice(0, 3).map((e) => (
                      <span
                        key={e.id}
                        className="dyl-full-calendar__event"
                        style={{ background: e.color ?? 'var(--dyl-primary)' }}
                        onClick={(ev) => {
                          ev.stopPropagation()
                          onEventClick?.(e)
                        }}
                      >
                        {e.title}
                      </span>
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="dyl-full-calendar__more">+{dayEvents.length - 3}</span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
