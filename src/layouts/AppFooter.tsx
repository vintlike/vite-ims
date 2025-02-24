import { Layout, theme } from 'antd';
import { memo } from 'react';
import { Copyright } from './components/Copyright';

const AppFooter = memo(() => {
  const globalTheme = theme.useToken();

  return (
    <Layout.Footer className="layout-footer" style={{ boxShadow: `inset 0 1px 1px ${globalTheme.token.colorBorder}` }}>
      <Copyright />
    </Layout.Footer>
  );
});

export default AppFooter;
