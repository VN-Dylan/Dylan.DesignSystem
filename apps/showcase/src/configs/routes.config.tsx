import type { ReactNode } from 'react'
import { Navigate, type RouteObject } from 'react-router-dom'
import { AppLayout } from '@/components/layouts/AppLayout'
import { BlankLayout } from '@/components/layouts/BlankLayout'
import { AuthLayout, type AuthLayoutVariant } from '@/components/layouts/AuthLayout'
import { ProtectedRoute } from '@/components/route/ProtectedRoute'
import { LandingView } from '@/views/landing/LandingView'
import { AccessDeniedView } from '@/views/others/AccessDeniedView'
import { NotFoundView } from '@/views/others/NotFoundView'
import { ComponentGalleryView } from '@/views/_dev/ComponentGalleryView'
import { PagePlaceholder } from '@/views/_shared/PagePlaceholder'
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

/**
 * App screens for areas not yet built as real views, area → [path, title].
 * Each still renders <PagePlaceholder> until its P4 area batch lands, at which
 * point the area moves to its own `*Routes` module (see `salesRoutes`).
 */
const APP_AREAS: Record<string, [string, string][]> = {
  ai: [
    ['/ai/chat', 'AI chat'],
    ['/ai/image', 'AI image'],
    ['/ai/writer', 'AI writer'],
  ],
  accounts: [
    ['/accounts/settings/profile', 'Account settings'],
    ['/accounts/activity', 'Activity log'],
    ['/accounts/referrals', 'Referrals'],
    ['/accounts/pricing', 'Pricing'],
    ['/accounts/invoice', 'Invoice'],
    // '/accounts/users' is added separately below with an admin authority guard.
  ],
}

const appAreaRoutes: RouteObject[] = Object.entries(APP_AREAS).flatMap(([area, pages]) =>
  pages.map(([path, title]) => ({
    path,
    element: <PagePlaceholder title={title} area={area} />,
  })),
)

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
      ...authRoutes,
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/dev/components', element: <ComponentGalleryView /> },
      { path: '/others/access-denied', element: <AccessDeniedView /> },
      ...salesRoutes,
      ...projectsRoutes,
      ...analyticsRoutes,
      ...cryptoRoutes,
      ...customersRoutes,
      ...hrmRoutes,
      ...appAreaRoutes,
      {
        path: '/accounts/users',
        element: (
          <ProtectedRoute authority={['admin']}>
            <PagePlaceholder title="Users" area="accounts" />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: '/home', element: <Navigate to="/sales/dashboard" replace /> },
  { path: '*', element: <NotFoundView /> },
]
