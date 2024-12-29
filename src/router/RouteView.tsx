import { useRouteList } from '@/hooks/useRouteList';
import { useAppSelector } from '@/store/hooks';
import { memo, useEffect, useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import type { AsyncRouteType } from '@/store/modules/route';
import type { RouteObject } from 'react-router';
import { baseRoutes, whiteRoutes } from '.';
import { handlePowerRoute } from './RouteUtil';
import type { RouteItem } from './RouteTypes';

const RouteView = memo(() => {
  const asyncRouter = useAppSelector((state) => state.route.asyncRouter);
  const { handleRouteList } = useRouteList();

  // 为“/”根路由添加重定向
  const handleRedirect = (asyncRouter: AsyncRouteType[]) => {
    const routerList = handleRouteList(handlePowerRoute(asyncRouter));
    if (routerList.length) {
      routerList.push({
        path: '',
        element: <Navigate to={routerList[0].path || ''} />
      });
    }
    return [...routerList, ...whiteRoutes];
  };

  const mapBaseRouter = (baseRouter: RouteItem[], asyncRouter: AsyncRouteType[]) => {
    return baseRouter.map((item) => {
      if (item.path === '/') {
        item.children = handleRedirect(asyncRouter);
      }
      return item;
    });
  };

  const [route, setRoute] = useState<RouteItem[]>(mapBaseRouter(baseRoutes, asyncRouter));

  // 更新路由列表
  useEffect(() => {
    setRoute(mapBaseRouter(baseRoutes, asyncRouter));
  }, [asyncRouter]);

  const routeElemt = createBrowserRouter(route as RouteObject[]);

  return <RouterProvider router={routeElemt} />;
});

export default RouteView;
