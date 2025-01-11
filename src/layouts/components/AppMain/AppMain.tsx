import LayoutSpin from '@/components/LayoutSpin';
import { Layout } from 'antd';
import { KeepAlive, useKeepAliveRef } from 'keepalive-for-react';
import { memo, Suspense, useMemo } from 'react';
import { useLocation, useOutlet } from 'react-router';
import TabsPage from './TabsPage';

const { Content } = Layout;

const AppMain = memo(() => {
  const location = useLocation();
  const maxLen = 10;
  const aliveRef = useKeepAliveRef();

  const activeCacheKey = useMemo(() => {
    return location.pathname + location.search;
  }, [location.pathname, location.search]);

  const outlet = useOutlet();

  return (
    <Content className="layout-main">
      <KeepAlive aliveRef={aliveRef} activeCacheKey={activeCacheKey} exclude={[/^\/refresh\//]} max={maxLen}>
        <div className="layout-content">
          <div className="layout-content-head">
            <TabsPage maxLen={maxLen} />
          </div>
          <div className="layout-content-body" style={{ padding: 20 }}>
            <Suspense fallback={<LayoutSpin />}>{outlet}</Suspense>
          </div>
        </div>
      </KeepAlive>
    </Content>
  );
});

export default AppMain;
