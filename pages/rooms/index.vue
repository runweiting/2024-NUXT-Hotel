<script setup lang="ts">
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
        <Slide v-for="slide in heroSlides" :key="slide.id" class="relative overflow-hidden">
          <!-- 黑色透明遮罩 -->
          <div class="absolute inset-0 bg-black/60"></div>
          <picture class="h-[460px]">
            <source :srcset="slide.imgSrc" media="(min-width:640px)" />
            <source :srcset="slide.imgSrcSm" media="(min-width:375px)" />
            <NuxtImg
              :src="slide.imgSrcSm"
              :alt="slide.alt"
              class="h-100vh w-full object-cover brightness-50 sm:h-[460px] lg:w-[1024px] xl:w-[1280px]"
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
        class="absolute inset-0 z-10 mt-[140px] flex h-[180px] w-full flex-col items-center justify-center px-4 sm:mx-auto sm:my-auto sm:flex-row sm:items-end sm:gap-4 md:gap-6 md:px-20 lg:gap-10"
      >
        <div class="mt-14 flex flex-col items-center justify-center md:mt-0 md:items-start">
          <div class="mb-5 mt-10 text-center font-bold text-primary-300 sm:text-start md:mb-10">
            <h2 class="text-[clamp(1.5rem,2vw,2.25rem)]">享樂酒店</h2>
            <h5 class="text-[clamp(1em,1.5vw,2.5rem)]">Enjoyment Luxury Hotel</h5>
          </div>
          <div
            class="my-10 h-[2px] w-[20vw] rotate-90 bg-gradient-to-r from-[#BE9C7C] to-white sm:my-0 sm:w-[32vw] sm:transform-none"
          />
        </div>
        <h1 class="p-10 text-[clamp(2rem,5vw,3.5rem)] font-bold text-white">客房旅宿</h1>
      </div>
    </section>

    <!-- Room Type Section -->
    <CardsRooms />
  </main>
</template>

<style scoped></style>
