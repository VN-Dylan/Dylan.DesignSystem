// @dylan-ds/ui — component library entry point.
//
// P1 ships the a11y primitive + the "golden five" reference components
// (Button, Input, Select, Dialog, Table) that set the pattern every later
// component follows. Full inventory + status: PROGRESS.md.

import './styles/index.scss'

export { VisuallyHidden, type VisuallyHiddenProps } from './VisuallyHidden'

export { Button } from './Button'
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  ButtonShape,
  ButtonClassNameState,
} from './Button'

export { Segment } from './Segment'
export type {
  SegmentProps,
  SegmentItemProps,
  SegmentItemRenderProps,
  SegmentSelectionType,
  SegmentSize,
  SegmentValue,
} from './Segment'

export { SegmentProgressBar } from './SegmentProgressBar'
export type { SegmentProgressBarProps } from './SegmentProgressBar'

export { Input } from './Input'
export type { InputProps, InputSize } from './Input'

export { DebounceInput } from './DebounceInput'
export type { DebounceInputProps, DebounceInputChangeEvent } from './DebounceInput'

export { PasswordInput } from './PasswordInput'
export type { PasswordInputProps } from './PasswordInput'

export { PatternInput } from './PatternInput'
export type { PatternInputProps } from './PatternInput'

export { NumericInput } from './NumericInput'
export type { NumericInputProps, NumericInputThousandsGroupStyle } from './NumericInput'

export { NumericInputStepper } from './NumericInputStepper'
export type { NumericInputStepperProps } from './NumericInputStepper'

export { CustomFormatInput } from './CustomFormatInput'
export type { CustomFormatInputProps, NumberFormatValue } from './CustomFormatInput'

export { OtpInput } from './OtpInput'
export type { OtpInputProps } from './OtpInput'

export { Checkbox } from './Checkbox'
export type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxValue,
  CheckboxClassNameState,
} from './Checkbox'

export { Radio } from './Radio'
export type { RadioProps, RadioGroupProps, RadioValue, RadioClassNameState } from './Radio'

export { Switcher } from './Switcher'
export type { SwitcherProps, SwitcherClassNameState } from './Switcher'

export { Select } from './Select'
export type { SelectProps, SelectMultiProps, SelectOption, SelectSize } from './Select'

export { DatePicker } from './DatePicker'
export type {
  DatePickerProps,
  DatePickerRangeProps,
  DateTimepickerProps,
  DatePickerValue,
  DatePickerRangeValue,
  DatePickerLabelFormat,
  DatePickerContextValue,
  DatePickerInputStyle,
} from './DatePicker'

export { Dialog } from './Dialog'
export type { DialogProps } from './Dialog'

export { ConfirmDialog } from './ConfirmDialog'
export type { ConfirmDialogProps, ConfirmDialogType } from './ConfirmDialog'

export { Popover } from './Popover'
export type { PopoverProps, PopoverPlacement, PopoverTrigger } from './Popover'

export { Tooltip } from './Tooltip'
export type { TooltipProps, TooltipPlacement } from './Tooltip'

export { Dropdown } from './Dropdown'
export type {
  DropdownProps,
  DropdownItemProps,
  DropdownMenuProps,
  DropdownContextMenuProps,
  DropdownTrigger,
  DropdownPlacement,
  DropdownItemVariant,
} from './Dropdown'

export { Menu } from './Menu'
export type {
  MenuProps,
  MenuVariant,
  MenuItemHeight,
  MenuCollapseProps,
  MenuGroupProps,
  MenuItemProps,
} from './Menu'

export { Tabs } from './Tabs'
export type {
  TabsProps,
  TabsVariant,
  TabsTabListProps,
  TabsTabNavProps,
  TabsTabContentProps,
} from './Tabs'

export { Steps } from './Steps'
export type { StepsProps, StepsItemProps, StepsStatus } from './Steps'

export { Pagination } from './Pagination'
export type { PaginationProps } from './Pagination'

export { Table } from './Table'
export type {
  TableProps,
  TableSectionProps,
  TableRowProps,
  TableHeadCellProps,
  TableCellProps,
} from './Table'

export { Calendar, RangeCalendar } from './Calendar'
export type {
  CalendarProps,
  RangeCalendarProps,
  CalendarValue,
  CalendarRangeValue,
  CalendarView,
  CalendarFirstDayOfWeek,
  CalendarDayModifiers,
  CalendarDayClassName,
  CalendarDayStyle,
  CalendarRangeMatcher,
  CalendarRenderDay,
} from './Calendar'

export { Spinner } from './Spinner'
export type { SpinnerProps, SpinnerSize, SpinnerIndicator, SpinnerClassNameState } from './Spinner'

export { Loading } from './Loading'
export type { LoadingProps } from './Loading'

export { Loaders, MediaSkeleton, TableRowSkeleton, TextBlockSkeleton } from './Loaders'
export type { MediaSkeletonProps, TableRowSkeletonProps, TextBlockSkeletonProps } from './Loaders'

export { ClockProgress } from './ClockProgress'
export type { ClockProgressProps } from './ClockProgress'

export { Divider } from './Divider'
export type { DividerProps, DividerOrientation } from './Divider'

export { ActionLink } from './ActionLink'
export type { ActionLinkProps, ActionLinkLocation, ActionLinkTo } from './ActionLink'

export { IconFrame } from './IconFrame'
export type { IconFrameProps, IconFrameVariant } from './IconFrame'

