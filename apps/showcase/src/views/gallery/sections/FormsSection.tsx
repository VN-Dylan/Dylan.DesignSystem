import { SectionShell } from '@/views/gallery/sections/SectionShell'
import { Demo } from '@/views/gallery/components/Demo'

/** Forms category page. */
export function FormsSection() {
  return (
    <SectionShell slug="forms">
      <Demo title="Placeholder">
        <p className="text-sm text-content-muted">Filled in next.</p>
      </Demo>
    </SectionShell>
  )
}
