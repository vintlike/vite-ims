import css from '@emotion/react/dist/declarations/src/css';
import styled from '@emotion/styled';
import { Layout } from 'antd';

/**
 * 该文件只维护项目整体布局样式，不能随便修改本文件内容，以免页面布局错乱
 * App整体结构：
 * app (container)
 *   |-header
 *   |   |--header-head (logo)
 *   |   |--header-body (menu)
 *   |   |--header-foot (userinfo)
 *   |-main
 *   |   |--aside
 *   |   |    |---aside-head (aside menu title)
 *   |   |    |---aside-body (aside menu)
 *   |   |    |---aside-foot (aside toggle)
 *   |   |--content
 *   |   |    |---content-head (breadcrumb)
 *   |   |    |---content-body (route [section])
 *   |   |    |---content-foot (copyright)
 *   |-footer
 *   |   |--copyright
 *
 * App模块结构
 *
 * Section结构：
 * section (container)
 *   |-head (breadcrumb)
 *   |-main (table、form)
 *   |   |--aside (setting)
 *   |   |--content (table、form)
 *   |-foot (operate)
 *
 * App搜索表单
 *
 */

export const AutoCss = css`
  position: relative;
  margin: 0 auto;
`;

export const ContainerCss = css`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  ${AutoCss};
  min-height: 0;
  &.is-horizontal {
    flex-direction: row;
  }
`;

export const HeaderCss = css`
  display: flex;
  flex-direction: row;
  ${AutoCss};
  width: 100%;
`;

export const MainCss = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  ${AutoCss};
  width: 100%;

  &.is-horizontal {
    flex-direction: row;
  }
`;

export const FooterCss = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${AutoCss};
  width: 100%;
`;

export const SiderCss = css`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  width: 200px;
  overflow: hidden;
  /* box-shadow: inset -1px 0 1px rgba(0, 0, 0, 0.06); */
  background-color: #fff;
`;

export const ContentCss = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  position: relative;
`;

export const ContentHeadCss = css`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

export const ContentFootCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentBodyCss = css`
  display: flex;
  flex: auto;
  flex-direction: column;
  /* flex-basis: 0; */
  position: relative;
  width: 100%;
`;

export const ContainerLayout = styled(Layout)`
  ${ContainerCss};
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const HeaderLayout = styled(Layout.Header)`
  ${HeaderCss};
  padding: 0 20px;
  background-color: #415fff;

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
`;

export const MainLayout = styled(Layout)`
  ${MainCss};
`;
export const ContentLayout = styled(Layout.Content)`
  ${ContentCss};
`;

export const ContentHeadLayout = styled.div`
  ${ContentHeadCss};
`;

export const ContentBodyLayout = styled.div`
  ${ContentBodyCss};
  overflow-y: auto;
  overflow-x: hidden;
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
`;

export const SiderBodyLayout = styled.div`
  ${ContentBodyCss};
  overflow-y: auto;
  overflow-x: hidden;
`;

export const SiderFootLayout = styled.div`
  ${ContentFootCss}
  height:40px;

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
