import logo from '@/assets/images/logo.png';
import { LogoLayout } from '@/layouts/app/AppStyle';
import { Image, theme } from 'antd';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const AppLogo = memo(() => {
  const globalTheme = theme.useToken();
  const navigate = useNavigate();

  return (
    <LogoLayout className="logo">
      <div className="logo-pic">
        <Image width={38} src={logo} preview={false} onClick={() => navigate('/')} />
      </div>
      <div className="logo-title" style={{ color: globalTheme.token.colorText }}>
        xiaosiAdmin
      </div>
    </LogoLayout>
  );
});

export default AppLogo;
