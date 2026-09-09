import type { GuestCounts, ImageGalleryItem } from '@vn-dylan/ui'

export interface BookingStay {
  id: string
  title: string
  city: string
  country: string
  lat: number
  lng: number
  pricePerNight: number
  currency: string
  rating: number
  reviewCount: number
  images: ImageGalleryItem[]
  amenities: string[]
  host: {
    name: string
    avatarSrc: string
  }
  blockedDates: string[]
  superhost?: boolean
  description: string
}

const picsum = (id: number, variant = '') =>
  `https://picsum.photos/id/${id}/960/720${variant ? `?${variant}` : ''}`

const thumb = (id: number) => `https://picsum.photos/id/${id}/480/360`

const gallery = (ids: number[], label: string): ImageGalleryItem[] =>
  ids.map((id, index) => ({
    src: picsum(id),
    thumbnail: thumb(id),
    alt: `${label} photo ${index + 1}`,
  }))

export const defaultBookingRange = {
  checkIn: '2026-10-12',
  checkOut: '2026-10-15',
}

export const defaultBookingGuests: GuestCounts = {
  adults: 2,
  children: 0,
  infants: 0,
  rooms: 1,
}

export const stays: BookingStay[] = [
  {
    id: 'stay-bay-loft',
    title: 'Bay-window loft near the old market',
    city: 'Lisbon',
    country: 'Portugal',
    lat: 38.7169,
    lng: -9.1399,
    pricePerNight: 184,
    currency: 'USD',
    rating: 4.86,
    reviewCount: 218,
    images: gallery([164, 1067, 1040, 1057, 1011], 'Lisbon loft'),
    amenities: ['Rooftop terrace', 'Workspace', 'Washer', 'Air conditioning', 'City guide'],
    host: { name: 'Marta Silva', avatarSrc: 'https://i.pravatar.cc/128?img=21' },
    blockedDates: ['2026-10-18', '2026-10-19', '2026-11-04'],
    superhost: true,
    description:
      'A bright loft with original stonework, a proper desk, and a short walk to tram stops, cafes, and evening viewpoints.',
  },
  {
    id: 'stay-canal-house',
    title: 'Quiet canal house with garden room',
    city: 'Amsterdam',
    country: 'Netherlands',
    lat: 52.3676,
    lng: 4.9041,
    pricePerNight: 226,
    currency: 'USD',
    rating: 4.92,
    reviewCount: 146,
    images: gallery([1068, 1080, 1084, 1081, 1031], 'Amsterdam canal house'),
    amenities: ['Garden', 'Breakfast nook', 'Heated floors', 'Bike storage', 'Kitchen'],
    host: { name: 'Noor Bakker', avatarSrc: 'https://i.pravatar.cc/128?img=32' },
    blockedDates: ['2026-10-13', '2026-10-22', '2026-11-12'],
    superhost: true,
    description:
      'A calm canal-side home with a leafy back room, generous kitchen, and easy access to museums without the late-night street noise.',
  },
  {
    id: 'stay-forest-cabin',
    title: 'Cedar cabin with trail access',
    city: 'Whistler',
    country: 'Canada',
    lat: 50.1163,
    lng: -122.9574,
    pricePerNight: 198,
    currency: 'USD',
    rating: 4.78,
    reviewCount: 187,
    images: gallery([1020, 1036, 1043, 1044, 1047], 'Whistler cedar cabin'),
    amenities: ['Hot tub', 'Fireplace', 'Mud room', 'Trail maps', 'Pet friendly'],
    host: { name: 'Evan Hart', avatarSrc: 'https://i.pravatar.cc/128?img=11' },
    blockedDates: ['2026-10-15', '2026-10-16', '2026-11-03'],
    description:
      'A wood-lined cabin close to hiking routes, built for gear storage, slow mornings, and clear evenings around the fireplace.',
  },
  {
    id: 'stay-skyline-suite',
    title: 'Skyline suite above the arts district',
    city: 'Tokyo',
    country: 'Japan',
    lat: 35.6762,
    lng: 139.6503,
    pricePerNight: 242,
    currency: 'USD',
    rating: 4.88,
    reviewCount: 301,
    images: gallery([1015, 1032, 1033, 1035, 1050], 'Tokyo skyline suite'),
    amenities: ['Transit nearby', 'Deep soaking tub', 'Laundry', 'Blackout shades', 'Coffee bar'],
    host: { name: 'Yui Tanaka', avatarSrc: 'https://i.pravatar.cc/128?img=48' },
    blockedDates: ['2026-10-21', '2026-10-28', '2026-11-08'],
    superhost: true,
    description:
      'A compact high-floor suite with wide city views, fast rail connections, and thoughtful storage for longer urban stays.',
  },
  {
    id: 'stay-riad-courtyard',
    title: 'Restored riad around a tiled courtyard',
    city: 'Marrakesh',
    country: 'Morocco',
    lat: 31.6295,
    lng: -7.9811,
    pricePerNight: 156,
    currency: 'USD',
    rating: 4.81,
    reviewCount: 129,
    images: gallery([1060, 1061, 1062, 1063, 1064], 'Marrakesh riad'),
    amenities: ['Courtyard pool', 'Rooftop meals', 'Local host', 'Air conditioning', 'Tea set'],
    host: { name: 'Samir Haddou', avatarSrc: 'https://i.pravatar.cc/128?img=59' },
    blockedDates: ['2026-10-12', '2026-11-01', '2026-11-02'],
    description:
      'A quiet riad with patterned tile, shaded seating, and a host team that keeps market walks and dinner plans simple.',
  },
  {
    id: 'stay-lake-studio',
    title: 'Lakefront studio with morning kayaks',
    city: 'Queenstown',
    country: 'New Zealand',
    lat: -45.0312,
    lng: 168.6626,
    pricePerNight: 212,
    currency: 'USD',
    rating: 4.95,
    reviewCount: 174,
    images: gallery([1016, 1018, 1021, 1024, 1025], 'Queenstown lake studio'),
    amenities: ['Kayaks', 'Lake deck', 'Heated bathroom', 'Kitchenette', 'Parking'],
    host: { name: 'Ari Moore', avatarSrc: 'https://i.pravatar.cc/128?img=26' },
    blockedDates: ['2026-10-17', '2026-10-18', '2026-11-10'],
    superhost: true,
    description:
      'A glassy lakeside studio for two with mountain views, private deck access, and kayaks ready for calm mornings.',
  },
  {
    id: 'stay-brownstone-floor',
    title: 'Private brownstone floor near the park',
    city: 'Brooklyn',
    country: 'United States',
    lat: 40.6782,
    lng: -73.9442,
    pricePerNight: 268,
    currency: 'USD',
    rating: 4.74,
    reviewCount: 96,
    images: gallery([1076, 1077, 1078, 1079, 1082], 'Brooklyn brownstone'),
    amenities: ['Private entry', 'Record player', 'Full kitchen', 'Reading chair', 'Subway nearby'],
    host: { name: 'Nina Cole', avatarSrc: 'https://i.pravatar.cc/128?img=47' },
    blockedDates: ['2026-10-14', '2026-10-24', '2026-11-06'],
    description:
      'A full brownstone floor with a separate entry, a generous kitchen, and park access for guests who want a slower New York base.',
  },
  {
    id: 'stay-coast-villa',
    title: 'Clifftop villa with plunge pool',
    city: 'Uluwatu',
    country: 'Indonesia',
    lat: -8.8291,
    lng: 115.0849,
    pricePerNight: 314,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 257,
    images: gallery([1056, 1059, 1065, 1066, 1069], 'Uluwatu clifftop villa'),
    amenities: ['Plunge pool', 'Ocean view', 'Outdoor shower', 'Breakfast service', 'Scooter parking'],
    host: { name: 'Dewa Putra', avatarSrc: 'https://i.pravatar.cc/128?img=65' },
    blockedDates: ['2026-10-20', '2026-11-14', '2026-11-15'],
    superhost: true,
    description:
      'A breezy villa set above the coast with shaded outdoor rooms, sunset views, and a compact pool for quiet afternoons.',
  },
]

