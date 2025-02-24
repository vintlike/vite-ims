import { useAppSelector } from '@/store/hooks';
import { useResponsive } from 'ahooks';
import { Layout, Space, theme } from 'antd';
import { memo } from 'react';
import { shallowEqual } from 'react-redux';
import { AppAccount } from './components/AppAccout';
import { AppLocale } from './components/AppLocal';
import { AppLogo } from './components/AppLogo';
import { AppTheme } from './components/AppTheme';
import { CollapsedSwitch } from './components/CollapsedSwitch';
import Setting from './components/Setting';
import NavSidebar from './components/Sidebar/NavSidebar';

const AppHeader = memo(() => {
  const { sidebarMode } = useAppSelector(
    (state) => ({
      collapsed: state.app.collapsed,
      sidebarMode: state.app.sidebarMode
    }),
    shallowEqual
  );
  const globalTheme = theme.useToken();
  const responsive = useResponsive();

  const render = () => {
    return (
      <Layout.Header
        className="layout-header"
        style={{
          height: 60,
          lineHeight: '60px',
          backgroundColor: globalTheme.token.colorBgContainer,
          boxShadow: `inset 0 -1px 1px ${globalTheme.token.colorBorder}`
        }}
      >
        <div className="layout-content is-horizontal">
          {(sidebarMode !== 'blend' || !responsive.sm) && (
            <div className="layout-content-head">
              {(sidebarMode === 'vertical' || !responsive.sm) && <CollapsedSwitch />}
              {sidebarMode === 'horizontal' && responsive.sm && <AppLogo />}
            </div>
          )}
          <div className="layout-content-body">
            {sidebarMode !== 'vertical' && responsive.sm ? <NavSidebar /> : null}
          </div>

          <div className="layout-content-foot">
            <Space size={10}>
              <AppLocale />
              <Setting />
              <AppTheme />
              <AppAccount />
            </Space>
          </div>
        </div>
      </Layout.Header>
    );
  };

  return render();
});

export default AppHeader;
