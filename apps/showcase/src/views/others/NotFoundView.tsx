import { useNavigate } from 'react-router-dom'
import { Button } from '@vn-dylan/ui'

/** 404 — unmatched route. */
export function NotFoundView() {
  const navigate = useNavigate()
  return (
    <div className="grid min-h-screen place-items-center px-4 text-center">
      <div className="max-w-md space-y-4">
        <p className="font-mono text-6xl font-bold text-primary">404</p>
        <h1 className="text-2xl font-semibold tracking-tight text-content">Page not found</h1>
        <p className="text-content-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <div className="flex justify-center gap-2">
          <Button variant="default" onClick={() => navigate(-1)}>
            Go back
          </Button>
          <Button variant="solid" onClick={() => navigate('/')}>
            Home
          </Button>
        </div>
      </div>
    </div>
  )
}
