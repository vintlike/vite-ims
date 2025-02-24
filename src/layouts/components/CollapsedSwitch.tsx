import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAppCollapsed } from '@/store/modules/app';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { memo } from 'react';
import { shallowEqual } from 'react-redux';
import './style.less';

export const CollapsedSwitch = memo(() => {
  const dispatch = useAppDispatch();
  const { collapsed } = useAppSelector(
    (state) => ({
      collapsed: state.app.collapsed,
      sidebarMode: state.app.sidebarMode
    }),
    shallowEqual
  );

  const render = () => {
    return (
      <div
        className="collapsed-switch"
        onClick={() => {
          dispatch(setAppCollapsed(!collapsed));
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
    );
  };

  return render();
});
