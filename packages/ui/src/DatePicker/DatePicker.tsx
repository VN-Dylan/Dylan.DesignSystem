import {
  cloneElement,
  forwardRef,
  isValidElement,
  useState,
  type MouseEvent,
  type ReactElement,
} from 'react'
import { TbIcons } from '@dylan-ds/icons'
import { useControllableState } from '@dylan-ds/utils'
import { Calendar, RangeCalendar, type CalendarRangeValue } from '../Calendar'
import { Input } from '../Input'
import { Popover } from '../Popover'
import { TimeInput } from '../TimeInput'
import { DatePickerContext } from './context'
import type {
  DatePickerProps,
  DatePickerRangeProps,
  DatePickerRangeValue,
  DatePickerValue,
  DateTimepickerProps,
} from './types'
import './DatePicker.scss'

const pad = (value: number) => String(value).padStart(2, '0')

const safeLocale = (locale: string) => {
  try {
    new Intl.DateTimeFormat(locale).format(new Date())
    return locale
  } catch {
    return 'en'
  }
}

const formatDate = (date: DatePickerValue, inputFormat: string, locale: string) => {
  if (!date) return ''
  const resolvedLocale = safeLocale(locale)

  if (inputFormat === 'LL') {
    return new Intl.DateTimeFormat(resolvedLocale, { dateStyle: 'long' }).format(date)
  }

  const monthShort = new Intl.DateTimeFormat(resolvedLocale, { month: 'short' }).format(date)
  const monthLong = new Intl.DateTimeFormat(resolvedLocale, { month: 'long' }).format(date)
  const tokens: Record<string, string> = {
    YYYY: String(date.getFullYear()),
    YY: String(date.getFullYear()).slice(-2),
    MMMM: monthLong,
    MMM: monthShort,
    MM: pad(date.getMonth() + 1),
    M: String(date.getMonth() + 1),
    DD: pad(date.getDate()),
    D: String(date.getDate()),
    HH: pad(date.getHours()),
    H: String(date.getHours()),
    mm: pad(date.getMinutes()),
    m: String(date.getMinutes()),
    ss: pad(date.getSeconds()),
    s: String(date.getSeconds()),
    A: date.getHours() >= 12 ? 'PM' : 'AM',
    a: date.getHours() >= 12 ? 'pm' : 'am',
  }

  return inputFormat.replace(
    /YYYY|MMMM|MMM|YY|MM|DD|HH|mm|ss|A|a|M|D|H|m|s/g,
    (token) => tokens[token] ?? token,
  )
}

const formatTime = (date: DatePickerValue, amPm: boolean) => {
  if (!date) return ''
  if (!amPm) return `${pad(date.getHours())}:${pad(date.getMinutes())}`
  const period = date.getHours() >= 12 ? 'PM' : 'AM'
  return `${pad(date.getHours() % 12 || 12)}:${pad(date.getMinutes())} ${period}`
}

const parseDate = (value: string, inputFormat: string) => {
  if (inputFormat !== 'YYYY-MM-DD') return null
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim())
  if (!match) return null
  const year = Number(match[1])
  const month = Number(match[2]) - 1
  const day = Number(match[3])
  const date = new Date(year, month, day)
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return null
  }
  return date
}

const mergeDateAndTime = (date: Date, timeSource: DatePickerValue) => {
  const next = new Date(date)
  if (timeSource) {
    next.setHours(
      timeSource.getHours(),
      timeSource.getMinutes(),
      timeSource.getSeconds(),
      timeSource.getMilliseconds(),
    )
  }
  return next
}

const isClearElement = (
  node: string | React.ReactNode,
): node is ReactElement<{ onClick?: (event: MouseEvent) => void; 'aria-label'?: string }> =>
  isValidElement(node)

interface ClearButtonProps {
  clearButton?: string | React.ReactNode
  label: string
  onClear: () => void
}

