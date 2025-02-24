import avatar from '@/assets/images/avatar.png';
import { initAsyncRoute } from '@/router/RouteUtil';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPower, setSignOut } from '@/store/modules/user';
import { removeStorage } from '@/utils/storage';
import { Avatar, Dropdown } from 'antd';
import { useNavigate } from 'react-router';
import type { MenuProps } from 'antd';
import './style.less';

const accountMenus: LabelValue<number | string>[] = [
  { label: '角色', value: 'role' },
  { label: '退出登录', value: 'logout' }
];

export const AppAccount = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const power = useAppSelector((state) => state.user.power);

  const setCount = async () => {
    const newPower = power === 'admin' ? 'test' : 'admin';
    dispatch(setPower(newPower));
    initAsyncRoute(newPower);
  };

  const items: MenuProps['items'] = accountMenus.map((item) => ({
    label: `${item.label} ${item.value === 'role' ? `(${power})` : ''}`,
    key: item?.key ?? item.value // 菜单项务必填写 key
  }));

  const menuChange: MenuProps['onClick'] = (e) => {
    const key = e.key;

    if (key === 'role') {
      setCount();
    } else {
      removeStorage('userInfo');
      dispatch(setSignOut());

      navigate('/login');
    }
  };

  return (
    <div className="app-account">
      <Dropdown
        menu={{
          items,
          onClick: menuChange
        }}
        placement="bottom"
      >
        <Avatar size="large" src={avatar} />
      </Dropdown>
    </div>
  );
};
