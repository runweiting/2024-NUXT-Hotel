<script setup lang="ts">
// 定義透明背景的路由名稱
const transparentRoutes = ['index', 'rooms']

// 路由狀態
const route = useRoute()
const isTransparentRoute = computed(() => transparentRoutes.includes(route.name as string))

// 捲動狀態
const isScrolled = ref<boolean>(false)
const isMenuOpen = ref<boolean>(false)

// 如果 window 往下滾動超過 50px isScrolled 為 true
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// 監聽 window 'scroll' 事件
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
// 移除監聽
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 切換選單
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const userStore = useUserStore()
</script>

<template>
  <header
    :class="[
      'fixed top-0 z-30 w-full transition-colors duration-300',
      isScrolled ? 'bg-black' : isTransparentRoute ? 'bg-transparent' : 'bg-black'
    ]"
  >
    <nav class="px-3 py-4 md:px-20 md:py-6">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex-shrink-0">
          <img src="/images/logo-white.svg" alt="logo" class="w-[27vw] max-w-[200px]" />
        </NuxtLink>

        <!-- Mobile Menu Button -->
        <button
          class="relative z-50 p-2 text-white focus:outline-none md:hidden"
          aria-label="Toggle navigation"
          @click="toggleMenu"
        >
          <Icon
            name="mdi:close"
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl transition-opacity duration-300"
            :class="isMenuOpen ? 'opacity-100' : 'opacity-0'"
          />
          <Icon
            name="mdi:menu"
            class="text-xl transition-opacity duration-300"
            :class="isMenuOpen ? 'opacity-0' : 'opacity-100'"
          />
        </button>

        <!-- Navigation Items -->
        <div
          :class="[
            'md:flex md:items-center',
            isMenuOpen
              ? 'fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-95'
              : 'hidden'
          ]"
        >
          <ul class="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <li>
              <NuxtLink
                to="/rooms"
                class="block px-4 py-4 font-bold text-white transition-colors hover:text-primary-100"
              >
                客房旅宿
              </NuxtLink>
            </li>

            <!-- Desktop User Menu -->
            <li class="hidden md:block">
              <NuxtLink
                v-if="!userStore.isLogin"
                to="/account/login"
                class="flex items-center gap-2 px-4 py-4 font-bold text-white transition-colors group-hover:text-primary-300"
              >
                <Icon name="mdi:account-circle-outline" class="text-xl" />
                會員登入
              </NuxtLink>
              <div v-else class="group relative">
                <NuxtLink
                  :to="`/user/${userStore.userInfo?.id}`"
                  class="flex items-center gap-2 px-4 py-4 font-bold text-white transition-colors group-hover:text-primary-300"
                >
                  <Icon name="mdi:account-circle-outline" class="text-xl" />
                  {{ userStore.userInfo?.name }}
                </NuxtLink>
                <div
                  class="group/menu-item absolute right-0 hidden w-64 overflow-hidden rounded-2xl bg-white shadow-lg group-hover:block"
                >
                  <NuxtLink
                    :to="`/user/${userStore.userInfo?.id}`"
                    class="block px-6 py-4 text-gray-700 hover:bg-primary-50 hover:text-primary-900"
                  >
                    我的帳戶
                  </NuxtLink>
                  <button
                    class="w-full px-6 py-4 text-left text-gray-700 hover:bg-primary-50 hover:text-primary-900"
                    @click="userStore.logout"
                  >
                    登出
                  </button>
                </div>
              </div>
            </li>

            <!-- Mobile Login Link -->
            <li v-if="!userStore.isLogin" class="md:hidden">
              <NuxtLink
                to="/account/login"
                class="block px-4 py-4 font-bold text-white transition-colors hover:text-primary-100"
              >
                會員登入
              </NuxtLink>
            </li>

            <!-- Book Now Button -->
            <li>
              <NuxtLink
                to="/rooms"
                class="inline-block rounded-lg bg-primary-300 px-8 py-4 font-bold text-white transition-colors hover:bg-primary-700"
              >
                立即訂房
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
