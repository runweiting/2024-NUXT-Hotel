<script setup lang="ts"></script>

<template>
  <header class="w-full bg-black">
    <nav class="px-3 py-4 md:px-20 md:py-6">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex-shrink-0">
          <img src="/images/logo-white.svg" alt="logo" class="w-[27vw] max-w-[200px]" />
        </NuxtLink>
      </div>
    </nav>
  </header>
  <main class="bg-black">
    <slot />
  </main>
</template>

<style scoped></style>
