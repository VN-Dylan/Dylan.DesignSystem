import { Navigate, type RouteObject } from 'react-router-dom'
import { GalleryLayout } from '@/views/gallery/GalleryLayout'
import { FoundationsView } from '@/views/gallery/FoundationsView'
import { CommonSection } from '@/views/gallery/sections/CommonSection'
import { FormsSection } from '@/views/gallery/sections/FormsSection'
import { FeedbackSection } from '@/views/gallery/sections/FeedbackSection'
import { NavigationSection } from '@/views/gallery/sections/NavigationSection'
import { DataDisplaySection } from '@/views/gallery/sections/DataDisplaySection'
import { DataVizSection } from '@/views/gallery/sections/DataVizSection'
import { PrimitivesSection } from '@/views/gallery/sections/PrimitivesSection'

/**
 * The component gallery — a dedicated, chrome-free area at `/gallery` with its
 * own layout, one route per `galleryConfig` category. `/dev/components` from the
 * earlier smoke-screen build redirects here.
 */
export const galleryRoutes: RouteObject[] = [
  {
    path: '/gallery',
    element: <GalleryLayout />,
    children: [
      { index: true, element: <FoundationsView /> },
      { path: 'common', element: <CommonSection /> },
      { path: 'forms', element: <FormsSection /> },
      { path: 'feedback', element: <FeedbackSection /> },
      { path: 'navigation', element: <NavigationSection /> },
      { path: 'data-display', element: <DataDisplaySection /> },
      { path: 'data-viz', element: <DataVizSection /> },
      { path: 'primitives', element: <PrimitivesSection /> },
    ],
  },
  { path: '/dev/components', element: <Navigate to="/gallery" replace /> },
]
