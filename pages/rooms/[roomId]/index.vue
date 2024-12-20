<script setup lang="ts">
import { useModal } from 'vue-final-modal'
import ModalConfirmBooking from '~/components/ModalConfirmBooking.vue'
import type { DateTimeProps } from '~/types/Orders'
import { date2LocaleString } from '~/utils/date2LocaleString'
import { getNightsNum } from '~/utils/getNightsNum'

const roomRules = [
  '入住時間為下午3點，退房時間為上午12點。',
  '如需延遲退房，請提前與櫃檯人員聯繫，視當日房況可能會產生額外費用。',
  '請勿在房間內抽煙，若有抽煙需求，可以使用設在酒店各樓層的專用吸煙區。',
  '若發現房間內的設施有損壞或遺失，將會按照價值收取賠償金。',
  '請愛惜我們的房間與公共空間，並保持整潔。',
  '如需額外的毛巾、盥洗用品或其他物品，請聯繫櫃檯。',
  '我們提供免費的Wi-Fi，密碼可以在櫃檯或是房間內的資訊卡上找到。',
  '請勿帶走酒店房內的物品，如有需要購買，請與我們的櫃檯人員聯繫。',
  '我們提供24小時櫃檯服務，若有任何需求或疑問，歡迎隨時詢問。',
  '請勿在走廊或公共區域大聲喧嘩，並遵守酒店的其他規定。'
]

const route = useRoute()
const roomId = route.params.roomId as string
const { getRoomItem } = useRoom()
const { room, hasError, isLoading, refresh } = await getRoomItem(roomId)
const orderStore = useOrderStore()

// 定義資料狀態
const currentDate = new Date()
const showBookingBtn = ref(false)

onMounted(() => {
  // 初始化時清空狀態
  orderStore.resetState()
})

// 定義 Modal
const { open, close } = useModal({
  component: ModalConfirmBooking,
  attrs: {
    // 傳入 dateTime 其值為 bookingDate
    dateTime: orderStore.bookingDate as DateTimeProps,
    maxPeople: room.value.maxPeople as number,
    // 當 ModalConfirm 觸發 onConfirm 時，執行此回呼函數
    onConfirm: (bookingInfo: DateTimeProps) => {
      const { start, end } = bookingInfo.date
      if (orderStore.bookingDate) {
        const nightsNum = getNightsNum(start, end)
        // 更新 orderStore 中的 bookingDate
        orderStore.bookingDate.date.start = start ?? date2LocaleString(currentDate)
        orderStore.bookingDate.date.end = end
        orderStore.bookingDate.nightsNum = nightsNum
      }
      showBookingBtn.value = true
      close()
    },
    onClose: () => {
      close()
    }
  }
})

const openModal = () => {
  open()
}

useHeadSafe({
  title: '房型介紹'
})
</script>

