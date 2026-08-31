import type { ReactNode } from 'react'
import type { ToastEntry, ToastOptions } from './types'

type Listener = (entries: ToastEntry[]) => void

let entries: ToastEntry[] = []
const listeners = new Set<Listener>()
let seq = 0

const emit = () => {
  for (const listener of listeners) listener(entries)
}

export const toastStore = {
  subscribe(listener: Listener) {
    listeners.add(listener)
    listener(entries)
    return () => {
      listeners.delete(listener)
    }
  },
  getSnapshot: () => entries,
}

/** Imperative toast API — mirrors the Eyris `toast` helper. */
export const toast = {
  push(content: ReactNode, options: ToastOptions = {}): string {
    const id = `toast-${(seq += 1)}`
    const entry: ToastEntry = {
      id,
      content,
      duration: options.duration ?? 3000,
      placement: options.placement ?? 'top-end',
    }
    entries = [...entries, entry]
    emit()
    return id
  },
  remove(id: string) {
    entries = entries.filter((e) => e.id !== id)
    emit()
  },
  removeAll() {
    entries = []
    emit()
  },
}
