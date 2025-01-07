import { memo } from 'react';
import { FooterLayout } from './AppStyle';
import { Copyright } from './components/Copyright';

const AppFooter = memo(() => {
  return (
    <FooterLayout className="app-footer">
      <Copyright />
    </FooterLayout>
  );
});

export default AppFooter;
