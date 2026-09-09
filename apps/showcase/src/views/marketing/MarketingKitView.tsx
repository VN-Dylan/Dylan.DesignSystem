import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Parallax, Reveal, Stagger } from '@vn-dylan/ui'
import { Logo } from '@/components/template/Logo'
import {
  CtaSection,
  Faq,
  LogoCloud,
  PricingTable,
  TestimonialCard,
  type PricingPlan,
} from '@/components/marketing'

const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$89',
    period: 'per month',
    description: 'For boutique teams launching a polished booking surface.',
    features: ['Responsive landing sections', 'Token-ready theme support', 'Email capture flow'],
    cta: { label: 'Start starter' },
  },
  {
    name: 'Growth',
    price: '$249',
    period: 'per month',
    description: 'For teams that need experiments, proof and conversion paths.',
    features: [
      'All starter sections',
      'Pricing and FAQ composition',
      'Trust and testimonial bands',
    ],
    cta: { label: 'Choose growth' },
    featured: true,
  },
  {
    name: 'Scale',
    price: 'Custom',
    description: 'For marketplaces and multi-property booking experiences.',
    features: ['Custom section strategy', 'Design-system pairing', 'Launch readiness review'],
    cta: { label: 'Contact team' },
  },
]

const faqItems = [
  {
    question: 'Can these sections ship in the UI package?',
    answer:
      'No. They are app-level marketing compositions that consume the published primitives without expanding the library API.',
  },
  {
    question: 'Does motion require another install?',
    answer:
      'Only consumers that import the motion primitives need the optional framer-motion peer dependency.',
  },
  {
    question: 'Can the FAQ keep one item open?',
    answer: 'Yes. Pass single to coordinate the Collapsible rows from local state.',
  },
]

const logos = ['Northstay', 'CasaGrid', 'Roomline', 'StayOS', 'Harbor', 'Voyage'].map((name) => ({
  name,
  node: <span className="font-semibold tracking-wide text-content-muted">{name}</span>,
}))

function MarketingSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Marketing kit</p>
        <h2 className="text-2xl font-bold tracking-tight text-content sm:text-3xl">{title}</h2>
      </div>
      {children}
    </section>
  )
}

/** Preview surface for reusable showcase marketing sections and motion primitives. */
export function MarketingKitView() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5">
          <Logo />
          <div className="flex items-center gap-3">
            <Link
              to="/landing"
              className="text-sm font-medium text-content-muted hover:text-content"
            >
              Landing
            </Link>
            <Button variant="solid" onClick={() => undefined}>
              Preview action
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:py-16">
        <Reveal>
          <div className="max-w-3xl space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Surface kit</p>
            <h1 className="text-4xl font-bold tracking-tight text-content sm:text-5xl">
              Marketing sections for booking-ready pages
            </h1>
            <p className="text-lg text-content-muted">
              Showcase-only compositions for pricing, testimonials, FAQ, calls to action and partner
              proof, built from the published design-system primitives.
            </p>
          </div>
        </Reveal>

        <MarketingSection title="PricingTable">
          <PricingTable plans={pricingPlans} />
        </MarketingSection>

        <MarketingSection title="TestimonialCard">
          <div className="grid gap-4 md:grid-cols-2">
            <TestimonialCard
              quote="The new booking surface feels premium without leaving the design system."
              author="Maya Tran"
              role="Director of marketplace design"
              rating={4.5}
            />
            <TestimonialCard
              quote="We composed the page from reusable blocks and still kept every theme switch intact."
              author="Jon Bell"
              role="Product lead"
              rating={5}
            />
          </div>
        </MarketingSection>

        <MarketingSection title="Faq">
          <Faq items={faqItems} single />
        </MarketingSection>

        <MarketingSection title="CtaSection">
          <CtaSection
            title="Launch the booking reference page with the same primitives."
            description="Use brand tone for conversion moments and surface tone for quieter workflow prompts."
            primary={{ label: 'Plan launch' }}
            secondary={{ label: 'View gallery' }}
          />
        </MarketingSection>

        <MarketingSection title="LogoCloud">
          <LogoCloud title="Trusted by booking teams" logos={logos} />
        </MarketingSection>

        <MarketingSection title="Motion primitives">
          <div className="grid gap-4 lg:grid-cols-3">
            <Reveal>
              <Card bordered bodyClass="space-y-2 p-5">
                <h3 className="font-semibold text-content">Reveal</h3>
                <p className="text-sm text-content-muted">
                  Fades and lifts content the first time it enters the viewport.
                </p>
              </Card>
            </Reveal>
            <Stagger className="grid gap-4">
              {['Search', 'Compare', 'Reserve'].map((label) => (
                <Stagger.Item key={label}>
                  <Card bordered bodyClass="p-5">
                    <span className="font-semibold text-content">{label}</span>
                  </Card>
                </Stagger.Item>
              ))}
            </Stagger>
            <Parallax>
              <Card bordered className="bg-surface-raised shadow-lg" bodyClass="space-y-2 p-5">
                <h3 className="font-semibold text-content">Parallax</h3>
                <p className="text-sm text-content-muted">
                  Translates within a small scroll-linked range and disables under reduced motion.
                </p>
              </Card>
            </Parallax>
          </div>
        </MarketingSection>
      </main>
    </div>
  )
}
