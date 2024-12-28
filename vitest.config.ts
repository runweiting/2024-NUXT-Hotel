import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    globals: true, // 啟用全域 API（如 describe、it 等）
    environment: 'node', // 整合測試使用 Node.js 環境、測試 DOM 使用 JSDOM 模擬瀏覽器
    deps: {
      interopDefault: true // 允許混合 CJS 和 ESM 模組
    },
    reporters: 'default', // 顯示測試報告
    coverage: {
      provider: 'v8', // 使用 v8 引擎提供測試覆蓋率
      reporter: ['text', 'html'] // 顯示文字和 HTML 的覆蓋率報告
    },
    setupFiles: './tests/setup/vitest.setup.ts', // 設定額外初始化檔案
    testTimeout: 10000 // 設定測試超時（例如 10 秒）
  }
})
