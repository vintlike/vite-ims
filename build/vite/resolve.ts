import path from 'path';
import type { AliasOptions, ResolveOptions } from 'vite';

type TResolveOptions = ResolveOptions & { alias?: AliasOptions };

export function createViteResolve(dirname: string): TResolveOptions {
  const viteResolve: TResolveOptions = {
    // 引用别名配置
    alias: {
      // 配置@别名
      '@': `${path.resolve(dirname, 'src')}`,
      // 配置#别名
      '#': `${path.resolve(dirname, 'types')}`
    },
    // 导入时想要省略的扩展名列表。注意，不 建议忽略自定义导入类型的扩展名（例如：.vue），因为它会干扰 IDE 和类型支持。
    extensions: ['.cjs', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  };

  return viteResolve;
}
