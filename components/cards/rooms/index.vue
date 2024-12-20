<script setup lang="ts">
const { getRoomList } = useRoom()
const { roomList, hasError, isLoading, refresh } = await getRoomList()
</script>

<template>
  <div>
    <section class="md:py-30 bg-primary-50 py-10 lg:p-12">
      <div class="container mb-12 sm:px-10">
        <h4 class="mb-2">房型選擇</h4>
        <h2 class="mb-2 text-[clamp(2rem,3.5vw,2.5rem)] font-bold text-primary-300 lg:mb-10">
          各種房型，任您挑選
        </h2>
        <FetchDataLoading v-if="isLoading" />
        <div v-else-if="hasError" class="flex items-center space-x-4">
          <p class="text-lg font-bold text-primary-500">Failed to load rooms. Please try again.</p>
          <button type="button" class="btn" @click="refresh()">Retry</button>
        </div>
        <ul v-else class="flex list-none flex-col gap-6 sm:gap-9 md:gap-12">
          <li
            v-for="room in roomList"
            :key="room._id"
            class="overflow-hidden rounded-3xl border-0 lg:flex-row"
          >
            <div class="grid grid-cols-12">
              <div class="col-span-12 lg:col-span-7">
                <Carousel
                  :items-to-show="1"
                  :wrap-around="true"
                  :transition="1000"
                  :autoplay="2500"
                  :pause-autoplay-on-hover="false"
                  class="relative overflow-x-visible"
                >
                  <Slide v-for="n in 3" :key="n" class="w-full overflow-hidden">
                    <picture>
                      <source :srcset="room.imageUrlList[n]" media="(min-width: 640px)" />
                      <NuxtImg
                        :src="room.imageUrlList[n]"
                        :alt="`room-${room.name}-${n}`"
                        class="h-[200px] w-full object-cover transition-transform sm:h-[360px] md:h-[457px]"
                        loading="lazy"
                      />
                    </picture>
                  </Slide>
                  <template #addons>
                    <Navigation
                      class="hidden h-12 w-12 rounded-full bg-white text-primary-700 sm:flex"
                    />
                    <div class="absolute inset-x-0 bottom-3">
                      <Pagination class="custom-pagination" />
                    </div>
                  </template>
                </Carousel>
              </div>
              <div
                class="relative col-span-12 bg-white p-4 lg:col-span-5 lg:flex lg:flex-col lg:py-8 xl:p-8"
              >
                <NuxtLink :to="`/rooms/${room._id}`" class="absolute inset-0 z-10" />
                <h3 class="mb-2 text-[clamp(1.75rem,3vw,2.5rem)] font-bold">
                  {{ room.name }}
                </h3>
                <p class="mb-4 text-sm md:text-base lg:mb-6">
                  {{ room.description }}
                </p>
                <ul class="mb-6 flex gap-4 lg:gap-2 xl:gap-4">
                  <li
                    class="aspect-square w-1/3 rounded-lg border border-primary-100 p-4 sm:w-1/5 md:w-1/6 lg:w-1/3 lg:p-3"
                  >
                    <Icon
                      name="fluent:slide-size-24-filled"
                      class="mb-2 text-xl text-primary-300"
                    />
                    <p class="text-sm font-medium sm:text-base">
                      {{ room.areaInfo }}
                    </p>
                  </li>
                  <li
                    class="aspect-square w-1/3 rounded-lg border border-primary-100 p-4 sm:w-1/5 md:w-1/6 lg:w-1/3 lg:p-3"
                  >
                    <Icon name="material-symbols:king-bed" class="mb-2 text-xl text-primary-300" />
                    <p class="text-sm font-medium sm:text-base">
                      {{ room.bedInfo }}
                    </p>
                  </li>
                  <li
                    class="aspect-square w-1/3 rounded-lg border border-primary-100 p-4 sm:w-1/5 md:w-1/6 lg:w-1/3 lg:p-3"
                  >
                    <Icon name="ic:baseline-person" class="mb-2 text-xl text-primary-300" />
                    <p class="text-sm font-medium sm:text-base">{{ room.maxPeople }}人</p>
                  </li>
                </ul>
                <div class="mb-3 lg:mb-0 lg:mt-auto">
                  <div
                    class="mb-3 h-[2px] w-full bg-gradient-to-r from-[#BE9C7C] to-white lg:mb-6"
                  />
                  <div class="flex items-center justify-between text-primary-300">
                    <p class="text-lg font-bold sm:text-2xl">NT$ {{ room.formattedPrice }}</p>
                    <Icon name="mdi:arrow-right" class="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
