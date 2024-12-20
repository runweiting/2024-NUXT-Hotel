<script setup lang="ts">
const route = useRoute()
const userId = route.params.userId
const orderId = route.params.orderId as string
const { getOrderItem } = useOrder()
const { order, hasError, isLoading, refresh } = await getOrderItem(orderId)

// 定義資料狀態
const coupon = ref<number>(1000)

useHeadSafe({
  title: '我的訂單詳情'
})
</script>

<template>
  <div>
    <!-- Order Info Section -->
    <FetchDataLoading v-if="isLoading" />
    <div v-else-if="hasError" class="flex items-center space-x-4">
      <p class="text-lg font-bold text-primary-500">Failed to load order. Please try again.</p>
      <button type="button" class="btn" @click="refresh()">Retry</button>
    </div>
    <section v-else class="rounded-3xl bg-white p-6 text-black md:p-8">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-xl font-bold">訂單詳情</h2>
        <NuxtLink
          :to="`/user/${userId}/order`"
          class="self-end font-bold text-primary-500 underline underline-offset-1"
          type="button"
        >
          回上一頁
        </NuxtLink>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4 lg:flex-row">
          <div class="overflow-hidden rounded-xl lg:w-7/12">
            <picture>
              <source :srcset="order.roomId.imageUrl" media="(min-width: 640px)" />
              <NuxtImg
                :src="order.roomId.imageUrl"
                alt="imageUrl"
                class="h-full w-full object-cover"
              />
            </picture>
          </div>
          <div class="lg:w-5/12">
            <div class="flex items-center justify-between text-lg font-bold">
              <h3>{{ order.roomId.name }}</h3>
              <span>{{ order.nightsNum }} 晚</span>
            </div>
            <div class="flex items-center justify-between text-lg font-bold md:mb-2 lg:mb-4">
              <h3>住宿人數</h3>
              <span>{{ order.peopleNum }} 位</span>
            </div>
            <p class="room-title-deco-sm relative pl-4">
              入住：{{ order.checkInDate }}，15:00 可入住
            </p>
            <p class="room-title-deco-sm relative mb-4 pl-4">
              退房：{{ order.checkOutDate }}，12:00 前退房
            </p>
            <h3 class="text-lg font-bold md:mb-2">訂房資訊</h3>
            <div class="mb-4 flex flex-col gap-2 sm:gap-4 lg:gap-2">
              <div class="md:flex md:items-center md:gap-8">
                <span class="room-title-deco-sm relative pl-4">訂房姓名</span>
                <p>{{ order.userInfo.name }}</p>
              </div>
              <div class="md:flex md:items-center md:gap-8">
                <span class="room-title-deco-sm relative pl-4">聯絡電話</span>
                <p>{{ order.userInfo.phone }}</p>
              </div>
              <div class="md:flex md:items-center md:gap-8">
                <span class="room-title-deco-sm relative pl-4">聯絡信箱</span>
                <p>{{ order.userInfo.email }}</p>
              </div>
            </div>
            <div class="mb-4 flex flex-col">
              <div class="flex items-center justify-between text-lg font-bold md:mb-2">
                <h3>總價</h3>
                <span v-formatPrice="order.totalPrice - coupon"></span>
              </div>
              <span class="room-title-deco-sm relative pl-4">已使用折扣：{{ coupon }}</span>
            </div>
            <div class="mb-4 text-sm">
              <p>預訂編號：{{ order._id }}</p>
              <p>建立日期：{{ order.createdAt }}</p>
            </div>
          </div>
        </div>
        <div class="my-4 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-white" />

        <div class="flex flex-col gap-4 lg:flex-row">
          <!-- Room Amenities -->
          <section class="lg:w-1/2">
            <h3 class="room-title-deco relative mb-4 ps-4 text-lg font-bold">房間設備</h3>
            <div
              class="grid grid-cols-2 gap-4 rounded-lg border border-primary-100 bg-white p-4 drop-shadow-sm sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 lg:gap-0"
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
          <section class="lg:w-1/2">
            <h3 class="room-title-deco relative mb-4 ps-4 text-lg font-bold">備品提供</h3>
            <div
              class="grid grid-cols-2 gap-4 rounded-lg border border-primary-100 bg-white p-4 drop-shadow-sm sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 lg:gap-0"
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
    </section>
  </div>
</template>

<style scoped></style>