function ClearButton({ clearButton, label, onClear }: ClearButtonProps) {
  const clear = (event: MouseEvent) => {
    event.stopPropagation()
    onClear()
  }

  if (clearButton && isClearElement(clearButton)) {
    return cloneElement(clearButton, {
      onClick: (event: MouseEvent) => {
        clearButton.props.onClick?.(event)
        clear(event)
      },
      'aria-label': clearButton.props['aria-label'] ?? label,
    })
  }

  return (
    <button type="button" className="dyl-date-picker__clear" aria-label={label} onClick={clear}>
      {clearButton ?? <TbIcons.TbX aria-hidden />}
    </button>
  )
}

type CalendarPropSource = DatePickerProps | DatePickerRangeProps | DateTimepickerProps

const splitCalendarProps = <T extends CalendarPropSource>({
  dateViewCount,
  dayClassName,
  dayStyle,
  defaultMonth,
  defaultView,
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
  locale,
  maxDate,
  minDate,
  monthLabelFormat,
  onDayMouseEnter,
  range,
  renderDay,
  weekdayLabelFormat,
  weekendDays,
  yearLabelFormat,
  ...inputProps
}: T) => [
  {
    dateViewCount,
    dayClassName,
    dayStyle,
    defaultMonth,
    defaultView,
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
    locale,
    maxDate,
    minDate,
    monthLabelFormat,
    onDayMouseEnter,
    range,
    renderDay,
    weekdayLabelFormat,
    weekendDays,
    yearLabelFormat,
  },
  inputProps,
]

const SingleDatePicker = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
  {
    clearable = true,
    clearButton,
    closePickerOnChange = true,
    defaultOpen = false,
    defaultValue,
    disabled = false,
    inputFormat = 'YYYY-MM-DD',
    inputPrefix,
    inputSuffix = <TbIcons.TbCalendar />,
    inputtable = false,
    inputtableBlurClose = true,
    labelFormat: _labelFormat = { month: 'MMM', year: 'YYYY' },
    locale = 'en',
    onBlur,
    onChange,
    onDropdownClose,
    onDropdownOpen,
    onFocus,
    openPickerOnClear = false,
    placeholder,
    size = 'md',
    value,
    className,
    'aria-label': ariaLabel,
    ...rest
  },
  ref,
) {
  const [selected, setSelected] = useControllableState<DatePickerValue>({
    value,
    defaultValue: defaultValue ?? null,
    onChange,
  })
  const [open, setOpen] = useControllableState({
    defaultValue: defaultOpen,
    onChange: (next) => {
      if (next) onDropdownOpen?.()
      else onDropdownClose?.()
    },
  })
  const [inputDraft, setInputDraft] = useState<string | null>(null)
  const [calendarProps, inputProps] = splitCalendarProps(rest)

  const updateOpen = (next: boolean) => {
    if (disabled || next === open) return
    setOpen(next)
  }

  const commitDate = (date: DatePickerValue) => {
    setSelected(date)
    if (closePickerOnChange) updateOpen(false)
  }

  const clear = () => {
    setSelected(null)
    updateOpen(openPickerOnClear)
  }

  const suffix = (
    <span className="dyl-date-picker__suffix">
      {clearable && selected && !disabled && (
        <ClearButton clearButton={clearButton} label="Clear date" onClear={clear} />
      )}
      {inputSuffix != null && <span className="dyl-date-picker__affix">{inputSuffix}</span>}
    </span>
  )

  return (
    <DatePickerContext.Provider value={{ open, disabled }}>
      <Popover
        open={open}
        onOpenChange={updateOpen}
        placement="bottom-start"
        title={ariaLabel ?? placeholder ?? 'Date picker'}
        className="dyl-date-picker__popover"
        renderTrigger={
          <Input
            {...inputProps}
            ref={ref}
            className={className}
            size={size}
            disabled={disabled}
            readOnly={!inputtable}
            role="combobox"
            placeholder={placeholder}
            aria-label={ariaLabel ?? placeholder ?? 'Choose date'}
            value={inputDraft ?? formatDate(selected, inputFormat, locale)}
            prefix={inputPrefix}
            suffix={suffix}
            onBlur={(event) => {
              onBlur?.(event)
              setInputDraft(null)
              if (inputtable && inputtableBlurClose) updateOpen(false)
            }}
            onFocus={(event) => {
              onFocus?.(event)
            }}
            onChange={(event) => {
              if (!inputtable) return
              const nextDraft = event.currentTarget.value
              setInputDraft(nextDraft)
              const parsed = parseDate(nextDraft, inputFormat)
              if (parsed) setSelected(parsed)
            }}
          />
        }
      >
        <Calendar
          {...calendarProps}
          className="dyl-date-picker__calendar"
          value={selected}
          onChange={(next) => commitDate(next instanceof Date ? next : null)}
        />
      </Popover>
    </DatePickerContext.Provider>
  )
})

