// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  typescript: {
    typeCheck: process.env.NODE_ENV === 'development',
    shim: false
  },
  imports: {
    dirs: ['stores']
  },
  alias: {
    '~/': './',
    '@': './'
  },
  css: [
    '~/assets/css/tailwind.css',
    'vue-final-modal/style.css',
    'sweetalert2/dist/sweetalert2.min.css'
  ],
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
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/sweetalert2@11',
          type: 'text/javascript',
          defer: true
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
    public: {
      hexSchoolApiUrl: 'https://nuxr3.zeabur.app'
    }
  },
  image: {
    provider: 'ipx',
    domains: ['localhost'],
    dir: 'public/images',
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
