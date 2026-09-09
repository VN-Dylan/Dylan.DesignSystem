import type { FormEvent, ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  AvailabilityCalendar,
  Button,
  Card,
  GuestSelector,
  Input,
  PriceTag,
  Rating,
  Stagger,
  Tag,
  type GuestCounts,
} from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import {
  parseBookingDate,
  stays,
  toBookingDate,
  type BookingStay,
} from '@/mock/booking'
import { useBookingStore } from '@/store/bookingStore'
import { formatDateRange, formatGuests, formatReviewCount, formatStayLocation } from './bookingUtils'

type BookingRangeValue = [Date | null, Date | null]

export function BookingSection({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
      <div className="mb-8 max-w-2xl space-y-3">
        {eyebrow && (
          <p className="font-mono text-xs uppercase tracking-wide text-primary">{eyebrow}</p>
        )}
        <h2 className="font-display text-2xl font-bold leading-tight text-content sm:text-3xl">
          {title}
        </h2>
        {description && <p className="text-content-muted">{description}</p>}
      </div>
      {children}
    </section>
  )
}

export function BookingSearchPanel({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate()
  const { destination, checkIn, checkOut, guests, setDestination, setDates, setGuests } =
    useBookingStore()
  const range: BookingRangeValue = [parseBookingDate(checkIn), parseBookingDate(checkOut)]

  const handleDates = ([start, end]: BookingRangeValue) => {
    setDates(toBookingDate(start), toBookingDate(end))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/booking/results')
  }

  return (
    <Card bordered className="shadow-sm" bodyClass="space-y-5 p-4 sm:p-5">
      <form className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto]" onSubmit={handleSubmit}>
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-content-muted">
            Destination
          </span>
          <Input
            name="destination"
            value={destination}
            onChange={(event) => setDestination(event.currentTarget.value)}
            placeholder="Where are you going?"
            prefix={<Icon as={TbIcons.TbSearch} aria-hidden />}
          />
        </label>

        <div className="space-y-2">
          <span className="block text-xs font-semibold uppercase tracking-wide text-content-muted">
            Guests
          </span>
          <GuestSelector value={guests} onChange={setGuests} totalMax={8} />
        </div>

        <div className="flex items-end">
          <Button type="submit" variant="solid" size="lg" block icon={<Icon as={TbIcons.TbSearch} aria-hidden />}>
            Search
          </Button>
        </div>
      </form>

      {!compact && (
        <div className="rounded-lg border border-border bg-surface-sunken p-3">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-content-muted">Dates</p>
              <p className="font-medium text-content">{formatDateRange(checkIn, checkOut)}</p>
            </div>
            <Tag prefix>Flexible checkout</Tag>
          </div>
          <AvailabilityCalendar
            value={range}
            onChange={handleDates}
            minNights={2}
            priceForDate={() => stays[0]?.pricePerNight ?? null}
          />
        </div>
      )}
    </Card>
  )
}

export function StayCard({
  stay,
  active = false,
  compact = false,
}: {
  stay: BookingStay
  active?: boolean
  compact?: boolean
}) {
  return (
    <Link to={`/booking/stay/${stay.id}`} className="block focus:outline-none">
      <Card
        bordered
        className={`h-full transition hover:border-primary hover:shadow-md focus-within:ring-2 focus-within:ring-primary ${
          active ? 'border-primary ring-2 ring-primary' : ''
        }`}
        bodyClass={compact ? 'grid gap-4 p-3 sm:grid-cols-[theme(spacing.40)_1fr]' : 'p-3'}
      >
        <img
          src={stay.images[0]?.thumbnail ?? stay.images[0]?.src}
          alt={stay.images[0]?.alt ?? stay.title}
          className={`w-full rounded-lg object-cover ${compact ? 'aspect-[4/3] h-full' : 'aspect-[4/3]'}`}
        />
        <div className={compact ? 'min-w-0 space-y-3' : 'space-y-3 pt-4'}>
          <div className="space-y-1">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-semibold leading-snug text-content">
                {stay.title}
              </h3>
              {stay.superhost && <Tag className="shrink-0 border-primary text-primary">Superhost</Tag>}
            </div>
            <p className="flex items-center gap-1 text-sm text-content-muted">
              <Icon as={TbIcons.TbMapPin} aria-hidden />
              {formatStayLocation(stay.city, stay.country)}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-sm text-content-muted">
              <Rating readOnly allowHalf value={stay.rating} />
              {formatReviewCount(stay.reviewCount)}
            </span>
            <PriceTag
              amount={stay.pricePerNight}
              currency={stay.currency}
              unit="night"
              size={compact ? 'sm' : 'md'}
            />
          </div>
        </div>
      </Card>
    </Link>
  )
}

export function StayGrid({ items = stays }: { items?: BookingStay[] }) {
  return (
    <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((stay) => (
        <Stagger.Item key={stay.id}>
          <StayCard stay={stay} />
        </Stagger.Item>
      ))}
    </Stagger>
  )
}

export function SummaryRow({
  label,
  value,
}: {
  label: React.ReactNode
  value: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-content-muted">{label}</span>
      <span className="text-end font-medium text-content">{value}</span>
    </div>
  )
}

export function TripSummary({
  stay,
  checkIn,
  checkOut,
  guests,
}: {
  stay: BookingStay
  checkIn: string | null
  checkOut: string | null
  guests: GuestCounts
}) {
  return (
    <div className="space-y-3">
      <SummaryRow label="Stay" value={stay.title} />
      <SummaryRow label="Location" value={formatStayLocation(stay.city, stay.country)} />
      <SummaryRow label="Dates" value={formatDateRange(checkIn, checkOut)} />
      <SummaryRow label="Guests" value={formatGuests(guests)} />
    </div>
  )
}