const DatePickerRange = forwardRef<HTMLInputElement, DatePickerRangeProps>(function DatePickerRange(
  {
    clearable = true,
    clearButton,
    closePickerOnChange = true,
    defaultOpen = false,
    defaultValue,
    disabled = false,
    inputFormat = 'YYYY-MM-DD',
    inputPrefix,
    inputSuffix = <TbIcons.TbCalendar />,
    inputtable = false,
    inputtableBlurClose = true,
    labelFormat = '~',
    locale = 'en',
    onBlur,
    onChange,
    onDropdownClose,
    onDropdownOpen,
    onFocus,
    openPickerOnClear = false,
    placeholder,
    separator = '~',
    singleDate = false,
    size = 'md',
    value,
    className,
    'aria-label': ariaLabel,
    ...rest
  },
  ref,
) {
  const [selected, setSelected] = useControllableState<DatePickerRangeValue>({
    value,
    defaultValue: defaultValue ?? [null, null],
    onChange,
  })
  const [open, setOpen] = useControllableState({
    defaultValue: defaultOpen,
    onChange: (next) => {
      if (next) onDropdownOpen?.()
      else onDropdownClose?.()
    },
  })
  const [calendarProps, inputProps] = splitCalendarProps(rest)

  const updateOpen = (next: boolean) => {
    if (disabled || next === open) return
    setOpen(next)
  }

  const commitRange = (next: CalendarRangeValue) => {
    setSelected(next)
    if (closePickerOnChange && next[0] && next[1]) updateOpen(false)
  }

  const clear = () => {
    setSelected([null, null])
    updateOpen(openPickerOnClear)
  }

  const rangeText = selected
    .map((date) => formatDate(date, inputFormat, locale))
    .filter(Boolean)
    .join(` ${separator || labelFormat} `)

  const suffix = (
    <span className="dyl-date-picker__suffix">
      {clearable && (selected[0] || selected[1]) && !disabled && (
        <ClearButton clearButton={clearButton} label="Clear date range" onClear={clear} />
      )}
      {inputSuffix != null && <span className="dyl-date-picker__affix">{inputSuffix}</span>}
    </span>
  )

  return (
    <DatePickerContext.Provider value={{ open, disabled }}>
      <Popover
        open={open}
        onOpenChange={updateOpen}
        placement="bottom-start"
        title={ariaLabel ?? placeholder ?? 'Date range picker'}
        className="dyl-date-picker__popover"
        renderTrigger={
          <Input
            {...inputProps}
            ref={ref}
            className={className}
            size={size}
            disabled={disabled}
            readOnly={!inputtable}
            role="combobox"
            placeholder={placeholder}
            aria-label={ariaLabel ?? placeholder ?? 'Choose date range'}
            value={rangeText}
            prefix={inputPrefix}
            suffix={suffix}
            onBlur={(event) => {
              onBlur?.(event)
              if (inputtable && inputtableBlurClose) updateOpen(false)
            }}
            onFocus={(event) => {
              onFocus?.(event)
            }}
            onChange={(event) => {
              if (!inputtable) return
              const parts = event.currentTarget.value.split(separator || labelFormat)
              const next: DatePickerRangeValue = [
                parseDate(parts[0] ?? '', inputFormat),
                parseDate(parts[1] ?? '', inputFormat),
              ]
              setSelected(next)
            }}
          />
        }
      >
        <RangeCalendar
          {...calendarProps}
          className="dyl-date-picker__calendar"
          value={selected}
          singleDate={singleDate}
          onChange={commitRange}
        />
      </Popover>
    </DatePickerContext.Provider>
  )
})

