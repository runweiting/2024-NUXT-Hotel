<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const roomId = route.params.roomId as string
const { getRoomItem } = useRoom()
const { room, isLoading, hasError, refresh } = await getRoomItem(roomId)
const orderStore = useOrderStore()
const userStore = useUserStore()

const coupon = ref<number>(1000)
// 建立 ref 綁定子元件
const orderProfileFormRef = ref<{ handleProfile: () => void } | null>(null)

const confirmBooking = () => {
  orderProfileFormRef.value?.handleProfile()
}

const goBack = () => {
  router.back()
}

useHeadSafe({
  title: '確認訂房'
})

// definePageMeta({
//   middleware: async (to) => {
//     if (to.path === `/rooms/${roomId}/confirmation`) {
//       const isVaild = await userStore.checkToken()
//       if (!isVaild) {
//         navigateTo('/account/login')
//       }
//     }
//   }
// })
</script>

<template>
  <div class="container p-6 sm:p-12 md:p-8">
    <section class="md:pb-30 mb-6 mt-[72px] text-black sm:mt-[95px] md:mt-[120px]">
      <div class="flex flex-col md:flex-row md:gap-8">
        <div class="flex-1">
          <button class="mb-10 flex items-center gap-2" type="button" @click="goBack">
            <Icon name="mdi:keyboard-arrow-left" class="h-8 w-8" />
            <h1 class="text-2xl font-bold">確認訂房資訊</h1>
          </button>

          <!-- Room Info Section -->
          <section>
            <div class="mb-8 flex items-center justify-between">
              <h2 class="text-xl font-bold sm:text-2xl">訂房資訊</h2>
              <button class="flex items-center gap-2" type="button" @click="goBack">
                <span class="font-bold text-primary-300 underline">回上一頁編輯</span>
              </button>
            </div>
            <FetchDataLoading v-if="isLoading" />
            <div v-else-if="hasError" class="flex items-center space-x-4">
              <p class="text-lg font-bold text-primary-500">
                Failed to load room information. Please try again.
              </p>
              <button type="button" class="btn" @click="refresh()">Retry</button>
            </div>
            <div v-else class="flex flex-col gap-6">
              <!-- Room Type -->
              <div class="flex flex-col">
                <h3 class="room-title-deco relative mb-2 pl-4 text-lg font-bold sm:text-xl">
                  選擇房型
                </h3>
                <p class="text-lg font-medium">{{ room.name }}</p>
              </div>

              <!-- Booking Dates -->
              <div class="flex flex-col">
                <h3 class="room-title-deco relative mb-2 pl-4 text-lg font-bold sm:text-xl">
                  訂房日期
                </h3>
                <p class="font-medium">
                  入住：{{ orderStore.bookingDate?.date.start }}，15:00 可入住
                </p>
                <p class="font-medium">
                  退房：{{ orderStore.bookingDate?.date.end }}，12:00 前退房
                </p>
              </div>

              <!-- Guest Count -->
              <div class="flex flex-col">
                <h3 class="room-title-deco relative mb-2 pl-4 text-lg font-bold sm:text-xl">
                  房客人數
                </h3>
                <p class="font-medium">{{ orderStore.peopleNum }} 人</p>
              </div>

              <div class="my-5 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-primary-50" />

              <!-- Order Profile Info -->
              <FormsOrderProfileForm ref="orderProfileFormRef" />

              <div class="my-5 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-primary-50" />

              <!-- Basic Room Info -->
              <section>
                <h3 class="room-title-deco relative mb-4 ps-4 text-xl font-bold sm:text-2xl">
                  房型基本資訊
                </h3>
                <ul class="flex gap-4 lg:gap-4">
                  <li
                    class="aspect-square w-1/3 rounded-lg bg-white p-4 sm:w-1/5 md:w-1/3 lg:w-1/5 lg:p-3"
                  >
                    <Icon
                      name="fluent:slide-size-24-filled"
                      class="mb-2 text-xl text-primary-300"
                    />
                    <p class="font-medium">
                      {{ room.areaInfo }}
                    </p>
                  </li>
                  <li
                    class="aspect-square w-1/3 rounded-lg bg-white p-4 sm:w-1/5 md:w-1/3 lg:w-1/5 lg:p-3"
                  >
                    <Icon name="material-symbols:king-bed" class="mb-2 text-xl text-primary-300" />
                    <p class="font-medium">
                      {{ room.bedInfo }}
                    </p>
                  </li>
                  <li
                    class="aspect-square w-1/3 rounded-lg bg-white p-4 sm:w-1/5 md:w-1/3 lg:w-1/5 lg:p-3"
                  >
                    <Icon name="ic:baseline-person" class="mb-2 text-xl text-primary-300" />
                    <p class="font-medium">{{ room.maxPeople }}人</p>
                  </li>
                </ul>
              </section>

              <!-- Room Features -->
              <section>
                <h3 class="room-title-deco relative mb-4 ps-4 text-xl font-bold sm:text-2xl">
                  房間格局
                </h3>
                <div
                  class="grid grid-cols-3 rounded-lg bg-white p-4 drop-shadow-sm sm:grid-cols-4 sm:gap-4 md:grid-cols-3 md:gap-2"
                >
                  <div
                    v-for="(feature, index) in room.layoutInfo"
                    :key="index"
                    class="flex gap-1 sm:gap-2"
                  >
                    <Icon name="mdi:check" class="text-2xl text-primary-300" />
                    <p class="font-medium">{{ feature.title }}</p>
                  </div>
                </div>
              </section>

              <!-- Room Amenities -->
              <section>
                <h3 class="room-title-deco relative mb-4 ps-4 text-xl font-bold sm:text-2xl">
                  房間設備
                </h3>
                <div
                  class="grid grid-cols-3 rounded-lg bg-white p-4 drop-shadow-sm sm:grid-cols-4 sm:gap-4 md:grid-cols-3 md:gap-2"
                >
                  <div
                    v-for="(facility, index) in room.facilityInfo"
                    :key="index"
                    class="flex gap-1 sm:gap-2"
                  >
                    <Icon
                      v-if="facility.isProvide"
                      name="mdi:check"
                      class="text-2xl text-primary-300"
                    />
                    <Icon v-else name="mdi:close" class="text-2xl text-primary-300" />
                    <p class="font-medium">{{ facility.title }}</p>
                  </div>
                </div>
              </section>

              <!-- Room Supplies -->
              <section>
                <h3 class="room-title-deco relative mb-4 ps-4 text-xl font-bold sm:text-2xl">
                  備品提供
                </h3>
                <div
                  class="grid grid-cols-3 rounded-lg bg-white p-4 drop-shadow-sm sm:grid-cols-4 sm:gap-4 md:grid-cols-3 md:gap-2"
                >
                  <div
                    v-for="(amenity, index) in room.amenityInfo"
                    :key="index"
                    class="flex gap-1 sm:gap-2"
                  >
                    <Icon
                      v-if="amenity.isProvide"
                      name="mdi:check"
                      class="text-2xl text-primary-300"
                    />
                    <Icon v-else name="mdi:close" class="text-2xl text-primary-300" />
                    <p class="font-medium">{{ amenity.title }}</p>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>

        <div
          class="my-[44px] h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-primary-50 md:hidden"
        />

        <div class="flex-1">
          <div
            class="sticky rounded-3xl bg-white p-6 text-black shadow shadow-primary-300 md:top-40 md:p-8"
          >
            <div class="mb-4 overflow-hidden rounded-xl">
              <picture>
                <!-- 螢幕寬度 >= 768 px，瀏覽器優先載入 :srcset 所指定圖片 -->
                <source :srcset="room.imageUrl" media="(min-width: 768px)" />
                <!-- <NuxtImg> 提供一個備用圖片，當沒有 <source> 標籤的圖片匹配時，就會顯示這個備用圖片 -->
                <NuxtImg :src="room.imageUrl" alt="imageUrl" class="h-full w-full object-cover" />
              </picture>
            </div>
            <h2 class="mb-6 text-lg font-bold md:text-2xl">價格詳情</h2>
            <div class="mb-4 space-y-4">
              <div class="flex items-center justify-between">
                <span>{{ room.formattedPrice }} × {{ orderStore.bookingDate?.nightsNum }} 晚 </span>
                <div class="flex items-end space-x-4">
                  <span>NT$</span>
                  <span class="text-xl font-bold">{{ room.formattedTotalPrice }}</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span>住宿折扣</span>
                <div class="flex items-end space-x-4">
                  <span>-NT$</span>
                  <span class="text-xl font-bold">{{ coupon }}</span>
                </div>
              </div>
              <hr class="border-primary-300" />
              <div class="flex items-center justify-between">
                <span>總價</span>
                <span v-formatPrice="room.totalPrice - coupon" class="text-xl font-bold"></span>
              </div>
            </div>
            <button type="submit" class="btn mt-6 w-full py-4" @click="confirmBooking">
              確認訂房
            </button>
          </div>
        </div>
      </div>
    </section>
    <BookingLoading v-if="isLoading" />
  </div>
</template>

<style scoped></style>
