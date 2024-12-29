import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
// import react from '@vitejs/plugin-react-swc';
import type { ConfigEnv, PluginOption } from 'vite';
import { mockPlugin } from './plugins/mockPlugin';
import { svgIconsPlugin } from './plugins/svgIconsPlugin';
import { svgrPlugin } from './plugins/svgrPlugin';

export function createVitePlugins(_isBuild = false, _configEnv: ConfigEnv) {
  const vitePlugins: PluginOption[] = [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    }),
    UnoCSS(),
    svgIconsPlugin(),
    svgrPlugin(),
    mockPlugin()
  ];

  return vitePlugins;
}
