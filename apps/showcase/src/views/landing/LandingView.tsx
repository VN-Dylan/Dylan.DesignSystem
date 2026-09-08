import { HeroSection } from '@/views/landing/blocks/HeroSection'

/**
 * Public landing page — chrome-free (BlankLayout). The hero is built; the
 * remaining sections (stats, features, theming, install, category montage,
 * footer) are added as blocks under `blocks/` per GALLERY-LANDING-RECIPE.md.
 */
export function LandingView() {
  return (
    <div className="min-h-screen bg-bg">
      <HeroSection />
    </div>
  )
}
