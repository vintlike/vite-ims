import { ErrorElement } from '@/router/lazy/whiteList';
import { Typography } from 'antd';
import { redirect } from 'react-router';
import type { MenuItem, RouteItem } from '@/router/RouteTypes';
import type { RouteObject } from 'react-router';

const { Text } = Typography;

export const useRouteList = () => {
  function handleRouteList(list: RouteItem[]): RouteObject[] {
    return list.map((item: RouteItem) => {
      const rtItem: RouteObject = {
        id: item.id,
        path: item.path,
        element: item?.element
      };

      if (item?.element) {
        rtItem.errorElement = <ErrorElement pageType="Page" />;
      }

      if (item?.children) {
        rtItem.children = handleRouteList(item.children);
        if (item?.redirect && rtItem.children.length) {
          rtItem.children.push({
            index: true,
            loader() {
              return redirect((item.redirect as string) || '');
            }
          });
        }
      }

      return rtItem;
    });
  }

  function routeListToMenu(list: RouteItem[], path?: React.Key): MenuItem[] {
    const menuList: MenuItem[] = [];
    list.forEach((item: RouteItem) => {
      if (item?.meta?.hideSidebar) {
        return;
      }

      if (!item?.alwaysShow && item?.alwaysShow !== undefined && !item?.element) {
        if (item?.children && item?.children?.[0]) {
          menuList.push(routeListToMenu([item.children[0]], item.path)[0]);
          return;
        }
      }

      let rtItem: MenuItem = {
        key: item.path,
        label: ''
      };

      if (path) {
        rtItem.key = item.path ? `${path}/${item.path}` : path;
      }

      rtItem = {
        ...rtItem,
        label: (
          <Text style={{ color: 'currentcolor' }} ellipsis={{ tooltip: item?.meta?.label }}>
            {item?.meta?.label}
          </Text>
        ),
        icon: item?.meta?.icon
      };

      if (item.children && !item.element) {
        rtItem.children = routeListToMenu(item.children, rtItem.key);
      }

      menuList.push(rtItem);
    });

    return menuList;
  }

  return { handleRouteList, routeListToMenu };
};
