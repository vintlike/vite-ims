import { Layout, theme } from 'antd';
import React, { memo } from 'react';

import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import AppMain from './AppMain';
import AppSider from './AppSider';
import { ContainerLayout } from './AppStyle';

const AppContainer = memo(() => {
  const globalTheme = theme.useToken();

  return (
    <ContainerLayout className="app-container" style={{ color: globalTheme.token.colorText }}>
      <AppSider />
      <Layout>
        <AppHeader />
        <AppMain />
        <AppFooter />
      </Layout>
    </ContainerLayout>
  );
});

export default AppContainer;
