import styled, { css } from 'styled-components';

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

export const ContainerCss = css`
  display: flex;
  flex: auto;
  flex-direction: column;
  position: relative;
  min-width: 0;
  min-height: 0;
  margin: 0 auto;

  &.is-horizontal {
    flex-direction: row;
  }

  &.is-vertical {
    flex-direction: column;
  }

  &.is-abs {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;

export const HeaderCss = css`
  display: flex;
  flex-direction: row;
  flex: 0 0 auto;

  position: relative;
`;

export const MainCss = css`
  display: flex;
  flex: auto;
  flex-direction: column;
  position: relative;
  min-height: 0;

  &.is-horizontal {
    flex-direction: row;
  }
`;

export const FooterCss = css`
  display: flex;
  flex-direction: row;
  flex: 0 0 auto;

  position: relative;
`;

export const SiderCss = css`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  width: 200px;
  min-width: 0;
  overflow: hidden;

  transition: all 0.2s;
  /* box-shadow: inset -1px 0 1px rgba(0, 0, 0, 0.06); */
`;

export const ContentCss = css`
  display: flex;
  flex: auto;
  flex-direction: column;
  position: relative;
  min-height: 0;
`;

export const ContentHeadCss = css`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ContentFootCss = css`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ContentBodyCss = css`
  display: flex;
  flex: auto;
  flex-direction: column;

  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const ContainerLayout = styled.section`
  ${ContainerCss};
`;

export const HeaderLayout = styled.header`
  ${HeaderCss};

  position: sticky;
  top: 0;
  z-index: 1;

  box-shadow: inset 0 -1px 0 #f0f0f0;
`;

export const HeaderHeadLayout = styled.div`
  ${ContentHeadCss};
  width: 200px;
`;
export const HeaderBodyLayout = styled.div`
  ${ContentBodyCss};
`;
export const HeaderFootLayout = styled.div`
  ${ContentFootCss};
`;

export const MainLayout = styled.main`
  ${MainCss};
`;

export const FooterLayout = styled.footer`
  ${FooterCss};
  box-shadow: inset 0 1px 0 #f0f0f0;
`;

/**
 * 侧边栏
 */
export const SiderLayout = styled.aside`
  ${SiderCss};

  overflow: hidden;
`;

export const SiderHeadLayout = styled.div`
  ${ContentHeadCss};
`;

export const SiderBodyLayout = styled.div`
  ${ContentBodyCss};
`;

export const SiderFootLayout = styled.div`
  ${ContentFootCss}
`;

/**
 * 内容区域
 */
export const ContentLayout = styled.section`
  ${ContentCss};
  overflow: hidden;
`;

export const ContentHeadLayout = styled.div`
  ${ContentHeadCss};
`;

export const ContentBodyLayout = styled.div`
  ${ContentBodyCss};
`;

export const ContentFootLayout = styled.div`
  ${ContentFootCss};
`;
