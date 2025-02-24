import LayoutSpin from '@/components/LayoutSpin';
import { ContentBodyLayout, ContentHeadLayout, ContentLayout, MainLayout } from '@/layouts/app/AppStyle';
import { memo, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { KeepAlive } from '../components/AppMain/KeepAlive';
import TabsPage from '../components/AppMain/TabsPage';

const AppMain = memo(() => {
  const isKeepAlive = import.meta.env.VITE_KEY_ALIVE === 'TRUE';
  const maxLen = 10;

  return (
    <MainLayout>
      <ContentLayout>
        <ContentHeadLayout>
          <TabsPage maxLen={maxLen} />
        </ContentHeadLayout>
        <ContentBodyLayout>
          {isKeepAlive ? (
            <KeepAlive maxLen={maxLen} />
          ) : (
            <Suspense fallback={<LayoutSpin />}>
              <Outlet />
            </Suspense>
          )}
        </ContentBodyLayout>
      </ContentLayout>
    </MainLayout>
  );
});

export default AppMain;
