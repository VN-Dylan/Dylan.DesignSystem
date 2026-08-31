import type { ReactNode } from 'react'

export interface WizardStep {
  /** Step label. */
  title: ReactNode
  /** Optional sub-label (shown in vertical layout). */
  description?: ReactNode
  /** Panel content for this step. */
  content: ReactNode
}

export interface WizardProps {
  steps: WizardStep[]
  /** Active step index (controlled). */
  current?: number
  /** Initial step index for uncontrolled usage. @default 0 */
  defaultCurrent?: number
  /** Called with the new step index. */
  onChange?: (index: number) => void
  /** Called when the last step's "Finish" button is pressed. */
  onFinish?: () => void
  /** Lay the step indicator out vertically. */
  vertical?: boolean
  /** Label for the back button. @default 'Back' */
  backLabel?: string
  /** Label for the next button. @default 'Next' */
  nextLabel?: string
  /** Label for the final button. @default 'Finish' */
  finishLabel?: string
}
