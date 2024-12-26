<script setup lang="ts">
const userStore = useUserStore()

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

// 導航並關閉選單
const navigateAndCloseMenu = (to: string) => {
  // 如果是移動端，關閉選單
  if (isMenuOpen.value) {
    isMenuOpen.value = false
  }
  // 使用 Nuxt 導航
  navigateTo(to)
}
</script>

<template>
  <header
    :class="[
      'fixed top-0 z-30 w-full transition-colors duration-300',
      isScrolled ? 'bg-black' : isTransparentRoute ? 'bg-transparent' : 'bg-black'
    ]"
  >
    <nav class="px-3 py-4 md:px-12 md:py-6">
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
          <ul class="flex flex-col items-center gap-3 md:flex-row lg:gap-6">
            <li>
              <NuxtLink
                class="block cursor-pointer px-4 py-4 font-bold text-white transition-colors hover:text-primary-100 md:px-2"
                @click="navigateAndCloseMenu('/rooms')"
              >
                客房旅宿
              </NuxtLink>
            </li>

            <!-- Desktop User Menu -->
            <li class="hidden md:block">
              <NuxtLink
                v-if="!userStore.isLogin"
                class="flex cursor-pointer items-center gap-2 p-4 font-bold text-white transition-colors group-hover:text-primary-300"
                @click="navigateAndCloseMenu('/account/login')"
              >
                <Icon name="mdi:account-circle-outline" class="text-xl" />
                會員登入
              </NuxtLink>
              <div v-else class="group relative">
                <NuxtLink
                  class="flex cursor-pointer items-center gap-2 p-4 font-bold text-white transition-colors group-hover:text-primary-300 md:px-2"
                  @click="navigateAndCloseMenu(`/user/${userStore.userInfo?.id}`)"
                >
                  <Icon name="mdi:account-circle-outline" class="text-xl" />
                  {{ userStore.userInfo?.name }}
                </NuxtLink>
                <div
                  class="absolute right-0 hidden w-[150px] overflow-hidden rounded-2xl bg-white text-black shadow-lg group-hover:block"
                >
                  <div class="flex flex-col divide-y">
                    <div class="group/menu-item">
                      <NuxtLink
                        class="cursor-pointer p-4 px-6 group-hover/menu-item:underline group-hover/menu-item:decoration-primary-500 group-hover/menu-item:decoration-2 group-hover/menu-item:underline-offset-4"
                        @click="navigateAndCloseMenu(`/user/${userStore.userInfo?.id}/order`)"
                      >
                        我的帳戶
                      </NuxtLink>
                    </div>
                    <div class="group/menu-item">
                      <button
                        class="cursor-pointer p-4 px-6 group-hover/menu-item:underline group-hover/menu-item:decoration-primary-500 group-hover/menu-item:decoration-2 group-hover/menu-item:underline-offset-4"
                        @click="userStore.logout"
                      >
                        登出
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <!-- Mobile Login Link -->
            <li class="md:hidden">
              <NuxtLink
                v-if="!userStore.isLogin"
                class="block px-4 py-4 font-bold text-white transition-colors hover:text-primary-100"
                @click="navigateAndCloseMenu('/account/login')"
              >
                會員登入
              </NuxtLink>
              <NuxtLink
                v-else
                class="block px-4 py-4 font-bold text-white transition-colors hover:text-primary-100"
                @click="navigateAndCloseMenu(`/user/${userStore.userInfo?.id}/order`)"
              >
                我的帳戶
              </NuxtLink>
            </li>

            <!-- Book Now Button -->
            <li>
              <NuxtLink
                class="inline-block rounded-lg bg-primary-300 px-8 py-4 font-bold text-white transition-colors hover:bg-primary-700 md:px-4"
                @click="navigateAndCloseMenu('/rooms')"
              >
                立即訂房
              </NuxtLink>
            </li>

            <!-- Admin Page Button -->
            <li>
              <NuxtLink
                v-if="userStore.isAdmin"
                class="inline-block rounded-lg bg-white px-8 py-4 font-bold transition-colors hover:bg-gray-500 hover:text-white md:px-4"
                @click="navigateAndCloseMenu('/admin')"
              >
                後台管理
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
