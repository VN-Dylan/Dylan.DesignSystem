import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  AvailabilityCalendar,
  Button,
  Card,
  Form,
  GuestSelector,
  Input,
  PatternInput,
  PriceTag,
  Reveal,
  Wizard,
} from '@vn-dylan/ui'
import {
  blockedBookingDates,
  bookingNights,
  bookingServiceFee,
  bookingSubtotal,
  bookingTotal,
  getStay,
  parseBookingDate,
  stays,
  toBookingDate,
} from '@/mock/booking'
import { useBookingStore } from '@/store/bookingStore'
import { SummaryRow, TripSummary } from './components'

export function BookingCheckoutView() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const stay = getStay(params.get('stay')) ?? stays[0]!
  const {
    checkIn,
    checkOut,
    guests,
    guestInfo,
    paymentInfo,
    setDates,
    setGuests,
    setGuestInfo,
    setPaymentInfo,
  } = useBookingStore()
  const nights = bookingNights(checkIn, checkOut)
  const subtotal = bookingSubtotal(stay, checkIn, checkOut)
  const serviceFee = bookingServiceFee(subtotal)
  const total = bookingTotal(subtotal)
  const range: [Date | null, Date | null] = useMemo(
    () => [parseBookingDate(checkIn), parseBookingDate(checkOut)],
    [checkIn, checkOut],
  )

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Reveal className="mb-8 space-y-3">
        <p className="font-mono text-xs uppercase tracking-wide text-primary">Checkout</p>
        <h1 className="font-display text-3xl font-bold leading-tight text-content sm:text-4xl">
          Reserve {stay.title}
        </h1>
        <p className="max-w-2xl text-content-muted">
          Complete the demo checkout. No account is created and no real payment is collected.
        </p>
      </Reveal>

      <Card bordered className="shadow-sm" bodyClass="p-4 sm:p-6">
        <Wizard
          finishLabel="Confirm reservation"
          onFinish={() => navigate('/booking/confirmation')}
          steps={[
            {
              title: 'Trip details',
              description: 'Dates and guests',
              content: (
                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.5fr)]">
                  <div className="space-y-4">
                    <AvailabilityCalendar
                      value={range}
                      onChange={([start, end]) => setDates(toBookingDate(start), toBookingDate(end))}
                      blockedDates={blockedBookingDates(stay).filter(Boolean) as Date[]}
                      minNights={2}
                      priceForDate={() => stay.pricePerNight}
                      currency={stay.currency}
                    />
                    <GuestSelector value={guests} onChange={setGuests} totalMax={8} />
                  </div>
                  <Card bordered bodyClass="space-y-3 p-4">
                    <TripSummary stay={stay} checkIn={checkIn} checkOut={checkOut} guests={guests} />
                  </Card>
                </div>
              ),
            },
            {
              title: 'Guest info',
              description: 'Contact details',
              content: (
                <Form className="grid gap-4 md:grid-cols-2">
                  <Form.Item label="Full name" htmlFor="guest-name" asterisk>
                    <Input
                      id="guest-name"
                      value={guestInfo.name}
                      onChange={(event) =>
                        setGuestInfo({ ...guestInfo, name: event.currentTarget.value })
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Email" htmlFor="guest-email" asterisk>
                    <Input
                      id="guest-email"
                      type="email"
                      value={guestInfo.email}
                      onChange={(event) =>
                        setGuestInfo({ ...guestInfo, email: event.currentTarget.value })
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Phone" htmlFor="guest-phone" className="md:col-span-2">
                    <Input
                      id="guest-phone"
                      type="tel"
                      value={guestInfo.phone}
                      onChange={(event) =>
                        setGuestInfo({ ...guestInfo, phone: event.currentTarget.value })
                      }
                    />
                  </Form.Item>
                </Form>
              ),
            },
            {
              title: 'Payment',
              description: 'Demo card',
              content: (
                <Form className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-warning bg-warning-subtle p-4 text-sm text-warning md:col-span-2">
                    Demo, no real payment. Use test-shaped values only.
                  </div>
                  <Form.Item label="Card number" htmlFor="card-number" asterisk>
                    <PatternInput
                      id="card-number"
                      format="#### #### #### ####"
                      mask="0"
                      value={paymentInfo.cardNumber}
                      onValueChange={(value) =>
                        setPaymentInfo({ ...paymentInfo, cardNumber: value.value })
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Expiry" htmlFor="card-expiry" asterisk>
                    <PatternInput
                      id="card-expiry"
                      format="##/##"
                      mask="0"
                      value={paymentInfo.expiry}
                      onValueChange={(value) =>
                        setPaymentInfo({ ...paymentInfo, expiry: value.value })
                      }
                    />
                  </Form.Item>
                  <Form.Item label="CVC" htmlFor="card-cvc" asterisk>
                    <PatternInput
                      id="card-cvc"
                      format="###"
                      mask="0"
                      value={paymentInfo.cvc}
                      onValueChange={(value) =>
                        setPaymentInfo({ ...paymentInfo, cvc: value.value })
                      }
                    />
                  </Form.Item>
                </Form>
              ),
            },
            {
              title: 'Review',
              description: 'Confirm trip',
              content: (
                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.5fr)]">
                  <Card bordered bodyClass="space-y-4 p-4">
                    <TripSummary stay={stay} checkIn={checkIn} checkOut={checkOut} guests={guests} />
                    <div className="border-t border-border pt-4 text-sm text-content-muted">
                      Confirmation will be sent to {guestInfo.email || 'your email'}.
                    </div>
                  </Card>
                  <Card bordered bodyClass="space-y-3 p-4">
                    <SummaryRow
                      label={`${stay.pricePerNight} x ${nights || 0} nights`}
                      value={<PriceTag amount={subtotal} currency={stay.currency} size="sm" />}
                    />
                    <SummaryRow
                      label="Service fee"
                      value={<PriceTag amount={serviceFee} currency={stay.currency} size="sm" />}
                    />
                    <div className="border-t border-border pt-3">
                      <SummaryRow
                        label="Total"
                        value={<PriceTag amount={total} currency={stay.currency} size="md" />}
                      />
                    </div>
                  </Card>
                </div>
              ),
            },
          ]}
        />
      </Card>

      <div className="mt-6">
        <Button variant="plain" onClick={() => navigate(`/booking/stay/${stay.id}`)}>
          Back to stay
        </Button>
      </div>
    </main>
  )
}