export { InfoBar } from './InfoBar'
export type { InfoBarProps, InfoBarLevel } from './InfoBar'

export { EmptyState } from './EmptyState'
export type { EmptyStateProps, EmptyStateVariant } from './EmptyState'

export { GrowShrinkTag } from './GrowShrinkTag'
export type { GrowShrinkTagProps } from './GrowShrinkTag'

export { Container } from './Container'
export type { ContainerProps } from './Container'

export { Affix } from './Affix'
export type { AffixProps } from './Affix'

export { AuthorityCheck } from './AuthorityCheck'
export type { AuthorityCheckProps, AuthorityRole } from './AuthorityCheck'

export { StickyRegion } from './StickyRegion'
export type { StickyRegionProps } from './StickyRegion'

export { NavToggle } from './NavToggle'
export type { NavToggleProps } from './NavToggle'

export { ToggleDrawer } from './ToggleDrawer'
export type { ToggleDrawerPlacement, ToggleDrawerProps, ToggleDrawerRef } from './ToggleDrawer'

export { Avatar } from './Avatar'
export type {
  AvatarProps,
  AvatarShape,
  AvatarSize,
  AvatarGroupProps,
  AvatarOmittedAvatarTooltipProps,
} from './Avatar'

export { UsersAvatarGroup } from './UsersAvatarGroup'
export type { UsersAvatarGroupProps, UserDataObject } from './UsersAvatarGroup'

export { Badge } from './Badge'
export type { BadgeProps } from './Badge'

export { Alert } from './Alert'
export type { AlertProps, AlertType } from './Alert'

export { Card } from './Card'
export type { CardProps, CardHeaderConfig, CardFooterConfig } from './Card'

export { StatisticCard } from './StatisticCard'
export type { StatisticCardProps } from './StatisticCard'

export { Typography } from './Typography'
export type { TypographyProps } from './Typography'

export { Grid } from './Grid'
export type { GridProps } from './Grid'

export { Scroll } from './Scroll'
export type {
  ScrollProps,
  ScrollFlexSizeProps,
  ScrollPosition,
  Scrollbars,
  OffsetScrollbars,
  ScrollType,
} from './Scroll'

export { Tag } from './Tag'
export type { TagProps } from './Tag'

export { Skeleton } from './Skeleton'
export type { SkeletonProps, SkeletonVariant } from './Skeleton'

export { Progress } from './Progress'
export type {
  ProgressProps,
  ProgressVariant,
  ProgressSize,
  ProgressGapPosition,
  ProgressStrokeLinecap,
} from './Progress'

export { InputGroup } from './InputGroup'
export type { InputGroupProps, InputGroupAddonProps, InputGroupSize } from './InputGroup'

export { Slider } from './Slider'
export type {
  SliderProps,
  SliderRangeProps,
  SliderRangeValue,
  SliderMark,
  SliderPartClassNames,
} from './Slider'

export { MultiValueInput } from './MultiValueInput'
export type { MultiValueInputProps, MultiValueInputSize } from './MultiValueInput'

export { TimeInput } from './TimeInput'
export type {
  TimeInputProps,
  TimeInputRangeProps,
  TimeInputValue,
  TimeInputRangeValue,
  TimeInputSize,
  TimeInputFormat,
} from './TimeInput'

export { Collapsible, useAccordion } from './Collapsible'
export type {
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
} from './Collapsible'

export { Drawer } from './Drawer'
export type { DrawerProps, DrawerPlacement } from './Drawer'

export { ActionBar } from './ActionBar'
export type { ActionBarProps } from './ActionBar'

export { Toaster, Notification, toast } from './Toast'
export type {
  NotificationProps,
  NotificationType,
  ToastPlacement,
  ToastOptions,
  ToastEntry,
} from './Toast'

export { Timeline } from './Timeline'
export type { TimelineProps, TimelineItemProps } from './Timeline'

export { Form } from './FormControl'
export type { FormProps, FormItemProps, FormLayout, FormSize } from './FormControl'

export { Carousel } from './Carousel'
export type {
  CarouselProps,
  CarouselContentProps,
  CarouselItemProps,
  CarouselControlProps,
  CarouselApi,
  CarouselOptions,
  CarouselOrientation,
} from './Carousel'

export { Upload } from './Upload'
export type { UploadProps } from './Upload'

export { AutoComplete } from './AutoComplete'
export type { AutoCompleteProps, AutoCompleteClassNameState } from './AutoComplete'

export { SelectExtension, SelectInputWithPrefix, SelectOptionWithPrefix } from './SelectExtension'
export type {
  SelectExtensionProps,
  SelectInputWithPrefixProps,
  SelectOptionWithPrefixProps,
} from './SelectExtension'

export { PopoverFilter } from './PopoverFilter'
export type { PopoverFilterProps, PopoverFilterOption } from './PopoverFilter'

export { OverflowTabs } from './OverflowTabs'
export type { OverflowTabsProps, OverflowTabItem } from './OverflowTabs'

export { ReactionEmojiPicker } from './ReactionEmojiPicker'
export type { ReactionEmojiPickerProps } from './ReactionEmojiPicker'

export { AdvancedFilterBuilder } from './AdvancedFilterBuilder'
export type {
  AdvancedFilterBuilderProps,
  FilterFieldDef,
  FilterRule,
  FilterQuery,
  FilterCombinator,
  FilterOperator,
} from './AdvancedFilterBuilder'
