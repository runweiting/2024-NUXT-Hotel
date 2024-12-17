<script setup lang="ts">
import { useModal } from 'vue-final-modal'
import ModalCancelBooking from '~/components/ModalCancelBooking.vue'

const orderStore = useOrderStore()
const { pendingOrderList, canceledOrderList, isLoading } = storeToRefs(orderStore)

onMounted(() => {
  orderStore.getOrderList()
})

// 定義資料狀態
const coupon = ref<number>(1000)
const currentOrderId = ref<string>('')

const { open, close } = useModal({
  component: ModalCancelBooking,
  attrs: {
    orderId: computed(() => currentOrderId.value),
    onConfirm: async () => {
      if (currentOrderId.value) {
        await orderStore.deleteOrder(currentOrderId.value)
        currentOrderId.value = ''
      }
      close()
    },
    onClose: () => {
      close()
    }
  }
})

const openModal = (orderId: string) => {
  currentOrderId.value = orderId
  open()
}

useHeadSafe({
  title: '我的訂單'
})
</script>

<template>
  <div class="mb-20 flex space-x-4 px-20">
    <!-- Order Info Section -->
    <div class="w-7/12">
      <FetchDataLoading v-if="isLoading" />
      <div v-else class="flex flex-col space-y-4">
        <section
          v-for="order in pendingOrderList"
          :key="order._id"
          class="rounded-3xl bg-white p-6 text-black md:top-40 md:p-10"
        >
          <p class="mb-1">預訂編號：{{ order._id }}</p>
          <h2 class="mb-6 text-xl font-bold">即將來的行程</h2>
          <div class="mb-6 overflow-hidden rounded-xl">
            <picture>
              <!-- 螢幕寬度 >= 768 px，瀏覽器優先載入 :srcset 所指定圖片 -->
              <source :srcset="order.roomId.imageUrl" media="(min-width: 768px)" />
              <!-- <NuxtImg> 提供一個備用圖片，當沒有 <source> 標籤的圖片匹配時，就會顯示這個備用圖片 -->
              <NuxtImg
                :src="order.roomId.imageUrl"
                alt="imageUrl"
                class="h-full w-full object-cover"
              />
            </picture>
          </div>
          <!-- Room Type -->
          <div class="flex items-center justify-between text-lg font-bold">
            <h3>{{ order.roomId.name }}</h3>
            <span>{{ order.nightsNum }} 晚</span>
          </div>
          <div class="mb-3 flex items-center justify-between text-lg font-bold">
            <h3>住宿人數</h3>
            <span>{{ order.peopleNum }} 位</span>
          </div>
          <p class="room-title-deco-sm relative pl-4">入住：{{ order.checkInDate }}</p>
          <p class="room-title-deco-sm relative mb-3 pl-4">退房：{{ order.checkOutDate }}</p>
          <div class="mb-3 flex items-center justify-between text-lg font-bold">
            <h3>總價</h3>
            <span v-formatPrice="order.totalPrice - coupon" class="text-xl font-bold"></span>
          </div>
          <span class="room-title-deco-sm relative pl-4">已使用折扣：{{ coupon }}</span>
          <div class="my-8 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-white" />
          <div class="flex flex-col gap-6">
            <!-- Room Amenities -->
            <section class="mb-5">
              <h3 class="room-title-deco-sm relative mb-4 ps-4 font-bold">房間設備</h3>
              <div
                class="grid grid-cols-3 gap-4 rounded-lg border border-primary-100 bg-white p-4 drop-shadow-sm"
              >
                <div
                  v-for="(amenity, index) in order.roomId.amenityInfo"
                  :key="index"
                  class="flex gap-2"
                >
                  <Icon name="mdi:check" class="text-2xl text-primary-300" />
                  <p class="font-bold">{{ amenity.title }}</p>
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
                  v-for="(facility, index) in order.roomId.facilityInfo"
                  :key="index"
                  class="flex gap-2"
                >
                  <Icon name="mdi:check" class="text-2xl text-primary-300" />
                  <p class="font-bold">{{ facility.title }}</p>
                </div>
              </div>
            </section>

            <div class="flex space-x-4">
              <button class="btn w-full" type="button" @click="openModal(order._id)">
                取消預定
              </button>
              <button class="btn w-full" type="button">查看詳情</button>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- History Order Section -->
    <div class="w-5/12">
      <FetchDataLoading v-if="isLoading" />
      <div v-else class="rounded-3xl bg-white p-6 text-black md:top-40 md:p-10">
        <p class="mb-1">訂單記錄：</p>
        <h2 class="mb-6 text-xl font-bold">歷史訂單</h2>
        <div v-for="order in canceledOrderList" :key="order._id" class="flex space-x-4">
          <div class="w-2/5">
            <div class="mb-6 overflow-hidden rounded-md">
              <picture>
                <!-- 螢幕寬度 >= 768 px，瀏覽器優先載入 :srcset 所指定圖片 -->
                <source :srcset="order.roomId.imageUrl" media="(min-width: 768px)" />
                <!-- <NuxtImg> 提供一個備用圖片，當沒有 <source> 標籤的圖片匹配時，就會顯示這個備用圖片 -->
                <NuxtImg
                  :src="order.roomId.imageUrl"
                  alt="imageUrl"
                  class="h-full w-full object-cover"
                />
              </picture>
            </div>
          </div>
          <div class="w-3/5">
            {{ order._id }}
            <div class="flex items-center justify-between text-lg font-bold">
              <h3>{{ order.roomId.name }}</h3>
              <span>{{ orderStore.bookingDate?.nightsNum }} 晚</span>
            </div>
            <div class="mb-3 flex items-center justify-between text-lg font-bold">
              <h3>住宿人數</h3>
              <span>{{ order.peopleNum }} 位</span>
            </div>
            <p class="room-title-deco-sm relative pl-4">入住：{{ order.checkInDate }}</p>
            <p class="room-title-deco-sm relative mb-3 pl-4">退房：{{ order.checkOutDate }}</p>
            <div class="flex items-center justify-between text-lg font-bold">
              <h3>價格</h3>
              <span>NT${{ order.formattedPrice }}</span>
            </div>
            <button class="btn w-full" type="button" @click="orderStore.deleteOrder(order._id)">
              刪除訂單
            </button>
          </div>
        </div>
        <div class="my-8 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-white" />
        <button class="btn w-full" type="button">查看更多</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
