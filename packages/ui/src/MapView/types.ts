import type { HTMLAttributes, ReactNode } from 'react'

export interface MapMarker {
  /** Stable marker id. */
  id: string
  /** Marker longitude. */
  lng: number
  /** Marker latitude. */
  lat: number
  /** Optional popup content rendered with React. */
  popup?: ReactNode
  /** Caller-supplied marker colour passed through to MapLibre. */
  color?: string
}

export interface MapViewProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Controlled map center as longitude, latitude. */
  center: [number, number]
  /** Controlled map zoom. @default 12 */
  zoom?: number
  /** MapLibre style JSON URL. Defaults to `import.meta.env.VITE_MAP_TILES_URL`. */
  styleUrl?: string
  /** Markers to render on the map. */
  markers?: MapMarker[]
  /** Enable MapLibre clustering for marker data. @default false */
  cluster?: boolean
  /** Whether the map accepts user interaction. @default true */
  interactive?: boolean
  /** Called after the map movement ends. */
  onMoveEnd?: (view: { center: [number, number]; zoom: number }) => void
  /** Called when a marker is clicked. */
  onMarkerClick?: (id: string) => void
  /** Accessible region label. @default 'Map' */
  'aria-label'?: string
  /** Fallback content shown when no style URL is available. */
  fallback?: ReactNode
}
