/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
import { vitePluginFakeServer } from 'vite-plugin-fake-server';

export function mockPlugin() {
  return vitePluginFakeServer({
    logger: false,
    include: 'mock',
    infixName: false,
    enableProd: true
  });
}
