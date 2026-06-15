import React, { lazy, Suspense } from 'react';
import { RouteObject, useRoutes, Navigate } from 'react-router-dom';
import { currentConfig } from '@/configs';
import { AuthGuard } from '@/components';

const Layout = lazy(() => import('@/components/Layout'));
const Dashboard = lazy(() => import('@/features/dashboard'));
const Reports = lazy(() => import('@/features/reports'));
const SocialFeed = lazy(() => import('@/features/social-feed'));
const Login = lazy(() => import('@/features/auth'));
const WelcomePage = lazy(() => import('@/features/welcome'));

const moduleRoutes: Record<string, RouteObject> = {
  dashboard: {
    path: 'dashboard',
    element: <Dashboard />,
  },
  reports: {
    path: 'reports',
    element: <Reports />,
  },
  'social-feed': {
    path: 'social-feed',
    element: <SocialFeed />,
  },
};

export const AppRouter: React.FC = () => {
  const dynamicRoutes = currentConfig.modules
    .map((moduleName) => moduleRoutes[moduleName])
    .filter(Boolean);

  const routes: RouteObject[] = [
    {
      path: '/login',
      element: (
        <Suspense fallback={<div>Loading Login...</div>}>
          <Login onLogin={(username, password) => {
            console.log('Login attempt:', username, password);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            window.location.href = '/';
          }} />
        </Suspense>
      ),
    },
    {
      path: '/',
      element: (
        <Suspense fallback={<div>Loading Layout...</div>}>
          <AuthGuard>
            <Layout />
          </AuthGuard>
        </Suspense>
      ),
      children: [
        { index: true, element: <Navigate to="welcome" replace /> },
        {
          path: 'welcome',
          element: (
            <Suspense fallback={<div>Loading Welcome...</div>}>
              <WelcomePage />
            </Suspense>
          ),
        },
        ...dynamicRoutes,
        { path: '*', element: <Navigate to="welcome" replace /> },
      ],
    },
  ];

  return useRoutes(routes);
};
