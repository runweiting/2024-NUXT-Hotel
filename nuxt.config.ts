// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 1. 基礎與兼容性配置
  compatibilityDate: '2024-11-01',
  // 2. 開發工具
  devtools: { enabled: true },
  // 3. 類型檢查
  typescript: {
    typeCheck: process.env.NODE_ENV === 'development',
    shim: false
  },
  // 4. 導入配置
  imports: {
    dirs: ['stores', 'composables']
  },
  // 5. alias 別名配置
  alias: {
    '~/': './',
    '@': './'
  },
  // 6. CSS 樣式
  css: [
    '~/assets/css/tailwind.css',
    'vue-final-modal/style.css',
    'sweetalert2/dist/sweetalert2.min.css'
  ],
  // 7. 模組配置
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-anchorscroll',
    'nuxt-icon-tw',
    'vue3-carousel-nuxt',
    '@nuxt/image',
    '@samk-dev/nuxt-vcalendar',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    ['@vee-validate/nuxt', { autoImports: true }]
  ],
  // 8. 應用配置
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL,
    pageTransition: { name: 'page', mode: 'out-in' },
    // 全站基礎設定
    head: {
      htmlAttrs: {
        lang: 'zh-TW'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'HexHotel | 六角飯店',
      // 全站預設 meta 標籤
      meta: [
        // 安全性和性能相關 meta
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' }, // 告訴 IE 使用 edge
        { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' }, // 防止瀏覽器猜測 MIME 類型
        { 'http-equiv': 'Cache-control', content: 'public, max-age=604800' },
        { 'http-equiv': 'Permissions-Policy', content: 'interest-cohort=()' }, // 禁用 FLoC
        { name: 'format-detection', content: 'telephone=no' }, // 防止自動偵測電話號碼

        // SEO 相關
        {
          name: 'description',
          content:
            '六角飯店位於高雄，提供頂級的住宿體驗。享受絕美市景與高級設施，讓您的每一刻都充滿奢華與舒適。立即預訂，開啟難忘的住宿之旅！'
        },
        {
          name: 'keywords',
          content: 'HexHotel,HexHotel 訂房,高雄旅遊,訂房,住宿,住宿預訂,四人房,雙人房,景觀房'
        },
        { name: 'author', content: '六角飯店' }, // 指定網頁的作者或擁有者
        { name: 'robots', content: 'index, follow' }, // 可以索引頁面和跟隨連結

        // Open Graph 標籤
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: '頂級的住宿體驗 | 六角飯店' },
        {
          property: 'og:description',
          content:
            '六角飯店位於高雄，提供頂級的住宿體驗。享受絕美市景與高級設施，讓您的每一刻都充滿奢華與舒適。立即預訂，開啟難忘的住宿之旅！你。'
        },
        { property: 'og:url', content: 'http://localhost:3000/' },
        {
          property: 'og:image',
          content: '/images/home-hero.png'
        },
        { property: 'og:site_name', content: '六角飯店' },
        { property: 'og:locale', content: 'zh_TW' },
        { property: 'fb:app_id', content: '' },

        // 自定義 meta（日曆 ID 和 key）
        {
          name: 'calendar-id',
          content: ''
        },
        { name: 'calendar-key', content: '' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' }, // 設定網站圖示，顯示在瀏覽器分頁和書籤中
        // canonical 指定頁面的標準 URL，避免重複內容問題
        { rel: 'canonical', href: '' }
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/sweetalert2@11',
          type: 'text/javascript',
          defer: true,
          tagPosition: 'head'
        }
      ],
      noscript: [
        {
          children:
            '此網頁需要支援 JavaScript 才能正確運行，請先至你的瀏覽器設定中開啟 JavaScript。'
        }
      ]
    }
  },
  routeRules: {
    // 添加全局資產快取
    '/_nuxt/**': {
      headers: {
        'cache-control': 'public,max-age=31536000,immutable'
      }
    },
    '/': { prerender: true }, // 在建構打包時預渲染
    '/rooms/**': { isr: 3600 }, // 過期時間為 1 小時
    '/account/**': { ssr: false },
    '/user/**': { ssr: false }
  },
  router: {
    options: {
      // 匹配到路由時添加 'active' class
      // 完全匹配時添加 'active-exact' class
      linkActiveClass: 'active',
      linkExactActiveClass: 'active-exact'
    }
  },
  nitro: {
    preset: 'node-server'
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'DEFAULT_JWT_SECRET',
    public: {
      appApiUrl: process.env.NUXT_PUBLIC_APP_API_URL
    }
  },
  image: {
    provider: 'ipx',
    domains: ['localhost'],
    dir: 'public',
    format: ['webp', 'png'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  }
})