export const bookingTestimonials = [
  {
    quote: 'The reference flow made it obvious how cards, calendar, and checkout should feel together.',
    author: 'Priya Shah',
    role: 'Product lead',
    avatarSrc: 'https://i.pravatar.cc/128?img=31',
    rating: 5,
  },
  {
    quote: 'We used the gallery, price, and map patterns without custom styling debt.',
    author: 'Marcus Lee',
    role: 'Frontend engineer',
    avatarSrc: 'https://i.pravatar.cc/128?img=15',
    rating: 4.5,
  },
  {
    quote: 'The booking brand pack gives the same components a warmer travel surface.',
    author: 'Hannah Cole',
    role: 'Design manager',
    avatarSrc: 'https://i.pravatar.cc/128?img=26',
    rating: 5,
  },
]

export const bookingFaq = [
  {
    question: 'Can the booking pack run beside the admin showcase?',
    answer: 'Yes. The booking routes scope the brand layer and theme schema to their own layout.',
  },
  {
    question: 'Does the map need a token or key in CI?',
    answer: 'No. MapView renders an accessible fallback unless VITE_MAP_TILES_URL is configured.',
  },
  {
    question: 'Is checkout connected to payment?',
    answer: 'No. The payment step is labelled as a demo and never sends real payment data.',
  },
]

export const getStay = (id: string | null | undefined) => stays.find((stay) => stay.id === id)

export const parseBookingDate = (value: string | null | undefined) =>
  value ? new Date(`${value}T00:00:00`) : null

export const toBookingDate = (date: Date | null) => date?.toISOString().slice(0, 10) ?? null

export const blockedBookingDates = (stay: BookingStay) => stay.blockedDates.map(parseBookingDate)

export const bookingNights = (checkIn: string | null, checkOut: string | null) => {
  const start = parseBookingDate(checkIn)
  const end = parseBookingDate(checkOut)
  if (!start || !end) return 0
  return Math.max(0, Math.round((end.getTime() - start.getTime()) / 86_400_000))
}

export const bookingSubtotal = (
  stay: Pick<BookingStay, 'pricePerNight'>,
  checkIn: string | null,
  checkOut: string | null,
) => stay.pricePerNight * bookingNights(checkIn, checkOut)

export const bookingServiceFee = (subtotal: number) => Math.round(subtotal * 0.12)

export const bookingTotal = (subtotal: number) => subtotal + bookingServiceFee(subtotal)
