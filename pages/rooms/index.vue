<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'

// 輪播資料
const heroSlides = Array(5)
  .fill(0)
  .map((_, i) => ({
    id: i,
    imgSrc: '/images/home-hero.png',
    imgSrcSm: '/images/home-hero-sm.png',
    alt: 'hero banner'
  }))

useHeadSafe({
  title: '房型列表'
})
</script>

<template>
  <main class="overflow-hidden">
    <!-- Hero Section -->
    <section class="relative">
      <Carousel
        :items-to-show="1"
        :wrap-around="true"
        :transition="1000"
        :autoplay="3000"
        :pause-autoplay-on-hover="true"
        class="relative"
      >
        <Slide v-for="slide in heroSlides" :key="slide.id" class="relative">
          <!-- 黑色透明遮罩 -->
          <div class="absolute inset-0 bg-black/60"></div>
          <picture>
            <!-- source 提供媒體條件判斷，螢幕寬度 >= 576 px，瀏覽器優先載入 slide.imgSrc 所指定圖片 -->
            <source :srcset="slide.imgSrc" media="(min-width:576px)" />
            <!-- <NuxtImg> 提供一個備用圖片，當沒有 <source> 標籤的圖片匹配時，就會顯示這個備用圖片 -->
            <NuxtImg
              :src="slide.imgSrcSm"
              :alt="slide.alt"
              class="h-100vh w-full object-cover brightness-50"
            />
          </picture>
        </Slide>
        <!-- Addons -->
        <template #addons>
          <div class="absolute inset-x-0 bottom-6">
            <Pagination class="custom-pagination" />
          </div>
        </template>
      </Carousel>

      <div
        class="absolute inset-0 z-10 mx-auto my-auto flex h-[400px] w-full flex-col items-center justify-center space-x-10 px-4 md:flex-row md:px-20"
      >
        <div class="mt-10 flex flex-col items-center md:mt-0 md:block md:text-left">
          <div class="mb-5 mt-10 font-bold text-primary-300 md:mb-10">
            <h2 class="mb-2 text-4xl">享樂酒店</h2>
            <h5 class="text-2xl md:text-xl">Enjoyment Luxury Hotel</h5>
          </div>
          <div class="h-[2px] w-[33vw] bg-gradient-to-r from-[#BE9C7C] to-white" />
        </div>
        <h1 class="p-10 text-[clamp(2rem,5vw,3.5rem)] font-bold text-white">客房旅宿</h1>
      </div>
    </section>

    <!-- Room Type Section -->
    <CardsRooms />
  </main>
</template>

<style scoped>
.custom-pagination :deep(.carousel__pagination-item) {
  padding-inline: 4px;
}

.custom-pagination :deep(.carousel__pagination-button) {
  width: 32px;
  height: 8px;
  background-color: white;
  border-radius: 100px;
  opacity: 1;
}

.custom-pagination :deep(.carousel__pagination-button::after) {
  background-color: transparent !important;
  display: none !important;
}

.custom-pagination :deep(.carousel__pagination-button--active) {
  width: 60px;
  height: 8px;
  background-color: #bf9d7d;
  border-radius: 100px;
  opacity: 1;
}
</style>
