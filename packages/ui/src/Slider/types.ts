import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from 'react'

export interface SliderMark {
  value: number
  label?: ReactNode | string
}

export interface SliderPartClassNames {
  thumb?: string
  bar?: string
  mark?: string | ((isFilled: boolean) => string)
  track?: string
}

export interface SliderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /** Whether to showing tooltip all the time. */
  alwaysShowTooltip?: boolean
  /** Class name for each part of slider. */
  classNames?: SliderPartClassNames
  /** Default value of Slider (use value instead if it is controlled). */
  defaultValue?: number
  /** Whether to disable Slider. */
  disabled?: boolean
  /** Props for input element that behind the slider. */
  inputProps?: ComponentPropsWithoutRef<'input'>
  /** Marks metadata show under the bar. */
  marks?: SliderMark[]
  /** Maximum value of Slider. @default 100 */
  max?: number
  /** Minimum value of Slider. @default 0 */
  min?: number
  /** Name of input element that behind the slider. */
  name?: string
  /** Callback when Slider value changed. */
  onChange?: (value: number) => void
  /** Callback when dragging stop. */
  onDraggingStop?: (value: number) => void
  /** Precision of Slider value. */
  precision?: number
  /** Whether to show tooltip when hover. @default false */
  showTooltipOnHover?: boolean
  /** Increment value when dragging the slider. @default 1 */
  step?: number
  /** Whether to move slider across different inconsistent step values. @default false */
  stepOnMarks?: boolean
  /** Aria label of slider thumb. */
  thumbAriaLabel?: string
  /** Custom tooltip value of slider. */
  tooltip?: ReactNode | ((value: number) => ReactNode)
  /** Value of Slider. */
  value?: number
}

export type SliderRangeValue = [number, number]

export interface SliderRangeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /** Whether to showing tooltip all the time. */
  alwaysShowTooltip?: boolean
  /** Default value of Range Slider (use value instead if it is controlled). */
  defaultValue?: SliderRangeValue
  /** Whether to disable Range Slider. */
  disabled?: boolean
  /** Props for input element that behind the slider. */
  inputProps?: ComponentPropsWithoutRef<'input'>
  /** Marks metadata show under the bar. */
  marks?: SliderMark[]
  /** Maximum value of Range Slider. @default 100 */
  max?: number
  /** Maximum range interval of Range Slider. */
  maxRange?: number
  /** Minimum value of Range Slider. @default 0 */
  min?: number
  /** Minimum range interval of Range Slider. @default 0 */
  minRange?: number
  /** Name of input element that behind the slider. */
  name?: string
  /** Precision of Range Slider value. */
  precision?: number
  /** Callback when Range Slider value changed. */
  onChange?: (values: SliderRangeValue) => void
  /** Callback when dragging stop. */
  onDraggingStop?: (values: SliderRangeValue) => void
  /** Whether to show tooltip when hover. @default false */
  showTooltipOnHover?: boolean
  /** Increment value when dragging the slider. @default 1 */
  step?: number
  /** Whether to move slider across different inconsistent step values. @default false */
  stepOnMarks?: boolean
  /** Aria label of start slider thumb. */
  thumbAriaLabelStart?: string
  /** Aria label of end slider thumb. */
  thumbAriaLabelEnd?: string
  /** Custom tooltip value of slider. */
  tooltip?: ReactNode | ((value: SliderRangeValue) => ReactNode)
  /** Value of Range Slider. */
  value?: SliderRangeValue
}
