import { Layout, Menu } from 'antd';
import styled from 'styled-components';

export const LogoLayout = styled.div`
  &.logo {
    display: flex;
    align-items: center;
    .logo-pic {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 50px;
    }

    .logo-title {
      flex: 1;
      transition: all 0.5s;
      width: 100%;
      overflow: hidden;
      color: #000;
      font-weight: 500;
      font-size: 22px;
    }
  }
`;

export const AccountLayout = styled.div`
  display: flex;
  align-items: center;
  .wave {
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 50%;

    .ant-image {
      display: flex;
    }
  }
`;

export const ContainerLayout = styled(Layout)`
  ${ContainerCss};
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const HeaderLayout = styled(Layout.Header)`
  ${HeaderCss};
  height: 50px;
  line-height: 50px;
  padding: 0 20px;

  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const HeaderHeadLayout = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
export const HeaderFootLayout = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
export const HeaderBodyLayout = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
`;

export const FooterLayout = styled(Layout.Footer)`
  ${FooterCss};
  padding: 0 20px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06);
`;

export const MainLayout = styled(Layout.Content)`
  ${MainCss};
`;

export const ContentLayout = styled.div`
  ${ContentCss};
  overflow: auto;
`;

export const ContentHeadLayout = styled.div`
  ${ContentHeadCss};
`;

export const ContentBodyLayout = styled.div`
  ${ContentBodyCss};
  /* overflow-y: auto;
  overflow-x: hidden; */
`;

export const ContentFootLayout = styled.div`
  ${ContentFootCss};
`;

export const SiderLayout = styled(Layout.Sider)`
  ${SiderCss};

  .ant-layout-sider-children {
    ${MainCss};
  }
`;

export const SiderHeadLayout = styled.div`
  ${ContentHeadCss};
  padding: 23px 24px 13px;
  box-shadow: inset 0 -1px 0 #f0f0f0;
`;

export const SiderBodyLayout = styled.div`
  ${ContentBodyCss};
  overflow-y: auto;
  overflow-x: hidden;
`;

export const SiderFootLayout = styled.div`
  ${ContentFootCss}
  height:40px;
  box-shadow: inset 0 1px 0 #f0f0f0;

  .trigger {
    padding: 10px;
    line-height: 18px;
    font-size: 16px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: var(--primary-color);
    }
  }
`;

export const SiderTitle = styled.div`
  display: flex;
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
  color: #415fff;
`;

/** 菜单样式 */
export const MenuLayout = styled(Menu)`
  width: 100%;
  &.ant-menu {
    background: transparent;
    border: none;

    &.ant-menu-horizontal:not(.ant-menu-dark) {
      .ant-menu-item:hover,
      .ant-menu-item-active,
      .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
      .ant-menu-submenu-active,
      .ant-menu-submenu-title:hover {
        color: var(--white-color);
      }

      .ant-menu-item,
      .ant-menu-submenu,
      .ant-menu-submenu-title,
      .ant-menu-item-active,
      .ant-menu-submenu-active,
      .ant-menu-item-open,
      .ant-menu-submenu-open,
      .ant-menu-item-selected,
      .ant-menu-submenu-selected {
        position: relative;
        color: var(--white-color);
        border-bottom: none;
        background: none;
        filter: none;

        &::after {
          content: '';
          position: absolute;
          top: auto;

          bottom: 8px;

          // 从左向右
          left: 20px;
          right: 20px;
          max-width: 100%;
          opacity: 1;
          filter: alpha(opacity=100);
          border-radius: 2px;
          border-bottom: 2px solid var(--white-color);
          transform: scaleX(0);
          transition: transform 0.5s;
          transform-origin: 100% 0;
        }
      }

      > .ant-menu-item:hover,
      > .ant-menu-submenu:hover,
      > .ant-menu-submenu-title:hover,
      > .ant-menu-item-active,
      > .ant-menu-submenu-active,
      > .ant-menu-item-open,
      > .ant-menu-submenu-open,
      > .ant-menu-item-selected,
      > .ant-menu-submenu-selected {
        color: var(--white-color);
        &::after {
          z-index: 3;
          transform: scaleX(1);
          transform-origin: 0 0;
        }
      }
    }

    &.ant-menu-inline:not(.ant-menu-dark) {
      border-inline-end: none;
      .ant-menu-item,
      .ant-menu-submenu-title {
        width: calc(100% + 1px);
        margin-inline: 0;
        margin-block: 0;
        border-radius: 0;
      }

      .ant-menu-item::after {
        border-inline-end-width: 3px;
      }
    }
  }
`;
