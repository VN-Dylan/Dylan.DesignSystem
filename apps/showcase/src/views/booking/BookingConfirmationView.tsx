import { useMemo } from 'react'
import { CtaSection } from '@/components/marketing'
import { Card, PriceTag, Reveal } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { bookingSubtotal, bookingTotal, stays } from '@/mock/booking'
import { useBookingStore } from '@/store/bookingStore'
import { SummaryRow, TripSummary } from './components'

export function BookingConfirmationView() {
  const { checkIn, checkOut, guests } = useBookingStore()
  const stay = stays[0]!
  const subtotal = bookingSubtotal(stay, checkIn, checkOut)
  const total = bookingTotal(subtotal)
  const reference = useMemo(() => `DYL-${stay.id.slice(-4).toUpperCase()}-1026`, [stay.id])

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Reveal className="space-y-6 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success-subtle text-success">
          <Icon as={TbIcons.TbCircleCheck} aria-hidden />
        </span>
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-wide text-primary">Confirmed</p>
          <h1 className="font-display text-3xl font-bold leading-tight text-content sm:text-4xl">
            Your demo reservation is booked.
          </h1>
          <p className="text-content-muted">Reference number {reference}</p>
        </div>
      </Reveal>

      <Card bordered className="my-8 shadow-sm" bodyClass="space-y-5 p-5">
        <TripSummary stay={stay} checkIn={checkIn} checkOut={checkOut} guests={guests} />
        <div className="border-t border-border pt-4">
          <SummaryRow
            label="Estimated total"
            value={<PriceTag amount={total} currency={stay.currency} size="md" />}
          />
        </div>
      </Card>

      <CtaSection
        title="Explore more stays"
        description="Return to the booking reference home and continue through another route."
        primary={{ label: 'Explore more stays', href: '/booking' }}
        tone="surface"
      />
    </main>
  )
}
