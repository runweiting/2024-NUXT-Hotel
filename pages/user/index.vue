<script setup lang="ts">
const userId = useCookie('userId')?.value || 'default-user-id'

// 檢查路徑是否為 /user
if (useRoute().path === '/user') {
  navigateTo(`/user/${userId}`)
}
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style scoped></style>
