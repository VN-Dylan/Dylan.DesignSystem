import { useNavigate } from 'react-router-dom'
import { Button, Reveal, Stagger } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { CtaSection, Faq, TestimonialCard } from '@/components/marketing'
import { bookingFaq, bookingTestimonials, stays } from '@/mock/booking'
import { BookingSearchPanel, BookingSection, StayGrid } from './components'

export function BookingHomeView() {
  const navigate = useNavigate()

  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:py-16">
        <Reveal className="space-y-6">
          <Tagline />
          <div className="space-y-4">
            <h1 className="font-display text-4xl font-bold leading-tight text-content sm:text-5xl">
              Book distinctive stays with production-ready Dylan patterns.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-content-muted">
              A complete travel reference using the booking brand pack, search cards, maps,
              galleries, availability, guests, checkout, and motion.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="solid"
              size="lg"
              icon={<Icon as={TbIcons.TbSearch} aria-hidden />}
              onClick={() => navigate('/booking/results')}
            >
              Explore stays
            </Button>
            <Button size="lg" onClick={() => navigate('/booking/stay/stay-bay-loft')}>
              View a detail page
            </Button>
          </div>
        </Reveal>

        <Reveal>
          <BookingSearchPanel />
        </Reveal>
      </section>

      <BookingSection
        eyebrow="Featured stays"
        title="A card grid that carries media, rating, price, and booking metadata."
        description="Cards stay compact on mobile and expand into a scan-friendly destination grid on larger screens."
      >
        <StayGrid items={stays} />
      </BookingSection>

      <BookingSection
        eyebrow="Reference proof"
        title="Marketing sections reuse the same showcase kit."
        description="The booking reference mixes product flow screens with reusable social proof and support content."
      >
        <Stagger className="grid gap-4 md:grid-cols-3">
          {bookingTestimonials.map((item) => (
            <Stagger.Item key={item.author}>
              <TestimonialCard {...item} />
            </Stagger.Item>
          ))}
        </Stagger>
      </BookingSection>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <Faq items={bookingFaq} single />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <CtaSection
          title="Start from the full booking reference."
          description="Search, results, stay detail, checkout, and confirmation are wired as route-level examples."
          primary={{ label: 'Open results', href: '/booking/results' }}
          secondary={{ label: 'Browse components', href: '/gallery' }}
        />
      </section>
    </main>
  )
}

function Tagline() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-content-muted shadow-sm">
      <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
      Booking readiness reference
    </span>
  )
}
