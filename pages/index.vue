<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'

interface newsItem {
  id: number
  title: string
  content: string
  imgSrc: string
  imgSrcSm: string
  alt: string
}
interface BusinessHours {
  days: string
  hours: string
}
interface RestaurantsItem {
  id: number
  name: string
  time: BusinessHours
  description: string
  imgSrc: string
  imgSrcSm: string
}
interface TransportMethod {
  icon: string
  title: string
  description: string
}
const news: newsItem[] = [
  {
    id: 1,
    title: '秋季旅遊，豪華享受方案',
    content:
      '秋天就是要來場豪華的旅遊！我們為您準備了一系列的秋季特別方案，包括舒適的住宿、美食饗宴，以及精彩的活動。不論您是想來一趟浪漫之旅，還是想和家人共度美好時光，都能在這裡找到最適合的方案。',
    imgSrc: '/images/home-news-1.png',
    imgSrcSm: '/images/home-news-sm-1.png',
    alt: '可看見海景及泳池的套房'
  },
  {
    id: 2,
    title: '輕鬆住房專案',
    content:
      '我們知道，有時候您只是需要一個舒適的地方放鬆心情。因此，我們推出了「輕鬆住房專案」，讓您無壓力地享受住宿。不管是短期的休息，還是長期的住宿，我們都會以最貼心的服務，讓您感到賓至如歸。',
    imgSrc: '/images/home-news-2.png',
    imgSrcSm: '/images/home-news-sm-2.png',
    alt: '在雙人床上的兩顆灰色枕頭'
  },
  {
    id: 3,
    title: '耶誕快樂，住房送禮',
    content:
      '聖誕節來臨，我們為您準備了特別的禮物！在聖誕期間訂房，不僅有特別優惠，還會送上我們精心準備的聖誕禮物。讓我們一起慶祝這個溫馨的節日吧！',
    imgSrc: '/images/home-news-3.png',
    imgSrcSm: '/images/home-news-sm-3.png',
    alt: '坐在沙發上的聖誕麋鹿玩偶'
  }
]
const restaurants: RestaurantsItem[] = [
  {
    id: 1,
    name: '海霸',
    time: {
      days: 'SUN-MON',
      hours: '11:00 - 20:30'
    },
    description:
      '以新鮮海產料理聞名，我們的專業廚師選用高雄當地的海鮮，每一道菜都充滿海洋的鮮美與清甜。無論是烤魚、蒸蝦還是煮蛤蜊，都能讓您品嚐到最新鮮的海洋風味。',
    imgSrc: '/images/home-food-1.png',
    imgSrcSm: '/images/home-food-sm-1.png'
  },
  {
    id: 2,
    name: '日食',
    time: {
      days: 'SUN-MON',
      hours: '17:00 - 22:00'
    },
    description:
      '為您提供優質的牛排，每一塊肉都來自頂級的牛肉，經過專業廚師的巧手烹調，口感豐滿、風味絕佳。搭配我們的特製醬料，讓您的味蕾享受一場美味的盛宴。',
    imgSrc: '/images/home-food-2.png',
    imgSrcSm: '/images/home-food-sm-2.png'
  },
  {
    id: 3,
    name: '山臻',
    time: {
      days: 'SUN-MON',
      hours: '11:30 - 20:30'
    },
    description:
      '帶您進入一次辣味與鮮香兼具的川菜美食之旅。我們的廚師掌握正宗的川菜烹調技巧，從麻辣鍋到口水雞，每一道菜都有其獨特的風味，讓您回味無窮。',
    imgSrc: '/images/home-food-3.png',
    imgSrcSm: '/images/home-food-sm-3.png'
  },
  {
    id: 4,
    name: '月永',
    time: {
      days: 'SUN-MON',
      hours: '11:00 - 20:00'
    },
    description:
      '從鮮美的海鮮、經典的牛排，到各國的特色美食，我們都一應俱全。在這裡，您可以品嚐到世界各地的美食，每一道菜都由專業廚師用心製作，讓您在享受美食的同時，也能感受到我們的熱情與用心。',
    imgSrc: '/images/home-food-4.png',
    imgSrcSm: '/images/home-food-sm-4.png'
  },
  {
    id: 5,
    name: '天潮',
    time: {
      days: 'SUN-MON',
      hours: '14:00 - 19:30'
    },
    description:
      '我們提供各種精緻甜點與糕點，無論您喜歡的是巧克力蛋糕、法式馬卡龍，還是台灣傳統的糕點，都能在這裡找到。讓我們的甜點帶您進入一場繽紛的甜蜜旅程。',
    imgSrc: '/images/home-food-5.png',
    imgSrcSm: '/images/home-food-sm-5.png'
  }
]
const transportMethods: TransportMethod[] = [
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
const heroSwiper = ref()
const roomSwiper = ref()
const restaurantSwiper = ref()

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
const restaurantSlides = Array(5)
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
    <section class="news-intro md:py-30 relative bg-primary-50 p-20">
      <div class="container">
        <div class="grid grid-flow-col grid-rows-3 gap-10">
          <div class="row-span-3">
            <h2 class="mb-6 text-5xl font-bold text-primary-300 md:mb-10">最新<br />消息</h2>
            <div class="h-[2px] w-[140px] bg-gradient-to-r from-[#BE9C7C] to-white" />
          </div>
          <div v-for="item in news" :key="item.id" class="flex flex-col border-0 bg-transparent">
            <div class="flex items-center gap-6 md:flex-row">
              <picture class="w-full flex-shrink-0 md:w-[44%]">
                <source :srcset="item.imgSrc" media="(min-width: 576px)" />
                <NuxtImg :src="item.imgSrcSm" :alt="item.alt" class="w-full rounded-lg" />
              </picture>
              <div class="text-primary-900">
                <h3 class="mb-2 text-3xl font-bold md:mb-6">{{ item.title }}</h3>
                <p class="text-sm font-medium md:text-base">
                  {{ item.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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
    <section class="md:py-30 relative bg-primary-50 p-20">
      <div class="delicacy-intro container">
        <div class="mb-10 flex items-center gap-10 md:mb-20">
          <h2 class="mb-0 text-4xl font-bold text-primary-300">佳餚<br />美饌</h2>
          <div class="h-0.5 w-20 bg-primary-100"></div>
        </div>

        <Carousel
          :items-to-show="2"
          :wrap-around="true"
          :transition="1500"
          :autoplay="3000"
          :pause-autoplay-on-hover="true"
          class="overflow-x-visible"
        >
          <Slide v-for="restaurant in restaurants" :key="restaurant.id" class="px-2">
            <div class="group relative rounded-3xl border-0">
              <picture>
                <source :srcset="restaurant.imgSrc" media="(min-width:576px)" />
                <NuxtImg
                  :src="restaurant.imgSrcSm"
                  :alt="restaurant.name"
                  class="h-auto w-full rounded-3xl object-cover transition-transform"
                />
              </picture>
              <div
                class="absolute bottom-0 w-full rounded-b-3xl bg-black bg-opacity-60 p-4 text-white md:p-6"
              >
                <div class="mb-4 flex justify-between md:mb-6">
                  <h5 class="text-lg font-bold">{{ restaurant.name }}</h5>
                  <div class="text-neutral-40 flex gap-4 text-xs">
                    <span class="font-bold">{{ restaurant.time.days }}</span>
                    <span class="font-bold">{{ restaurant.time.hours }}</span>
                  </div>
                </div>
                <p class="text-xs md:text-sm">
                  {{ restaurant.description }}
                </p>
              </div>
            </div>
          </Slide>
        </Carousel>
      </div>
    </section>

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
