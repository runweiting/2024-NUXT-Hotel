<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
</script>

<template>
  <AppHeader />
  <main>
    <slot />
    <ModalsContainer />
  </main>
  <AppFooter />
</template>

<style scoped></style>
