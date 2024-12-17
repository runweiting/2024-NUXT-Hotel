import { formatPrice } from '~/utils/formatPrice'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('formatPrice', {
    mounted(el, binding) {
      // 確保綁定值有效
      if (typeof binding.value === 'number') {
        el.textContent = formatPrice(binding.value)
      } else {
        console.warn('v-formatPrice expects a number value')
      }
    },
    updated(el, binding) {
      // 在值變更後重新應用格式化
      if (typeof binding.value === 'number') {
        el.textContent = formatPrice(binding.value)
      }
    }
  })
})
