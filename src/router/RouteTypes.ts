import type { ItemType, MenuItemType } from 'antd/es/menu/interface';
import type React from 'react';
// import type { KeepAliveProps } from 'react-activation';
import type { Location, NavigateOptions, RouteObject } from 'react-router-dom';

type Merge<M, N> = Omit<MenuItemType, Extract<keyof M, keyof N>> & N;
/** 菜单 */
export type MenuProps = Merge<
  ItemType<MenuItemType>,
  {
    type?: 'group';
  }
>;

export interface ITo {
  to: string;
  options?: NavigateOptions;
}

export type RouteLoader = (res: any, redirectUrl: string) => boolean;

export type RouteBeforeLoad = (to: ITo, location?: Location) => boolean;

/** 路由跳转类型 */
export type IRouteRedirect = string | ITo;

/**
 * 菜单配置信息
 * 可以通过 import { MenuDataItem } from '@ant-design/pro-components' 来获取这个类型
 */
export interface MenuItem {
  /** 用于标定选中的值，默认是 path */
  key?: React.Key;

  /** 菜单项标题或分组标题 */
  label: React.ReactNode;

  /** 页面标题，默认是 label */
  title?: React.ReactNode;
  /** 菜单的icon */
  icon?: React.ReactNode;
  /** disable 菜单选项 */
  disabled?: boolean;

  /** 菜单分组类型 */
  type?: 'group' | 'divider' | 'separator';
  /** 菜单分组类型为divider时有效*/
  dashed?: boolean;
  /** 指定外链打开形式，同a标签 */
  target?: '_blank' | '_self' | '_parent' | '_top';

  whiteList?: boolean;
  hideSidebar?: boolean;
  // 是否隐藏标签
  hideTabs?: boolean;

  children?: MenuItem[];
}

/** 路由配置属性定义 */
export type RouteItem = Omit<RouteObject, 'children'> & {
  /** 是否默认显示页面，设置了index时不可以配置path，两者不能同时存在 */
  // index?: boolean;
  /** 路径,可以设定为网页链接 */
  // path?: string;
  /** react-router-dom v6路由组件 */
  // element?: React.ReactNode | null;
  // errorElement?: React.ReactNode | null;

  /** 在菜单中隐藏自己和子节点 */
  hideInMenu?: boolean;
  /** 在菜单中隐藏子节点 */
  hideChildrenInMenu?: boolean;
  /** 在侧边栏隐藏子节点 */
  hideChildrenInSider?: boolean;
  /** 在面包屑中隐藏 */
  hideInBreadcrumb?: boolean;
  /** 隐藏自己，并且将子节点提升到与自己平级 */
  flatMenu?: boolean;

  /**
   * 当此节点被选中的时候也会选中 parentKeys 的节点
   * 自定义父节点
   */
  parentKeys?: string[];
  /** 自定义菜单的国际化 key */
  locale?: string | false;

  /** 父级路径 */
  parentPath?: string;
  /** 权限配置，需要与 plugin-access 插件配合使用 */
  access?: string;
  /** 是否展示侧边栏菜单 */
  showSider?: boolean;
  /** 是否需要支持keepAlive */
  // keepAlive?: Partial<KeepAliveProps>;
  /** 是否需要验证登录 */
  auth?: boolean;

  /** 路由跳转 */
  redirect?: IRouteRedirect;
  alwaysShow?: boolean;
  meta?: MenuItem;

  /** 子菜单 */
  children?: RouteItem[];
};

export interface AsyncRouteType {
  path: string;
  id: string;
  children: AsyncRouteType[];
}
