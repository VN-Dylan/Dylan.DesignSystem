import { useState } from 'react'
import { StickyRegion, VisuallyHidden } from '@vn-dylan/ui'
import { Demo } from '@/views/gallery/components/Demo'
import { SectionShell } from '@/views/gallery/sections/SectionShell'

const stickyItems = Array.from({ length: 10 }, (_, index) => `Content item ${index + 1}`)

/** Primitives category page with low-level accessibility and sticky-region helpers. */
export function PrimitivesSection() {
  const [isSticky, setIsSticky] = useState(false)

  return (
    <SectionShell slug="primitives">
      <Demo
        title="VisuallyHidden"
        description="Adds screen-reader-only context without adding a standalone visual element."
        code={`<p>
  Price: $58.00
  <VisuallyHidden> - down 12.3 percent versus the previous period</VisuallyHidden>
</p>`}
      >
        <p className="text-sm text-content">
          Price: $58.00
          <VisuallyHidden> - down 12.3 percent versus the previous period</VisuallyHidden>
        </p>
      </Demo>

      <Demo
        title="StickyRegion - scroll container"
        description="The sticky behavior appears only while the demo viewport is scrolled."
        code={`<StickyRegion className="border-b border-border bg-surface p-4">
  <h5>Sticky Header</h5>
</StickyRegion>`}
      >
        <div className="h-64 w-full max-w-sm overflow-auto rounded-md border border-border bg-surface-sunken">
          <div className="p-4">
            <p className="mb-4 text-sm text-content-muted">
              Scroll this panel to see the header pin to the top.
            </p>
            <StickyRegion className="border-b border-border bg-surface p-4">
              <h5 className="font-semibold text-content">Sticky Header</h5>
            </StickyRegion>
            <div className="mt-4 space-y-4">
              {stickyItems.map((item) => (
                <p key={item} className="rounded-md bg-surface p-4 text-sm text-content">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Demo>

      <Demo
        title="StickyRegion - callback"
        description="Reports sticky state while keeping the helper itself visually minimal."
        code={`<StickyRegion
  offsetTop={10}
  onStickyChange={setSticky}
  className="border border-border bg-surface p-2"
>
  {sticky ? 'Now sticky' : 'Not sticky yet'}
</StickyRegion>`}
      >
        <div className="h-64 w-full max-w-sm overflow-auto rounded-md border border-border bg-surface-sunken">
          <div className="p-4">
            <p className="mb-4 text-sm text-content-muted">This region has an offset callback.</p>
            <StickyRegion
              offsetTop={10}
              onStickyChange={setIsSticky}
              className="rounded-md border border-border bg-surface p-2"
              stickyClassName="rounded-b"
            >
              <h5 className="font-semibold text-content">
                {isSticky ? 'Now sticky' : 'Not sticky yet'}
              </h5>
            </StickyRegion>
            <div className="mt-4 space-y-4">
              {stickyItems.map((item) => (
                <p key={item} className="rounded-md bg-surface p-4 text-sm text-content">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Demo>
    </SectionShell>
  )
}
