<script setup lang="ts">
const { restaurantList, hasError, isLoading, refresh } = useRestaurant()
</script>

<template>
  <div>
    <section class="md:py-30 relative bg-primary-50 py-20 sm:ps-5">
      <div class="delicacy-intro">
        <div class="mb-6 flex items-center gap-10 ps-5 sm:ps-0 md:mb-10">
          <h2 class="text-[clamp(2rem,3.5vw,2.5rem)] font-bold leading-[1.2em] text-primary-300">
            佳餚<br />美饌
          </h2>
          <div class="h-[2px] w-[140px] bg-gradient-to-r from-[#BE9C7C] to-white" />
        </div>
        <FetchDataLoading v-if="isLoading" />
        <div v-else-if="hasError" class="flex items-center space-x-4">
          <p class="text-lg font-bold text-primary-500">
            Failed to load restaurants. Please try again.
          </p>
          <button type="button" class="btn" @click="refresh()">Retry</button>
        </div>
        <Carousel
          v-else
          :breakpoints="{
            375: {
              itemsToShow: 1
            },
            640: {
              itemsToShow: 2
            },
            1024: {
              itemsToShow: 3
            }
          }"
          :wrap-around="true"
          :transition="1500"
          :autoplay="3000"
          :pause-autoplay-on-hover="true"
          class="overflow-x-visible"
        >
          <Slide v-for="restaurant in restaurantList" :key="restaurant._id" class="px-2">
            <div class="group relative rounded-3xl">
              <picture>
                <source :srcset="restaurant.image" media="(min-width:640px)" />
                <NuxtImg
                  :src="restaurant.image"
                  :alt="restaurant.title"
                  class="h-[480px] w-full rounded-3xl object-cover transition-transform"
                />
              </picture>
              <div
                class="absolute bottom-0 w-full rounded-b-3xl bg-black bg-opacity-60 p-4 text-white md:p-6"
              >
                <div class="mb-4 flex justify-between md:mb-6">
                  <h5 class="text-lg font-bold">{{ restaurant.title }}</h5>
                  <div class="text-neutral-40 flex gap-4 text-xs">
                    <span class="font-bold">{{ restaurant.diningTime }}</span>
                  </div>
                </div>
                <p class="text-start text-xs md:text-sm">
                  {{ restaurant.description }}
                </p>
              </div>
            </div>
          </Slide>
        </Carousel>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
