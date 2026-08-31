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

export { Input } from './Input'
export type { InputProps, InputSize } from './Input'

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

export { Dialog } from './Dialog'
export type { DialogProps } from './Dialog'

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

export { Spinner } from './Spinner'
export type { SpinnerProps, SpinnerSize, SpinnerIndicator, SpinnerClassNameState } from './Spinner'

export { Avatar } from './Avatar'
export type {
  AvatarProps,
  AvatarShape,
  AvatarSize,
  AvatarGroupProps,
  AvatarOmittedAvatarTooltipProps,
} from './Avatar'

export { Badge } from './Badge'
export type { BadgeProps } from './Badge'

export { Alert } from './Alert'
export type { AlertProps, AlertType } from './Alert'

export { Card } from './Card'
export type { CardProps, CardHeaderConfig, CardFooterConfig } from './Card'

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
