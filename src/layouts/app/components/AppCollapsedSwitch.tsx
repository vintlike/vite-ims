import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAppCollapsed } from '@/store/modules/appReducer';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { shallowEqual } from 'react-redux';

export const AppCollapsedSwitch: React.FC = () => {
  const dispatch = useAppDispatch();
  const { collapsed } = useAppSelector(
    (state) => ({
      collapsed: state.app.collapsed
    }),
    shallowEqual
  );

  return (
    <div
      className="app-collapsed"
      onClick={() => {
        dispatch(setAppCollapsed(!collapsed));
      }}
      style={{ cursor: 'pointer' }}
    >
      {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </div>
  );
};
