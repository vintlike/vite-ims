import { memo } from 'react';
import { Copyright } from '../components/Copyright';
import { FooterLayout } from './AppStyle';

const AppFooter = memo(() => {
  return (
    <FooterLayout className="app-footer">
      <Copyright />
    </FooterLayout>
  );
});

export default AppFooter;
