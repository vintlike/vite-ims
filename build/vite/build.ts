import type { BuildOptions } from 'vite';

export function createViteBuild(): BuildOptions {
  const viteBuild = {
    // 指定输出路径
    outDir: 'dist',
    // 指定生成静态资源的存放路径，从生成的资源覆写 filename 或 chunkFilename 时，assetsDir 会被忽略
    assetsDir: 'static',
    // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
    assetsInlineLimit: 4096,
    // 启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在块加载时插入 如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
    cssCodeSplit: true,
    // 构建后是否生成 source map 文件。
    sourcemap: false,
    // 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
    brotliSize: false,
    // 浏览器兼容性  "esnext"|"modules"
    target: 'modules',
    // 设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器: boolean | 'terser' | 'esbuild'
    minify: false,
    // 当设置为 true，构建后将会生成 manifest.json 文件
    manifest: false,
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true
      }
    },
    // chunk 大小警告的限制（以 kbs 为单位）
    chunkSizeWarningLimit: 2000,
    cssTarget: 'chrome80',

    // 取消计算文件大小，加快打包速度
    reportCompressedSize: false,
    // 自定义底层的 Rollup 打包配置
    rollupOptions: {
      // output: {
      //   chunkFileNames: 'js/[name]-[hash].js',
      //   entryFileNames: 'js/[name]-[hash].js',
      //   assetFileNames: '[ext]/[name]-[hash].[ext]',
      // },

      // external: ['moment', 'video.js', 'jspdf', 'xlsx'],
      plugins: []
    },
    // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
    emptyOutDir: true
  };
  return viteBuild;
}
