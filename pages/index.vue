<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'

interface TransportItem {
  icon: string
  title: string
  description: string
}
const transportMethods: TransportItem[] = [
  {
    icon: 'mdi:car',
    title: '自行開車',
    description:
      '如果您選擇自行開車，可以透過國道一號下高雄交流道，往市區方向行駛，並依路標指示即可抵達「享樂酒店」。飯店內設有停車場，讓您停車方便。'
  },
  {
    icon: 'mdi:train',
    title: '高鐵/火車',
    description:
      '如果您是搭乘高鐵或火車，可於左營站下車，外頭有計程車站，搭乘計程車約20分鐘即可抵達。或者您也可以轉乘捷運紅線至中央公園站下車，步行約10分鐘便可抵達。'
  },
  {
    icon: 'mdi:car-side',
    title: '禮賓車服務',
    description:
      '承億酒店提供禮賓專車接送服務，但因目的地遠近會有不同的收費，請撥打電話將由專人為您服務洽詢專線：(07)123-4567'
  }
]

// 輪播控制
const roomSwiper = ref()

// 輪播資料
const heroSlides = Array(5)
  .fill(0)
  .map((_, i) => ({
    id: i,
    imgSrc: '/images/home-hero.png',
    imgSrcSm: '/images/home-hero-sm.png',
    alt: 'hero banner'
  }))
const roomSlides = Array(5)
  .fill(0)
  .map((_, i) => ({
    id: i,
    imgSrc: '/images/home-room-1.png',
    imgSrcSm: '/images/home-room-sm-1.png',
    alt: 'room-a'
  }))

