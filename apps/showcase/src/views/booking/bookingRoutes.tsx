import type { RouteObject } from 'react-router-dom'
import { BookingLayout } from './BookingLayout'
import { BookingCheckoutView } from './BookingCheckoutView'
import { BookingConfirmationView } from './BookingConfirmationView'
import { BookingHomeView } from './BookingHomeView'
import { BookingResultsView } from './BookingResultsView'
import { BookingStayDetailView } from './BookingStayDetailView'

export const bookingRoutes: RouteObject[] = [
  {
    element: <BookingLayout />,
    children: [
      { path: '/booking', element: <BookingHomeView /> },
      { path: '/booking/results', element: <BookingResultsView /> },
      { path: '/booking/stay/:id', element: <BookingStayDetailView /> },
      { path: '/booking/checkout', element: <BookingCheckoutView /> },
      { path: '/booking/confirmation', element: <BookingConfirmationView /> },
    ],
  },
]
