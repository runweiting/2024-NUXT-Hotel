<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
const route = useRoute()
const userStore = useUserStore()
</script>

<template>
  <div>
    <AppHeader />
    <main class="bg-black text-white">
      <div class="relative pt-[120px]">
        <picture>
          <source srcset="/images/profile-hero.png" media="(min-width: 640px)" />
          <source srcset="/images/profile-hero-sm.png" media="(min-width: 375px)" />
          <NuxtImg
            src="/images/profile-hero.png"
            alt="profile-hero"
            class="h-[240px] w-full object-cover sm:h-[300px]"
          />
        </picture>
        <div
          class="absolute inset-y-0 top-[120px] flex flex-col justify-center gap-4 px-8 sm:flex-row sm:items-center xl:px-20"
        >
          <picture class="aspect-square w-[72px] sm:w-[144px]">
            <source srcset="/images/avatar-6.png" media="(min-width: 375px)" />
            <source srcset="/images/avatar-6.png" />
            <NuxtImg src="/images/avatar-6.png" alt="profile-hero" class="h-full w-full" />
          </picture>
          <h1 class="text-3xl font-bold">Hello, {{ userStore.userInfo?.name }}!</h1>
        </div>
      </div>
      <div class="px-4 py-8 text-black sm:px-12 sm:py-16 xl:px-20 xl:py-24">
        <ul class="mb-8 flex gap-4 sm:mb-12">
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
        <source srcset="/images/deco-line-group-horizontal-full.svg" media="(min-width: 640px)" />
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
