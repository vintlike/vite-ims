import App from '@/App';
import store, { persistor } from '@/store';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '@/assets/css/app.less';
import 'virtual:svg-icons-register';
import 'virtual:uno.css';
/** https://ant.design/docs/react/v5-for-19-cn */
import '@ant-design/v5-patch-for-react-19';

createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  // </React.StrictMode>,
);
