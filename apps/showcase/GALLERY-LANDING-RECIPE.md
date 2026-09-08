# GALLERY-LANDING-RECIPE.md — contract for the gallery sections + landing page

The showcase app now has a dedicated **component gallery** at `/gallery` and a
public **landing page** at `/`. The scaffold (layout, routing, the `<Demo>`
primitive, the Common reference section, mock data) is already built. Your job
is to fill the remaining category sections and rebuild the landing page.

**Reference to read IN FULL before writing anything:**

- `apps/showcase/src/views/gallery/sections/CommonSection.tsx` — the pattern for
  every gallery section. Mirror its structure, density and use of `<Demo>`.
- `apps/showcase/src/views/gallery/components/Demo.tsx` — the `<Demo>` API.
- `apps/showcase/src/views/gallery/galleryConfig.ts` — the category → component map.
- `apps/showcase/src/views/landing/LandingView.tsx` + `blocks/` — landing scaffold.
- `apps/showcase/SHOWCASE-RECIPE.md` — the existing app-screen rules still apply
  (token classes only, deterministic mock data, components from `@vn-dylan/ui`).

---

## Part A — gallery category sections

Each category in `galleryConfig.ts` has a section file at
`apps/showcase/src/views/gallery/sections/<Name>Section.tsx` that currently
holds a placeholder. Replace the placeholder body. The route wiring already
exists — **do not touch `galleryRoutes.tsx` or `routes.config.tsx`.**

Files to complete:

| slug | file | components |
| --- | --- | --- |
| forms | `FormsSection.tsx` | Input, DebounceInput, PasswordInput, PatternInput, NumericInput, NumericInputStepper, CustomFormatInput, OtpInput, Checkbox, Radio, Switcher, Select, SelectExtension, AutoComplete, MultiValueInput, InputGroup, Slider, DatePicker, TimeInput, Upload, Form, Dropdown, RichTextEditor |
| feedback | `FeedbackSection.tsx` | Dialog, ConfirmDialog, Drawer, Popover, Tooltip, Toast, Alert, ActionBar, Spinner, Loading, Loaders, Skeleton, Progress, ClockProgress, ReactionEmojiPicker |
| navigation | `NavigationSection.tsx` | Menu, Tabs, OverflowTabs, Steps, Pagination, NavToggle, ToggleDrawer, Wizard |
| data-display | `DataDisplaySection.tsx` | Table, DataTable, Card, StatisticCard, Badge, Tag, GrowShrinkTag, SegmentProgressBar, Timeline, Collapsible, Carousel, FileIcon, PopoverFilter, AdvancedFilterBuilder, SyntaxHighlighter |
| data-viz | `DataVizSection.tsx` | Chart, Histogram, GanttChart, VectorMap, Calendar, FullCalendar |
| primitives | `PrimitivesSection.tsx` | VisuallyHidden, StickyRegion |

### Rules per section

1. `export function <Name>Section()` returning `<SectionShell slug="<slug>">…</SectionShell>`.
2. **Every component in the row above gets at least one `<Demo>`.** Richer
   components (Select, Table, DataTable, Chart, Menu, Tabs, Dialog, Slider,
   DatePicker) get 2–3 demos covering variants / sizes / key states.
3. For each component, **open its stories at `packages/ui/src/<Component>/<Component>.stories.tsx`**
   and adapt 1–3 stories into `<Demo>` children. Keep the interesting props;
   drop Storybook-only wiring (`args`, `argTypes`, decorators).
4. `<Demo>` props: `title` (e.g. `"Select — multi"`), optional `description`,
   and a hand-written `code` snippet showing the shape a consumer copies (not
   the mock wiring). Use `<Demo.Row>` for inline clusters, `<Demo.Grid>` for
   two-up, `<Demo.Stack>` for inputs / anything full-width.
5. Anything stateful (controlled Select, Slider, Tabs, Dialog open flag, Toast
   trigger) uses local `useState` inside the section component. Toasts:
   render `<Toaster />` once at the top of the section and fire via `toast(...)`
   from a `<Button>`.
6. **Data comes from `apps/showcase/src/mock/gallery.ts`** — it already exports
   `galleryUsers`, `galleryProducts`, `gallerySelectOptions`, `galleryChart`,
   `galleryHistogram`, `galleryActivity`, `galleryTreeCountries`. Add more
   exports there if needed; keep them static and deterministic.
7. Token classes only — `bg-surface`, `text-content`, `text-content-muted`,
   `border-border`, `bg-primary-subtle`, `text-primary`, … NO hex, rgb, px
   colours, or arbitrary `bg-[…]`. The `/NN` opacity modifier only works on
   `primary`, status, `content` and `gray` — never on `surface`/`border`/`bg`.
8. Overlays that portal (Dialog, Drawer, Popover, Tooltip, Dropdown) render
   fine inside a `<Demo>` — trigger them from a `<Button>`.
9. Icons: `import { Icon, TbIcons, HiIcons } from '@vn-dylan/icons'`, then
   `<Icon as={TbIcons.TbFoo} size={16} />`.
10. TSDoc one-liner on the exported section function.

## Part B — landing page

Rebuild `apps/showcase/src/views/landing/LandingView.tsx` (still rendered by
`BlankLayout`, chrome-free, at `/` and `/landing`). Use the helper blocks in
`apps/showcase/src/views/landing/blocks/` (`Reveal`, `LandingSection`,
`CodeBlock`) — `HeroSection.tsx` is already built as the reference; build the
rest as sibling files in `blocks/` and compose them in `LandingView.tsx`.

Sections, in order:

1. **Hero** (built) — headline, sub-copy, CTAs, live theme switch + component cluster.
2. **Stats band** — `{galleryComponentCount}` components · 42 base · 42 composite
   · 32 utilities · 8 schemas · a11y 84/84. Pull the count from `galleryConfig`.
3. **Feature grid** — 6–8 cards (token-first, runtime theming, accessible,
   RTL-ready, tree-shakeable, TypeScript, Storybook handbook, tested). Icon + copy.
4. **Theming** — the 8 schema swatches (map `themeSchemaNames`), each a button
   that calls `useThemeStore().setSchema`, next to a `<CodeBlock>` showing
   `presets: [dylanPreset]` + `useThemeSchema(...)`.
5. **Install** — a `<CodeBlock language="ini">` with the `.npmrc` from
   `CONSUMING.md` and a `<CodeBlock language="bash">` with `pnpm add @vn-dylan/ui`
   + `import '@vn-dylan/ui/styles.css'`.
6. **Category montage** — map `galleryCategories`, each linking to
   `/gallery/<slug>` (`react-router` `Link`), icon + title + blurb + count.
7. **Footer** — links to the repo, Storybook (`pnpm storybook`), `DESIGN.md`;
   "internal reference build" note; no real brand.

Motion: `Reveal` (IntersectionObserver fade/slide-in) around each section. No
new dependencies — CSS transitions only.

---

## Verify — all must pass before finishing

```
pnpm --filter @vn-dylan/showcase exec tsc -p tsconfig.app.json --noEmit
pnpm exec eslint apps/showcase/src
pnpm exec prettier --check 'apps/showcase/src/**/*.{ts,tsx}'
pnpm check:tokens
pnpm --filter @vn-dylan/showcase build
```

Fix until green. Do NOT `git commit`. Summarise the sections built + any
component whose story was hard to adapt + judgement calls.
