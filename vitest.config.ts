import { defineConfig } from 'vitest/config';

export default defineConfig({
  // vitest 测试配置
  test: {
    // npx vitest --coverage
    // npx vitest --watch
    // npx vitest
    // npx vitest [file]    
    globals: true,
    environment: 'node',
    include: ['test*/**/*.test.ts'], // 指定测试文件目录
  },
});