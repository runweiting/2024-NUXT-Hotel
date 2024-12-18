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
  <div class="px-20">
    <!-- Order Info Section -->
    <FetchDataLoading v-if="isLoading" />
    <div v-else-if="hasError" class="flex items-center space-x-4">
      <p class="text-lg font-bold text-primary-500">Failed to load order. Please try again.</p>
      <button type="button" class="btn" @click="refresh()">Retry</button>
    </div>
    <section v-else class="rounded-3xl bg-white p-6 text-black md:top-40 md:p-10">
      <div class="mb-8 flex items-center justify-between">
        <h2 class="text-xl font-bold">訂單詳情</h2>
        <NuxtLink
          :to="`/user/${userId}/order`"
          class="self-end font-bold text-primary-500 underline underline-offset-1"
          type="button"
        >
          回上一頁
        </NuxtLink>
      </div>
      <div class="flex flex-col gap-10">
        <div class="flex space-x-10">
          <div class="w-7/12 overflow-hidden rounded-xl">
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
          <div class="w-5/12">
            <div class="mb-4 flex items-center justify-between font-bold">
              <h3 class="text-2xl">{{ order.roomId.name }}</h3>
              <span class="text-lg">{{ order.nightsNum }} 晚</span>
            </div>
            <div class="mb-4 flex flex-col gap-1">
              <div class="flex items-center justify-between text-lg font-bold">
                <h3>住宿人數</h3>
                <span>{{ order.peopleNum }} 位</span>
              </div>
              <p class="room-title-deco-sm relative pl-4">
                入住：{{ order.checkInDate }}，15:00 可入住
              </p>
              <p class="room-title-deco-sm relative pl-4">
                退房：{{ order.checkOutDate }}，12:00 前退房
              </p>
            </div>
            <div class="mb-4 flex flex-col gap-1">
              <h3 class="text-lg font-bold">訂房資訊</h3>
              <p class="room-title-deco-sm relative pl-4">訂房姓名：{{ order.userInfo.name }}</p>
              <p class="room-title-deco-sm relative pl-4">聯絡電話：{{ order.userInfo.phone }}</p>
              <p class="room-title-deco-sm relative pl-4">聯絡信箱：{{ order.userInfo.email }}</p>
            </div>
            <div class="mb-4 flex flex-col gap-1">
              <div class="flex items-center justify-between text-lg font-bold">
                <h3>總價</h3>
                <span v-formatPrice="order.totalPrice - coupon" class="text-xl"></span>
              </div>
              <span class="room-title-deco-sm relative pl-4">已使用折扣：{{ coupon }}</span>
            </div>
            <div class="mb-4">
              <small class="block">預訂編號：{{ order._id }}</small>
              <small class="block">建立日期：{{ order.createdAt }}</small>
            </div>
          </div>
        </div>
        <div class="flex gap-6">
          <!-- Room Amenities -->
          <section class="w-1/2">
            <h3 class="room-title-deco-sm relative mb-4 ps-4 font-bold">房間設備</h3>
            <div
              class="grid grid-cols-4 gap-4 rounded-lg border border-primary-100 bg-white p-4 drop-shadow-sm"
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
          <section class="w-1/2">
            <h3 class="room-title-deco-sm relative mb-4 ps-4 font-bold">備品提供</h3>
            <div
              class="grid grid-cols-4 gap-4 rounded-lg border border-primary-100 bg-white p-4 drop-shadow-sm"
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
