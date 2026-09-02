import { useEffect, useId, useRef } from 'react'
import jsVectorMap from 'jsvectormap'
import 'jsvectormap/dist/maps/world.js'
import { classNames } from '@vn-dylan/utils'
import './VectorMap.scss'

export interface VectorMapProps {
  /** Per-region values, keyed by ISO code (`US`, `GB`, …). Drives the choropleth. */
  data?: Record<string, number>
  /** Map name registered with jsvectormap. @default 'world' */
  map?: string
  /** Height. @default 360 */
  height?: number | string
  /** Called with the region code when a region is clicked. */
  onRegionClick?: (code: string) => void
  className?: string
  'aria-label'?: string
}

interface JsVectorMapInstance {
  destroy: () => void
}

const readVar = (name: string, fallback: string) => {
  if (typeof document === 'undefined') return fallback
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
}

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace('#', '')
  const n = h.length === 3 ? h.replace(/./g, (c) => c + c) : h
  return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)]
}

const lerpHex = (from: string, to: string, t: number) => {
  const a = hexToRgb(from)
  const b = hexToRgb(to)
  const c = a.map((v, i) => Math.round(v + (b[i]! - v) * Math.max(0, Math.min(1, t))))
  return `#${c.map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

/**
 * Choropleth world map (jsvectormap). Pass `data` keyed by ISO code to colour
 * regions; the fill ramps from the border token to the primary token.
 */
export function VectorMap({
  data,
  map = 'world',
  height = 360,
  onRegionClick,
  className,
  'aria-label': ariaLabel = 'Map',
}: VectorMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<JsVectorMapInstance | null>(null)
  const id = useId().replace(/:/g, '')

  useEffect(() => {
    if (!containerRef.current) return
    const primary = readVar('--dyl-primary', '#286cf0')
    const border = readVar('--dyl-border', '#e5e5e5')

    // jsvectormap 1.x only ships an ordinal scale (a direct `value -> style`
    // lookup), so the choropleth ramp is computed here: normalise each value to
    // 0–1, interpolate border→primary, then feed jsvectormap a code→colour map.
    let series: unknown
    if (data && Object.keys(data).length > 0) {
      const values = Object.values(data)
      const min = Math.min(...values)
      const max = Math.max(...values)
      const span = max - min || 1
      const scale: Record<string, string> = {}
      const passthrough: Record<string, string> = {}
      for (const [code, value] of Object.entries(data)) {
        scale[code] = lerpHex(border, primary, (value - min) / span)
        passthrough[code] = code
      }
      series = { regions: [{ attribute: 'fill', scale, values: passthrough }] }
    }

    instanceRef.current = new (jsVectorMap as unknown as new (
      opts: unknown,
    ) => JsVectorMapInstance)({
      selector: `#${id}`,
      map,
      backgroundColor: 'transparent',
      regionStyle: {
        initial: { fill: border },
        hover: { fill: primary },
      },
      series,
      onRegionClick: onRegionClick
        ? (_event: unknown, code: string) => onRegionClick(code)
        : undefined,
    })

    return () => {
      instanceRef.current?.destroy()
      instanceRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, data])

  return (
    <div
      className={classNames('dyl-vector-map', className)}
      style={{ height }}
      role="img"
      aria-label={ariaLabel}
    >
      <div ref={containerRef} id={id} className="dyl-vector-map__canvas" />
    </div>
  )
}
