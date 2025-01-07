import AppLocale from '@/components/AppLocale';
import AppTheme from '@/components/AppTheme';
import AppMenu from '@/layouts/app/components/AppMenu';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAppCollapsed } from '@/store/modules/app';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useResponsive } from 'ahooks';
import { Space, theme } from 'antd';
import { memo } from 'react';
import { shallowEqual } from 'react-redux';
import Setting from '../components/Setting';
import { HeaderBodyLayout, HeaderFootLayout, HeaderHeadLayout, HeaderLayout } from './AppStyle';
import AppAccount from './components/AppAccount';
import AppLogo from './components/AppLogo';

const AppHeader = memo(() => {
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

  return (
    <HeaderLayout
      style={{
        backgroundColor: globalTheme.token.colorBgContainer,
        borderBottom: `1px solid ${globalTheme.token.colorBorder}`
      }}
    >
      {(sidebarMode !== 'blend' || !responsive.sm) && (
        <HeaderHeadLayout>
          {(sidebarMode === 'vertical' || !responsive.sm) && (
            <div
              className="layout-header-collapsed"
              onClick={() => {
                dispatch(setAppCollapsed(!collapsed));
              }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          )}
          {sidebarMode === 'horizontal' && responsive.sm && <AppLogo />}
        </HeaderHeadLayout>
      )}
      <HeaderBodyLayout>{sidebarMode !== 'vertical' && responsive.sm ? <AppMenu /> : null}</HeaderBodyLayout>

      <HeaderFootLayout>
        <Space size={10}>
          <AppTheme />
          <AppLocale />
          <AppAccount />
          <Setting />
        </Space>
      </HeaderFootLayout>
    </HeaderLayout>
  );
});

export default AppHeader;
