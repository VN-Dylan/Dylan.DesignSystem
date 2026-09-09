import { create } from 'zustand'
import type { GuestCounts } from '@vn-dylan/ui'
import { defaultBookingGuests, defaultBookingRange } from '@/mock/booking'

export interface BookingSearchState {
  destination: string
  checkIn: string | null
  checkOut: string | null
  guests: GuestCounts
}

export interface BookingGuestInfo {
  name: string
  email: string
  phone: string
}

export interface BookingPaymentInfo {
  cardNumber: string
  expiry: string
  cvc: string
}

export interface BookingState extends BookingSearchState {
  guestInfo: BookingGuestInfo
  paymentInfo: BookingPaymentInfo
  setDestination: (destination: string) => void
  setDates: (checkIn: string | null, checkOut: string | null) => void
  setGuests: (guests: GuestCounts) => void
  setGuestInfo: (guestInfo: BookingGuestInfo) => void
  setPaymentInfo: (paymentInfo: BookingPaymentInfo) => void
}

export const useBookingStore = create<BookingState>()((set) => ({
  destination: 'Lisbon',
  checkIn: defaultBookingRange.checkIn,
  checkOut: defaultBookingRange.checkOut,
  guests: defaultBookingGuests,
  guestInfo: {
    name: 'Dylan Carter',
    email: 'dylan@example.com',
    phone: '+1 202 555 0142',
  },
  paymentInfo: {
    cardNumber: '',
    expiry: '',
    cvc: '',
  },
  setDestination: (destination) => set({ destination }),
  setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),
  setGuests: (guests) => set({ guests }),
  setGuestInfo: (guestInfo) => set({ guestInfo }),
  setPaymentInfo: (paymentInfo) => set({ paymentInfo }),
}))