const DateTimepicker = forwardRef<HTMLInputElement, DateTimepickerProps>(function DateTimepicker(
  {
    amPm = true,
    clearable = true,
    clearButton,
    closePickerOnChange = false,
    defaultOpen = false,
    defaultValue,
    disabled = false,
    inputFormat = 'YYYY-MM-DD',
    inputPrefix,
    inputSuffix = <TbIcons.TbCalendarTime />,
    labelFormat: _labelFormat = { month: 'MMM', year: 'YYYY' },
    locale = 'en',
    okButtonContent = 'ok',
    onBlur,
    onChange,
    onDropdownClose,
    onDropdownOpen,
    onFocus,
    openPickerOnClear = false,
    placeholder,
    size = 'md',
    value,
    className,
    'aria-label': ariaLabel,
    ...rest
  },
  ref,
) {
  const [selected, setSelected] = useControllableState<DatePickerValue>({
    value,
    defaultValue: defaultValue ?? null,
    onChange,
  })
  const [open, setOpen] = useControllableState({
    defaultValue: defaultOpen,
    onChange: (next) => {
      if (next) onDropdownOpen?.()
      else onDropdownClose?.()
    },
  })
  const [calendarProps, inputProps] = splitCalendarProps(rest)

  const updateOpen = (next: boolean) => {
    if (disabled || next === open) return
    setOpen(next)
  }

  const commitDate = (date: DatePickerValue) => {
    setSelected(date ? mergeDateAndTime(date, selected) : null)
    if (closePickerOnChange) updateOpen(false)
  }

  const clear = () => {
    setSelected(null)
    updateOpen(openPickerOnClear)
  }

  const displayValue = selected
    ? `${formatDate(selected, inputFormat, locale)} ${formatTime(selected, amPm)}`
    : ''

  const suffix = (
    <span className="dyl-date-picker__suffix">
      {clearable && selected && !disabled && (
        <ClearButton clearButton={clearButton} label="Clear date time" onClear={clear} />
      )}
      {inputSuffix != null && <span className="dyl-date-picker__affix">{inputSuffix}</span>}
    </span>
  )

  return (
    <DatePickerContext.Provider value={{ open, disabled }}>
      <Popover
        open={open}
        onOpenChange={updateOpen}
        placement="bottom-start"
        title={ariaLabel ?? placeholder ?? 'Date time picker'}
        className="dyl-date-picker__popover"
        renderTrigger={
          <Input
            {...inputProps}
            ref={ref}
            className={className}
            size={size}
            disabled={disabled}
            readOnly
            role="combobox"
            placeholder={placeholder}
            aria-label={ariaLabel ?? placeholder ?? 'Choose date and time'}
            value={displayValue}
            prefix={inputPrefix}
            suffix={suffix}
            onBlur={onBlur}
            onFocus={(event) => {
              onFocus?.(event)
            }}
          />
        }
      >
        <div className="dyl-date-picker__datetime">
          <Calendar
            {...calendarProps}
            className="dyl-date-picker__calendar"
            value={selected}
            onChange={(next) => commitDate(next instanceof Date ? next : null)}
          />
          <div className="dyl-date-picker__time">
            <TimeInput
              value={selected}
              format={amPm ? '12' : '24'}
              size={size}
              disabled={disabled}
              aria-label="Time"
              onChange={setSelected}
            />
            <button type="button" className="dyl-date-picker__ok" onClick={() => updateOpen(false)}>
              {okButtonContent}
            </button>
          </div>
        </div>
      </Popover>
    </DatePickerContext.Provider>
  )
})

export const DatePicker = Object.assign(SingleDatePicker, {
  DatePickerRange,
  DateTimepicker,
})
