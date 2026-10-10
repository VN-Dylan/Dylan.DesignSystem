import { useState, type ComponentProps, type FormEvent, type ReactNode } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Alert, Button, Checkbox, Input } from '@vn-dylan/ui'
import { DEMO_PASSWORD, demoUsers } from '@/auth'
import { useTranslation } from '@/i18n'
import { useAuth } from '@/utils/hooks/useAuth'

/** Card heading + optional subtitle shared by every auth screen. */
function AuthHead({ title, subtitle }: { title: string; subtitle?: ReactNode }) {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold tracking-tight text-content">{title}</h1>
      {subtitle && <p className="text-sm text-content-muted">{subtitle}</p>}
    </div>
  )
}

function Field({ label, name, ...props }: { label: string } & ComponentProps<typeof Input>) {
  const fieldName = name ?? label.toLowerCase().replace(/\s+/g, '-')
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-content">{label}</span>
      <Input name={fieldName} {...props} />
    </label>
  )
}

const useMockSubmit = (to: string) => {
  const navigate = useNavigate()
  return (e: FormEvent) => {
    e.preventDefault()
    navigate(to)
  }
}

export function SignInView() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { signIn, pending, error, clearError } = useAuth()
  const { t } = useTranslation()
  const [email, setEmail] = useState(demoUsers[0]!.email)
  const [password, setPassword] = useState(DEMO_PASSWORD)
  const [remember, setRemember] = useState(true)
  const [missing, setMissing] = useState(false)

  // Only same-app paths are honoured, never an external URL.
  const redirectParam = params.get('redirect')
  const redirect =
    redirectParam?.startsWith('/') && !redirectParam.startsWith('//')
      ? redirectParam
      : '/sales/dashboard'

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!email.trim() || !password) {
      setMissing(true)
      return
    }
    setMissing(false)
    if (await signIn({ email, password, remember })) navigate(redirect, { replace: true })
  }

  const message = missing ? t('auth.errors.required') : error ? t(`auth.errors.${error}`) : null

  return (
    <form className="space-y-6" onSubmit={onSubmit} noValidate>
      <AuthHead title={t('auth.signIn.title')} subtitle={t('auth.signIn.subtitle')} />
      {message && (
        <Alert type={error === 'expired' && !missing ? 'warning' : 'danger'} showIcon>
          {message}
        </Alert>
      )}
      <Field
        label={t('auth.signIn.email')}
        name="email"
        type="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value)
          clearError()
        }}
        invalid={error === 'invalid_credentials' || (missing && !email.trim())}
        autoComplete="email"
      />
      <Field
        label={t('auth.signIn.password')}
        name="password"
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value)
          clearError()
        }}
        invalid={error === 'invalid_credentials' || (missing && !password)}
        autoComplete="current-password"
      />
      <div className="flex items-center justify-between gap-4">
        <Checkbox checked={remember} onChange={(checked) => setRemember(checked)}>
          {t('auth.signIn.remember')}
        </Checkbox>
        <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline">
          {t('auth.signIn.forgot')}
        </Link>
      </div>
      <Button type="submit" variant="solid" block loading={pending}>
        {pending ? t('auth.signIn.pending') : t('auth.signIn.submit')}
      </Button>

      <div className="space-y-2 rounded-md border border-border p-4">
        <p className="text-sm font-medium text-content">{t('auth.signIn.demoTitle')}</p>
        <p className="text-xs text-content-muted">
          {t('auth.signIn.demoHint', { password: DEMO_PASSWORD })}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {demoUsers.map((user) => (
            <Button
              key={user.id}
              size="sm"
              onClick={() => {
                setEmail(user.email)
                setPassword(DEMO_PASSWORD)
                clearError()
              }}
            >
              {t(`roles.${user.roles[0]!}`)}
            </Button>
          ))}
        </div>
      </div>

      <p className="text-center text-sm text-content-muted">
        {t('auth.signIn.newHere')}{' '}
        <Link to="/auth/sign-up" className="text-primary hover:underline">
          {t('auth.signIn.createAccount')}
        </Link>
      </p>
    </form>
  )
}

export function SignUpView() {
  const onSubmit = useMockSubmit('/sales/dashboard')
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <AuthHead title="Create your account" subtitle="Start exploring the design system." />
      <Field label="Full name" autoComplete="name" />
      <Field label="Email" type="email" autoComplete="email" />
      <Field label="Password" type="password" autoComplete="new-password" />
      <Checkbox defaultChecked>I agree to the terms of service and privacy policy</Checkbox>
      <Button type="submit" variant="solid" block>
        Create account
      </Button>
      <p className="text-center text-sm text-content-muted">
        Already have an account?{' '}
        <Link to="/auth/sign-in" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}

export function ForgotPasswordView() {
  const onSubmit = useMockSubmit('/auth/otp-verification')
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <AuthHead
        title="Reset your password"
        subtitle="Enter your email and we'll send a verification code."
      />
      <Field label="Email" type="email" autoComplete="email" />
      <Button type="submit" variant="solid" block>
        Send code
      </Button>
      <p className="text-center text-sm text-content-muted">
        <Link to="/auth/sign-in" className="text-primary hover:underline">
          Back to sign in
        </Link>
      </p>
    </form>
  )
}

export function ResetPasswordView() {
  const onSubmit = useMockSubmit('/auth/sign-in')
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <AuthHead title="Set a new password" subtitle="Choose a password you haven't used before." />
      <Field label="New password" type="password" autoComplete="new-password" />
      <Field label="Confirm password" type="password" autoComplete="new-password" />
      <Button type="submit" variant="solid" block>
        Update password
      </Button>
    </form>
  )
}

export function OtpVerificationView() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault()
        navigate('/auth/reset-password')
      }}
    >
      <AuthHead
        title="Verify your identity"
        subtitle="Enter the 6-digit code sent to your email."
      />
      <Input
        name="otp"
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
        inputMode="numeric"
        placeholder="123456"
        aria-label="Verification code"
        className="text-center tracking-[0.5em]"
      />
      <Button type="submit" variant="solid" block disabled={code.length < 6}>
        Verify
      </Button>
      <p className="text-center text-sm text-content-muted">
        Didn&rsquo;t get a code?{' '}
        <button type="button" className="text-primary hover:underline">
          Resend
        </button>
      </p>
    </form>
  )
}
