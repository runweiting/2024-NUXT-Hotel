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

interface RoomImage {
  desktop: string
  mobile: string
}
interface RoomInfo {
  icon: string
  value: string
}
interface Room {
  id: string
  name: string
  description: string
  images: Record<number, RoomImage>
  roomInfo: RoomInfo[]
  price: number
}
const rooms: Room[] = [
  {
    id: 'a',
    name: '尊爵雙人房',
    description: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。',
    images: {
      1: {
        desktop: '/images/room-a-1.png',
        mobile: '/images/room-a-sm-1.png'
      },
      2: {
        desktop: '/images/room-a-2.png',
        mobile: '/images/room-a-sm-2.png'
      },
      3: {
        desktop: '/images/room-a-3.png',
        mobile: '/images/room-a-sm-3.png'
      },
      4: {
        desktop: '/images/room-a-4.png',
        mobile: '/images/room-a-sm-4.png'
      },
      5: {
        desktop: '/images/room-a-5.png',
        mobile: '/images/room-a-sm-5.png'
      }
    },
    roomInfo: [
      { icon: 'fluent:slide-size-24-filled', value: '24 坪' },
      { icon: 'material-symbols:king-bed', value: '1 張大床' },
      { icon: 'ic:baseline-person', value: '2-4 人' }
    ],
    price: 10000
  },
  {
    id: 'b',
    name: '尊爵雙人房',
    description: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。',
    images: {
      1: {
        desktop: '/images/room-b-1.png',
        mobile: '/images/room-b-sm-1.png'
      },
      2: {
        desktop: '/images/room-b-2.png',
        mobile: '/images/room-b-sm-2.png'
      },
      3: {
        desktop: '/images/room-b-3.png',
        mobile: '/images/room-b-sm-3.png'
      },
      4: {
        desktop: '/images/room-b-4.png',
        mobile: '/images/room-b-sm-4.png'
      },
      5: {
        desktop: '/images/room-b-5.png',
        mobile: '/images/room-b-sm-5.png'
      }
    },
    roomInfo: [
      { icon: 'fluent:slide-size-24-filled', value: '24 坪' },
      { icon: 'material-symbols:king-bed', value: '1 張大床' },
      { icon: 'ic:baseline-person', value: '2-4 人' }
    ],
    price: 10000
  },
  {
    id: 'c',
    name: '尊爵雙人房',
    description: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。',
    images: {
      1: {
        desktop: '/images/room-c-1.png',
        mobile: '/images/room-c-sm-1.png'
      },
      2: {
        desktop: '/images/room-c-2.png',
        mobile: '/images/room-c-sm-2.png'
      },
      3: {
        desktop: '/images/room-c-3.png',
        mobile: '/images/room-c-sm-3.png'
      },
      4: {
        desktop: '/images/room-c-4.png',
        mobile: '/images/room-c-sm-4.png'
      },
      5: {
        desktop: '/images/room-c-5.png',
        mobile: '/images/room-c-sm-5.png'
      }
    },
    roomInfo: [
      { icon: 'fluent:slide-size-24-filled', value: '24 坪' },
      { icon: 'material-symbols:king-bed', value: '1 張大床' },
      { icon: 'ic:baseline-person', value: '2-4 人' }
    ],
    price: 10000
  },
  {
    id: 'd',
    name: '尊爵雙人房',
    description: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。',
    images: {
      1: {
        desktop: '/images/room-d-1.png',
        mobile: '/images/room-d-sm-1.png'
      },
      2: {
        desktop: '/images/room-d-2.png',
        mobile: '/images/room-d-sm-2.png'
      },
      3: {
        desktop: '/images/room-d-3.png',
        mobile: '/images/room-d-sm-3.png'
      },
      4: {
        desktop: '/images/room-d-4.png',
        mobile: '/images/room-d-sm-4.png'
      },
      5: {
        desktop: '/images/room-d-5.png',
        mobile: '/images/room-d-sm-5.png'
      }
    },
    roomInfo: [
      { icon: 'fluent:slide-size-24-filled', value: '24 坪' },
      { icon: 'material-symbols:king-bed', value: '1 張大床' },
      { icon: 'ic:baseline-person', value: '2-4 人' }
    ],
    price: 10000
  }
]

definePageMeta({
  layout: 'front-layout'
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
        class="absolute inset-x-0 bottom-10 z-10 flex h-[400px] w-full flex-col items-center justify-between px-4 md:flex-row md:px-20"
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
    <section class="md:py-30 bg-primary-50 p-10">
      <div class="container mb-12">
        <h4 class="mb-2 text-xl font-bold text-black md:mb-4 md:text-base">房型選擇</h4>
        <h2 class="mb-10 text-4xl font-bold text-primary-300 md:mb-20">各種房型，任您挑選</h2>
        <ul class="flex list-none flex-col gap-6 md:gap-12">
          <li
            v-for="room in rooms"
            :key="room.id"
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
                  <Slide v-for="n in 5" :key="n" class="w-full overflow-hidden">
                    <picture>
                      <!-- 桌面版圖片，優先在大於 768px 的寬度載入 -->
                      <source :srcset="room.images[n].desktop" media="(min-width: 768px)" />
                      <!-- 手機版圖片，優先在小於 768px 的寬度載入 -->
                      <source :srcset="room.images[n].mobile" media="(max-width: 767px)" />
                      <!-- 預設圖片（回退機制） -->
                      <NuxtImg
                        :src="room.images[n].mobile"
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
                  <NuxtLink :to="`/rooms/${room.id}`" class="absolute inset-0 z-10" />
                  <h3 class="mb-4 text-4xl font-bold">
                    {{ room.name }}
                  </h3>
                  <p class="mb-6 text-xs font-medium md:mb-10 md:text-sm">
                    {{ room.description }}
                  </p>
                  <ul class="mb-6 flex list-none gap-4 md:mb-10">
                    <li
                      v-for="(info, index) in room.roomInfo"
                      :key="index"
                      class="h-[97px] w-[97px] rounded-lg border border-primary-100 p-4"
                    >
                      <Icon :name="info.icon" class="mb-2 text-xl text-primary-300" />
                      <p class="mb-0 whitespace-nowrap font-bold text-black">
                        {{ info.value }}
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
