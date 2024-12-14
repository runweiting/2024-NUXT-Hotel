<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
const route = useRoute()
const userStore = useUserStore()
</script>

<template>
  <div>
    <AppHeader />
    <main class="bg-black">
      <div class="relative pt-[120px]">
        <picture>
          <!-- 螢幕寬度 >= 768 px，瀏覽器優先載入 :srcset 所指定圖片 -->
          <source srcset="/images/profile-hero.png" media="(min-width: 576px)" />
          <!-- <NuxtImg> 提供一個備用圖片，當沒有 <source> 標籤的圖片匹配時，就會顯示這個備用圖片 -->
          <NuxtImg
            src="/images/profile-hero.png"
            alt="profile-hero"
            class="h-[300px] w-full object-cover"
          />
        </picture>
        <div class="absolute inset-y-0 top-[120px] flex items-center space-x-6 px-20">
          <picture>
            <source srcset="/images/avatar-6.png" />
            <!-- <NuxtImg> 提供一個備用圖片，當沒有 <source> 標籤的圖片匹配時，就會顯示這個備用圖片 -->
            <NuxtImg src="/images/avatar-6.png" alt="profile-hero" class="h-[144px] w-[144px]" />
          </picture>
          <h1 class="text-4xl font-bold text-white">Hello, {{ userStore.userInfo?.name }}!</h1>
        </div>
      </div>
      <div>
        <ul class="flex space-x-4 px-20 py-14 text-white">
          <li>
            <NuxtLink :to="`/user/${route.params.userId}/profile`" class="btn-outline-active"
              >個人資料</NuxtLink
            >
          </li>
          <li>
            <NuxtLink :to="`/user/${route.params.userId}/order`" class="btn-outline-active"
              >我的訂單</NuxtLink
            >
          </li>
        </ul>
        <NuxtPage />
        <ModalsContainer />
      </div>
      <picture>
        <!-- 螢幕寬度 >= 768 px，瀏覽器優先載入 :srcset 所指定圖片 -->
        <source srcset="/images/deco-line-group-horizontal-full.svg" media="(min-width: 576px)" />
        <!-- <NuxtImg> 提供一個備用圖片，當沒有 <source> 標籤的圖片匹配時，就會顯示這個備用圖片 -->
        <NuxtImg
          src="/images/deco-line-group-horizontal-sm.svg"
          alt="deco-line-group"
          class="h-full w-full object-cover"
        />
      </picture>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped></style>
