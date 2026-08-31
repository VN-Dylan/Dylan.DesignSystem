import type { Placement } from '@floating-ui/react'

export type FloatingSidePlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end'

export type DropdownPlacement =
  | FloatingSidePlacement
  | 'top-center'
  | 'bottom-center'
  | 'middle-start-top'
  | 'middle-start-bottom'
  | 'middle-end-top'
  | 'middle-end-bottom'

const dropdownPlacementMap: Record<DropdownPlacement, Placement> = {
  top: 'top',
  'top-start': 'top-start',
  'top-center': 'top',
  'top-end': 'top-end',
  bottom: 'bottom',
  'bottom-start': 'bottom-start',
  'bottom-center': 'bottom',
  'bottom-end': 'bottom-end',
  right: 'right',
  'right-start': 'right-start',
  'right-end': 'right-end',
  left: 'left',
  'left-start': 'left-start',
  'left-end': 'left-end',
  'middle-start-top': 'left-start',
  'middle-start-bottom': 'left-end',
  'middle-end-top': 'right-start',
  'middle-end-bottom': 'right-end',
}

export const normalizeFloatingPlacement = (placement: FloatingSidePlacement): Placement => placement

export const normalizeDropdownPlacement = (placement: DropdownPlacement): Placement =>
  dropdownPlacementMap[placement]
