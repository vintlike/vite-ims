import avatar from '@/assets/images/avatar.png';
import { AccountLayout } from '@/layouts/app/AppStyle';
import { useAppDispatch } from '@/store/hooks';
import { setSignOut } from '@/store/modules/user';
import { removeStorage } from '@/utils/storage';
import { Dropdown, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';

const AppAccount = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '退出登录'
    }
  ];

  const menuChange: MenuProps['onClick'] = (_e) => {
    removeStorage('userInfo');
    dispatch(setSignOut());

    navigate('/login');
  };

  return (
    <AccountLayout className="cursor">
      <Dropdown
        menu={{
          items,
          onClick: menuChange
        }}
        placement="bottom"
        arrow
      >
        <div className="wave">
          <Image src={avatar} width={30} preview={false} />
        </div>
      </Dropdown>
    </AccountLayout>
  );
};

export default AppAccount;
