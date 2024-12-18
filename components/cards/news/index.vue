<script setup lang="ts">
const { newsList, hasError, isLoading, refresh } = useNews()
</script>

<template>
  <div>
    <section class="news-intro md:py-30 relative bg-primary-50 px-2 py-20 md:px-8">
      <div class="container">
        <div class="grid-col-1 grid gap-8 md:grid-flow-row md:gap-10 lg:grid-flow-col">
          <div class="md:row-span-3">
            <h2 class="mb-6 text-[clamp(2rem,3.5vw,2.5rem)] font-bold text-primary-300 md:mb-10">
              最新<br />消息
            </h2>
            <div class="h-[2px] w-[140px] bg-gradient-to-r from-[#BE9C7C] to-white" />
          </div>
          <FetchDataLoading v-if="isLoading" />
          <div v-else-if="hasError" class="flex items-center space-x-4">
            <p class="text-lg font-bold text-primary-500">Failed to load news. Please try again.</p>
            <button type="button" class="btn" @click="refresh()">Retry</button>
          </div>
          <div
            v-for="news in newsList"
            v-else
            :key="news._id"
            class="flex flex-col border-0 bg-transparent"
          >
            <div class="flex flex-col items-center gap-6 md:flex-row">
              <picture class="w-full flex-shrink-0 md:w-[44%]">
                <source :srcset="news.image" media="(min-width: 576px)" />
                <NuxtImg :src="news.image" :alt="news.title" class="w-full rounded-lg" />
              </picture>
              <div class="text-primary-900">
                <h3 class="mb-2 text-2xl font-bold md:mb-6">{{ news.title }}</h3>
                <p class="text-sm">
                  {{ news.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
