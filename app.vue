<script setup lang="ts">
useHeadSafe({
  title: '首頁',
  titleTemplate: (title) => (title ? `${title} | 六角飯店` : '六角飯店')
})
</script>

<template>
  <NuxtLoadingIndicator :height="5" :duration="5000" :throttle="0" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* * {
  outline: 1px solid yellowgreen;
} */
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
