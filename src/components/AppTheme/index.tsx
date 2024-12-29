import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAppThemeMode } from '@/store/modules/app';
import { theme } from 'antd';
import SvgIcon from '../SvgIcon';
import './index.less';

const AppTheme = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.app.themeMode);

  const globalTheme = theme.useToken();

  return (
    <div
      className={`app-theme cursor ${themeMode === 'dark' && 'app-theme-dark'}`}
      style={{ border: `1px solid ${globalTheme.token.colorBorder}` }}
      onClick={() => {
        dispatch(setAppThemeMode(themeMode === 'dark' ? 'light' : 'dark'));
      }}
    >
      <div className="theme-inner" style={{ backgroundColor: globalTheme.token.colorBorder }} />
      <SvgIcon name="sun" />
      <SvgIcon name="moon" />
    </div>
  );
};

export default AppTheme;
