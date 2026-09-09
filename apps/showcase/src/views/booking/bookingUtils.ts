import type { GuestCounts } from '@vn-dylan/ui'

export const formatStayLocation = (city: string, country: string) => `${city}, ${country}`

export const formatGuests = (guests: GuestCounts) => {
  const guestCount = (guests.adults ?? 0) + (guests.children ?? 0)
  const infantCount = guests.infants ?? 0
  const roomCount = guests.rooms ?? 0
  const parts = [
    guestCount > 0 ? `${guestCount} guest${guestCount === 1 ? '' : 's'}` : null,
    infantCount > 0 ? `${infantCount} infant${infantCount === 1 ? '' : 's'}` : null,
    roomCount > 0 ? `${roomCount} room${roomCount === 1 ? '' : 's'}` : null,
  ].filter(Boolean)

  return parts.join(', ') || 'Add guests'
}

export const formatDateRange = (checkIn: string | null, checkOut: string | null) => {
  if (!checkIn || !checkOut) return 'Select dates'

  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })
  return `${formatter.format(new Date(`${checkIn}T00:00:00`))} - ${formatter.format(
    new Date(`${checkOut}T00:00:00`),
  )}`
}

export const formatReviewCount = (count: number) =>
  `${count.toLocaleString('en-US')} review${count === 1 ? '' : 's'}`
