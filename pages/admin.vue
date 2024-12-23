<script setup lang="ts">
definePageMeta({
  requiresAuth: true
})
</script>

<template>
  <main class="bg-primary-50 pt-[72px] text-black sm:pt-[95px] md:pt-[120px]">
    <div class="p-10 sm:hidden">
      <p>請使用裝置螢幕 >= 640px 以上機台操作</p>
    </div>
    <div class="hidden sm:block sm:p-8 md:p-10 lg:p-12 xl:p-14">
      <ul class="flex gap-4">
        <li>
          <NuxtLink :to="`/admin/news`" class="btn btn-active">最新消息</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/admin/restaurants`" class="btn btn-active">餐廳管理</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/admin/rooms`" class="btn btn-active">房型管理</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/admin/orders`" class="btn btn-active">訂單管理</NuxtLink>
        </li>
      </ul>
      <NuxtPage />
      <!-- <ModalsContainer /> -->
    </div>
  </main>
</template>

<style scoped></style>
