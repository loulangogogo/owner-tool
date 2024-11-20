import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true, // 将类型入口插入 package.json
      outDir: 'dist/types', // 输出目录
    }),
  ],
  build: {
    lib: {
      entry: './lib/index.ts',
      name: 'owner',
      fileName: 'owner',
      // fileName: (format) => `owner.${format}.js`,
      // es：ES Module，用于现代打包工具（如 Webpack 和 Rollup）。
      // cjs：CommonJS，用于 Node.js 环境。
      // umd：UMD 格式，兼容 CommonJS 和浏览器。
      // system：是一种模块格式，全称为 SystemJS 模块格式，是由 SystemJS 加载器支持的模块格式，通常用于在浏览器中动态加载模块，尤其是在一些老旧浏览器或非模块化环境中加载 ES 模块
      // iife：立即执行函数，用于直接在浏览器中加载。
      formats: ['es','system','iife','cjs','umd']
    }
  }
})
