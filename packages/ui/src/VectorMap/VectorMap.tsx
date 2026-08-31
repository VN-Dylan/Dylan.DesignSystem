import { useEffect, useId, useRef } from 'react'
import jsVectorMap from 'jsvectormap'
import 'jsvectormap/dist/maps/world.js'
import { classNames } from '@dylan-ds/utils'
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

/**
 * Choropleth world map (jsvectormap). Pass `data` keyed by ISO code to colour
 * regions; colours come from the primary token.
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
    const primary =
      getComputedStyle(document.documentElement).getPropertyValue('--dyl-primary').trim() ||
      '#286cf0'
    const border =
      getComputedStyle(document.documentElement).getPropertyValue('--dyl-border').trim() ||
      '#e5e5e5'

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
      series: data
        ? {
            regions: [
              {
                attribute: 'fill',
                scale: [border, primary],
                normalizeFunction: 'polynomial',
                values: data,
              },
            ],
          }
        : undefined,
      onRegionClick: onRegionClick
        ? (_event: unknown, code: string) => onRegionClick(code)
        : undefined,
    })

    return () => {
      instanceRef.current?.destroy()
      instanceRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map])

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
