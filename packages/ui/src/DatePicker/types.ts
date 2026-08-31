import type { CSSProperties, FocusEventHandler, InputHTMLAttributes, ReactNode } from 'react'
import type {
  CalendarDayClassName,
  CalendarDayStyle,
  CalendarFirstDayOfWeek,
  CalendarRangeMatcher,
  CalendarRangeValue,
  CalendarRenderDay,
  CalendarView,
} from '../Calendar'
import type { InputSize } from '../Input'

export type DatePickerValue = Date | null
export type DatePickerRangeValue = CalendarRangeValue
export type DatePickerLabelFormat = { month: string; year: string }

interface DatePickerSharedProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'defaultValue' | 'onBlur' | 'onChange' | 'onFocus' | 'prefix' | 'size' | 'type' | 'value'
  > {
  /** Whether allow to clear value. @default true */
  clearable?: boolean
  /** Custom clear button. */
  clearButton?: string | ReactNode
  /** Whether close picker upon date selected. */
  closePickerOnChange?: boolean
  /** Amount of date view display in picker. @default 1 */
  dateViewCount?: number
  /** Apply className to days based on argument. */
  dayClassName?: CalendarDayClassName
  /** Apply style to days based on argument. */
  dayStyle?: CalendarDayStyle
  /** Default month for uncontrolled DatePicker. */
  defaultMonth?: Date
  /** Whether to default open DatePicker. @default false */
  defaultOpen?: boolean
  /** Default DatePicker view. @default 'date' */
  defaultView?: CalendarView
  /** Determine whether DatePicker Input is disabled. @default false */
  disabled?: boolean
  /** Specify the date that cannot be selected. */
  disabledDate?: (date: Date) => boolean
  /** Eyris compatibility alias for disabledDate. */
  disableDate?: (date: Date) => boolean
  /** Whether to disable days that out of given month. @default false */
  disableOutOfMonth?: boolean
  /** Enable header label to trigger view change. @default true */
  enableHeaderLabel?: boolean
  /** First day of week. @default 'monday' */
  firstDayOfWeek?: CalendarFirstDayOfWeek
  /** Whether to hide days that out of given month. @default false */
  hideOutOfMonthDates?: boolean
  /** Whether to hide week days. @default false */
  hideWeekdays?: boolean
  /** DatePicker Input display format. @default 'YYYY-MM-DD' */
  inputFormat?: string
  /** Render a prefix content inside DatePicker Input. */
  inputPrefix?: string | ReactNode
  /** Render a suffix content inside DatePicker Input. */
  inputSuffix?: string | ReactNode
  /** Whether to allow input typing. @default false */
  inputtable?: boolean
  /** Whether to close DatePicker upon input blur. @default true */
  inputtableBlurClose?: boolean
  /** Highlight date as first in a range. */
  isDateFirstInRange?: CalendarRangeMatcher
  /** Highlight date in a range. */
  isDateInRange?: CalendarRangeMatcher
  /** Highlight date as last in a range. */
  isDateLastInRange?: CalendarRangeMatcher
  /** DatePicker locale. @default 'en' */
  locale?: string
  /** Maximum date to select. */
  maxDate?: Date
  /** Minimum date to select. */
  minDate?: Date
  /** Month label format. @default 'YYYY' */
  monthLabelFormat?: string
  /** Callback when DatePicker Input blur. */
  onBlur?: FocusEventHandler<HTMLInputElement>
  /** Callback when date is hovered. */
  onDayMouseEnter?: (date: Date) => void
  /** Callback when DatePicker close. */
  onDropdownClose?: () => void
  /** Callback when DatePicker open. */
  onDropdownOpen?: () => void
  /** Callback when DatePicker Input focus. */
  onFocus?: FocusEventHandler<HTMLInputElement>
  /** Whether to open DatePicker upon clear value. @default false */
  openPickerOnClear?: boolean
  /** Highlight given date range. */
  range?: CalendarRangeValue
  /** Render custom day element based on the given params. @default false */
  renderDay?: CalendarRenderDay
  /** DatePicker input size. @default 'md' */
  size?: InputSize
  /** Format for weekday display. @default 'dd' */
  weekdayLabelFormat?: string
  /** Indicate the days of weekend. @default [0, 6] */
  weekendDays?: number[]
  /** Year label format. @default 'YYYY' */
  yearLabelFormat?: string
}

export interface DatePickerProps extends DatePickerSharedProps {
  /** Whether close picker upon date selected. @default true */
  closePickerOnChange?: boolean
  /** Default value of DatePicker. */
  defaultValue?: DatePickerValue
  /** DatePicker label format. @default { month: 'MMM', year: 'YYYY' } */
  labelFormat?: DatePickerLabelFormat
  /** Callback when date cell is selected. */
  onChange?: (date: DatePickerValue) => void
  /** Value of DatePicker. */
  value?: DatePickerValue
}

export interface DatePickerRangeProps extends DatePickerSharedProps {
  /** Whether close picker upon date selected. @default true */
  closePickerOnChange?: boolean
  /** Default value of DatePickerRange. */
  defaultValue?: DatePickerRangeValue
  /** Separator between date display on input. @default '~' */
  labelFormat?: string
  /** Callback when date cell is selected. */
  onChange?: (date: DatePickerRangeValue) => void
  /** Separator between dates. @default '~' */
  separator?: string
  /** Only one date can be selected. @default false */
  singleDate?: boolean
  /** Value of DatePickerRange. */
  value?: DatePickerRangeValue
}

export interface DateTimepickerProps extends DatePickerSharedProps {
  /** Whether to set time input to 12 hours format. @default true */
  amPm?: boolean
  /** Whether close picker upon date selected. @default false */
  closePickerOnChange?: boolean
  /** Default value of DateTimepicker. */
  defaultValue?: DatePickerValue
  /** DateTimepicker label format. @default { month: 'MMM', year: 'YYYY' } */
  labelFormat?: DatePickerLabelFormat
  /** Ok button content. @default 'ok' */
  okButtonContent?: string | ReactNode
  /** Callback when date cell is selected. */
  onChange?: (date: DatePickerValue) => void
  /** Value of DateTimepicker. */
  value?: DatePickerValue
}

export interface DatePickerContextValue {
  open: boolean
  disabled: boolean
}

export type DatePickerInputStyle = CSSProperties
