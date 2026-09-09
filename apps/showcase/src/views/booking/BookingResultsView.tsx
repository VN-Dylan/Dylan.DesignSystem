import { useMemo, useState } from 'react'
import { Button, Card, Input, MapView, PriceTag, Reveal, Tag } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { stays } from '@/mock/booking'
import { useBookingStore } from '@/store/bookingStore'
import { BookingSearchPanel, StayCard } from './components'
import { formatDateRange, formatGuests, formatStayLocation } from './bookingUtils'

type SortMode = 'recommended' | 'price' | 'rating'

export function BookingResultsView() {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortMode>('recommended')
  const [activeId, setActiveId] = useState(stays[0]?.id ?? '')
  const { destination, checkIn, checkOut, guests } = useBookingStore()

  const filteredStays = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const matches = needle
      ? stays.filter((stay) =>
          [stay.title, stay.city, stay.country, ...stay.amenities]
            .join(' ')
            .toLowerCase()
            .includes(needle),
        )
      : stays

    return [...matches].sort((a, b) => {
      if (sort === 'price') return a.pricePerNight - b.pricePerNight
      if (sort === 'rating') return b.rating - a.rating
      return b.reviewCount - a.reviewCount
    })
  }, [query, sort])

  const center = useMemo<[number, number]>(() => {
    const stay = filteredStays[0] ?? stays[0]
    return stay ? [stay.lng, stay.lat] : [0, 0]
  }, [filteredStays])

  const markers = filteredStays.map((stay) => ({
    id: stay.title,
    lng: stay.lng,
    lat: stay.lat,
    popup: (
      <div className="space-y-1 p-1">
        <p className="font-medium text-content">{stay.title}</p>
        <PriceTag amount={stay.pricePerNight} currency={stay.currency} unit="night" size="sm" />
      </div>
    ),
  }))

  return (
    <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
      <section className="min-w-0 space-y-5 lg:max-h-screen lg:overflow-y-auto lg:pe-2">
        <Reveal>
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-wide text-primary">Results</p>
            <h1 className="font-display text-3xl font-bold leading-tight text-content sm:text-4xl">
              Stays for {destination || 'your next trip'}
            </h1>
            <div className="flex flex-wrap gap-2 text-sm text-content-muted">
              <Tag prefix>{formatDateRange(checkIn, checkOut)}</Tag>
              <Tag prefix>{formatGuests(guests)}</Tag>
              <Tag prefix>{filteredStays.length} stays</Tag>
            </div>
          </div>
        </Reveal>

        <BookingSearchPanel compact />

        <Card bordered bodyClass="space-y-4 p-4">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-content-muted">
                Filter results
              </span>
              <Input
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
                placeholder="City, amenity, or stay name"
                prefix={<Icon as={TbIcons.TbAdjustmentsHorizontal} aria-hidden />}
              />
            </label>
            <div className="flex flex-wrap gap-2" aria-label="Sort stays">
              <Button size="sm" active={sort === 'recommended'} onClick={() => setSort('recommended')}>
                Recommended
              </Button>
              <Button size="sm" active={sort === 'price'} onClick={() => setSort('price')}>
                Price
              </Button>
              <Button size="sm" active={sort === 'rating'} onClick={() => setSort('rating')}>
                Rating
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid gap-4">
          {filteredStays.map((stay) => (
            <StayCard key={stay.id} stay={stay} compact active={activeId === stay.id} />
          ))}
        </div>
      </section>

      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-3">
          <MapView
            center={center}
            zoom={10}
            markers={markers}
            onMarkerClick={(title) => {
              const stay = stays.find((item) => item.title === title)
              if (stay) setActiveId(stay.id)
            }}
            aria-label="Booking results map"
            className="min-h-screen"
            fallback={
              <div className="flex h-full min-h-screen flex-col justify-between bg-surface-sunken p-5">
                <div className="space-y-2">
                  <p className="font-display text-xl font-semibold text-content">Map preview</p>
                  <p className="text-sm text-content-muted">
                    Configure VITE_MAP_TILES_URL to render live tiles. The result markers remain
                    available to assistive technology.
                  </p>
                </div>
                <div className="grid gap-2">
                  {filteredStays.map((stay) => (
                    <button
                      key={stay.id}
                      type="button"
                      onClick={() => setActiveId(stay.id)}
                      className={`rounded-lg border p-3 text-start transition hover:border-primary ${
                        activeId === stay.id
                          ? 'border-primary bg-primary-subtle'
                          : 'border-border bg-surface'
                      }`}
                    >
                      <span className="block font-medium text-content">{stay.title}</span>
                      <span className="block text-sm text-content-muted">
                        {formatStayLocation(stay.city, stay.country)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            }
          />
        </div>
      </aside>
    </main>
  )
}
