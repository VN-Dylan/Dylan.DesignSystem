import { useControllableState } from '@vn-dylan/utils'
import { Steps } from '../Steps'
import { Button } from '../Button'
import type { WizardProps } from './types'
import './Wizard.scss'

/**
 * A guided multi-step flow: a `Steps` indicator, the active step's panel, and
 * back / next / finish controls.
 */
export function Wizard({
  steps,
  current,
  defaultCurrent = 0,
  onChange,
  onFinish,
  vertical = false,
  backLabel = 'Back',
  nextLabel = 'Next',
  finishLabel = 'Finish',
}: WizardProps) {
  const [active, setActive] = useControllableState<number>({
    value: current,
    defaultValue: defaultCurrent,
    onChange,
  })

  const clamp = (n: number) => Math.min(steps.length - 1, Math.max(0, n))
  const isLast = active === steps.length - 1

  return (
    <div className="dyl-wizard" data-vertical={vertical || undefined}>
      <Steps current={active} vertical={vertical} className="dyl-wizard__steps">
        {steps.map((step, index) => (
          <Steps.Item key={index} title={step.title} description={step.description} />
        ))}
      </Steps>

      <div className="dyl-wizard__panel" role="group" aria-label={`Step ${active + 1}`}>
        {steps[active]?.content}
      </div>

      <div className="dyl-wizard__actions">
        <Button disabled={active === 0} onClick={() => setActive(clamp(active - 1))}>
          {backLabel}
        </Button>
        <span className="dyl-wizard__spacer" />
        <Button
          variant="solid"
          onClick={() => (isLast ? onFinish?.() : setActive(clamp(active + 1)))}
        >
          {isLast ? finishLabel : nextLabel}
        </Button>
      </div>
    </div>
  )
}
