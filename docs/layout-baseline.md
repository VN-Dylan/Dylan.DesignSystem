# Layout spacing baseline

Captured on 2026-10-09 with:

```sh
node scripts/check-spacing.mjs --report
```

The report scanned 420 files in `packages/ui/src` and `apps/showcase/src`.
UI tests/specs were excluded, UI stories were included, and all configured
showcase TypeScript/TSX/SCSS sources were included. Data identifiers such as
`p-10`, `pr-01`, and `m-05` are not treated as Tailwind spacing utilities.

## Totals

| Category | Violations |
| --- | ---: |
| Off-scale spacing | 112 |
| Free `max-w-*` | 67 |
| Literal numeric `z-*` | 6 |
| **Total** | **185** |

Violations occur in 96 files. Report mode intentionally exits with status 0;
`--strict` reports the same baseline and exits with status 1 while violations
remain.

## Top 15 files

Sorted by total violations descending, then by path ascending for ties.

| File | Spacing | `max-w-*` | `z-*` | Total |
| --- | ---: | ---: | ---: | ---: |
| `apps/showcase/src/views/marketing/MarketingKitView.tsx` | 5 | 3 | 0 | 8 |
| `apps/showcase/src/views/auth/authViews.tsx` | 6 | 0 | 0 | 6 |
| `apps/showcase/src/views/booking/BookingStayDetailView.tsx` | 4 | 2 | 0 | 6 |
| `apps/showcase/src/views/landing/blocks/HeroSection.tsx` | 4 | 2 | 0 | 6 |
| `apps/showcase/src/components/layouts/AuthLayout.tsx` | 3 | 2 | 0 | 5 |
| `apps/showcase/src/views/booking/BookingHomeView.tsx` | 1 | 4 | 0 | 5 |
| `apps/showcase/src/views/booking/components.tsx` | 3 | 2 | 0 | 5 |
| `apps/showcase/src/views/booking/BookingCheckoutView.tsx` | 2 | 2 | 0 | 4 |
| `apps/showcase/src/views/booking/BookingConfirmationView.tsx` | 3 | 1 | 0 | 4 |
| `apps/showcase/src/views/gallery/FoundationsView.tsx` | 3 | 1 | 0 | 4 |
| `apps/showcase/src/views/gallery/GalleryLayout.tsx` | 0 | 2 | 2 | 4 |
| `apps/showcase/src/views/gallery/sections/DataDisplaySection.tsx` | 0 | 4 | 0 | 4 |
| `apps/showcase/src/views/landing/blocks/LandingSection.tsx` | 2 | 2 | 0 | 4 |
| `apps/showcase/src/views/accounts/AccountSettingsView.tsx` | 3 | 0 | 0 | 3 |
| `apps/showcase/src/views/booking/BookingResultsView.tsx` | 2 | 1 | 0 | 3 |
