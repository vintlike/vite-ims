import { useMenuList } from '@/hooks/useMenuList';
import { findRouteByPath, getParentPaths } from '@/router/RouteUtil';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAppCollapsed } from '@/store/modules/app';
import { useResponsive } from 'ahooks';
import { Drawer, Layout, Menu, theme } from 'antd';
import { memo, useEffect, useMemo, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import type { MenuProps, SiderProps } from 'antd';
import { AppLogo } from '../AppLogo';

const { Sider } = Layout;

const AppSider = memo(() => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { collapsed, sidebarMode } = useAppSelector(
    (state) => ({
      collapsed: state.app.collapsed,
      sidebarMode: state.app.sidebarMode
    }),
    shallowEqual
  );
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const globalTheme = theme.useToken();
  const responsive = useResponsive();
  const navigate = useNavigate();
  const { menuList } = useMenuList();

  useEffect(() => {
    if (!collapsed) {
      setOpenKeys(getParentPaths(pathname, menuList));
    } else {
      setOpenKeys([]);
    }
  }, [collapsed, pathname]);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys);
  };

  const onBreakpoint: SiderProps['onBreakpoint'] = (broken) => {
    let collapsedValue = collapsed;
    if (broken) collapsedValue = true;
    else collapsedValue = false;
    dispatch(setAppCollapsed(collapsedValue));
  };

  const menuItems = useMemo(() => {
    if (sidebarMode === 'blend') {
      // path的父级路由组成的数组
      const parentPathArr = getParentPaths(pathname, menuList);
      // 当前路由的信息
      const parenetRoute = findRouteByPath(parentPathArr[0], menuList);
      if (parenetRoute) {
        if (parenetRoute.children) return parenetRoute.children;
        else return [parenetRoute];
      }
      return [];
    } else {
      return menuList;
    }
  }, [sidebarMode, pathname, menuList]);

  const MenuRender = (
    <div className="layout-content">
      <div className="layout-content-head">
        <AppLogo />
      </div>
      <div className="layout-content-body">
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={[pathname]}
          items={menuItems as MenuProps['items']}
          onClick={(e) => navigate(e.key)}
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );

  return (
    <>
      {(sidebarMode !== 'horizontal' || !responsive.sm) && (
        <>
          {responsive.sm ? (
            <Sider
              className="layout-sider"
              breakpoint="lg"
              collapsedWidth={60}
              width={200}
              theme="light"
              collapsed={collapsed}
              onBreakpoint={onBreakpoint}
              css={{
                backgroundColor: globalTheme.token.colorBgContainer,
                borderRight: `1px solid ${globalTheme.token.colorBorder}`,
                transition: `all ${globalTheme.token.motionDurationSlow} ${globalTheme.token.motionEaseOut}`
              }}
            >
              {MenuRender}
            </Sider>
          ) : (
            <Drawer
              width={200}
              placement="left"
              destroyOnClose={false}
              styles={{ body: { padding: 0, height: '100%' } }}
              closable={false}
              onClose={() => dispatch(setAppCollapsed(!collapsed))}
              open={!collapsed}
            >
              <div className="layout-sider">{MenuRender}</div>
            </Drawer>
          )}
        </>
      )}
    </>
  );
});

export default AppSider;
