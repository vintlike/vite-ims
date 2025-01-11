import SvgIcon from '@/components/SvgIcon';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAppThemeMode } from '@/store/modules/app';
import { Switch, theme } from 'antd';

export const AppTheme = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.app.themeMode);
  const globalTheme = theme.useToken();

  return (
    <Switch
      checkedChildren={<SvgIcon name="sun" />}
      unCheckedChildren={<SvgIcon name="moon" />}
      defaultChecked={themeMode === 'light'}
      onChange={() => {
        dispatch(setAppThemeMode(themeMode === 'dark' ? 'light' : 'dark'));
      }}
      style={{ backgroundColor: globalTheme.token.colorBorder }}
    />
  );
};
