import { Card } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { LandingSection } from '@/views/landing/blocks/LandingSection'

const features = [
  {
    title: 'Token-first styling',
    copy: 'Semantic Tailwind classes map onto CSS variables, so screens stay portable across schemas and modes.',
    icon: TbIcons.TbPalette,
  },
  {
    title: 'Runtime theming',
    copy: 'Light, dark and brand schemas are applied from state without rebuilding or swapping stylesheets.',
    icon: TbIcons.TbSunMoon,
  },
  {
    title: 'Accessible defaults',
    copy: 'Interactive primitives carry keyboard, focus and ARIA behavior before application code gets involved.',
    icon: TbIcons.TbAccessible,
  },
  {
    title: 'RTL-ready surfaces',
    copy: 'Layout examples use logical spacing and text alignment so direction changes do not fork the UI.',
    icon: TbIcons.TbDirections,
  },
  {
    title: 'Tree-shakeable entrypoints',
    copy: 'Heavy dependencies sit behind the components that need them, keeping ordinary imports lean.',
    icon: TbIcons.TbPackage,
  },
  {
    title: 'TypeScript contracts',
    copy: 'Component props, mock data and tokens are typed across the workspace for safer composition.',
    icon: TbIcons.TbBrandTypescript,
  },
  {
    title: 'Storybook handbook',
    copy: 'Stories double as implementation notes for component states, sizes and copy-ready usage patterns.',
    icon: TbIcons.TbBook,
  },
  {
    title: 'Tested reference app',
    copy: 'Type checks, linting, token audits and production builds run against the same showcase users browse.',
    icon: TbIcons.TbTestPipe,
  },
]

/** Landing feature grid summarising the system capabilities. */
export function FeatureGrid() {
  return (
    <LandingSection
      id="features"
      eyebrow="Features"
      title="A system built for admin screens, not static mockups."
      description="The showcase keeps the practical contracts visible: token usage, accessible primitives, runtime configuration and copyable code paths."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.title} bordered className="h-full" bodyClass="h-full">
            <div className="flex h-full flex-col gap-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary-subtle text-primary">
                <Icon as={feature.icon} size={20} />
              </span>
              <div className="space-y-2 text-start">
                <h3 className="font-semibold text-content">{feature.title}</h3>
                <p className="text-sm leading-6 text-content-muted">{feature.copy}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </LandingSection>
  )
}
