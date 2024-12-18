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
  <div class="mb-20 flex space-x-4 px-20">
    <!-- Order Info Section -->
    <div class="w-7/12">
      <FetchDataLoading v-if="isLoading" />
      <div v-else class="flex flex-col space-y-4">
        <section
          v-for="(order, index) in pendingOrderList"
          :key="order._id"
          class="rounded-3xl bg-white p-6 text-black md:top-40 md:p-10"
        >
          <div class="mb-8 flex items-center justify-between">
            <h2 class="text-xl font-bold">即將來的行程</h2>
            <small class="fond-bold text-primary-500">
              {{ index + 1 }} / {{ pendingOrderList.length }} 筆訂單
            </small>
          </div>
          <div class="mb-4 overflow-hidden rounded-xl">
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
          <div class="mb-3">
            <small class="block">預訂編號：{{ order._id }}</small>
            <small class="block">建立日期：{{ order.createdAt }}</small>
          </div>
          <div class="flex items-center justify-between text-lg font-bold">
            <h3>{{ order.roomId.name }}</h3>
            <span>{{ order.nightsNum }} 晚</span>
          </div>
          <div class="mb-3 flex items-center justify-between text-lg font-bold">
            <h3>住宿人數</h3>
            <span>{{ order.peopleNum }} 位</span>
          </div>
          <p class="room-title-deco-sm relative pl-4">
            入住：{{ order.checkInDate }}，15:00 可入住
          </p>
          <p class="room-title-deco-sm relative mb-3 pl-4">
            退房：{{ order.checkOutDate }}，12:00 前退房
          </p>
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
            <section>
              <h3 class="room-title-deco-sm relative mb-4 ps-4 font-bold">備品提供</h3>
              <div
                class="grid grid-cols-3 gap-4 rounded-lg border border-primary-100 bg-white p-4 drop-shadow-sm"
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

            <div class="flex space-x-4">
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

    <!-- History Order Section -->
    <div class="w-5/12">
      <FetchDataLoading v-if="isLoading" />
      <div v-else class="rounded-3xl bg-white p-6 text-black md:top-40 md:p-10">
        <div class="mb-8 flex items-center justify-between">
          <h2 class="text-xl font-bold">歷史訂單</h2>
          <small class="fond-bold text-end text-primary-500"
            >{{ canceledOrderList.length }} 筆訂單</small
          >
        </div>
        <div v-for="order in canceledOrderList" :key="order._id" class="flex flex-col">
          <section class="flex space-x-4">
            <div class="w-2/5">
              <div class="overflow-hidden rounded-md">
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
              <div class="flex flex-col space-y-3">
                <div>
                  <small class="block">編號：{{ order._id }}</small>
                  <small class="block">日期：{{ order.createdAt }}</small>
                </div>
                <div class="text-lg font-bold">
                  <div class="flex items-center justify-between">
                    <h3>{{ order.roomId.name }}</h3>
                    <span>{{ order.nightsNum }} 晚</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <h3>住宿人數</h3>
                    <span>{{ order.peopleNum }} 位</span>
                  </div>
                </div>
                <div>
                  <p class="room-title-deco-sm relative pl-4">
                    入住：{{ order.checkInDate }}，15:00 可入住
                  </p>
                  <p class="room-title-deco-sm relative pl-4">
                    退房：{{ order.checkOutDate }}，12:00 前退房
                  </p>
                </div>
                <div class="flex items-center justify-between text-lg font-bold">
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
            </div>
          </section>
          <div class="mb-14 mt-10 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-white" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
