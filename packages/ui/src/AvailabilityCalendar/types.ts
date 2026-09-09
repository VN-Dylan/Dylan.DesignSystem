import type { HTMLAttributes, ReactNode } from 'react'

export type AvailabilityCalendarRangeValue = [Date | null, Date | null]

export interface AvailabilityCalendarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /** Controlled check-in/check-out range. */
  value?: AvailabilityCalendarRangeValue
  /** Initial check-in/check-out range for uncontrolled usage. */
  defaultValue?: AvailabilityCalendarRangeValue
  /** Callback fired when the committed range changes. */
  onChange?: (range: AvailabilityCalendarRangeValue) => void
  /** Number of month panels to show. Defaults to one below md and two at md and up. */
  months?: number
  /** Earliest selectable date. Defaults to today. */
  minDate?: Date
  /** Latest selectable date. */
  maxDate?: Date
  /** Individual dates that cannot be selected or crossed by a range. */
  blockedDates?: Date[]
  /** Predicate for availability; returning false disables the date. */
  isDateAvailable?: (date: Date) => boolean
  /** Minimum number of nights required for a completed stay. @default 1 */
  minNights?: number
  /** Maximum number of nights allowed for a completed stay. */
  maxNights?: number
  /** Returns the nightly price for a date, or null when no price should display. */
  priceForDate?: (date: Date) => number | null
  /** ISO 4217 currency code used for nightly and total pricing. @default 'USD' */
  currency?: string
  /** BCP 47 locale used for calendar labels and total price formatting. */
  locale?: string
  /** Callback fired with the number of nights for the committed range. */
  onNightsChange?: (nights: number) => void
  /** Custom day content is intentionally owned by AvailabilityCalendar. */
  children?: ReactNode
}
