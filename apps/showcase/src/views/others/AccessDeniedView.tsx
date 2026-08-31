import { useNavigate } from 'react-router-dom'
import { Button } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'

/** Shown when an authenticated user lacks the authority for a route. */
export function AccessDeniedView() {
  const navigate = useNavigate()
  return (
    <div className="grid min-h-[60vh] place-items-center px-4 text-center">
      <div className="max-w-md space-y-4">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-error-subtle text-error">
          <Icon as={TbIcons.TbLock} size={26} />
        </span>
        <h1 className="text-2xl font-semibold tracking-tight text-content">Access denied</h1>
        <p className="text-content-muted">
          Your account doesn&rsquo;t have permission to view this page. Contact an administrator if
          you think this is a mistake.
        </p>
        <div className="flex justify-center gap-2">
          <Button variant="default" onClick={() => navigate(-1)}>
            Go back
          </Button>
          <Button variant="solid" onClick={() => navigate('/sales/dashboard')}>
            Back to dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
