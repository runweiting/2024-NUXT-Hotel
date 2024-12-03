<script setup lang="ts">
definePageMeta({
  middleware: (to) => {
    if (to.path === '/account') {
      return navigateTo('/account/signup')
    }
  }
})
</script>

<template>
  <main>
    <NuxtPage />
  </main>
</template>

<style scoped></style>
