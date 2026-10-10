import type { Column } from '@tanstack/react-table'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { Dropdown } from '../Dropdown'
import { useUiMessages } from '../LocaleProvider'

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
  const t = useUiMessages('dataTable')
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
        <button
          type="button"
          className="dyl-data-table__menu-btn"
          aria-label={t.columnOptions(label)}
        >
          <Icon as={TbIcons.TbDotsVertical} size={14} aria-hidden />
        </button>
      }
    >
      {column.getCanSort() && [
        item('sort-asc', t.sortAscending, TbIcons.TbSortAscending, () =>
          column.toggleSorting(false),
        ),
        item('sort-desc', t.sortDescending, TbIcons.TbSortDescending, () =>
          column.toggleSorting(true),
        ),
        sorted &&
          item('sort-clear', t.clearSort, TbIcons.TbArrowsSort, () => column.clearSorting()),
        <Dropdown.Item key="d1" variant="divider" />,
      ]}
      {pinnable &&
        column.getCanPin() && [
          pinned !== 'left' &&
            item('pin-left', t.pinStart, TbIcons.TbPinned, () => column.pin('left')),
          pinned !== 'right' &&
            item('pin-right', t.pinEnd, TbIcons.TbPinned, () => column.pin('right')),
          pinned && item('unpin', t.unpin, TbIcons.TbPinnedOff, () => column.pin(false)),
          <Dropdown.Item key="d2" variant="divider" />,
        ]}
      {!pinned && [
        canMoveStart && item('move-start', t.moveLeft, TbIcons.TbArrowNarrowLeft, () => onMove(-1)),
        canMoveEnd && item('move-end', t.moveRight, TbIcons.TbArrowNarrowRight, () => onMove(1)),
      ]}
      {column.getCanHide() &&
        item('hide', t.hideColumn, TbIcons.TbEyeOff, () => column.toggleVisibility(false))}
    </Dropdown>
  )
}
