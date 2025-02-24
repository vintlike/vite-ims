import SvgIcon from '@/components/SvgIcon';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAppLocale } from '@/store/modules/app';
import { Dropdown } from 'antd';
import { memo, useMemo } from 'react';
import type { LocaleType } from '@/locales';
import type { MenuProps } from 'antd';

const localeMenus: LabelValue[] = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' }
];

export const AppLocale = memo(() => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.app.locale);

  const items: MenuProps['items'] = useMemo(() => {
    return localeMenus.map((item) => ({
      label: `${item.label} (${item.value})`,
      key: item.value, // 菜单项务必填写 key
      disabled: locale === item.value
    }));
  }, [locale]);

  const menuChange: MenuProps['onClick'] = (info) => {
    dispatch(setAppLocale(info.key as LocaleType));
  };

  return (
    <Dropdown arrow menu={{ items, onClick: menuChange }} placement="bottom" trigger={['click']}>
      <span style={{ cursor: 'pointer' }}>
        {locale === 'zh-CN' ? <SvgIcon name="locales-cn" /> : <SvgIcon name="locales-en" />}
      </span>
    </Dropdown>
  );
});
