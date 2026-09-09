import { forwardRef, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { classNames } from '@vn-dylan/utils'
import { composeRefs } from '../_internal/composeRefs'
import type { MapViewProps } from './types'
import './MapView.scss'

interface MapLibreMap {
  remove: () => void
  jumpTo: (options: { center?: [number, number]; zoom?: number }) => void
  flyTo?: (options: { center?: [number, number]; zoom?: number }) => void
  getCenter?: () => { lng: number; lat: number; toArray?: () => [number, number] }
  getZoom?: () => number
  getCanvas?: () => HTMLElement
  on?: (...args: [string, () => void] | [string, string, (event: MapLayerEvent) => void]) => void
  off?: (...args: [string, () => void] | [string, string, (event: MapLayerEvent) => void]) => void
  addSource?: (id: string, source: unknown) => void
  getSource?: (id: string) => { setData?: (data: unknown) => void } | undefined
  removeSource?: (id: string) => void
  addLayer?: (layer: unknown) => void
  getLayer?: (id: string) => unknown
  removeLayer?: (id: string) => void
}

interface MapLibreMarker {
  setLngLat: (position: [number, number]) => MapLibreMarker
  addTo: (map: MapLibreMap) => MapLibreMarker
  remove: () => void
  getElement?: () => HTMLElement
  setPopup?: (popup: MapLibrePopup) => MapLibreMarker
}

interface MapLibrePopup {
  setDOMContent: (node: HTMLElement) => MapLibrePopup
  setLngLat?: (position: [number, number]) => MapLibrePopup
  addTo?: (map: MapLibreMap) => MapLibrePopup
  remove?: () => void
}

interface MapLibreRuntime {
  Map: new (options: {
    container: HTMLElement
    style: string
    center: [number, number]
    zoom: number
    interactive: boolean
  }) => MapLibreMap
  Marker: new (options?: { color?: string }) => MapLibreMarker
  Popup: new () => MapLibrePopup
}

interface MapLibreModule extends Partial<MapLibreRuntime> {
  default?: Partial<MapLibreRuntime>
}

interface PopupPortal {
  id: string
  target: HTMLElement
  children: ReactNode
}

interface MapLayerEvent {
  features?: Array<{
    properties?: Record<string, unknown>
    geometry?: { coordinates?: [number, number] }
  }>
}

const clusterSourceId = 'dyl-map-view-markers'
const clusterLayerId = 'dyl-map-view-clusters'
const clusterCountLayerId = 'dyl-map-view-cluster-count'
const unclusteredLayerId = 'dyl-map-view-unclustered'

const getDefaultStyleUrl = () =>
  (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env?.VITE_MAP_TILES_URL

const isJSDOM = () =>
  typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('jsdom')

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true

const readCssVar = (name: string, fallback: string) => {
  if (typeof document === 'undefined') return fallback
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
}

const sameView = (map: MapLibreMap, center: [number, number], zoom: number) => {
  const currentCenter = map.getCenter?.()
  const currentZoom = map.getZoom?.()
  const centerArray = currentCenter?.toArray?.() ?? [currentCenter?.lng, currentCenter?.lat]
  return centerArray[0] === center[0] && centerArray[1] === center[1] && currentZoom === zoom
}

/**
 * Accessible MapLibre wrapper that lazy-loads the map engine only when a style
 * URL is available in the browser.
 */
export const MapView = forwardRef<HTMLDivElement, MapViewProps>(function MapView(
  {
    center,
    zoom = 12,
    styleUrl = getDefaultStyleUrl(),
    markers = [],
    cluster = false,
    interactive = true,
    onMoveEnd,
    onMarkerClick,
    'aria-label': ariaLabel = 'Map',
    fallback,
    className,
    children,
    ...rest
  },
  ref,
) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapLibreMap | null>(null)
  const runtimeRef = useRef<MapLibreRuntime | null>(null)
  const centerRef = useRef(center)
  const zoomRef = useRef(zoom)
  const onMoveEndRef = useRef(onMoveEnd)
  const onMarkerClickRef = useRef(onMarkerClick)
  const clusterPopupRef = useRef<MapLibrePopup | null>(null)
  const [popupPortals, setPopupPortals] = useState<PopupPortal[]>([])
  const [failed, setFailed] = useState(false)

  centerRef.current = center
  zoomRef.current = zoom
  onMoveEndRef.current = onMoveEnd
  onMarkerClickRef.current = onMarkerClick

  const markerLabels = useMemo(() => markers.map((marker) => marker.id), [markers])
  const shouldRenderFallback = !styleUrl || failed

  useEffect(() => {
    if (
      !styleUrl ||
      typeof window === 'undefined' ||
      typeof document === 'undefined' ||
      isJSDOM()
    ) {
      return
    }

    let cancelled = false
    setFailed(false)

    const createMap = async () => {
      try {
        const module = (await import('maplibre-gl')) as unknown as MapLibreModule
        const runtime = { ...module, ...module.default } as MapLibreRuntime
        if (cancelled || !canvasRef.current) return

        const map = new runtime.Map({
          container: canvasRef.current,
          style: styleUrl,
          center: centerRef.current,
          zoom: zoomRef.current,
          interactive,
        })
        runtimeRef.current = runtime
        mapRef.current = map
        map.getCanvas?.().setAttribute('aria-label', `${ariaLabel} canvas`)

        const handleMoveEnd = () => {
          const movedCenter = map.getCenter?.()
          const centerArray = movedCenter?.toArray?.() ?? [
            movedCenter?.lng ?? centerRef.current[0],
            movedCenter?.lat ?? centerRef.current[1],
          ]
          onMoveEndRef.current?.({ center: centerArray, zoom: map.getZoom?.() ?? zoomRef.current })
        }
        map.on?.('moveend', handleMoveEnd)

        if (cancelled) {
          map.off?.('moveend', handleMoveEnd)
          map.remove()
          mapRef.current = null
        }
      } catch {
        if (!cancelled) setFailed(true)
      }
    }

    void createMap()

    return () => {
      cancelled = true
      mapRef.current?.remove()
      mapRef.current = null
      runtimeRef.current = null
      setPopupPortals([])
    }
  }, [ariaLabel, interactive, styleUrl])

  useEffect(() => {
    const map = mapRef.current
    if (!map || sameView(map, center, zoom)) return
    const move = prefersReducedMotion() || !map.flyTo ? map.jumpTo : map.flyTo
    move.call(map, { center, zoom })
  }, [center, zoom])

  useEffect(() => {
    const map = mapRef.current
    const runtime = runtimeRef.current
    if (!map || !runtime || !cluster) return

    const data = {
      type: 'FeatureCollection',
      features: markers.map((marker) => ({
        type: 'Feature',
        properties: { id: marker.id },
        geometry: { type: 'Point', coordinates: [marker.lng, marker.lat] },
      })),
    }

    const syncClusterSource = () => {
      try {
        const source = map.getSource?.(clusterSourceId)
        if (source) source.setData?.(data)
        else {
          map.addSource?.(clusterSourceId, {
            type: 'geojson',
            data,
            cluster: true,
          })
        }

        const primary = readCssVar('--dyl-primary', 'CanvasText')
        const primaryForeground = readCssVar('--dyl-primary-fg', 'Canvas')
        const surface = readCssVar('--dyl-surface', 'Canvas')

        if (!map.getLayer?.(clusterLayerId)) {
          map.addLayer?.({
            id: clusterLayerId,
            type: 'circle',
            source: clusterSourceId,
            filter: ['has', 'point_count'],
            paint: {
              'circle-color': primary,
              'circle-radius': ['step', ['get', 'point_count'], 14, 10, 18, 30, 22],
              'circle-stroke-color': surface,
              'circle-stroke-width': 2,
            },
          })
        }

        if (!map.getLayer?.(clusterCountLayerId)) {
          map.addLayer?.({
            id: clusterCountLayerId,
            type: 'symbol',
            source: clusterSourceId,
            filter: ['has', 'point_count'],
            layout: {
              'text-field': ['get', 'point_count_abbreviated'],
              'text-size': 12,
            },
            paint: {
              'text-color': primaryForeground,
            },
          })
        }

        if (!map.getLayer?.(unclusteredLayerId)) {
          map.addLayer?.({
            id: unclusteredLayerId,
            type: 'circle',
            source: clusterSourceId,
            filter: ['!', ['has', 'point_count']],
            paint: {
              'circle-color': primary,
              'circle-radius': 8,
              'circle-stroke-color': surface,
              'circle-stroke-width': 2,
            },
          })
        }
      } catch {
        setFailed(true)
      }
    }

    const handlePointClick = (event: MapLayerEvent) => {
      const feature = event.features?.[0]
      const id = feature?.properties?.id
      const marker = typeof id === 'string' ? markers.find((item) => item.id === id) : undefined
      if (!marker) return

      onMarkerClickRef.current?.(marker.id)
      if (marker.popup == null) return

      const target = document.createElement('div')
      const popup = new runtime.Popup()
      popup.setLngLat?.(feature?.geometry?.coordinates ?? [marker.lng, marker.lat])
      popup.setDOMContent(target)
      popup.addTo?.(map)
      clusterPopupRef.current?.remove?.()
      clusterPopupRef.current = popup
      setPopupPortals([{ id: marker.id, target, children: marker.popup }])
    }

    syncClusterSource()
    map.on?.('click', unclusteredLayerId, handlePointClick)

    return () => {
      map.off?.('click', unclusteredLayerId, handlePointClick)
      clusterPopupRef.current?.remove?.()
      clusterPopupRef.current = null
      setPopupPortals([])
      for (const layerId of [clusterCountLayerId, clusterLayerId, unclusteredLayerId]) {
        if (map.getLayer?.(layerId)) map.removeLayer?.(layerId)
      }
      if (map.getSource?.(clusterSourceId)) map.removeSource?.(clusterSourceId)
    }
  }, [cluster, markers])

  useEffect(() => {
    const map = mapRef.current
    const runtime = runtimeRef.current
    if (!map || !runtime || cluster) {
      if (cluster) setPopupPortals([])
      return
    }

    const cleanups: Array<() => void> = []
    const nextPortals: PopupPortal[] = []

    for (const marker of markers) {
      const instance = new runtime.Marker(marker.color ? { color: marker.color } : undefined)
        .setLngLat([marker.lng, marker.lat])
        .addTo(map)

      const markerElement = instance.getElement?.()
      const handleClick = () => onMarkerClickRef.current?.(marker.id)
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onMarkerClickRef.current?.(marker.id)
        }
      }
      markerElement?.setAttribute('role', 'button')
      markerElement?.setAttribute('tabindex', '0')
      markerElement?.setAttribute('aria-label', marker.id)
      markerElement?.addEventListener('click', handleClick)
      markerElement?.addEventListener('keydown', handleKeyDown)

      let popup: MapLibrePopup | undefined
      if (marker.popup != null) {
        const target = document.createElement('div')
        popup = new runtime.Popup().setDOMContent(target)
        instance.setPopup?.(popup)
        nextPortals.push({ id: marker.id, target, children: marker.popup })
      }

      cleanups.push(() => {
        markerElement?.removeEventListener('click', handleClick)
        markerElement?.removeEventListener('keydown', handleKeyDown)
        popup?.remove?.()
        instance.remove()
      })
    }

    setPopupPortals(nextPortals)

    return () => {
      cleanups.forEach((cleanup) => cleanup())
      setPopupPortals([])
    }
  }, [markers, cluster])

  return (
    <div
      ref={composeRefs(rootRef, ref)}
      role="region"
      aria-label={ariaLabel}
      data-cluster={cluster || undefined}
      className={classNames('dyl-map-view', className)}
      {...rest}
    >
      {shouldRenderFallback ? (
        (fallback ?? (
          <div className="dyl-map-view__fallback">
            <p className="dyl-map-view__fallback-title">Map unavailable</p>
            <p className="dyl-map-view__fallback-copy">Add a map tile URL to show this location.</p>
          </div>
        ))
      ) : (
        <div ref={canvasRef} className="dyl-map-view__canvas" />
      )}
      {markerLabels.length > 0 && (
        <ul className="dyl-map-view__marker-list">
          {markerLabels.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
      )}
      {children}
      {popupPortals.map((portal) => createPortal(portal.children, portal.target, portal.id))}
    </div>
  )
})
