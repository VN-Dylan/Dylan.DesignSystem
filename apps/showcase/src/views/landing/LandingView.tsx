import { CategoryMontage } from '@/views/landing/blocks/CategoryMontage'
import { FeatureGrid } from '@/views/landing/blocks/FeatureGrid'
import { HeroSection } from '@/views/landing/blocks/HeroSection'
import { InstallSection } from '@/views/landing/blocks/InstallSection'
import { LandingFooter } from '@/views/landing/blocks/LandingFooter'
import { StatsBand } from '@/views/landing/blocks/StatsBand'
import { ThemingSection } from '@/views/landing/blocks/ThemingSection'

/** Public landing page rendered chrome-free by BlankLayout. */
export function LandingView() {
  return (
    <div className="min-h-screen bg-bg">
      <HeroSection />
      <StatsBand />
      <FeatureGrid />
      <ThemingSection />
      <InstallSection />
      <CategoryMontage />
      <LandingFooter />
    </div>
  )
}
