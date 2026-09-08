import { CodeBlock } from '@/views/landing/blocks/CodeBlock'
import { LandingSection } from '@/views/landing/blocks/LandingSection'

const npmrcSnippet = `
@vn-dylan:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}
`

const installSnippet = `
pnpm add @vn-dylan/ui

# src/main.tsx
import '@vn-dylan/ui/styles.css'
`

/** Landing install section with copy-ready package setup snippets. */
export function InstallSection() {
  return (
    <LandingSection
      id="install"
      eyebrow="Install"
      title="Consume the package from GitHub Packages."
      description="Authenticate the private scope, add the UI package, then import the bundled stylesheet once at the app entry."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-content">.npmrc</h3>
          <CodeBlock language="ini">{npmrcSnippet}</CodeBlock>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-content">Package and styles</h3>
          <CodeBlock language="bash">{installSnippet}</CodeBlock>
        </div>
      </div>
    </LandingSection>
  )
}
