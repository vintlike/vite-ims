import { Layout, theme } from 'antd';
import React from 'react';

import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import AppMain from './components/AppMain/AppMain';
import AppSider from './components/AppSider/AppSider';
import './layout.less';

const LayoutApp: React.FC = () => {
  const globalTheme = theme.useToken();

  return (
    <Layout className="layout" style={{ color: globalTheme.token.colorText }}>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppMain />
      </Layout>
      <AppFooter />
    </Layout>
  );
};

export default LayoutApp;