<template>
  <div>
    <FetchDataLoading v-if="isLoading" />
    <div v-else-if="hasError" class="flex items-center space-x-4">
      <p class="text-lg font-bold text-primary-500">
        Failed to load room information. Please try again.
      </p>
      <button type="button" class="btn" @click="refresh()">Retry</button>
    </div>
    <!-- md: Hero Section -->
    <div v-else class="hidden px-12 pt-12 md:block">
      <div class="mb-6 mt-[122px] grid grid-flow-row grid-cols-4 gap-2 overflow-hidden rounded-3xl">
        <div class="col-span-2 row-span-2">
          <picture class="h-[460px]">
            <source :srcset="room.imageUrl" media="(min-width: 640px)" />
            <NuxtImg
              :src="room.imageUrl"
              alt="imageUrl"
              class="w-full object-cover md:h-[300px] lg:h-[400px]"
            />
          </picture>
        </div>
        <div
          v-for="(image, index) in room.imageUrlList"
          :key="index"
          class="w-full overflow-hidden"
        >
          <picture>
            <source :srcset="image" media="(min-width: 640px)" />
            <NuxtImg
              :src="image"
              :alt="`room-image-${index}`"
              class="w-full object-cover md:h-[146px] lg:h-[196px]"
            />
          </picture>
        </div>
      </div>
    </div>

    <!-- sm: Hero Section -->
    <div class="mt-[72px] md:hidden">
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
            <source :srcset="room.imageUrlList[n]" media="(min-width: 640px)" />
            <NuxtImg
              :src="room.imageUrlList[n]"
              :alt="`room-${room.name}-${n}`"
              class="h-[240px] w-full object-cover transition-transform sm:h-[400px] md:h-[457px]"
              loading="lazy"
            />
          </picture>
        </Slide>
        <template #addons>
          <Navigation class="hidden h-12 w-12 rounded-full bg-white text-primary-700 sm:flex" />
          <div class="absolute inset-x-0 bottom-3">
            <Pagination class="custom-pagination" />
          </div>
        </template>
      </Carousel>
    </div>

    <!-- Room Intro Section -->
    <div class="relative px-4 py-10 sm:flex sm:p-10 md:gap-4 lg:gap-8 xl:gap-12 xl:p-12">
      <!-- Room Details -->
      <div class="flex flex-col space-y-8 text-black sm:w-7/12 sm:flex-1 sm:space-y-10">
        <div>
          <h1 class="mb-2 text-[clamp(1.75rem,3vw,2.5rem)] font-bold">
            {{ room.name }}
          </h1>
          <p>
            {{ room.description }}
          </p>
        </div>

        <!-- Basic Room Info -->
        <section>
          <h3 class="room-title-deco relative mb-4 ps-4 text-lg font-bold sm:text-xl">
            房型基本資訊
          </h3>
          <ul class="flex gap-4 lg:gap-4">
            <li
              class="aspect-square w-1/3 rounded-lg bg-white p-4 sm:w-1/5 md:w-1/3 lg:w-1/5 lg:p-3"
            >
              <Icon name="fluent:slide-size-24-filled" class="mb-2 text-xl text-primary-300" />
              <p class="text-sm font-medium sm:text-base">
                {{ room.areaInfo }}
              </p>
            </li>
            <li
              class="aspect-square w-1/3 rounded-lg bg-white p-4 sm:w-1/5 md:w-1/3 lg:w-1/5 lg:p-3"
            >
              <Icon name="material-symbols:king-bed" class="mb-2 text-xl text-primary-300" />
              <p class="text-sm font-medium sm:text-base">
                {{ room.bedInfo }}
              </p>
            </li>
            <li
              class="aspect-square w-1/3 rounded-lg bg-white p-4 sm:w-1/5 md:w-1/3 lg:w-1/5 lg:p-3"
            >
              <Icon name="ic:baseline-person" class="mb-2 text-xl text-primary-300" />
              <p class="text-sm font-medium sm:text-base">{{ room.maxPeople }}人</p>
            </li>
          </ul>
        </section>

        <!-- Room Features -->
        <section>
          <h3 class="room-title-deco relative mb-4 ps-4 text-lg font-bold sm:text-xl">房間格局</h3>
          <div
            class="grid grid-cols-3 gap-2 rounded-lg bg-white p-4 drop-shadow-sm sm:grid-cols-4 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
          >
            <div v-for="(feature, index) in room.layoutInfo" :key="index" class="flex gap-2">
              <Icon v-if="feature.isProvide" name="mdi:check" class="text-2xl text-primary-300" />
              <Icon v-else name="mdi:close" class="text-2xl text-primary-300" />
              <p class="font-medium">{{ feature.title }}</p>
            </div>
          </div>
        </section>

        <!-- Room Amenities -->
        <section>
          <h3 class="room-title-deco relative mb-4 ps-4 text-lg font-bold sm:text-xl">房間設備</h3>
          <div
            class="grid grid-cols-3 gap-2 rounded-lg bg-white p-4 drop-shadow-sm sm:grid-cols-4 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
          >
            <div v-for="(facility, index) in room.facilityInfo" :key="index" class="flex gap-2">
              <Icon v-if="facility.isProvide" name="mdi:check" class="text-2xl text-primary-300" />
              <Icon v-else name="mdi:close" class="text-2xl text-primary-300" />
              <p class="font-medium">{{ facility.title }}</p>
            </div>
          </div>
        </section>

        <!-- Room Supplies -->
        <section>
          <h3 class="room-title-deco relative mb-4 ps-4 text-lg font-bold sm:text-xl">備品提供</h3>
          <div
            class="grid grid-cols-3 gap-2 rounded-lg bg-white p-4 drop-shadow-sm sm:grid-cols-4 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
          >
            <div v-for="(amenity, index) in room.amenityInfo" :key="index" class="flex gap-2">
              <Icon v-if="amenity.isProvide" name="mdi:check" class="text-2xl text-primary-300" />
              <Icon v-else name="mdi:close" class="text-2xl text-primary-300" />
              <p class="font-medium">{{ amenity.title }}</p>
            </div>
          </div>
        </section>

        <!-- Room Rules -->
        <section>
          <h3 class="room-title-deco relative mb-4 ps-4 text-lg font-bold sm:text-xl">訂房須知</h3>
          <ol class="list-decimal space-y-1 pl-6">
            <li v-for="(rule, index) in roomRules" :key="index" class="leading-relaxed">
              {{ rule }}
            </li>
          </ol>
        </section>
      </div>

      <!-- sm: Booking Sidebar -->
      <div
        class="fixed bottom-0 left-0 right-0 z-50 border border-t-primary-100 bg-white p-4 shadow-xl shadow-primary-300 md:hidden"
      >
        <div v-if="!showBookingBtn" class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <small>NT$</small>
            <p class="font-bold">{{ room.formattedPrice }} / 晚</p>
          </div>
          <button class="btn w-1/2" @click="openModal">查看日期</button>
        </div>
        <div v-else>
          <div class="flex flex-col">
            <h3
              class="room-title-deco-sm relative mb-2 flex items-center justify-between ps-4 font-medium"
            >
              預訂詳情
            </h3>
            <div class="mb-4 flex flex-col gap-1">
              <div class="flex items-center justify-between">
                <span
                  >{{ orderStore.bookingDate?.date.start }} ~
                  {{ orderStore.bookingDate?.date.end }}</span
                >
                <span>{{ orderStore.peopleNum }} 人</span>
              </div>
              <div class="flex items-center justify-between">
                <span
                  >NT$ {{ room.formattedPrice }} x {{ orderStore.bookingDate?.nightsNum }} 晚</span
                >
                <span v-formatPrice="(orderStore.bookingDate?.nightsNum ?? 1) * room.price"></span>
              </div>
            </div>
            <NuxtLink :to="`/rooms/${route.params.roomId}/confirmation`" class="btn w-full">
              立即預訂
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- md: Booking Sidebar -->
      <div
        class="sticky top-[150px] hidden self-start rounded-xl border bg-white p-8 shadow shadow-primary-300 sm:w-5/12 md:block"
      >
        <h2 class="mb-4 font-medium">預訂房型</h2>
        <div class="mb-8 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-white" />
        <h2 class="mb-4 text-2xl font-bold">{{ room.name }}</h2>
        <p class="mb-2">{{ room.description }}</p>
        <div class="mb-4 flex items-center space-x-2">
          <Icon name="mdi:alert-decagram" class="h-4 w-4 text-primary-300" />
          <small class="text-black">最多 {{ room.maxPeople }} 人入住，不接受寵物。</small>
        </div>
        <div class="mb-4 flex flex-col gap-2">
          <div class="flex-1">
            <label for="checkinInput" class="block text-sm font-medium text-gray-700"> 入住 </label>
            <input
              id="checkinInput"
              readonly
              type="text"
              :value="orderStore.bookingDate?.date.start"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              @click="openModal"
            />
          </div>

          <div class="flex-1">
            <label for="checkoutInput" class="block text-sm font-medium text-gray-700">
              退房
            </label>
            <input
              id="checkoutInput"
              readonly
              type="text"
              :value="orderStore.bookingDate?.date.end"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              @click="openModal"
            />
          </div>
        </div>

        <div class="mb-2 flex items-center justify-between">
          <span>入住天數</span>
          <span class="font-bold">{{ orderStore.bookingDate?.nightsNum }} 晚</span>
        </div>
        <div class="mb-8 flex items-center justify-between">
          <span>人數</span>
          <div class="flex items-center gap-4">
            <button @click="orderStore.peopleNum > 1 && orderStore.peopleNum--">
              <Icon name="mdi:minus-circle" class="h-6 w-6 font-bold text-primary-300" />
            </button>
            <span class="font-bold">{{ orderStore.peopleNum }}</span>
            <button @click="orderStore.peopleNum < room.maxPeople && orderStore.peopleNum++">
              <Icon name="mdi:plus-circle" class="h-6 w-6 text-primary-300" />
            </button>
          </div>
        </div>

        <div>
          <div class="mb-2 flex items-center justify-between">
            <span class="text-black">一晚</span>
            <div class="flex items-end space-x-4">
              <span>NT$</span>
              <p class="text-xl font-bold">{{ room.formattedPrice }}</p>
            </div>
          </div>
          <div class="mb-10 flex items-center justify-between">
            <span class="text-black">小計</span>
            <div class="flex items-end space-x-4">
              <span>NT$</span>
              <p
                v-formatPrice="(orderStore.bookingDate?.nightsNum ?? 1) * room.price"
                class="text-xl font-bold"
              ></p>
            </div>
          </div>
          <NuxtLink :to="`/rooms/${route.params.roomId}/confirmation`" class="btn block w-full">
            立即預訂
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
