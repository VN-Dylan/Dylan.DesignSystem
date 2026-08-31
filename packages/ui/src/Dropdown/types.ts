import type { CSSProperties, HTMLAttributes, MouseEvent, ReactNode, Ref } from 'react'
import type { DropdownPlacement } from '../_internal/floatingPlacement'

export type { DropdownPlacement } from '../_internal/floatingPlacement'

export type DropdownTrigger = 'click' | 'hover' | 'context'
export type DropdownItemVariant = 'default' | 'header' | 'divider' | 'custom'

export interface DropdownProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    'title' | 'onClick' | 'onMouseEnter' | 'onMouseLeave' | 'onContextMenu' | 'onSelect'
  > {
  /** Dropdown title. */
  title?: string
  /** Custom Dropdown title. */
  renderTitle?: ReactNode
  /** Trigger mode of Dropdown. @default 'click' */
  trigger?: DropdownTrigger
  /** Placement where the Dropdown menu expand. @default 'bottom-start' */
  placement?: DropdownPlacement
  /** Additional class for dropdown menu. */
  menuClass?: string
  /** Additional styles for dropdown menu. */
  menuStyle?: CSSProperties
  /** Additional class dropdown toggle. */
  toggleClassName?: string
  /** Whether to disable Dropdown expand. */
  disabled?: boolean
  /** Mark corresponded Dropdown.Item to active by matching its eventKey prop. */
  activeKey?: string
  /** Callback when Dropdown toggle is clicked. */
  onClick?: (e: MouseEvent<HTMLElement>) => void
  /** Callback when Dropdown toggle is on mouse enter. */
  onMouseEnter?: (e: MouseEvent<HTMLElement>) => void
  /** Callback when Dropdown toggle is on mouse leave. */
  onMouseLeave?: (e: MouseEvent<HTMLElement>) => void
  /** Callback when Dropdown toggle is right clicked. */
  onContextMenu?: (e: MouseEvent<HTMLElement>) => void
  /** Callback when Dropdown item is clicked. */
  onSelect?: (e: MouseEvent<HTMLElement>) => void
  /** Callback when Dropdown is open. */
  onOpen?: () => void
  /** Callback when Dropdown is close. */
  onClose?: () => void
  /** Callback when Dropdown is open or close. */
  onToggle?: (open: boolean) => void
  children?: ReactNode
}

export interface DropdownItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick' | 'onSelect'> {
  /** Whether active current Dropdown Item. */
  active?: boolean
  /** Whether disabled current Dropdown Item. */
  disabled?: boolean
  /** Define the type of Dropdown Item. */
  variant?: DropdownItemVariant
  /** The value of Dropdown Item. */
  eventKey?: string
  /** Callback when Dropdown Item is clicked. */
  onClick?: () => void
  /** Callback when Dropdown Item is clicked. */
  onSelect?: (eventKey: string, e: MouseEvent<HTMLElement>) => void
}

export interface DropdownMenuProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onSelect'> {
  /** Title for submenu. */
  title?: string | ReactNode
  /** The value of Dropdown submenu. */
  eventKey?: string
  /** Placement where the Dropdown menu expand. */
  placement?: DropdownPlacement
}

export interface DropdownContextMenuProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    'onClick' | 'onMouseEnter' | 'onMouseLeave' | 'onSelect'
  > {
  /** Additional class for dropdown area. */
  areaClass?: string
  /** Additional content for dropdown area. */
  areaContent?: ReactNode
  /** Ref object to access the internal dropdown area. */
  areaRef?: Ref<HTMLDivElement>
  /** Placement where the Dropdown menu expand. @default 'bottom-start' */
  placement?: DropdownPlacement
  /** Additional class for dropdown menu. */
  menuClass?: string
  /** Additional styles for dropdown menu. */
  menuStyle?: CSSProperties
  /** Whether to disable Dropdown expand. */
  disabled?: boolean
  /** Mark corresponded Dropdown.Item to active by matching its eventKey prop. */
  activeKey?: string
  /** Callback when Dropdown toggle is clicked. */
  onClick?: (e: MouseEvent<HTMLElement>) => void
  /** Callback when Dropdown toggle is on mouse enter. */
  onMouseEnter?: (e: MouseEvent<HTMLElement>) => void
  /** Callback when Dropdown toggle is on mouse leave. */
  onMouseLeave?: (e: MouseEvent<HTMLElement>) => void
  /** Callback when Dropdown item is clicked. */
  onSelect?: (e: MouseEvent<HTMLElement>) => void
  /** Callback when Dropdown is open. */
  onOpen?: () => void
  /** Callback when Dropdown is close. */
  onClose?: () => void
  /** Callback when Dropdown is open or close. */
  onToggle?: (open: boolean) => void
  children?: ReactNode
}
