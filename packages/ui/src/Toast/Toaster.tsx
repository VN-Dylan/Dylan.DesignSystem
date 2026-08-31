import { useEffect, useRef, useSyncExternalStore } from 'react'
import { Portal } from '../_internal/Portal'
import { toast } from './store'
import { toastStore } from './store'
import type { ToastEntry, ToastPlacement } from './types'
import './Toast.scss'

const placements: ToastPlacement[] = [
  'top-start',
  'top-center',
  'top-end',
  'bottom-start',
  'bottom-center',
  'bottom-end',
]

function ToastItem({ entry }: { entry: ToastEntry }) {
  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (entry.duration > 0) {
      timer.current = setTimeout(() => toast.remove(entry.id), entry.duration)
    }
    return () => clearTimeout(timer.current)
  }, [entry.id, entry.duration])

  return <div className="dyl-toast__item">{entry.content}</div>
}

/**
 * Mounts once near the app root; renders the toast stacks for every placement.
 * Toasts are pushed imperatively with `toast.push(...)`.
 */
export function Toaster() {
  const entries = useSyncExternalStore(toastStore.subscribe, toastStore.getSnapshot, () => [])

  return (
    <Portal>
      {placements.map((placement) => {
        const group = entries.filter((e) => e.placement === placement)
        if (group.length === 0) return null
        return (
          <div key={placement} className="dyl-toast" data-placement={placement}>
            {group.map((entry) => (
              <ToastItem key={entry.id} entry={entry} />
            ))}
          </div>
        )
      })}
    </Portal>
  )
}
