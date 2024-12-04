<script setup lang="ts">
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

const route = useRoute()
const router = useRouter()
const isLoading = ref(false)

const confirmBooking = () => {
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
    router.push(
      `/rooms/${route.params.roomId}/confirmation/HH2302183151222`
      // {
      //   name: 'confirmation',
      //   params: {
      //     bookingId: 'HH2302183151222'
      //   }
      // }
    )
  }, 1500)
}

const goBack = () => {
  router.back()
}

definePageMeta({
  layout: 'front-layout'
})
</script>

<template>
  <div class="container p-12">
    <section class="md:py-30 mb-6 mt-[150px] py-10 text-black">
      <div>
        <button
          class="mb-10 flex items-center gap-2 border-0 bg-transparent"
          type="button"
          @click="goBack"
        >
          <Icon name="mdi:keyboard-arrow-left" class="h-8 w-8" />
          <h1 class="mb-0 text-2xl font-bold">確認訂房資訊</h1>
        </button>

        <div class="grid gap-16 md:grid-cols-12">
          <div class="md:col-span-7">
            <!-- Room Info Section -->
            <section>
              <h2 class="mb-8 text-lg font-bold md:mb-10 md:text-2xl">訂房資訊</h2>
              <div class="flex flex-col gap-6">
                <!-- Room Type -->
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="room-title-deco relative mb-2 pl-4 text-xl font-bold">選擇房型</h3>
                    <p class="mb-0 font-medium">尊爵雙人房</p>
                  </div>
                  <button class="border-0 bg-transparent font-bold underline">編輯</button>
                </div>

                <!-- Booking Dates -->
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="room-title-deco relative mb-2 pl-4 text-xl font-bold">訂房日期</h3>
                    <p class="mb-2 font-medium">入住：12 月 4 日星期二</p>
                    <p class="mb-0 font-medium">退房：12 月 6 日星期三</p>
                  </div>
                  <button class="border-0 bg-transparent font-bold underline">編輯</button>
                </div>

                <!-- Guest Count -->
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="room-title-deco relative mb-2 pl-4 text-xl font-bold">房客人數</h3>
                    <p class="mb-0 font-medium">2 人</p>
                  </div>
                  <button class="border-0 bg-transparent font-bold underline">編輯</button>
                </div>

                <div class="my-5 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-primary-50" />

                <!-- Guest info -->
                <div class="flex items-center justify-between">
                  <h2 class="text-lg font-bold md:text-2xl">訂房人資訊</h2>
                  <button
                    type="button"
                    class="border-0 bg-transparent font-bold text-primary-300 underline"
                  >
                    套用會員資料
                  </button>
                </div>
                <FormsBookingForm />

                <div class="my-5 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-primary-50" />

                <!-- Basic Room Info -->
                <section class="mb-5">
                  <h3 class="room-title-deco relative mb-4 ps-4 text-2xl font-bold">
                    房型基本資訊
                  </h3>
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
                      <Icon
                        :name="`mdi:${info.icon}`"
                        class="mx-auto mb-2 text-2xl text-primary-300"
                      />
                      <p class="font-bold">{{ info.text }}</p>
                    </div>
                  </div>
                </section>

                <!-- Room Features -->
                <section class="mb-5">
                  <h3 class="room-title-deco relative mb-4 ps-4 text-2xl font-bold">房間格局</h3>
                  <div class="grid grid-cols-4 gap-4 rounded-lg bg-white p-4 drop-shadow-sm">
                    <div
                      v-for="(feature, index) in roomDetails.features"
                      :key="index"
                      class="flex gap-2"
                    >
                      <Icon name="mdi:check" class="text-2xl text-primary-300" />
                      <p class="font-bold">{{ feature }}</p>
                    </div>
                  </div>
                </section>

                <!-- Room Amenities -->
                <section class="mb-5">
                  <h3 class="room-title-deco relative mb-4 ps-4 text-2xl font-bold">房間設備</h3>
                  <div class="grid grid-cols-4 gap-4 rounded-lg bg-white p-4 drop-shadow-sm">
                    <div
                      v-for="(amenity, index) in roomDetails.amenities"
                      :key="index"
                      class="flex gap-2"
                    >
                      <Icon name="mdi:check" class="text-2xl text-primary-300" />
                      <p class="font-bold">{{ amenity }}</p>
                    </div>
                  </div>
                </section>

                <!-- Room Supplies -->
                <section>
                  <h3 class="room-title-deco relative mb-4 ps-4 text-2xl font-bold">備品提供</h3>
                  <div class="grid grid-cols-4 gap-4 rounded-lg bg-white p-4 drop-shadow-sm">
                    <div
                      v-for="(supply, index) in roomDetails.supplies"
                      :key="index"
                      class="flex gap-2"
                    >
                      <Icon name="mdi:check" class="text-2xl text-primary-300" />
                      <p class="font-bold">{{ supply }}</p>
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </div>

          <div class="md:col-span-5">
            <div class="sticky rounded-3xl bg-white p-6 text-black md:top-40 md:p-10">
              <div class="mb-3 overflow-hidden rounded-xl">
                <picture>
                  <!-- 螢幕寬度 >= 768 px，瀏覽器優先載入 :srcset 所指定圖片 -->
                  <source :srcset="imageUrl" media="(min-width: 768px)" />
                  <!-- <NuxtImg> 提供一個備用圖片，當沒有 <source> 標籤的圖片匹配時，就會顯示這個備用圖片 -->
                  <NuxtImg :src="imageUrl" alt="imageUrl" class="h-full w-full object-cover" />
                </picture>
              </div>
              <h2 class="mb-6 text-lg font-bold md:text-2xl">價格詳情</h2>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>NT$ 10,000 × 2 晚</div>
                  <div>NT$ 20,000</div>
                </div>
                <div class="flex items-center justify-between">
                  <div>住宿折扣</div>
                  <div class="text-primary-300">-NT$ 1,000</div>
                </div>
                <hr class="border-primary-300" />
                <div class="flex items-center justify-between font-bold">
                  <div>總價</div>
                  <div>NT$ 19,000</div>
                </div>
              </div>
              <button class="btn mt-6 w-full py-4" @click="confirmBooking">確認訂房</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <BookingLoading v-if="isLoading" />
  </div>
</template>

<style scoped></style>
