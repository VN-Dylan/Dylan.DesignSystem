import type { Column } from '@tanstack/react-table'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { Dropdown } from '../Dropdown'

interface ColumnMenuProps<TData> {
  column: Column<TData, unknown>
  label: string
  pinnable: boolean
  canMoveStart: boolean
  canMoveEnd: boolean
  onMove: (direction: -1 | 1) => void
}

/** Per-column header menu: sort, pin, move and hide. */
export function ColumnMenu<TData>({
  column,
  label,
  pinnable,
  canMoveStart,
  canMoveEnd,
  onMove,
}: ColumnMenuProps<TData>) {
  const sorted = column.getIsSorted()
  const pinned = column.getIsPinned()
  const item = (key: string, text: string, icon: typeof TbIcons.TbArrowUp, run: () => void) => (
    <Dropdown.Item key={key} eventKey={key} onSelect={run}>
      <Icon as={icon} size={16} className="dyl-data-table__menu-icon" aria-hidden />
      {text}
    </Dropdown.Item>
  )

  return (
    <Dropdown
      placement="bottom-end"
      toggleClassName="dyl-data-table__menu-toggle"
      renderTitle={
        <button type="button" className="dyl-data-table__menu-btn" aria-label={`${label} options`}>
          <Icon as={TbIcons.TbDotsVertical} size={14} aria-hidden />
        </button>
      }
    >
      {column.getCanSort() && [
        item('sort-asc', 'Sort ascending', TbIcons.TbSortAscending, () =>
          column.toggleSorting(false),
        ),
        item('sort-desc', 'Sort descending', TbIcons.TbSortDescending, () =>
          column.toggleSorting(true),
        ),
        sorted &&
          item('sort-clear', 'Clear sort', TbIcons.TbArrowsSort, () => column.clearSorting()),
        <Dropdown.Item key="d1" variant="divider" />,
      ]}
      {pinnable &&
        column.getCanPin() && [
          pinned !== 'left' &&
            item('pin-left', 'Pin to start', TbIcons.TbPinned, () => column.pin('left')),
          pinned !== 'right' &&
            item('pin-right', 'Pin to end', TbIcons.TbPinned, () => column.pin('right')),
          pinned && item('unpin', 'Unpin', TbIcons.TbPinnedOff, () => column.pin(false)),
          <Dropdown.Item key="d2" variant="divider" />,
        ]}
      {!pinned && [
        canMoveStart &&
          item('move-start', 'Move left', TbIcons.TbArrowNarrowLeft, () => onMove(-1)),
        canMoveEnd && item('move-end', 'Move right', TbIcons.TbArrowNarrowRight, () => onMove(1)),
      ]}
      {column.getCanHide() &&
        item('hide', 'Hide column', TbIcons.TbEyeOff, () => column.toggleVisibility(false))}
    </Dropdown>
  )
}
