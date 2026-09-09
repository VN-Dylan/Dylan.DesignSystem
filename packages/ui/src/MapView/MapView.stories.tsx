import type { Meta, StoryObj } from '@storybook/react'
import { MapView } from './MapView'
import type { MapMarker, MapViewProps } from './types'

type MapViewStoryArgs = MapViewProps & { enableLiveMap?: boolean }

const defaultStyleUrl = (import.meta as ImportMeta & { env?: Record<string, string | undefined> })
  .env?.VITE_MAP_TILES_URL

const markers: MapMarker[] = [
  {
    id: 'Old Quarter stay',
    lng: 105.852,
    lat: 21.028,
    popup: <strong>Old Quarter stay</strong>,
  },
  {
    id: 'Lake view apartment',
    lng: 105.849,
    lat: 21.031,
    popup: <strong>Lake view apartment</strong>,
  },
]

const renderMap = ({ enableLiveMap, styleUrl, ...args }: MapViewStoryArgs) => (
  <MapView {...args} styleUrl={enableLiveMap ? styleUrl : undefined} />
)

const meta = {
  title: 'Data Display/MapView',
  component: MapView,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    enableLiveMap: { control: 'boolean' },
    styleUrl: { control: 'text' },
    zoom: { control: 'number' },
    cluster: { control: 'boolean' },
    interactive: { control: 'boolean' },
  },
  args: {
    center: [105.85, 21.03],
    zoom: 12,
    styleUrl: defaultStyleUrl,
    enableLiveMap: false,
    interactive: true,
    'aria-label': 'Stay locations',
  },
  render: renderMap,
} satisfies Meta<MapViewStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Fallback: Story = {
  args: {
    enableLiveMap: false,
  },
}

export const Basic: Story = {
  args: {
    enableLiveMap: Boolean(defaultStyleUrl),
  },
}

export const WithMarkers: Story = {
  args: {
    enableLiveMap: Boolean(defaultStyleUrl),
    markers,
  },
}

export const Clustered: Story = {
  args: {
    enableLiveMap: Boolean(defaultStyleUrl),
    markers,
    cluster: true,
  },
}

export const Playground: Story = {}
