import { Layout, theme } from 'antd';
import React from 'react';

import AppHeader from './components/AppHeader/AppHeader';
import AppMain from './components/AppMain/AppMain';
import SidebarInline from './components/Sidebar/SidebarInline';
import './index.less';

const { Footer } = Layout;

const LayoutApp: React.FC = () => {
  const globalTheme = theme.useToken();

  return (
    <div className="layout flex" style={{ color: globalTheme.token.colorText }}>
      <SidebarInline />
      <Layout>
        <AppHeader />
        <AppMain />
        <Footer style={{ textAlign: 'center', padding: 14 }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </div>
  );
};

// const LayoutApp: React.FC = () => {
//   return (
//     <>
//       <ContainerLayout className="app-container" style={{ width: 1200 }}>
//         <HeaderLayout className="app-header">
//           <HeaderHeadLayout className="app-header-head">header head</HeaderHeadLayout>
//           <HeaderBodyLayout className="app-header-body">header body</HeaderBodyLayout>
//           <HeaderFootLayout className="app-header-foot">header foot</HeaderFootLayout>
//         </HeaderLayout>
//         <MainLayout className="app-main is-horizontal">
//           <SiderLayout className="app-sider">
//             <SiderHeadLayout className="app-sider-head">Sider head</SiderHeadLayout>
//             <SiderBodyLayout className="app-sider-body">Sider body</SiderBodyLayout>
//             <SiderFootLayout className="app-sider-foot">Sider foot</SiderFootLayout>
//           </SiderLayout>
//           <ContentLayout className="app-content">
//             <ContentHeadLayout className="app-content-head">content head</ContentHeadLayout>
//             <ContentBodyLayout className="app-content-body">content body</ContentBodyLayout>
//             <ContentFootLayout className="app-content-foot">content foot</ContentFootLayout>
//           </ContentLayout>
//         </MainLayout>
//         <FooterLayout className="app-footer">footer</FooterLayout>
//       </ContainerLayout>

//       <ContainerLayout className="app-container  is-horizontal" style={{ width: 1200 }}>
//         <SiderLayout className="app-sider">
//           <SiderHeadLayout className="app-sider-head">Sider head</SiderHeadLayout>
//           <SiderBodyLayout className="app-sider-body">Sider body</SiderBodyLayout>
//           <SiderFootLayout className="app-sider-foot">Sider foot</SiderFootLayout>
//         </SiderLayout>

//         <ContainerLayout className="app-main">
//           <HeaderLayout className="app-header">
//             <HeaderHeadLayout className="app-header-head">header head</HeaderHeadLayout>
//             <HeaderBodyLayout className="app-header-body">header body</HeaderBodyLayout>
//             <HeaderFootLayout className="app-header-foot">header foot</HeaderFootLayout>
//           </HeaderLayout>
//           <ContentLayout className="app-content">
//             <ContentHeadLayout className="app-content-head">content head</ContentHeadLayout>
//             <ContentBodyLayout className="app-content-body">content body</ContentBodyLayout>
//             <ContentFootLayout className="app-content-foot">content foot</ContentFootLayout>
//           </ContentLayout>
//         </ContainerLayout>
//         <FooterLayout className="app-footer">footer</FooterLayout>
//       </ContainerLayout>
//     </>
//   );
// };

export default LayoutApp;
