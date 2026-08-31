import { useState, type ComponentProps, type FormEvent, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Checkbox, Input } from '@dylan-ds/ui'

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
    <label className="block space-y-1.5">
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
  const onSubmit = useMockSubmit('/sales/dashboard')
  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <AuthHead title="Welcome back" subtitle="Sign in to continue to your workspace." />
      <Field label="Email" type="email" defaultValue="dylan@dylan-ds.dev" autoComplete="email" />
      <Field
        label="Password"
        type="password"
        defaultValue="password"
        autoComplete="current-password"
      />
      <div className="flex items-center justify-between">
        <Checkbox defaultChecked>Remember me</Checkbox>
        <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline">
          Forgot password?
        </Link>
      </div>
      <Button type="submit" variant="solid" block>
        Sign in
      </Button>
      <p className="text-center text-sm text-content-muted">
        New here?{' '}
        <Link to="/auth/sign-up" className="text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  )
}

export function SignUpView() {
  const onSubmit = useMockSubmit('/sales/dashboard')
  return (
    <form className="space-y-5" onSubmit={onSubmit}>
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
    <form className="space-y-5" onSubmit={onSubmit}>
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
    <form className="space-y-5" onSubmit={onSubmit}>
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
      className="space-y-5"
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
