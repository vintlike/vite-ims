import { merge } from 'lodash';
import type { RouteItem } from '@/router/RouteTypes';

export type ILocales = 'zh-CN' | 'en-US';

// 定义默认配置对象的类型
interface DefaultConfig {
  routes?: RouteItem[];
  locale?: {
    // 设置默认语言为中文
    default: ILocales;
  };
  theme?: {
    color?: string;
    fontSize?: number;
  };
}

const defaultLocale = 'zh-CN';
const defaultConfig: DefaultConfig = {
  locale: { default: defaultLocale },
  theme: {
    color: 'blue',
    fontSize: 14
  }
};

export function getConfig() {
  const customConfig: DefaultConfig = {};
  const mergedConfig: DefaultConfig = merge(defaultConfig, customConfig);

  return mergedConfig;
}

export function getLocale() {
  const storedLocale = localStorage.getItem('app-locale');
  const configLocale = getConfig()?.locale?.default;
  const navigatorLanguage = navigator.language;
  return storedLocale || configLocale || navigatorLanguage || defaultLocale;
}
