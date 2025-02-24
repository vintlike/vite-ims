import { useRouteList } from '@/hooks/useRouteList';
import { useAppSelector } from '@/store/hooks';
import { memo, useMemo } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import type { RouteObject } from 'react-router';
import { baseRoutes, whiteRoutes } from '.';
import { handlePowerRoute } from './RouteUtil';

const RouteView = memo(() => {
  const asyncRouter = useAppSelector((state) => state.route.asyncRouter);
  const { handleRouteList } = useRouteList();

  // 为“/”根路由添加重定向
  const handleRedirect = () => {
    const powerRoutes = handlePowerRoute(asyncRouter);
    const routeList = handleRouteList(powerRoutes);

    if (routeList.length) {
      routeList.push({
        path: '',
        element: <Navigate to={routeList[0].path || ''} />
      });
    }
    return [...routeList, ...whiteRoutes];
  };

  const route = useMemo(() => {
    const routes = baseRoutes.map((item) => {
      if (item.path === '/') {
        item.children = handleRedirect();
      }
      return item;
    });

    return routes;
  }, []);

  const routeElem = createBrowserRouter(route as RouteObject[]);

  return <RouterProvider router={routeElem} />;
});

export default RouteView;
