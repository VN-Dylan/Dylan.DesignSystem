import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  AvailabilityCalendar,
  Avatar,
  Badge,
  Button,
  Card,
  GuestSelector,
  ImageGallery,
  PriceTag,
  Rating,
  Reveal,
  Stagger,
  Tag,
} from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { TestimonialCard } from '@/components/marketing'
import {
  blockedBookingDates,
  bookingNights,
  bookingSubtotal,
  bookingTestimonials,
  bookingTotal,
  getStay,
  parseBookingDate,
  toBookingDate,
} from '@/mock/booking'
import { useBookingStore } from '@/store/bookingStore'
import { formatReviewCount, formatStayLocation } from './bookingUtils'
import { SummaryRow } from './components'

export function BookingStayDetailView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const stay = getStay(id) ?? getStay('stay-bay-loft')!
  const { checkIn, checkOut, guests, setDates, setGuests } = useBookingStore()
  const nights = bookingNights(checkIn, checkOut)
  const subtotal = bookingSubtotal(stay, checkIn, checkOut)
  const total = bookingTotal(subtotal)
  const range = useMemo<[Date | null, Date | null]>(
    () => [parseBookingDate(checkIn), parseBookingDate(checkOut)],
    [checkIn, checkOut],
  )

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-8">
        <Reveal className="space-y-5">
          <ImageGallery images={stay.images} columns={{ sm: 2, md: 3, lg: 4 }} />
          <div className="space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-2">
                <h1 className="font-display text-3xl font-bold leading-tight text-content sm:text-4xl">
                  {stay.title}
                </h1>
                <p className="flex items-center gap-2 text-content-muted">
                  <Icon as={TbIcons.TbMapPin} aria-hidden />
                  {formatStayLocation(stay.city, stay.country)}
                </p>
              </div>
              {stay.superhost && (
                <Badge content="Superhost" innerClass="bg-accent text-accent-fg" />
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-content-muted">
              <Rating readOnly allowHalf value={stay.rating} />
              <span>{formatReviewCount(stay.reviewCount)}</span>
              <Tag prefix>{nights || 'Flexible'} nights</Tag>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.45fr)]">
        <div className="space-y-8">
          <Reveal>
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-content">About this stay</h2>
              <p className="text-lg leading-8 text-content-muted">{stay.description}</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-content">Amenities</h2>
              <Stagger as="ul" className="grid gap-3 sm:grid-cols-2">
                {stay.amenities.map((amenity) => (
                  <Stagger.Item as="li" key={amenity}>
                    <span className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3 text-content">
                      <Icon as={TbIcons.TbCircleCheck} className="text-success" aria-hidden />
                      {amenity}
                    </span>
                  </Stagger.Item>
                ))}
              </Stagger>
            </div>
          </Reveal>

          <Reveal>
            <Card bordered bodyClass="flex items-center gap-4 p-5">
              <Avatar shape="circle" src={stay.host.avatarSrc} alt={stay.host.name}>
                {stay.host.name.slice(0, 1)}
              </Avatar>
              <div>
                <h2 className="font-display text-xl font-semibold text-content">
                  Hosted by {stay.host.name}
                </h2>
                <p className="text-sm text-content-muted">
                  Local recommendations, flexible arrivals, and fast replies.
                </p>
              </div>
            </Card>
          </Reveal>

          <Stagger className="grid gap-4 md:grid-cols-3">
            {bookingTestimonials.map((item) => (
              <Stagger.Item key={item.author}>
                <TestimonialCard {...item} />
              </Stagger.Item>
            ))}
          </Stagger>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card bordered className="shadow-lg" bodyClass="space-y-5 p-5">
            <div className="flex items-start justify-between gap-4">
              <PriceTag amount={stay.pricePerNight} currency={stay.currency} unit="night" size="lg" />
              <span className="flex items-center gap-2 text-sm text-content-muted">
                <Rating readOnly allowHalf value={stay.rating} size="sm" />
                {stay.rating}
              </span>
            </div>
            <AvailabilityCalendar
              value={range}
              onChange={([start, end]) => setDates(toBookingDate(start), toBookingDate(end))}
              blockedDates={blockedBookingDates(stay).filter(Boolean) as Date[]}
              minNights={2}
              priceForDate={() => stay.pricePerNight}
              currency={stay.currency}
            />
            <GuestSelector value={guests} onChange={setGuests} totalMax={8} />
            <div className="space-y-3 border-t border-border pt-4">
              <SummaryRow label="Nights" value={nights || 'Select dates'} />
              <SummaryRow
                label="Subtotal"
                value={<PriceTag amount={subtotal} currency={stay.currency} size="sm" />}
              />
              <SummaryRow
                label="Estimated total"
                value={<PriceTag amount={total} currency={stay.currency} size="md" />}
              />
            </div>
            <Button
              variant="solid"
              block
              size="lg"
              onClick={() => navigate(`/booking/checkout?stay=${stay.id}`)}
            >
              Reserve
            </Button>
          </Card>
        </aside>
      </section>
    </main>
  )
}
