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
  <div class="container">
    <FetchDataLoading v-if="isLoading" />
    <div v-else-if="hasError" class="flex items-center space-x-4">
      <p class="text-lg font-bold text-primary-500">
        Failed to load room information. Please try again.
      </p>
      <button type="button" class="btn" @click="refresh()">Retry</button>
    </div>
    <div v-else class="hidden p-12 md:block">
      <div class="mb-6 mt-[150px] grid grid-flow-row grid-cols-4 gap-2 overflow-hidden rounded-3xl">
        <div class="col-span-2 row-span-2">
          <picture>
            <!-- 螢幕寬度 >= 768 px，瀏覽器優先載入 :srcset 所指定圖片 -->
            <source :srcset="room.imageUrl" media="(min-width: 768px)" />
            <!-- <NuxtImg> 提供一個備用圖片，當沒有 <source> 標籤的圖片匹配時，就會顯示這個備用圖片 -->
            <NuxtImg :src="room.imageUrl" alt="imageUrl" class="h-full w-full object-cover" />
          </picture>
        </div>
        <div
          v-for="(image, index) in room.imageUrlList"
          :key="index"
          class="w-full overflow-hidden"
        >
          <picture>
            <!-- 螢幕寬度 >= 768 px，瀏覽器優先載入 :srcset 所指定圖片 -->
            <source :srcset="image" media="(min-width: 768px)" />
            <!-- <NuxtImg> 提供一個備用圖片，當沒有 <source> 標籤的圖片匹配時，就會顯示這個備用圖片 -->
            <NuxtImg :src="image" :alt="`room-image-${index}`" class="h-full w-full object-cover" />
          </picture>
        </div>
      </div>
    </div>

    <!-- Mobile Image View -->
    <div class="md:hidden">
      <NuxtImg
        :src="room.imageUrl"
        alt="Room Main Image"
        class="mb-4 h-[300px] w-full rounded-xl object-cover"
      />
    </div>

    <!-- Room Details Section -->
    <div class="relative flex gap-8 p-12">
      <div class="flex-1 text-black">
        <h1 class="mb-4 text-4xl font-bold">
          {{ room.name }}
        </h1>
        <p class="mb-20">
          {{ room.description }}
        </p>

        <!-- Basic Room Info -->
        <section class="mb-20">
          <h3 class="room-title-deco relative mb-4 ps-4 text-2xl font-bold">房型基本資訊</h3>
          <div class="flex flex-row space-x-4">
            <div
              v-for="(info, index) in [
                { icon: 'relative-scale', text: `${room.areaInfo} 坪` },
                { icon: 'bed-king', text: room.bedInfo },
                {
                  icon: 'account',
                  text: `最多 ${room.maxPeople}人`
                }
              ]"
              :key="index"
              class="h-[97px] w-[97px] rounded-lg bg-white p-4 text-center drop-shadow-sm"
            >
              <Icon :name="`mdi:${info.icon}`" class="mx-auto mb-2 text-2xl text-primary-300" />
              <p class="font-bold">{{ info.text }}</p>
            </div>
          </div>
        </section>

        <!-- Room Features -->
        <section class="mb-20">
          <h3 class="room-title-deco relative mb-4 ps-4 text-2xl font-bold">房間格局</h3>
          <div class="grid grid-cols-4 gap-4 rounded-lg bg-white p-4 drop-shadow-sm">
            <div v-for="(feature, index) in room.layoutInfo" :key="index" class="flex gap-2">
              <Icon v-if="feature.isProvide" name="mdi:check" class="text-2xl text-primary-300" />
              <Icon v-else name="mdi:close" class="text-2xl text-primary-300" />
              <p class="font-bold">{{ feature.title }}</p>
            </div>
          </div>
        </section>

        <!-- Room Amenities -->
        <section class="mb-20">
          <h3 class="room-title-deco relative mb-4 ps-4 text-2xl font-bold">房間設備</h3>
          <div class="grid grid-cols-4 gap-4 rounded-lg bg-white p-4 drop-shadow-sm">
            <div v-for="(facility, index) in room.facilityInfo" :key="index" class="flex gap-2">
              <Icon v-if="facility.isProvide" name="mdi:check" class="text-2xl text-primary-300" />
              <Icon v-else name="mdi:close" class="text-2xl text-primary-300" />
              <p class="font-bold">{{ facility.title }}</p>
            </div>
          </div>
        </section>

        <!-- Room Supplies -->
        <section class="mb-20">
          <h3 class="room-title-deco relative mb-4 ps-4 text-2xl font-bold">備品提供</h3>
          <div class="grid grid-cols-4 gap-4 rounded-lg bg-white p-4 drop-shadow-sm">
            <div v-for="(amenity, index) in room.amenityInfo" :key="index" class="flex gap-2">
              <Icon v-if="amenity.isProvide" name="mdi:check" class="text-2xl text-primary-300" />
              <Icon v-else name="mdi:close" class="text-2xl text-primary-300" />
              <p class="font-bold">{{ amenity.title }}</p>
            </div>
          </div>
        </section>

        <!-- Room Rules -->
        <section class="mb-20">
          <h3 class="room-title-deco relative mb-4 ps-4 text-2xl font-bold">訂房須知</h3>
          <ol v-for="(rule, index) in roomRules" :key="index" class="flex gap-2">
            <li class="leading-normal">{{ index + 1 }}. {{ rule }}</li>
          </ol>
        </section>
      </div>

      <!-- Booking Sidebar -->
      <div
        class="sticky top-[150px] w-[500px] self-start rounded-xl border bg-white p-10 shadow shadow-primary-300"
      >
        <h2 class="mb-4 text-2xl font-bold">預訂房型</h2>
        <div class="mb-10 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-white" />
        <h2 class="mb-4 text-4xl font-bold">{{ room.name }}</h2>
        <p class="mb-4">{{ room.description }}</p>
        <div class="mb-10 flex items-center space-x-2">
          <Icon name="mdi:alert-decagram" class="h-4 w-4 text-primary-300" />
          <p class="text-sm text-black">
            此房型最多供 {{ room.maxPeople }} 人居住，不接受寵物入住。
          </p>
        </div>
        <div class="mb-4 flex flex-col gap-4">
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
        <div class="mb-10 flex items-center justify-between">
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
