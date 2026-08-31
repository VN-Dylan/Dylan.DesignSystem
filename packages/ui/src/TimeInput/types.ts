import type { HTMLAttributes, ReactNode, RefObject } from 'react'

export type TimeInputSize = 'sm' | 'md' | 'lg'
export type TimeInputFormat = '12' | '24'
export type TimeInputValue = Date | null
export type TimeInputRangeValue = [TimeInputValue, TimeInputValue]

interface TimeInputSharedProps {
  /** Display string for AM. @default 'am' */
  amLabel?: string
  /** Placeholder for AM/PM field. @default 'am' */
  amPmPlaceholder?: string
  /** Whether allow to clear value. @default true */
  clearable?: boolean
  /** Whether TimeInput is disabled. @default false */
  disabled?: boolean
  /** Determine time format. @default '24' */
  format?: TimeInputFormat
  /** Whether the TimeInput is invalid status. */
  invalid?: boolean
  /** Ref to focus after final TimeInput field. */
  nextRef?: RefObject<HTMLElement>
  /** Display string for PM. @default 'pm' */
  pmLabel?: string
  /** Render a prefix content inside TimeInput. */
  prefix?: string | ReactNode
  /** Whether display seconds input field. */
  showSeconds?: boolean
  /** TimeInput size. @default 'md' */
  size?: TimeInputSize
  /** Render a suffix content inside TimeInput. */
  suffix?: string | ReactNode
  /** Time field placeholder. @default '--' */
  timeFieldPlaceholder?: string
  /** Extra class for time field. */
  timeFieldClass?: string
}

export interface TimeInputProps
  extends TimeInputSharedProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'prefix'> {
  /** Default value of TimeInput (use value instead if it is controlled). */
  defaultValue?: TimeInputValue
  /** Callback when TimeInput value changed. */
  onChange?: (value: TimeInputValue) => void
  /** Value of TimeInput (Controlled). */
  value?: TimeInputValue
}

export interface TimeInputRangeProps
  extends TimeInputSharedProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'prefix'> {
  /** Default value of TimeInputRange (use value instead if it is controlled). */
  defaultValue?: TimeInputRangeValue
  /** Callback when TimeInputRange value changed. */
  onChange?: (value: TimeInputRangeValue) => void
  /** Seperator between time inputs. @default '~' */
  separator?: string | ReactNode
  /** Value of TimeInputRange (Controlled). */
  value?: TimeInputRangeValue
}
