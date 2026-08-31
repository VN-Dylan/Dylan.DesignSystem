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

export { Input } from './Input'
export type { InputProps, InputSize } from './Input'

export { Select } from './Select'
export type { SelectProps, SelectMultiProps, SelectOption, SelectSize } from './Select'

export { Dialog } from './Dialog'
export type { DialogProps } from './Dialog'

export { Table } from './Table'
export type {
  TableProps,
  TableSectionProps,
  TableRowProps,
  TableHeadCellProps,
  TableCellProps,
} from './Table'
