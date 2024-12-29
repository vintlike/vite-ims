import viteSvgrPlugin from 'vite-plugin-svgr';

export function svgrPlugin() {
  return viteSvgrPlugin({
    svgrOptions: {
      icon: true
      // ...svgr options (https://react-svgr.com/docs/options/)
    }
  });
}
