import { FormattedMessage } from '@/components/FormattedMessage';
import Layout from '@/layouts';
import Authority from '@/layouts/Authority';
import RingArea from '@/pages/Map/calcutation/RingArea';
import Coordinate from '@/pages/Map/coordinate';
import OsmIndex from '@/pages/Map/gis';
import Geocoding from '@/pages/Map/lbs/geocoder/Geocoding';
import GeoFence from '@/pages/Map/lbs/geocoder/GeoFence';
import ReGeocoding from '@/pages/Map/lbs/geocoder/Regeocoding';
import { AppstoreOutlined, DatabaseOutlined, HomeOutlined, UserSwitchOutlined } from '@ant-design/icons';
import type { RouteItem } from '@/router/RouteTypes';
import {
  DetailsInfo,
  DetailsPage,
  DetailsParams,
  Fence,
  Home,
  Menu1_1,
  Menu1_2,
  Permissions,
  TestPermissionsA,
  TestPermissionsB
} from './lazy/view';
import { ErrorElement, ErrorPage403, Login, Refresh } from './lazy/whiteList';

export const defaultRoutes: RouteItem[] = [
  {
    path: '/home',
    id: 'Home',
    element: <Home />,
    meta: {
      label: <FormattedMessage id="layout.menu.home" />,
      icon: <HomeOutlined />
    }
  },
  {
    path: '/map',
    id: 'Map',
    redirect: '/map/gis',
    meta: {
      label: <FormattedMessage id="layout.menu.map" />,
      whiteList: true
    },
    children: [
      {
        path: 'geocoder',
        id: 'Geocoder',
        redirect: '/map/geocoder/geoFence',
        meta: { label: <FormattedMessage id="layout.menu.geocoder" /> },
        children: [
          {
            path: 'geoFence',
            id: 'geoFence',
            element: <GeoFence />,
            meta: { label: <FormattedMessage id="layout.menu.geoFence" /> }
          },
          {
            path: 'geocoding',
            id: 'Geocoding',
            element: <Geocoding />,
            meta: { label: <FormattedMessage id="layout.menu.geocoding" /> }
          },
          {
            path: 'regeocoding',
            id: 'ReGeocoding',
            element: <ReGeocoding />,
            meta: { label: <FormattedMessage id="layout.menu.regeocoding" /> }
          }
        ]
      },
      {
        path: 'gis',
        id: 'Gis',
        element: <OsmIndex />,
        meta: { label: <FormattedMessage id="layout.menu.fence" /> }
      },
      {
        path: 'coordinate',
        id: 'Coordinate',
        element: <Coordinate />,
        meta: { label: <FormattedMessage id="layout.menu.coordinate" /> }
      },

      {
        path: 'polygonArea',
        id: 'PolygonArea',
        element: <RingArea />,
        meta: { label: <FormattedMessage id="layout.menu.polygonArea" /> }
      }
    ]
  },
  {
    path: '/nested',
    id: 'Nested',
    redirect: '/nested/menu1',
    meta: {
      label: <FormattedMessage id="layout.menu.nesting" />,
      icon: <AppstoreOutlined />
    },
    children: [
      {
        path: 'menu1',
        id: 'Menu1',
        redirect: '/nested/menu1/menu1-1',
        meta: { label: 'menu-1' },
        children: [
          {
            path: 'menu1-1',
            id: 'Menu1-1',
            element: <Menu1_1 />,
            meta: { label: 'menu-1-1' }
          },
          {
            path: 'menu1-2',
            id: 'Menu1-2',
            element: <Menu1_2 />,
            meta: { label: 'menu-1-2' }
          }
        ]
      }
    ]
  },
  {
    path: '/power',
    id: 'Power',
    redirect: '/power/permissions',
    meta: {
      label: <FormattedMessage id="layout.menu.permissions" />,
      icon: <UserSwitchOutlined />
    },
    children: [
      {
        path: 'permissions',
        id: 'Permissions',
        element: <Permissions />,
        meta: { label: <FormattedMessage id="layout.menu.permissionsPage" /> }
      },
      {
        path: 'test-permissions-a',
        id: 'TestPermissionsA',
        element: <TestPermissionsA />,
        meta: { label: <FormattedMessage id="layout.menu.testPermissionsPage1" /> }
      },
      {
        path: 'test-permissions-b',
        id: 'TestPermissionsB',
        element: <TestPermissionsB />,
        meta: { label: <FormattedMessage id="layout.menu.testPermissionsPage2" /> }
      }
    ]
  },
  {
    path: '/details-page',
    id: 'DetailsPage',
    alwaysShow: false,
    meta: { label: <FormattedMessage id="layout.menu.detailsPage" />, whiteList: true },
    children: [
      {
        path: '',
        id: 'DetailsList',
        element: <DetailsPage />,
        meta: {
          label: <FormattedMessage id="layout.menu.detailsPage" />,
          icon: <DatabaseOutlined />
        }
      },
      {
        path: 'details-info',
        id: 'DetailsInfo',
        element: <DetailsInfo />,
        meta: { label: '详情页', hideSidebar: true }
      },
      {
        path: 'details-params/:id',
        id: 'DetailsParams',
        element: <DetailsParams />,
        meta: { label: '详情页', hideSidebar: true }
      }
    ]
  }
];

export const whiteRoutes: RouteItem[] = [
  {
    path: '*',
    element: <ErrorPage403 />
  },
  {
    path: '/refresh/*',
    element: <Refresh />,
    meta: { label: '', hideSidebar: true, whiteList: true }
  }
];

export const baseRoutes: RouteItem[] = [
  {
    path: '/',
    element: (
      <Authority>
        <Layout />
      </Authority>
    ),
    errorElement: <ErrorElement pageType="Layout" />,
    children: [...whiteRoutes]
  },
  {
    path: '/login',
    element: <Login />
  }
];
