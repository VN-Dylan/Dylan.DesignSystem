import type { ReactNode } from 'react'

/** Every built-in string the components render. Functions receive the values to interpolate. */
export interface UiMessages {
  dialog: { close: string }
  drawer: { close: string }
  alert: { close: string }
  notification: { dismiss: string }
  confirmDialog: { cancel: string; confirm: string }
  select: {
    placeholder: string
    noOptions: string
    loading: string
    clear: string
    filter: string
  }
  combobox: { empty: string; loading: string; error: string; clear: string }
  list: { empty: string }
  treeList: { empty: string; search: string }
  carousel: { previous: string; next: string }
  numericInputStepper: { decrease: string; increase: string }
  loading: { label: string }
  pagination: {
    label: string
    previous: string
    next: string
    total: (total: number) => string
  }
  dataTable: {
    empty: string
    noResults: string
    search: string
    controls: string
    columns: string
    resetColumns: string
    rowsPerPage: string
    range: (start: number, end: number, total: number) => string
    page: (page: number, totalPages: number) => string
    selectAll: string
    selectRow: (index: number) => string
    expandAll: string
    collapseAll: string
    pinned: string
    columnOptions: (column: string) => string
    sortAscending: string
    sortDescending: string
    clearSort: string
    pinStart: string
    pinEnd: string
    unpin: string
    moveLeft: string
    moveRight: string
    hideColumn: string
  }
}

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends (...args: never[]) => unknown
    ? T[K]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K]
}

export type UiMessagesOverride = DeepPartial<UiMessages>

export interface LocaleProviderProps {
  /**
   * BCP 47 tag. Picks the bundled messages (`en`, `vi`; region tags such as
   * `vi-VN` fall back to their language) and is exposed for `Intl` formatting.
   * @default 'en'
   */
  locale?: string
  /** Overrides merged over the bundled messages — or a full set for another language. */
  messages?: UiMessagesOverride
  children?: ReactNode
}

export interface LocaleContextValue {
  locale: string
  messages: UiMessages
}
