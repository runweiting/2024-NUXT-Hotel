<script setup lang="ts">
const route = useRoute()
const orderId = route.params.orderId as string

const userStore = useUserStore()
const orderStore = useOrderStore()
const { getOrderItem } = useOrder()
const { order, hasError, isLoading, refresh } = await getOrderItem(orderId)

const coupon = ref<number>(1000)

definePageMeta({
  layout: 'order-layout'
})
useHeadSafe({
  title: '訂房結果'
})
</script>

<template>
  <div class="container p-12 text-white">
    <section class="md:py-30 mb-6 mt-[150px] py-10">
      <div class="grid gap-16 md:grid-cols-12">
        <div class="md:col-span-6">
          <!-- Success Message Section -->
          <div class="flex flex-col items-start justify-center p-10">
            <div class="mb-10 flex items-center justify-center space-x-5">
              <Icon class="h-10 w-10 rounded-full bg-green-500" icon="material-symbols:check" />
              <div class="flex flex-col space-y-2 font-bold">
                <h1 class="text-4xl">恭喜，{{ order.userInfo.name }}！</h1>
                <p class="text-2xl">您已預訂成功</p>
              </div>
            </div>
            <p class="mb-2 font-medium">
              詳細訂房資訊已發送至：{{
                order.userInfo.email
              }}，<br />入住時請向櫃檯人員出示訂房人證件。
            </p>
          </div>
          <div class="my-8 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-black" />
          <!-- Order Link Section -->
          <div class="flex flex-col items-start justify-center p-10">
            <h2 class="mb-10 text-2xl font-bold">立即查看您的訂單紀錄</h2>
            <NuxtLink
              :to="`/user/${userStore.userId}/order`"
              class="btn w-1/2 font-bold text-white"
              type="button"
              >前往我的訂單</NuxtLink
            >
          </div>
          <div class="my-8 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-black" />
          <!-- Room Info Section -->
          <section class="py-10">
            <h2 class="mb-8 text-lg font-bold md:mb-10 md:text-2xl">訂房人資訊</h2>
            <div class="mb-10 flex space-x-10">
              <p class="room-title-deco relative pl-4 text-lg font-bold">房客姓名</p>
              <span class="text-lg font-medium">{{ order.userInfo.name }}</span>
            </div>
            <div class="mb-10 flex space-x-10">
              <p class="room-title-deco relative pl-4 text-lg font-bold">手機號碼</p>
              <span class="text-lg font-medium">{{ order.userInfo.phone }}</span>
            </div>
            <div class="mb-10 flex space-x-10">
              <p class="room-title-deco relative pl-4 text-lg font-bold">電子信箱</p>
              <span class="text-lg font-medium">{{ order.userInfo.email }}</span>
            </div>
          </section>
        </div>

        <div class="md:col-span-6">
          <div class="sticky rounded-3xl bg-white p-6 text-black md:top-40 md:p-10">
            <FetchDataLoading v-if="isLoading" />
            <div v-else-if="hasError" class="flex items-center space-x-4">
              <p class="text-lg font-bold text-primary-500">
                Failed to load order information. Please try again.
              </p>
              <button type="button" class="btn" @click="refresh()">Retry</button>
            </div>
            <p class="mb-1">預訂編號：{{ orderId }}</p>
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
            <p class="room-title-deco-sm relative pl-4">
              入住：{{ order.checkInDate }}，15:00 可入住
            </p>
            <p class="room-title-deco-sm relative mb-3 pl-4">
              退房：{{ order.checkOutDate }}，12:00 前退房
            </p>
            <div class="flex items-center justify-between text-lg font-bold">
              <h3>總價</h3>
              <span v-formatPrice="order.totalPrice - coupon" class="text-xl font-bold"></span>
            </div>
            <div class="my-10 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-white" />
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
            </div>
          </div>
        </div>
      </div>
    </section>
    <BookingLoading v-if="isLoading" />
  </div>
</template>

<style scoped></style>
