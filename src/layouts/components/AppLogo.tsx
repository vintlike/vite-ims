import logo from '@/assets/images/logo.png';
import { Image, theme } from 'antd';
import { memo } from 'react';
import './style.less';

export const AppLogo = memo(() => {
  const globalTheme = theme.useToken();

  return (
    <div className="app-logo">
      <div className="logo">
        <Image width={38} src={logo} preview={false} />
      </div>
      <div className="logo-title" style={{ color: globalTheme.token.colorText }}>
        xiaosiAdmin
      </div>
    </div>
  );
});
