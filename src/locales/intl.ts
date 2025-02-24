import { getLocale } from '@/utils/ConfigUtil';
import { createIntl, createIntlCache } from 'react-intl';
import en_US from './en_US';
import zh_CN from './zh_CN';

export type ILocales = 'zh-CN' | 'en-US';

type MessageIds = FormatjsIntl.Message extends {
  ids: infer T;
}
  ? T extends string
    ? T
    : string
  : string;
export declare interface MessageDescriptor {
  id?: MessageIds;
  description?: string | object;
  defaultMessage?: string;
}
type PrimitiveType = string | number | boolean | null | undefined | Date;
type FormatXMLElementFn<T, R = string | T | (string | T)[]> = (parts: Array<string | T>) => R;

// 获取存储在本地语言
function loadLocale(lang?: ILocales) {
  let locale = null;
  let messages = null;

  switch (lang) {
    case 'en-US':
      locale = 'en-US';
      messages = en_US;
      break;
    default:
      locale = 'zh-CN';
      messages = zh_CN;
      break;
  }

  return { locale, messages } as any;
}

// 获取当前默认或已设置的语言
const lang = localStorage.getItem('umi_locale') ?? navigator.language;

// 在组件中使用没有问题，但是在非组件中（例如Store）如何使用呢？react-intl提供了方法在非组件环境创建intl对象
// createIntlCache创建一个缓存实例以供跨语言环境全局使用
const cache = createIntlCache();

// createIntl则可以创建一个intl对象供全局使用
const intl = createIntl(loadLocale(lang as ILocales), cache);

// 翻译方法别名
const i18n = intl.formatMessage;

export const translate = (
  descriptor: MessageDescriptor,
  values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>
): string | React.ReactNode[] | React.ReactNode => {
  return intl.formatMessage(descriptor, values);
};

/**
 * 适用于表单select简单单一的格式化placeholder
 * 部分下拉组件显示'请选择'，则参数name可不传，避免页面报错
 * select: 请选择
 * e.g. 请选择素材
 */
const pleaseSelect = (name: string = '') => {
  return i18n({ id: 'msg.pleaseSelect' }, { name });
};
/**
 * 适用于表单input简单单一的格式化placeholder
 * enter：请输入
 * e.g. 请输入素材名称
 */
const pleaseEnter = (name: string = '') => {
  return i18n({ id: 'msg.pleaseEnter' }, { name });
};

const showErrorMessage = (res: Res) => {
  return getLocale() === 'en-US' ? res?.enMessage : res?.message;
};

export { i18n as il8n, intl, pleaseEnter, pleaseSelect, showErrorMessage };
