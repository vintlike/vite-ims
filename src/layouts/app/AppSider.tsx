import AppMenu from '@/layouts/app/components/AppMenu';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAppCollapsed } from '@/store/modules/app';
import { useResponsive } from 'ahooks';
import { Drawer, Layout, theme } from 'antd';
import { memo } from 'react';
import { shallowEqual } from 'react-redux';
import type { SiderProps } from 'antd';
import AppLogo from './components/AppLogo';

const { Sider } = Layout;

const Sidebar = memo(() => {
  const dispatch = useAppDispatch();
  const { collapsed, sidebarMode } = useAppSelector(
    (state) => ({
      collapsed: state.app.collapsed,
      sidebarMode: state.app.sidebarMode
    }),
    shallowEqual
  );
  const globalTheme = theme.useToken();
  const responsive = useResponsive();

  const onBreakpoint: SiderProps['onBreakpoint'] = (broken) => {
    let collapsedValue = collapsed;
    if (broken) {
      collapsedValue = true;
    } else {
      collapsedValue = false;
    }
    dispatch(setAppCollapsed(collapsedValue));
  };

  const MenuRender = (
    <>
      <AppLogo />
      <AppMenu isSidebar mode="inline" />
    </>
  );

  return (
    <>
      {(sidebarMode !== 'horizontal' || !responsive.sm) && (
        <>
          {responsive.sm ? (
            <Sider
              className="sidebar"
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
              width={210}
              placement="left"
              destroyOnClose={false}
              styles={{ body: { padding: 0, height: '100%' } }}
              closable={false}
              onClose={() => dispatch(setAppCollapsed(!collapsed))}
              open={!collapsed}
            >
              <div className="sidebar">{MenuRender}</div>
            </Drawer>
          )}
        </>
      )}
    </>
  );
});

export default Sidebar;
