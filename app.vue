<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
* {
  outline: 1px solid yellowgreen;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