// 控制房間輪播的函數
const slidePrev = () => {
  if (roomSwiper.value) {
    roomSwiper.value.prev()
  }
}
const slideNext = () => {
  if (roomSwiper.value) {
    roomSwiper.value.next()
  }
}
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
        class="absolute inset-0 z-10 mx-auto my-auto flex h-[400px] w-full items-center justify-center space-x-10 px-4 md:flex-row md:px-20"
      >
        <div class="mt-10 flex flex-col items-center md:mt-0 md:block md:text-left">
          <div class="mb-5 mt-10 font-bold text-primary-300 md:mb-10">
            <h2 class="mb-2 text-4xl">享樂酒店</h2>
            <h5 class="text-2xl md:text-xl">Enjoyment Luxury Hotel</h5>
          </div>
          <div class="h-[2px] w-[33vw] bg-gradient-to-r from-[#BE9C7C] to-white" />
        </div>
        <!-- hero-intro -->
        <!-- text-[clamp(2rem,5vw,3.5rem)] 自訂響應式字體：2rem：字體最小值，5vw：理想字體大小，3.5rem：字體最大值 -->
        <div class="hero-intro relative text-white">
          <h1 class="mb-2 whitespace-nowrap text-[clamp(2rem,5vw,3.5rem)] font-bold">
            高雄<br />豪華住宿之選
          </h1>
          <p
            class="mb-[min(5vh,3rem)] whitespace-nowrap text-[clamp(1.25rem,1.5vw,2rem)] font-semibold md:whitespace-normal"
          >
            致力於為您提供無與倫比的奢華體驗與優質服務
          </p>
          <NuxtLink
            to="/rooms"
            class="btn duration-250 flex w-full items-center justify-center gap-3 border-0 text-end text-xl font-semibold transition-all hover:text-white hover:shadow-[inset_48vw_0_0_0_var(--primary)]"
          >
            立即訂房
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- News Section -->
    <CardsNews />

    <!-- About Section -->
    <section class="md:py-30 relative -z-10 bg-black py-20">
      <div class="container relative">
        <div class="absolute inset-0 -z-20">
          <picture>
            <source srcset="/images/home-about.png" media="(min-width:576px)" />
            <NuxtImg
              src="/images/home-about.png"
              alt="home-about"
              class="inset-0 h-full w-full object-cover"
            />
          </picture>
        </div>
        <div class="p-10 text-white md:mx-auto md:mt-20 md:p-20">
          <div class="rounded-3xl bg-gradient-to-b from-primary-300 to-black/50 p-14">
            <div class="mb-10 flex items-center gap-10 md:mb-20">
              <h2 class="mb-0 whitespace-nowrap text-4xl font-bold">關於<br />我們</h2>
              <div class="h-[2px] w-[165px] bg-white" />
            </div>
            <div class="space-y-4 font-medium md:space-y-10">
              <!-- About content paragraphs -->
              <p class="mb-0 text-sm md:text-base">
                享樂酒店，位於美麗島高雄的心臟地帶，是這座城市的璀璨瑰寶與傲人地標。
                <br />
                我們的存在，不僅僅是為了提供奢華的住宿體驗，更是為了將高雄的美麗與活力，獻給每一位蒞臨的旅客。
              </p>
              <p class="mb-0 text-sm md:text-base">
                我們的酒店，擁有時尚典雅的裝潢，每一個細節都充滿著藝術與設計的精緻。
                <br />
                我們的員工，都以熱情的服務與專業的態度，讓每一位客人都能感受到賓至如歸的溫暖。
              </p>
              <p class="mb-0 text-sm md:text-base">
                在這裡，您可以遙望窗外，欣賞高雄的城市景色，感受這座城市的繁華與活力；您也可以舒適地坐在我們的餐廳，品嚐精緻的佳餚，體驗無與倫比的味覺盛宴。
              </p>
              <p class="mb-0 text-sm md:text-base">
                享樂酒店，不僅是您在高雄的住宿之選，更是您感受高雄魅力的最佳舞台。我們期待著您的蒞臨，讓我們共同編織一段難忘的高雄故事。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Room Intro Section -->
    <section class="md:py-30 bg-black px-3 py-20 md:px-0">
      <div class="relative grid grid-cols-2 gap-6">
        <Carousel
          ref="roomSwiper"
          :items-to-show="1"
          :wrap-around="true"
          :transition="1000"
          :autoplay="3000"
          :pause-autoplay-on-hover="true"
        >
          <Slide v-for="slide in roomSlides" :key="slide.id">
            <picture>
              <source :srcset="slide.imgSrc" media="(min-width:768px)" />
              <NuxtImg :src="slide.imgSrc" :alt="slide.alt" class="w-100 object-cover" />
            </picture>
          </Slide>
          <!-- Addons -->
          <template #addons>
            <div class="absolute inset-x-0 bottom-8">
              <Pagination class="custom-pagination" />
            </div>
          </template>
        </Carousel>

        <div class="room-intro self-end">
          <div class="flex flex-col p-10 text-white">
            <h2 class="mb-2 text-4xl font-bold md:mb-4">尊爵雙人房</h2>
            <p class="mb-6 text-sm md:mb-10 md:text-base">
              享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。
            </p>
            <div class="mb-6 text-3xl font-bold md:mb-10">NT$ 10,000</div>
            <NuxtLink
              to="/rooms"
              class="btn mb-6 flex w-full items-center justify-end gap-3 text-end text-xl font-bold md:mb-10 md:p-10 md:text-xl"
            >
              查看更多
              <div class="h-[2px] w-[10vw] bg-gradient-to-r from-white/60 to-[#BE9C7C]" />
            </NuxtLink>
            <div class="flex justify-end text-white">
              <button class="border-0 bg-transparent p-4" type="button" @click="slidePrev()">
                <Icon name="mdi:arrow-left" class="h-6 w-6" />
              </button>
              <button class="border-0 bg-transparent p-4" type="button" @click="slideNext()">
                <Icon name="mdi:arrow-right" class="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Delicacy Intro Section -->
    <CardsRestaurants />

    <!-- Transport Section -->
    <section class="transport-intro relative bg-black pb-40 pt-20">
      <div class="md:pt-30 container pb-10 pt-20 md:pb-20">
        <div class="mb-10 flex items-center gap-10 md:mb-20">
          <h2 class="mb-0 text-4xl font-bold text-primary-300">交通<br />方式</h2>
          <div class="h-0.5 w-20 bg-primary-100"></div>
        </div>

        <div class="flex flex-col gap-6">
          <div class="col-span-3 mb-10">
            <p class="mb-4 font-bold text-white">台灣高雄市新興區六角路123號</p>
            <picture>
              <source srcset="/images/home-map.png" media="(min-width:576px)" />
              <NuxtImg
                src="/images/home-map.png"
                alt="描述地圖中酒店所在的位置"
                class="h-auto w-full object-cover"
                sizes="(max-width: 576px) 100vw, 50vw"
              />
            </picture>
          </div>

          <div class="grid grid-flow-row grid-cols-3 gap-4 text-white">
            <div v-for="(method, index) in transportMethods" :key="index">
              <Icon :name="method.icon" class="mb-2 h-12 w-12 text-primary-300 md:mb-4" />
              <h5 class="text-lg font-bold md:text-xl">
                {{ method.title }}
              </h5>
              <p class="mb-0 text-xs md:text-sm">
                {{ method.description }}
              </p>
            </div>
          </div>
        </div>
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
