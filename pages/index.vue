<script setup lang="ts">
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
            <!-- <source> 會從上到下進行判斷，螢幕寬度 >= 640px 時，優先載入 slide.imgSrc -->
            <source :srcset="slide.imgSrc" media="(min-width:640px)" />
            <!-- 螢幕寬度 >= 375px 時，載入 slide.imgSrcSm -->
            <source :srcset="slide.imgSrcSm" media="(min-width:375px)" />
            <!-- 備用圖片，當沒有 <source> 匹配條件時顯示 -->
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
        class="absolute inset-0 z-10 mt-[140px] flex h-[400px] w-full flex-col items-center justify-center px-4 sm:mx-auto sm:my-auto sm:flex-row sm:gap-4 md:gap-6 md:px-20 lg:gap-10"
      >
        <div class="mt-14 flex flex-col items-center justify-center md:mt-0 md:items-start">
          <div class="mb-5 mt-10 text-center font-bold text-primary-300 sm:text-start md:mb-10">
            <!-- 自訂響應式字體 text-[clamp(2rem,5vw,3.5rem)]：2rem：字體最小值，5vw：理想字體大小，3.5rem：字體最大值 -->
            <h2 class="text-[clamp(1.5rem,2vw,2.25rem)]">享樂酒店</h2>
            <h5 class="text-[clamp(1em,1.5vw,2.5rem)]">Enjoyment Luxury Hotel</h5>
          </div>
          <div
            class="my-10 h-[2px] w-[20vw] rotate-90 bg-gradient-to-r from-[#BE9C7C] to-white sm:my-0 sm:w-[32vw] sm:transform-none"
          />
        </div>
        <!-- hero-intro -->
        <div class="hero-intro relative mt-[100px] px-4 text-white sm:mt-[30px] md:mt-[50px]">
          <h1 class="mb-3 text-[clamp(2.5rem,4vw,3rem)] font-bold leading-[1.2em]">
            高雄<br />豪華住宿之選
          </h1>
          <p class="mb-6 text-[clamp(1rem,1.25vw,2.25rem)] font-semibold">
            我們致力為您提供無與倫比的奢華體驗與優質服務
          </p>
          <NuxtLink
            to="/rooms"
            class="btn flex h-14 w-full items-center justify-end gap-4 sm:h-10 lg:h-14"
          >
            <span>立即訂房</span>
            <div
              class="h-[2px] w-[20vw] bg-gradient-to-r from-[white] to-transparent sm:my-0 sm:w-[30vw] md:w-[10vw]"
            />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- News Section -->
    <CardsNews />

    <!-- About Section -->
    <section class="relative -z-10 bg-black py-[200px]">
      <div class="container relative">
        <div class="absolute inset-0 -z-20">
          <picture>
            <!-- 寬度 >= 640px 時優先載入 slide.imgSrc -->
            <source srcset="/images/home-about.png" media="(min-width:640px)" />
            <NuxtImg
              src="/images/home-about.png"
              alt="home-about"
              class="h-100vh inset-0 w-full object-cover"
            />
          </picture>
        </div>
        <div
          class="relative top-[100px] z-10 p-2 text-white sm:top-[150px] md:mx-auto md:mt-20 md:p-20"
        >
          <div
            class="rounded-t-3xl rounded-bl-3xl border border-white bg-gradient-to-b from-black/50 to-primary-300 p-6 backdrop-blur-sm md:p-12"
          >
            <div class="mb-8 flex items-center gap-10 md:mb-12">
              <h2 class="text-[clamp(2rem,3.5vw,2.5rem)] font-bold leading-[1.2em] text-white">
                關於<br />我們
              </h2>
              <div class="h-[2px] w-[165px] bg-gradient-to-r from-[white] to-transparent" />
            </div>
            <div class="space-y-4 text-sm font-medium md:space-y-8">
              <p>
                享樂酒店，位於美麗島高雄的心臟地帶，是這座城市的璀璨瑰寶與傲人地標。
                <br />
                我們的存在，不僅僅是為了提供奢華的住宿體驗，更是為了將高雄的美麗與活力，獻給每一位蒞臨的旅客。
              </p>
              <p>
                我們的酒店，擁有時尚典雅的裝潢，每一個細節都充滿著藝術與設計的精緻。
                <br />
                我們的員工，都以熱情的服務與專業的態度，讓每一位客人都能感受到賓至如歸的溫暖。
              </p>
              <p>
                在這裡，您可以遙望窗外，欣賞高雄的城市景色，感受這座城市的繁華與活力；您也可以舒適地坐在我們的餐廳，品嚐精緻的佳餚，體驗無與倫比的味覺盛宴。
              </p>
              <p>
                享樂酒店，不僅是您在高雄的住宿之選，更是您感受高雄魅力的最佳舞台。我們期待著您的蒞臨，讓我們共同編織一段難忘的高雄故事。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Room Intro Section -->
    <section class="md:py-30 bg-black px-2 py-20">
      <div class="relative flex flex-col gap-6 sm:flex-row">
        <Carousel
          ref="roomSwiper"
          :items-to-show="1"
          :wrap-around="true"
          :transition="1000"
          :autoplay="3000"
          :pause-autoplay-on-hover="true"
          class="sm:w-1/2"
        >
          <Slide v-for="slide in roomSlides" :key="slide.id">
            <picture>
              <source :srcset="slide.imgSrc" media="(min-width:640px)" />
              <source :srcset="slide.imgSrcSm" media="(min-width:375px)" />
              <NuxtImg :src="slide.imgSrcSm" :alt="slide.alt" class="h-100vh w-full object-cover" />
            </picture>
          </Slide>
          <!-- Addons -->
          <template #addons>
            <div class="absolute inset-x-0 bottom-8">
              <Pagination class="custom-pagination" />
            </div>
          </template>
        </Carousel>

        <div class="room-intro self-end sm:w-1/2">
          <div class="flex flex-col px-2 text-white">
            <h2 class="mb-2 text-[clamp(1.75rem,2vw,2rem)] font-bold md:mb-4">尊爵雙人房</h2>
            <p class="mb-6 text-sm md:mb-10">
              享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。
            </p>
            <div class="mb-6 text-[clamp(1.5rem,2vw,2rem)] font-bold md:mb-10">NT$ 10,000</div>
            <NuxtLink to="/rooms" class="btn flex h-12 w-full items-center justify-end gap-4">
              <span>查看更多</span>
              <div class="h-[2px] w-[20vw] bg-gradient-to-r from-[white] to-transparent" />
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
    <section class="transport-intro md:py-30 relative bg-black py-20">
      <div class="container px-8">
        <div class="mb-6 flex items-center gap-10 md:mb-10">
          <h2 class="text-[clamp(2rem,3.5vw,2.5rem)] font-bold leading-[1.2em] text-primary-300">
            交通<br />方式
          </h2>
          <div class="h-[2px] w-[140px] bg-gradient-to-r from-[#BE9C7C] to-black" />
        </div>
        <div class="flex flex-col gap-6">
          <div>
            <p class="mb-4 font-bold text-white">台灣高雄市新興區六角路123號</p>
            <picture>
              <source srcset="/images/home-map.png" media="(min-width:640px)" />
              <source srcset="/images/home-map-sm.png" media="(min-width:375px)" />
              <!-- (max-width: 640px)：螢幕寬度 <= 640px 時，圖片應占據整個視窗寬度的 100% -->
              <!-- 50vw（默認情況）：當視窗寬度 > 640px 時，圖片應該占據視窗寬度的 50% -->
              <NuxtImg
                src="/images/home-map.png"
                alt="描述地圖中酒店所在的位置"
                class="h-100vh w-full object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </picture>
          </div>

          <div class="flex flex-col gap-6 text-white sm:flex-row">
            <div v-for="(method, index) in transportMethods" :key="index">
              <Icon :name="method.icon" class="mb-2 h-12 w-12 text-primary-300 md:mb-4" />
              <h5 class="mb-2 font-bold">
                {{ method.title }}
              </h5>
              <p class="text-sm">
                {{ method.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
