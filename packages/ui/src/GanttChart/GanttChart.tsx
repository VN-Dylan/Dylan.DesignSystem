import { useMemo } from 'react'
import { classNames } from '@vn-dylan/utils'
import './GanttChart.scss'

export interface GanttTask {
  id: string
  name: string
  start: Date | string
  end: Date | string
  /** 0–100 completion. */
  progress?: number
  /** ids of tasks this one depends on (drawn as a connector). */
  dependencies?: string[]
}

export interface GanttChartProps {
  tasks: GanttTask[]
  /** Column granularity. @default 'day' */
  unit?: 'day' | 'week'
  className?: string
}

const toDate = (v: Date | string) => (v instanceof Date ? v : new Date(v))
const DAY = 86_400_000

/**
 * A lightweight Gantt chart — one row per task, bars positioned across a shared
 * date axis, with progress fill. No external dependency.
 */
export function GanttChart({ tasks, unit = 'day', className }: GanttChartProps) {
  const { minMs, columns, spanDays } = useMemo(() => {
    if (tasks.length === 0) return { minMs: Date.now(), columns: [] as Date[], spanDays: 1 }
    const starts = tasks.map((t) => toDate(t.start).getTime())
    const ends = tasks.map((t) => toDate(t.end).getTime())
    // Floor to a UTC day boundary so positioning is timezone-independent.
    const lo = Math.floor(Math.min(...starts) / DAY) * DAY
    const hi = Math.floor(Math.max(...ends) / DAY) * DAY
    const total = Math.max(1, Math.round((hi - lo) / DAY) + 1)
    const step = unit === 'week' ? 7 : 1
    const cols: Date[] = []
    for (let d = 0; d < total; d += step) cols.push(new Date(lo + d * DAY))
    return { minMs: lo, columns: cols, spanDays: total }
  }, [tasks, unit])

  const pct = (ms: number) => ((ms - minMs) / (spanDays * DAY)) * 100

  return (
    <div className={classNames('dyl-gantt', className)} role="table" aria-label="Project timeline">
      <div className="dyl-gantt__head" role="row">
        <span className="dyl-gantt__corner" role="columnheader">
          Task
        </span>
        <div className="dyl-gantt__axis">
          {columns.map((col) => (
            <span key={col.toISOString()} className="dyl-gantt__tick" role="columnheader">
              {col.toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                timeZone: 'UTC',
              })}
            </span>
          ))}
        </div>
      </div>

      {tasks.map((task) => {
        const start = toDate(task.start).getTime()
        const end = toDate(task.end).getTime()
        const left = pct(start)
        const width = Math.max(1, pct(end + DAY) - left)
        return (
          <div key={task.id} className="dyl-gantt__row" role="row">
            <span className="dyl-gantt__name" role="rowheader">
              {task.name}
            </span>
            <div className="dyl-gantt__track" role="cell">
              <div
                className="dyl-gantt__bar"
                style={{ left: `${left}%`, width: `${width}%` }}
                title={`${task.name} — ${task.progress ?? 0}%`}
              >
                <span
                  className="dyl-gantt__bar-progress"
                  style={{ width: `${task.progress ?? 0}%` }}
                />
                <span className="dyl-gantt__bar-label">{task.name}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
