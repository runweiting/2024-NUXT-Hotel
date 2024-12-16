<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'

const { getRoomList } = useRoom()
const { roomList, hasError, isLoading, refresh } = await getRoomList()
</script>

<template>
  <div>
    <section class="md:py-30 bg-primary-50 p-10">
      <div class="container mb-12">
        <h4 class="mb-2 text-xl font-bold text-black md:mb-4 md:text-base">房型選擇</h4>
        <h2 class="mb-10 text-4xl font-bold text-primary-300 md:mb-20">各種房型，任您挑選</h2>
        <FetchDataLoading v-if="isLoading" />
        <div v-else-if="hasError" class="flex items-center space-x-4">
          <p class="text-lg font-bold text-primary-500">Failed to load rooms. Please try again.</p>
          <button type="button" class="btn" @click="refresh()">Retry</button>
        </div>
        <ul v-else class="flex list-none flex-col gap-6 md:gap-12">
          <li
            v-for="room in roomList"
            :key="room._id"
            class="overflow-hidden rounded-3xl border-0 lg:flex-row"
          >
            <div class="grid grid-cols-12">
              <div class="col-span-12 lg:col-span-7">
                <Carousel
                  :items-to-show="1"
                  :wrap-around="true"
                  :transition="1000"
                  :autoplay="2500"
                  :pause-autoplay-on-hover="false"
                  class="relative overflow-x-visible"
                >
                  <Slide v-for="n in 3" :key="n" class="w-full overflow-hidden">
                    <picture>
                      <!-- 桌面版圖片，優先在大於 768px 的寬度載入 -->
                      <source :srcset="room.imageUrlList[n]" media="(min-width: 768px)" />
                      <!-- 手機版圖片，優先在小於 768px 的寬度載入 -->
                      <source :srcset="room.imageUrlList[n]" media="(max-width: 767px)" />
                      <!-- 預設圖片（回退機制） -->
                      <NuxtImg
                        :src="room.imageUrlList[n]"
                        :alt="`room-${room.name}-${n}`"
                        class="min-h-[457px] w-full object-cover transition-transform"
                        loading="lazy"
                      />
                    </picture>
                  </Slide>
                  <template #addons>
                    <Navigation class="h-12 w-12 rounded-full bg-white text-primary-700" />
                    <div class="absolute inset-x-0 bottom-6">
                      <Pagination class="custom-pagination" />
                    </div>
                  </template>
                </Carousel>
              </div>
              <div class="relative col-span-12 bg-white px-8 py-4 lg:col-span-5">
                <div class="text-black md:py-10">
                  <NuxtLink :to="`/rooms/${room._id}`" class="absolute inset-0 z-10" />
                  <h3 class="mb-4 text-4xl font-bold">
                    {{ room.name }}
                  </h3>
                  <p class="mb-6 text-xs font-medium md:mb-10 md:text-sm">
                    {{ room.description }}
                  </p>
                  <ul class="mb-6 flex list-none gap-4 md:mb-10">
                    <li class="h-[97px] w-[97px] rounded-lg border border-primary-100 p-4">
                      <Icon
                        name="fluent:slide-size-24-filled"
                        class="mb-2 text-xl text-primary-300"
                      />
                      <p class="mb-0 whitespace-nowrap font-bold text-black">
                        {{ room.areaInfo }}
                      </p>
                    </li>
                    <li class="h-[97px] w-[97px] rounded-lg border border-primary-100 p-4">
                      <Icon
                        name="material-symbols:king-bed"
                        class="mb-2 text-xl text-primary-300"
                      />
                      <p class="mb-0 whitespace-nowrap font-bold text-black">
                        {{ room.bedInfo }}
                      </p>
                    </li>
                    <li class="h-[97px] w-[97px] rounded-lg border border-primary-100 p-4">
                      <Icon name="ic:baseline-person" class="mb-2 text-xl text-primary-300" />
                      <p class="mb-0 whitespace-nowrap font-bold text-black">
                        {{ room.maxPeople }}人
                      </p>
                    </li>
                  </ul>
                  <div class="mb-6 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-white" />
                  <div class="flex items-center justify-between text-primary-300">
                    <p class="mb-0 text-2xl font-bold">NT$ {{ room.price.toLocaleString() }}</p>
                    <Icon name="mdi:arrow-right" class="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
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
