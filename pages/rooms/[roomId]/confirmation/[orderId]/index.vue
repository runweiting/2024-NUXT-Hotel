<script setup lang="ts">
const route = useRoute()
const orderId = route.params.orderId as string

const userStore = useUserStore()
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
  <div class="container p-4 sm:p-12 md:p-8">
    <section class="md:pb-30 mb-6 mt-[72px] text-white sm:mt-[95px] md:mt-[120px]">
      <div class="flex flex-col md:flex-row md:gap-4 lg:gap-8">
        <div class="flex-1 p-4 xl:p-12">
          <!-- Success Message Section -->
          <div class="flex flex-col items-start justify-center">
            <div class="mb-8 flex items-center justify-center gap-4 sm:gap-8">
              <Icon
                class="h-10 w-10 flex-shrink-0 rounded-full bg-green-500"
                icon="material-symbols:check"
              />
              <div class="flex flex-col gap-1 font-bold">
                <h1 class="text-3xl leading-snug">
                  恭喜，<br class="sm:hidden md:inline-block" />{{ order.userInfo.name }}！
                </h1>
                <p class="text-2xl">您已預訂成功</p>
              </div>
            </div>
            <p class="font-medium">
              詳細訂房資訊已發送至：{{
                order.userInfo.email
              }}，<br />入住時請向櫃檯人員出示訂房人證件。
            </p>
          </div>
          <div class="my-10 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-black sm:my-12" />
          <!-- Order Link Section -->
          <div class="flex flex-col items-start justify-center">
            <h2 class="mb-4 text-lg font-bold md:text-xl">立即查看您的訂單紀錄</h2>
            <NuxtLink :to="`/user/${userStore.userId}/order`" class="btn w-full" type="button"
              >前往我的訂單</NuxtLink
            >
          </div>
          <div class="my-10 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-black sm:my-12" />
          <!-- Room Info Section -->
          <section class="mb-10 flex flex-col gap-6">
            <h2 class="text-lg font-bold md:text-xl">訂房人資訊</h2>
            <div class="flex flex-col justify-start gap-1">
              <p class="room-title-deco-sm relative pl-4">房客姓名</p>
              <span class="text-lg font-medium">{{ order.userInfo.name }}</span>
            </div>
            <div class="flex flex-col justify-start gap-1">
              <p class="room-title-deco-sm relative pl-4">手機號碼</p>
              <span class="text-lg font-medium">{{ order.userInfo.phone }}</span>
            </div>
            <div class="flex flex-col justify-start gap-1">
              <p class="room-title-deco-sm relative pl-4">電子信箱</p>
              <span class="text-lg font-medium">{{ order.userInfo.email }}</span>
            </div>
          </section>
        </div>

        <div class="flex-1">
          <div class="rounded-3xl bg-white px-4 py-5 text-black sm:p-6 lg:p-8 xl:p-12">
            <FetchDataLoading v-if="isLoading" />
            <div v-else-if="hasError" class="flex items-center space-x-4">
              <p class="text-lg font-bold text-primary-500">
                Failed to load order information. Please try again.
              </p>
              <button type="button" class="btn" @click="refresh()">Retry</button>
            </div>
            <p class="mb-1 text-sm">預訂編號：{{ orderId }}</p>
            <h2 class="mb-4 text-lg font-bold sm:text-xl">即將來的行程</h2>
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
            <div class="flex items-center justify-between text-lg font-bold">
              <h3>總價</h3>
              <span v-formatPrice="order.totalPrice - coupon"></span>
            </div>
            <div class="my-8 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-white" />
            <div class="flex flex-col gap-4">
              <!-- Room Amenities -->
              <section>
                <h3 class="room-title-deco-sm relative mb-2 ps-4 font-bold">房間設備</h3>
                <div
                  class="grid grid-cols-2 gap-4 rounded-lg border border-primary-100 bg-white p-4 drop-shadow-sm sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-2"
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
                <h3 class="room-title-deco-sm relative mb-2 ps-4 font-bold">備品提供</h3>
                <div
                  class="grid grid-cols-2 gap-4 rounded-lg border border-primary-100 bg-white p-4 drop-shadow-sm sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-2"
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
