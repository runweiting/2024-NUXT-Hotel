<script setup lang="ts">
import { useModal } from 'vue-final-modal'
import ModalCancelBooking from '~/components/ModalCancelBooking.vue'

const orderStore = useOrderStore()
const { pendingOrderList, canceledOrderList, isLoading } = storeToRefs(orderStore)
const route = useRoute()

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
  <div class="mb-20 flex flex-col gap-4 sm:gap-8 md:flex-row md:gap-4 lg:gap-8">
    <!-- Order Info Section -->
    <div class="w-full md:w-3/5">
      <FetchDataLoading v-if="isLoading" />
      <div v-else class="flex flex-col gap-4">
        <section
          v-for="(order, index) in pendingOrderList"
          :key="order._id"
          class="rounded-3xl bg-white p-6 text-black md:p-8"
        >
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-xl font-bold">即將來的行程</h2>
            <small class="fond-bold text-primary-500">
              {{ index + 1 }} / {{ pendingOrderList.length }} 筆訂單
            </small>
          </div>
          <div class="mb-4 overflow-hidden rounded-xl">
            <picture>
              <source :srcset="order.roomId.imageUrl" media="(min-width: 640px)" />
              <NuxtImg
                :src="order.roomId.imageUrl"
                alt="imageUrl"
                class="h-full w-full object-cover"
              />
            </picture>
          </div>
          <!-- Room Type -->
          <div class="mb-4 text-sm">
            <p>預訂編號：{{ order._id }}</p>
            <p>建立日期：{{ order.createdAt }}</p>
          </div>
          <div class="flex items-center justify-between text-lg font-bold">
            <h3>{{ order.roomId.name }}</h3>
            <span>{{ order.nightsNum }} 晚</span>
          </div>
          <div class="mb-4 flex items-center justify-between text-lg font-bold">
            <h3>住宿人數</h3>
            <span>{{ order.peopleNum }} 位</span>
          </div>
          <p class="room-title-deco-sm relative pl-4">
            入住：{{ order.checkInDate }}，15:00 可入住
          </p>
          <p class="room-title-deco-sm relative mb-4 pl-4">
            退房：{{ order.checkOutDate }}，12:00 前退房
          </p>
          <div class="mb-4 flex items-center justify-between text-lg font-bold">
            <h3>總價</h3>
            <span v-formatPrice="order.totalPrice - coupon"></span>
          </div>
          <span class="room-title-deco-sm relative pl-4">已使用折扣：{{ coupon }}</span>
          <div class="my-8 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-white" />
          <div class="flex flex-col gap-4">
            <!-- Room Amenities -->
            <section>
              <h3 class="room-title-deco-sm relative mb-4 ps-4 font-bold">房間設備</h3>
              <div
                class="grid grid-cols-2 gap-4 rounded-lg border border-primary-100 bg-white p-4 drop-shadow-sm sm:grid-cols-4 md:grid-cols-3 md:gap-1 md:p-3 lg:grid-cols-4 lg:gap-4 lg:p-4 xl:grid-cols-5"
              >
                <div
                  v-for="amenity in order.roomId.amenityInfo"
                  :key="amenity.title"
                  class="flex gap-2"
                >
                  <Icon name="mdi:check" class="text-2xl text-primary-300" />
                  <p class="font-bold">{{ amenity.title }}</p>
                </div>
              </div>
            </section>

            <!-- Room Supplies -->
            <section class="mb-4">
              <h3 class="room-title-deco-sm relative mb-4 ps-4 font-bold">備品提供</h3>
              <div
                class="grid grid-cols-2 gap-4 rounded-lg border border-primary-100 bg-white p-4 drop-shadow-sm sm:grid-cols-4 md:grid-cols-3 md:gap-1 md:p-3 lg:grid-cols-4 lg:gap-4 lg:p-4 xl:grid-cols-5"
              >
                <div
                  v-for="facility in order.roomId.facilityInfo"
                  :key="facility.title"
                  class="flex gap-2"
                >
                  <Icon name="mdi:check" class="text-2xl text-primary-300" />
                  <p class="font-bold">{{ facility.title }}</p>
                </div>
              </div>
            </section>

            <div class="flex gap-4">
              <button class="btn w-full" type="button" @click="openModal(order._id)">
                取消預定
              </button>
              <NuxtLink
                :to="`/user/${route.params.userId}/${order._id}`"
                class="btn w-full"
                type="button"
                >查看詳情</NuxtLink
              >
            </div>
          </div>
        </section>
      </div>
    </div>

    <div class="my-4 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-black md:hidden" />

    <!-- History Order Section -->
    <div class="w-full md:w-2/5">
      <FetchDataLoading v-if="isLoading" />
      <div v-else class="rounded-3xl bg-white p-6 text-black md:p-8">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-xl font-bold">歷史訂單</h2>
          <small class="fond-bold text-primary-500">{{ canceledOrderList.length }} 筆訂單</small>
        </div>
        <div v-for="order in canceledOrderList" :key="order._id" class="flex flex-col">
          <section class="flex flex-col gap-4">
            <div class="w-1/2 overflow-hidden rounded-md">
              <picture>
                <source :srcset="order.roomId.imageUrl" media="(min-width: 640px)" />
                <NuxtImg
                  :src="order.roomId.imageUrl"
                  alt="imageUrl"
                  class="h-full w-full object-cover"
                />
              </picture>
            </div>

            <div class="flex flex-col gap-2">
              <div class="text-xs lg:text-sm">
                <p>編號：{{ order._id }}</p>
                <p>日期：{{ order.createdAt }}</p>
              </div>
              <div class="font-bold">
                <div class="flex items-center justify-between">
                  <h3>{{ order.roomId.name }}</h3>
                  <span>{{ order.nightsNum }} 晚</span>
                </div>
                <div class="flex items-center justify-between">
                  <h3>住宿人數</h3>
                  <span>{{ order.peopleNum }} 位</span>
                </div>
              </div>
              <div class="md:hidden lg:block">
                <p class="room-title-deco-sm relative pl-4">
                  入住：{{ order.checkInDate }}，15:00 可入住
                </p>
                <p class="room-title-deco-sm relative pl-4">
                  退房：{{ order.checkOutDate }}，12:00 前退房
                </p>
              </div>
              <div class="flex items-center justify-between font-bold">
                <h3>價格</h3>
                <span>NT${{ order.formattedPrice }}</span>
              </div>
              <NuxtLink
                :to="`/user/${route.params.userId}/${order._id}`"
                class="self-end font-bold text-primary-500 underline underline-offset-1"
                type="button"
              >
                查看更多
              </NuxtLink>
            </div>
          </section>
          <div class="my-8 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-white" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
