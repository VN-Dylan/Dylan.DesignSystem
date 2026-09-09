# Booking Readiness Plan

Bring the Dylan Design System from "admin template surface" to "can build a
modern, eye-catching booking site" — without breaking existing consumers.

Companion to [`DESIGN.md`](../DESIGN.md) and [`RECIPE.md`](../RECIPE.md). Every
new `packages/ui` component still follows `RECIPE.md` exactly.

## Locked decisions

| Topic | Choice | Consequence |
| --- | --- | --- |
| Map engine | **MapLibre GL** (`maplibre-gl`) | Optional peer dep of `@vn-dylan/ui`; tile URL via `VITE_MAP_TILES_URL` (MapTiler / Stadia free tier or self-host) |
| Motion | **framer-motion** `^11` | Peer dep; lives in `packages/ui/src/motion/`; honours `prefers-reduced-motion` |
| Brand | **Separate brand pack** | `@vn-dylan/tokens` gains an opt-in `brand-booking` layer (radius + shadow + display font). Defaults unchanged → **minor** release |
| Marketing + booking demo | **In `apps/showcase`** | `src/components/marketing/*` + `src/views/booking/*`, route `/booking`. No new app/subdomain |

## Constraints (from DESIGN.md / RECIPE.md)

- Component dir: `<Name>.tsx / .scss / types.ts / index.ts / .stories.tsx / .test.tsx` (+ `context.ts` if compound); export from `packages/ui/src/index.ts`.
- `forwardRef` always; variants as `data-*`; `classNames` merge; `useControllableState` for controlled/uncontrolled.
- `check:tokens` — no literal colour / px / duration in `src/**/*.{tsx,scss}`; tokens only.
- Anchored overlays use `@floating-ui/react`; modal overlays use `_internal/Portal` + `useFocusTrap`.
- Every test ends with `expect(await axe(container)).toHaveNoViolations()`.
- Designed for light + dark + RTL together.
- New components are **deliberate deviations** from Eyris → record in `docs/handbook/EyrisMapping.mdx`.
- Marketing / motion presentation code does **not** enter `packages/ui`.

## Phases

### Phase 1 — Foundation
- [ ] **`@vn-dylan/tokens` › brand-booking pack** — new `src/styles/brand-booking.scss` emitting overrides scoped to `[data-brand="booking"]`: rounder radius ramp, larger/softer shadows, `--dyl-font-display`. Export as `@vn-dylan/tokens/scss/brand-booking` + a `brandBookingCssVars` helper. Add `booking` entry to `presetThemeSchema` (primary + accent hue). Update `DESIGN.md §4`. No change to `:root` defaults.
- [ ] **`Rating`** — star rating. `value` / `defaultValue` / `onChange`, `max` (default 5), `allowHalf`, `readOnly`, `size` (`sm|md|lg`), `precision` display. Interactive = `radiogroup` semantics, arrow keys + Home/End, `aria-label` per star. Display mode is non-interactive with `aria-label="3.5 out of 5"`.
- [ ] **`PriceTag`** — formatted price. `amount`, `currency` (ISO 4217), `locale`, `original` (struck-through), `unit` (e.g. `"night"`), `size`. Uses `Intl.NumberFormat`. No interactivity.

### Phase 2 — Media
- [ ] **`ImageGallery` + `Lightbox`** — responsive grid (compound: `ImageGallery` + internal lightbox). Click opens full-screen viewer: keyboard (←/→/Esc), swipe, thumbnail strip, counter, focus trap, `prefers-reduced-motion`. Reuse `Carousel` context where possible.
- [ ] **`MapView`** — thin `maplibre-gl` wrapper. Controlled `center` / `zoom`, `markers` (with `popup` render prop), optional clustering, `onMoveEnd`. `maplibre-gl` is a lazy dynamic import; component renders an accessible fallback when no tile URL. CSS imported by the consumer app, not bundled.

### Phase 3 — Booking core
- [ ] **`AvailabilityCalendar`** — built on `Calendar`. Range selection (`checkIn` / `checkOut`), `blockedDates`, `minNights` / `maxNights`, `priceForDate` render slot, `isDateAvailable` predicate. Two-month view on `md+`. Full keyboard grid (roving tabindex, matches `Calendar`).
- [ ] **`GuestSelector`** — adults / children / infants / rooms steppers in a popover trigger. Check whether `NumericInputStepper` + `Popover` compose this with no new primitive first; only add a component if it earns its place.

### Phase 4 — Surface
- [ ] **`packages/ui/src/motion/`** — `<Reveal>` (IntersectionObserver + framer-motion), `<Stagger>`, `<Parallax>` (subtle), `usePageTransition` helper. All no-op under `prefers-reduced-motion`. Exported under `@vn-dylan/ui` (tree-shakeable) — framer-motion as `peerDependencies` + `peerDependenciesMeta.optional`.
- [ ] **`apps/showcase/src/components/marketing/`** — `Hero`, `FeatureGrid`, `PricingTable`, `TestimonialCard`, `StatBand`, `Faq`, `CtaSection`, `LogoCloud`. Token + Tailwind only. Not published.

### Phase 5 — Reference + release
- [ ] **`apps/showcase` › `/booking`** — end-to-end: search bar → results (cards + `MapView`) → detail (`ImageGallery` + `AvailabilityCalendar` + `Rating` + `PriceTag`) → checkout `Wizard` → confirmation. Uses the `brand-booking` pack + `booking` schema.
- [ ] **Docs** — `EyrisMapping.mdx` deviations for every new component; Storybook handbook page "Booking patterns".
- [ ] **Release** — changeset (minor); `pnpm release`.

## Sequencing

| Order | Work | Parallelisable |
| --- | --- | --- |
| 1 | Phase 1: tokens → then `Rating` ‖ `PriceTag` | components in one batch |
| 2 | Phase 2: `ImageGallery` ‖ `MapView` | yes |
| 3 | Phase 3: `AvailabilityCalendar` ‖ `GuestSelector` | yes |
| 4 | Phase 4: `motion/` ‖ marketing kit | yes |
| 5 | Phase 5: `/booking` flow → docs → release | sequential |

Rough total ~18–25 person-days; ~12–15 with the parallel branches.

## Codex workflow

Each `packages/ui` task is dispatched with `codex exec --skip-git-repo-check
--dangerously-bypass-approvals-and-sandbox -C <root>`, prompt = `RECIPE.md` +
a hand-written SPEC block (these components are not in the Eyris crawl, so
`scripts/ds-spec.mjs` has nothing for them). Verify gate per component:

```
pnpm --filter @vn-dylan/ui exec tsc -b
pnpm exec eslint packages/ui/src/<Name>
pnpm exec prettier --check packages/ui/src/<Name>
pnpm exec vitest run packages/ui/src/<Name>
pnpm --filter @vn-dylan/ui exec vite build
```

Codex does not commit; each finished + reviewed task is committed here with a
`feat(ui|tokens|showcase): …` message and this checklist updated.
