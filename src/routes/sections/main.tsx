import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { MainLayout } from 'src/layouts/main';
import { SimpleLayout } from 'src/layouts/simple';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const ComingSoonPage = lazy(() => import('src/pages/coming-soon'));
const ContactPage = lazy(() => import('src/pages/contact-us'));
const AboutPage = lazy(() => import('src/pages/about-us'));
const FeaturePage = lazy(() => import('src/pages/features'));
const Page500 = lazy(() => import('src/pages/error/500'));
const Page403 = lazy(() => import('src/pages/error/403'));
const Page404 = lazy(() => import('src/pages/error/404'));

export const mainRoutes: RouteObject[] = [
  {
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        element: (
          <MainLayout>
            <Outlet />
          </MainLayout>
        ),
        children: [{ path: 'contact-us', element: <ContactPage /> }],
      },
      // {
      //   path: 'pricing',
      //   element: (
      //     <SimpleLayout>
      //       <PricingPage />
      //     </SimpleLayout>
      //   ),
      // },
      {
        path: 'coming-soon',
        element: (
          <SimpleLayout slotProps={{ content: { compact: true } }}>
            <ComingSoonPage />
          </SimpleLayout>
        ),
      },
      {
        path: 'about-us',
        element: (
          <SimpleLayout slotProps={{ content: { compact: true } }}>
            <AboutPage />
          </SimpleLayout>
        ),
      },

      {
        path: 'features',
        element: (
          <SimpleLayout slotProps={{ content: { compact: true } }}>
            <FeaturePage />
          </SimpleLayout>
        ),
      },

      {
        path: 'error',
        children: [
          { path: '500', element: <Page500 /> },
          { path: '404', element: <Page404 /> },
          { path: '403', element: <Page403 /> },
        ],
      },
    ],
  },
];
