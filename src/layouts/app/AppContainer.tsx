import { Layout, theme } from 'antd';
import React, { memo } from 'react';

import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import AppMain from './AppMain';
import AppSider from './AppSider';

const AppContainer = memo(() => {
  const globalTheme = theme.useToken();

  return (
    <Layout className="app-container" style={{ color: globalTheme.token.colorText }}>
      <AppSider />
      <Layout>
        <AppHeader />
        <AppMain />
        <AppFooter />
      </Layout>
    </Layout>
  );
});

export default AppContainer;
