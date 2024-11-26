// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  typescript: {
    typeCheck: process.env.NODE_ENV === 'development',
    shim: false
  },
  alias: {
    '~/': './',
    '@': './'
  },
  css: ['~/assets/css/tailwind.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-anchorscroll',
    'nuxt-icon-tw',
    'vue3-carousel-nuxt',
    '@nuxt/image'
  ],
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    pageTransition: { name: 'page', mode: 'out-in' }
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
