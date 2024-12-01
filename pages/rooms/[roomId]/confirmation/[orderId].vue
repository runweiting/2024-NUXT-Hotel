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
const { orderId } = route.params
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
  layout: 'order-layout'
})
</script>

<template>
  <div class="container p-12 text-white">
    <section class="md:py-30 mb-6 mt-[150px] py-10">
      <div class="grid gap-16 md:grid-cols-12">
        <div class="md:col-span-7">
          <!-- Success Message Section -->
          <div class="flex flex-col items-start justify-center p-10">
            <div class="mb-10 flex items-center justify-center space-x-5">
              <Icon class="h-10 w-10 rounded-full bg-green-500" icon="material-symbols:check" />
              <div class="flex flex-col space-y-2 font-bold">
                <h1 class="text-4xl">恭喜，Jessica！</h1>
                <p class="text-2xl">您已預訂成功</p>
              </div>
            </div>
            <p class="mb-2 font-medium">
              我們已發送訂房資訊及詳細內容至你的電子信箱，<br />入住時需向櫃檯人員出示訂房人證件。
            </p>
          </div>
          <div class="my-8 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-black" />
          <!-- Order Link Section -->
          <div class="flex flex-col items-start justify-center p-10">
            <h2 class="mb-10 text-2xl font-bold">立即查看您的訂單紀錄</h2>
            <button class="btn w-1/2 font-bold text-white" type="button">前往我的訂單</button>
          </div>
          <div class="my-8 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-black" />
          <!-- Room Info Section -->
          <section class="py-10">
            <h2 class="mb-8 text-lg font-bold md:mb-10 md:text-2xl">訂房人資訊</h2>
            <div class="mb-10 flex space-x-10">
              <p class="room-title-deco relative pl-4 text-lg font-bold">房客姓名</p>
              <span class="text-lg font-medium">Jessica Ｗang</span>
            </div>
            <div class="mb-10 flex space-x-10">
              <p class="room-title-deco relative pl-4 text-lg font-bold">手機號碼</p>
              <span class="text-lg font-medium">+886 912 345 678</span>
            </div>
            <div class="mb-10 flex space-x-10">
              <p class="room-title-deco relative pl-4 text-lg font-bold">電子信箱</p>
              <span class="text-lg font-medium">jessica@sample.com</span>
            </div>
          </section>
        </div>

        <div class="md:col-span-5">
          <div class="sticky rounded-3xl bg-white p-6 text-black md:top-40 md:p-10">
            <p class="mb-1">預訂編號：{{ orderId }}</p>
            <h2 class="mb-6 text-xl font-bold">即將來的行程</h2>
            <div class="mb-6 overflow-hidden rounded-xl">
              <picture>
                <!-- 螢幕寬度 >= 768 px，瀏覽器優先載入 :srcset 所指定圖片 -->
                <source :srcset="imageUrl" media="(min-width: 768px)" />
                <!-- <NuxtImg> 提供一個備用圖片，當沒有 <source> 標籤的圖片匹配時，就會顯示這個備用圖片 -->
                <NuxtImg :src="imageUrl" alt="imageUrl" class="h-full w-full object-cover" />
              </picture>
            </div>
            <!-- Room Type -->
            <div class="flex items-center justify-between text-lg font-bold">
              <h3>尊爵雙人房</h3>
              <span>1 晚</span>
            </div>
            <div class="mb-3 flex items-center justify-between text-lg font-bold">
              <h3>住宿人數</h3>
              <span>2 位</span>
            </div>
            <p class="room-title-deco-sm relative pl-4">入住：12 月 4 日星期二</p>
            <p class="room-title-deco-sm relative mb-3 pl-4">退房：12 月 6 日星期三</p>
            <div class="flex items-center justify-between text-lg font-bold">
              <h3>價格</h3>
              <span>NT$ 1,000</span>
            </div>
            <div class="my-8 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-white" />
            <div class="flex flex-col gap-6">
              <!-- Room Amenities -->
              <section class="mb-5">
                <h3 class="room-title-deco-sm relative mb-4 ps-4 font-bold">房間設備</h3>
                <div
                  class="grid grid-cols-3 gap-4 rounded-lg border border-primary-100 bg-white p-4 drop-shadow-sm"
                >
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
                <h3 class="room-title-deco-sm relative mb-4 ps-4 font-bold">備品提供</h3>
                <div
                  class="grid grid-cols-3 gap-4 rounded-lg border border-primary-100 bg-white p-4 drop-shadow-sm"
                >
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
          </div>
        </div>
      </div>
    </section>
    <BookingLoading v-if="isLoading" />
  </div>
</template>

<style scoped></style>
