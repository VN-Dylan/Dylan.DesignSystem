import type { HTMLAttributes, ReactNode } from 'react'
import type { DrawerPlacement } from '../Drawer'

export type ToggleDrawerPlacement = DrawerPlacement

export interface ToggleDrawerRef {
  /** Method to programmatically open the drawer. */
  handleOpenDrawer: () => void
  /** Method to programmatically close the drawer. */
  handleCloseDrawer: () => void
}

export interface ToggleDrawerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title'> {
  /** The side from which the drawer opens. @default 'left' */
  placement?: ToggleDrawerPlacement
  /** Optional drawer title. */
  title?: ReactNode
  /** Content to render inside the drawer. */
  children?: ReactNode
}
