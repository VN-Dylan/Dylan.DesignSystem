import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

export type CalendarView = 'date' | 'month' | 'year'
export type CalendarFirstDayOfWeek = 'sunday' | 'monday'
export type CalendarValue = Date | Date[] | null
export type CalendarRangeValue = [Date | null, Date | null]

export interface CalendarDayModifiers {
  disabled: boolean
  weekend: boolean
  selectedInRange: boolean
  selected: boolean
  inRange: boolean
  firstInRange: boolean
  lastInRange: boolean
  outOfMonth: boolean
}

export type CalendarDayClassName = (date: Date, modifiers: CalendarDayModifiers) => string
export type CalendarDayStyle = (date: Date, modifiers: CalendarDayModifiers) => CSSProperties
export type CalendarRangeMatcher = (date: Date, modifiers: CalendarDayModifiers) => boolean
export type CalendarRenderDay = false | ((date: Date) => ReactNode)

export interface CalendarSharedProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /** Amount of date view display in picker. @default 1 */
  dateViewCount?: number
  /** Apply className to days based on argument. */
  dayClassName?: CalendarDayClassName
  /** Apply style to days based on argument. */
  dayStyle?: CalendarDayStyle
  /** Default month for uncontrolled calendar display. */
  defaultMonth?: Date
  /** Default calendar view. @default 'date' */
  defaultView?: CalendarView
  /** Specify the date that cannot be selected. */
  disabledDate?: (date: Date) => boolean
  /** Eyris compatibility alias for disabledDate. */
  disableDate?: (date: Date) => boolean
  /** Whether to disable days that out of given month. @default false */
  disableOutOfMonth?: boolean
  /** Whether header label can trigger view changes. @default true */
  enableHeaderLabel?: boolean
  /** First day of week. @default 'monday' */
  firstDayOfWeek?: CalendarFirstDayOfWeek
  /** Whether to hide days that out of given month. @default false */
  hideOutOfMonthDates?: boolean
  /** Whether to hide week days. @default false */
  hideWeekdays?: boolean
  /** Highlight date as first in a range. */
  isDateFirstInRange?: CalendarRangeMatcher
  /** Highlight date in a range. */
  isDateInRange?: CalendarRangeMatcher
  /** Highlight date as last in a range. */
  isDateLastInRange?: CalendarRangeMatcher
  /** Separator between date display on input. @default '~' */
  labelFormat?: string
  /** Calendar locale. @default 'en' */
  locale?: string
  /** Maximum date to select. */
  maxDate?: Date
  /** Minimum date to select. */
  minDate?: Date
  /** Month label format. @default 'YYYY' */
  monthLabelFormat?: string
  /** Callback when date is hovered. */
  onDayMouseEnter?: (date: Date) => void
  /** Paginate by count of view. @default dateViewCount */
  paginateBy?: number
  /** Prevent focusing upon click. @default false */
  preventFocus?: boolean
  /** Highlight given date range. */
  range?: CalendarRangeValue
  /** Render custom day element based on the given params. @default false */
  renderDay?: CalendarRenderDay
  /** Format for weekday display. @default 'dd' */
  weekdayLabelFormat?: string
  /** Indicate the days of weekend. @default [0, 6] */
  weekendDays?: number[]
  /** Year label format. @default 'YYYY' */
  yearLabelFormat?: string
}

export interface CalendarProps extends CalendarSharedProps {
  /** Enable Date[] selection mode. */
  multipleSelection?: boolean
  /** Callback when date is selected. */
  onChange?: (date: CalendarValue) => void
  /** Value of calendar. */
  value?: CalendarValue
}

export interface RangeCalendarProps extends CalendarSharedProps {
  /** Only one date can be selected. @default false */
  singleDate?: boolean
  /** Callback when date range is selected. */
  onChange?: (date: CalendarRangeValue) => void
  /** Value of range calendar. */
  value?: CalendarRangeValue
}
