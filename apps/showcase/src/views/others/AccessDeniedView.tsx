import { useNavigate } from 'react-router-dom'
import { Button } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { useTranslation } from '@/i18n'

/** Shown when an authenticated user lacks the permission for a route. */
export function AccessDeniedView() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <div className="grid min-h-[60vh] place-items-center px-4 text-center">
      <div className="max-w-md space-y-4">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-error-subtle text-error">
          <Icon as={TbIcons.TbLock} size={26} />
        </span>
        <h1 className="text-2xl font-semibold tracking-tight text-content">
          {t('accessDenied.title')}
        </h1>
        <p className="text-content-muted">{t('accessDenied.body')}</p>
        <div className="flex justify-center gap-2">
          <Button variant="default" onClick={() => navigate(-1)}>
            {t('common.back')}
          </Button>
          <Button variant="solid" onClick={() => navigate('/sales/dashboard')}>
            {t('accessDenied.dashboard')}
          </Button>
        </div>
      </div>
    </div>
  )
}
