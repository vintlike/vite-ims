import { lazy } from 'react';

export const Home = lazy(() => import('@/pages/Home'));
export const Fence = lazy(() => import('@/pages/Map/gis'));
export const Menu1_1 = lazy(() => import('@/pages/Nested/Menu1/Menu1-1'));
export const Menu1_2 = lazy(() => import('@/pages/Nested/Menu1/Menu1-2'));
export const Permissions = lazy(() => import('@/pages/Power/Permissions'));
export const TestPermissionsA = lazy(() => import('@/pages/Power/test-permissions-a'));
export const TestPermissionsB = lazy(() => import('@/pages/Power/test-permissions-b'));
export const DetailsPage = lazy(() => import('@/pages/DetailsPage'));
export const DetailsInfo = lazy(() => import('@/pages/DetailsPage/DetailsInfo'));
export const DetailsParams = lazy(() => import('@/pages/DetailsPage/DetailsParams'));
