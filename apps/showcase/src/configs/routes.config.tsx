import type { ReactNode } from 'react'
import { Navigate, type RouteObject } from 'react-router-dom'
import { AppLayout } from '@/components/layouts/AppLayout'
import { BlankLayout } from '@/components/layouts/BlankLayout'
import { AuthLayout, type AuthLayoutVariant } from '@/components/layouts/AuthLayout'
import { ProtectedRoute } from '@/components/route/ProtectedRoute'
import { LandingView } from '@/views/landing/LandingView'
import { MarketingKitView } from '@/views/marketing/MarketingKitView'
import { AccessDeniedView } from '@/views/others/AccessDeniedView'
import { NotFoundView } from '@/views/others/NotFoundView'
import { galleryRoutes } from '@/views/gallery/galleryRoutes'
import {
  ForgotPasswordView,
  OtpVerificationView,
  ResetPasswordView,
  SignInView,
  SignUpView,
} from '@/views/auth/authViews'
import { salesRoutes } from '@/views/sales/salesRoutes'
import { projectsRoutes } from '@/views/projects/projectsRoutes'
import { analyticsRoutes } from '@/views/analytics/analyticsRoutes'
import { cryptoRoutes } from '@/views/crypto/cryptoRoutes'
import { customersRoutes } from '@/views/customers/customersRoutes'
import { hrmRoutes } from '@/views/hrm/hrmRoutes'
import { aiRoutes } from '@/views/ai/aiRoutes'
import { accountsRoutes } from '@/views/accounts/accountsRoutes'

const authScreens: [string, ReactNode][] = [
  ['sign-in', <SignInView />],
  ['sign-up', <SignUpView />],
  ['forgot-password', <ForgotPasswordView />],
  ['reset-password', <ResetPasswordView />],
  ['otp-verification', <OtpVerificationView />],
]

const AUTH_VARIANTS: AuthLayoutVariant[] = ['split', 'simple', 'side']

const authRoutes: RouteObject[] = authScreens.flatMap(([slug, element]) =>
  AUTH_VARIANTS.map((variant) => ({
    // primary route uses `split`; the others get a `/simple` / `/side` suffix
    path: variant === 'split' ? `/auth/${slug}` : `/auth/${slug}/${variant}`,
    element: <AuthLayout variant={variant}>{element}</AuthLayout>,
  })),
)

export const routes: RouteObject[] = [
  {
    element: <BlankLayout />,
    children: [
      { path: '/', element: <LandingView /> },
      { path: '/landing', element: <LandingView /> },
      { path: '/marketing-kit', element: <MarketingKitView /> },
      ...authRoutes,
    ],
  },
  ...galleryRoutes,
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/others/access-denied', element: <AccessDeniedView /> },
      ...salesRoutes,
      ...projectsRoutes,
      ...analyticsRoutes,
      ...cryptoRoutes,
      ...customersRoutes,
      ...hrmRoutes,
      ...aiRoutes,
      ...accountsRoutes,
    ],
  },
  { path: '/home', element: <Navigate to="/sales/dashboard" replace /> },
  { path: '*', element: <NotFoundView /> },
]
