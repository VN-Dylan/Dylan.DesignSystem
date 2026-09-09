import { forwardRef, useMemo, useState } from 'react'
import {
  breakpoints,
  classNames,
  formatCurrency,
  formatCurrencyCompact,
  useControllableState,
  useResponsive,
} from '@vn-dylan/utils'
import { RangeCalendar } from '../Calendar'
import type { AvailabilityCalendarProps, AvailabilityCalendarRangeValue } from './types'
import './AvailabilityCalendar.scss'

const MS_PER_DAY = 24 * 60 * 60 * 1000

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

const dateKey = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

const isBeforeDay = (a: Date, b: Date) => startOfDay(a).getTime() < startOfDay(b).getTime()
const isAfterDay = (a: Date, b: Date) => startOfDay(a).getTime() > startOfDay(b).getTime()

const addDays = (date: Date, amount: number) => {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return startOfDay(next)
}

const diffDays = (start: Date, end: Date) => {
  const startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())
  const endUtc = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate())
  return Math.round((endUtc - startUtc) / MS_PER_DAY)
}

const normalizeRange = ([
  start,
  end,
]: AvailabilityCalendarRangeValue): AvailabilityCalendarRangeValue => [
  start ? startOfDay(start) : null,
  end ? startOfDay(end) : null,
]

const plural = (count: number, singular: string) => `${count} ${singular}${count === 1 ? '' : 's'}`

/**
 * AvailabilityCalendar composes RangeCalendar for lodging-style check-in and
 * check-out selection with unavailable dates, stay limits, and nightly prices.
 */
export const AvailabilityCalendar = forwardRef<HTMLDivElement, AvailabilityCalendarProps>(
  function AvailabilityCalendar(
    {
      value,
      defaultValue = [null, null],
      onChange,
      months,
      minDate,
      maxDate,
      blockedDates = [],
      isDateAvailable,
      minNights = 1,
      maxNights,
      priceForDate,
      currency = 'USD',
      locale = 'en-US',
      onNightsChange,
      className,
      ...rest
    },
    ref,
  ) {
    const responsive = useResponsive()
    const defaultMinDate = useMemo(() => startOfDay(new Date()), [])
    const effectiveMinDate = minDate ? startOfDay(minDate) : defaultMinDate
    const effectiveMaxDate = maxDate ? startOfDay(maxDate) : undefined
    const viewCount = months ?? (responsive.windowWidth >= breakpoints.md ? 2 : 1)
    const [hint, setHint] = useState('')
    const [range, setRange] = useControllableState<AvailabilityCalendarRangeValue>({
      value: value ? normalizeRange(value) : undefined,
      defaultValue: normalizeRange(defaultValue),
      onChange,
    })
    const [checkIn, checkOut] = range
    const blockedDateKeys = useMemo(
      () => new Set(blockedDates.map((date) => dateKey(startOfDay(date)))),
      [blockedDates],
    )

    const isUnavailableDate = (date: Date) => {
      const normalized = startOfDay(date)
      return (
        isBeforeDay(normalized, effectiveMinDate) ||
        Boolean(effectiveMaxDate && isAfterDay(normalized, effectiveMaxDate)) ||
        blockedDateKeys.has(dateKey(normalized)) ||
        isDateAvailable?.(normalized) === false
      )
    }

    const hasUnavailableBetween = (start: Date, end: Date) => {
      const [earlier, later] = isAfterDay(start, end) ? [end, start] : [start, end]
      for (let day = addDays(earlier, 1); isBeforeDay(day, later); day = addDays(day, 1)) {
        if (isUnavailableDate(day)) return true
      }
      return false
    }

    const disabledDate = (date: Date) => {
      if (isUnavailableDate(date)) return true
      if (checkIn && !checkOut && hasUnavailableBetween(checkIn, date)) return true
      return false
    }

    const handleRangeChange = (nextRange: AvailabilityCalendarRangeValue) => {
      const [nextStart, nextEnd] = normalizeRange(nextRange)

      if (!nextStart) {
        setHint('')
        setRange([null, null])
        onNightsChange?.(0)
        return
      }

      if (!nextEnd) {
        setHint('')
        setRange([nextStart, null])
        onNightsChange?.(0)
        return
      }

      const ordered: AvailabilityCalendarRangeValue = isAfterDay(nextStart, nextEnd)
        ? [nextEnd, nextStart]
        : [nextStart, nextEnd]
      const nights = diffDays(ordered[0]!, ordered[1]!)

      if (nights < minNights) {
        setHint(`Minimum stay is ${plural(minNights, 'night')}`)
        return
      }

      if (maxNights != null && nights > maxNights) {
        setHint(`Maximum stay is ${plural(maxNights, 'night')}`)
        return
      }

      setHint('')
      setRange(ordered)
      onNightsChange?.(nights)
    }

    const nights = checkIn && checkOut ? diffDays(checkIn, checkOut) : 0
    const total = useMemo(() => {
      if (!priceForDate || !checkIn || !checkOut) return null
      let amount = 0
      for (let day = checkIn; isBeforeDay(day, checkOut); day = addDays(day, 1)) {
        amount += priceForDate(day) ?? 0
      }
      return amount
    }, [checkIn, checkOut, priceForDate])
    const dateFormatter = useMemo(
      () => new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }),
      [locale],
    )
    const footerSummary =
      checkIn && checkOut
        ? `${plural(nights, 'night')} · ${dateFormatter.format(checkIn)} – ${dateFormatter.format(
            checkOut,
          )}`
        : 'Select check-in and check-out dates'

    return (
      <div ref={ref} className={classNames('dyl-availability-calendar', className)} {...rest}>
        <RangeCalendar
          value={range}
          onChange={handleRangeChange}
          minDate={effectiveMinDate}
          maxDate={effectiveMaxDate}
          disabledDate={disabledDate}
          dateViewCount={Math.max(1, Math.floor(viewCount))}
          renderDay={(date) => {
            const price = priceForDate?.(date)
            return (
              <span className="dyl-availability-calendar__day">
                <span className="dyl-availability-calendar__day-number">{date.getDate()}</span>
                {price != null && (
                  <span className="dyl-availability-calendar__price">
                    {formatCurrencyCompact(price, currency)}
                  </span>
                )}
              </span>
            )
          }}
          locale={locale}
        />
        <p className="dyl-availability-calendar__status" role="status" aria-live="polite">
          {hint}
        </p>
        <div className="dyl-availability-calendar__footer" data-empty={!checkIn || !checkOut}>
          <span>{footerSummary}</span>
          {total != null && <strong>{formatCurrency(total, currency, locale)}</strong>}
        </div>
      </div>
    )
  },
)
