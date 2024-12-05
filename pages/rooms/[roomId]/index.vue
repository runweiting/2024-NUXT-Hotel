<script setup lang="ts">
import { useModal } from 'vue-final-modal'
import ModalConfirmBooking from '~/components/ModalConfirmBooking.vue'

interface RoomDetails {
  name: string
  description: string
  size: number
  bedType: string
  capacity: {
    min: number
    max: number
  }
  features: string[]
  amenities: string[]
  supplies: string[]
  rules: string[]
}
const roomDetails: RoomDetails = {
  name: '尊爵雙人房',
  description: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。',
  size: 24,
  bedType: '1 張大床',
  capacity: { min: 2, max: 4 },
  features: ['市景', '獨立衛浴', '客廳', '書房', '樓層電梯'],
  amenities: [
    '平面電視',
    '吹風機',
    '冰箱',
    '熱水壺',
    '檯燈',
    '衣櫃',
    '除濕機',
    '浴缸',
    '書桌',
    '音響'
  ],
  supplies: [
    '衛生紙',
    '拖鞋',
    '沐浴用品',
    '清潔用品',
    '刮鬍刀',
    '吊衣架',
    '浴巾',
    '刷牙用品',
    '罐裝水',
    '梳子'
  ],
  rules: [
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
}
const imageUrl = '/images/room-a-1.png'
const imageUrlList = [
  '/images/room-a-2.png',
  '/images/room-a-3.png',
  '/images/room-a-4.png',
  '/images/room-a-5.png'
]

const route = useRoute()

const MAX_BOOKING_PEOPLE = 10
const bookingPeople = ref(1)

const formatDate = (date: Date) => {
  const offsetToUTC8 = date.getHours() + 8
  date.setHours(offsetToUTC8)
  return date.toISOString().split('T')[0]
}

const currentDate = new Date()
const bookingDate = reactive({
  date: {
    start: formatDate(currentDate),
    end: null as string | null
  },
  minDate: new Date(),
  maxDate: new Date(currentDate.setFullYear(currentDate.getFullYear() + 1)),
  daysCount: 0
})

const { open, close } = useModal({
  component: ModalConfirmBooking,
  attrs: {
    // 傳入 bookingDate
    dateTime: bookingDate,
    // 當 ModalConfirm 觸發 onConfirm 時，執行此回呼函數
    onConfirm: (bookingInfo: any) => {
      const { start, end } = bookingInfo.date
      bookingDate.date.start = start ?? formatDate(currentDate)
      bookingDate.date.end = end
      bookingDate.daysCount = bookingInfo.daysCount
      close()
    }
  }
})

const openModal = () => {
  open()
}

definePageMeta({
  layout: 'front-layout'
})
</script>

<template>
  <div class="container">
    <div class="hidden p-12 md:block">
      <div class="mb-6 mt-[150px] grid grid-flow-row grid-cols-4 gap-2 overflow-hidden rounded-3xl">
        <div class="col-span-2 row-span-2">
          <picture>
            <!-- 螢幕寬度 >= 768 px，瀏覽器優先載入 :srcset 所指定圖片 -->
            <source :srcset="imageUrl" media="(min-width: 768px)" />
            <!-- <NuxtImg> 提供一個備用圖片，當沒有 <source> 標籤的圖片匹配時，就會顯示這個備用圖片 -->
            <NuxtImg :src="imageUrl" alt="imageUrl" class="h-full w-full object-cover" />
          </picture>
        </div>
        <div v-for="(image, index) in imageUrlList" :key="index" class="w-full overflow-hidden">
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
        :src="imageUrl"
        alt="Room Main Image"
        class="mb-4 h-[300px] w-full rounded-xl object-cover"
      />
    </div>

    <!-- Room Details Section -->
    <div class="relative flex gap-8 p-12">
      <div class="flex-1 text-black">
        <h1 class="mb-4 text-4xl font-bold">
          {{ roomDetails.name }}
        </h1>
        <p class="mb-20">
          {{ roomDetails.description }}
        </p>

        <!-- Basic Room Info -->
        <section class="mb-20">
          <h3 class="room-title-deco relative mb-4 ps-4 text-2xl font-bold">房型基本資訊</h3>
          <div class="flex flex-row space-x-4">
            <div
              v-for="(info, index) in [
                { icon: 'relative-scale', text: `${roomDetails.size} 坪` },
                { icon: 'bed-king', text: roomDetails.bedType },
                {
                  icon: 'account',
                  text: `${roomDetails.capacity.min}-${roomDetails.capacity.max} 人`
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
            <div v-for="(feature, index) in roomDetails.features" :key="index" class="flex gap-2">
              <Icon name="mdi:check" class="text-2xl text-primary-300" />
              <p class="font-bold">{{ feature }}</p>
            </div>
          </div>
        </section>

        <!-- Room Amenities -->
        <section class="mb-20">
          <h3 class="room-title-deco relative mb-4 ps-4 text-2xl font-bold">房間設備</h3>
          <div class="grid grid-cols-4 gap-4 rounded-lg bg-white p-4 drop-shadow-sm">
            <div v-for="(amenity, index) in roomDetails.amenities" :key="index" class="flex gap-2">
              <Icon name="mdi:check" class="text-2xl text-primary-300" />
              <p class="font-bold">{{ amenity }}</p>
            </div>
          </div>
        </section>

        <!-- Room Supplies -->
        <section class="mb-20">
          <h3 class="room-title-deco relative mb-4 ps-4 text-2xl font-bold">備品提供</h3>
          <div class="grid grid-cols-4 gap-4 rounded-lg bg-white p-4 drop-shadow-sm">
            <div v-for="(supply, index) in roomDetails.supplies" :key="index" class="flex gap-2">
              <Icon name="mdi:check" class="text-2xl text-primary-300" />
              <p class="font-bold">{{ supply }}</p>
            </div>
          </div>
        </section>

        <!-- Room Rules -->
        <section class="mb-20">
          <h3 class="room-title-deco relative mb-4 ps-4 text-2xl font-bold">訂房須知</h3>
          <ol v-for="(rule, index) in roomDetails.rules" :key="index" class="flex gap-2">
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
        <h2 class="mb-4 text-4xl font-bold">{{ roomDetails.name }}</h2>
        <p class="mb-4">{{ roomDetails.description }}</p>
        <div class="mb-10 flex items-center space-x-2">
          <Icon name="mdi:alert-decagram" class="h-4 w-4 text-primary-300" />
          <p class="text-sm text-black">此房型最多供 4 人居住，不接受寵物入住。</p>
        </div>
        <div class="mb-4 flex flex-col gap-4">
          <div class="flex-1">
            <label for="checkinInput" class="block text-sm font-medium text-gray-700"> 入住 </label>
            <input
              id="checkinInput"
              readonly
              type="text"
              :value="bookingDate.date.start"
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
              :value="bookingDate.date.end"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              @click="openModal"
            />
          </div>
        </div>

        <div class="mb-2 flex items-center justify-between">
          <span>入住天數</span>
          <span class="font-bold">{{ bookingDate.daysCount }} 晚</span>
        </div>
        <div class="mb-10 flex items-center justify-between">
          <span>人數</span>
          <div class="flex items-center gap-4">
            <button @click="bookingPeople > 1 && bookingPeople--">
              <Icon name="mdi:minus-circle" class="h-6 w-6 font-bold text-primary-300" />
            </button>
            <span class="font-bold">{{ bookingPeople }}</span>
            <button @click="bookingPeople < MAX_BOOKING_PEOPLE && bookingPeople++">
              <Icon name="mdi:plus-circle" class="h-6 w-6 text-primary-300" />
            </button>
          </div>
        </div>

        <div>
          <p class="mb-10 text-2xl font-bold text-primary-300">NT$ 10,000</p>
          <NuxtLink :to="`/rooms/${route.params.roomId}/booking`" class="btn block w-full">
            立即預訂
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
