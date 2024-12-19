<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import type { DateTimeProps } from '~/types/Orders'

const orderStore = useOrderStore()

const props = defineProps<{
  dateTime: DateTimeProps
  maxPeople: number
}>()
const emit = defineEmits<{
  (e: 'confirm', dateTime: DateTimeProps): void
  (e: 'close'): void
}>()

const nightsNum = ref(0)
// 用戶選取的日期範圍
const tempBookingDate = reactive({
  date: {
    start: props.dateTime.date.start,
    end: props.dateTime.date.end
  },
  minDate: props.dateTime.minDate,
  maxDate: props.dateTime.maxDate,
  key: 0
})

const masks = {
  title: 'YYYY 年 MM 月',
  modelValue: 'YYYY-MM-DD'
}

const clearDate = () => {
  tempBookingDate.date.end = null
  tempBookingDate.key++
}
// 根據所選日期範圍初始化 nightsNum
watch(
  () => tempBookingDate.date,
  (dateRange) => {
    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start).getTime()
      const endDate = new Date(dateRange.end).getTime()
      const oneDay = 24 * 60 * 60 * 1000
      nightsNum.value = Math.round(Math.abs((startDate - endDate) / oneDay))
    } else {
      nightsNum.value = 0
    }
  },
  { immediate: true }
)

const isExpanded = ref(false)
const showPeopleNum = ref(false)
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
  showPeopleNum.value = !showPeopleNum.value
}
</script>

<template>
  <VueFinalModal
    class="flex items-center justify-center bg-black/30 backdrop-blur-sm"
    content-class="w-[300px] sm:w-[400px] bg-white rounded-3xl shadow-lg"
    content-transition="vfm-fade"
    overlay-transition="vfm-fade"
    @click-overlay="$emit('close')"
  >
    <div class="flex flex-col p-4">
      <!-- md -->
      <div class="hidden md:block">
        <h3 class="room-title-deco-sm relative ps-4 sm:mb-4">請選擇日期</h3>
        <div class="items-center justify-between sm:mb-4 sm:flex">
          <h3 class="font-bold sm:text-2xl">{{ nightsNum }} 晚</h3>
          <div class="mb-4 flex items-center justify-between">
            <div class="flex space-x-4">
              <div class="flex-1">
                <label
                  for="start-date"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >入住日期</label
                >
                <input
                  id="start-date"
                  type="text"
                  :value="tempBookingDate.date.start"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  readonly
                />
              </div>
              <div class="flex-1">
                <label
                  for="end-date"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >退房日期</label
                >
                <input
                  id="end-date"
                  type="text"
                  :value="tempBookingDate.date.end"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  readonly
                />
              </div>
            </div>
          </div>
        </div>
        <VDatePicker
          :key="tempBookingDate.key"
          v-model.range.string="tempBookingDate.date"
          color="blue"
          :masks="masks"
          :first-day-of-week="1"
          :min-date="tempBookingDate.minDate"
          :max-date="tempBookingDate.maxDate"
          :rows="1"
          :columns="2"
          expanded
          title-position="left"
          borderless
        />
        <div class="flex gap-4">
          <button class="flex-1 rounded-lg border border-gray-300 py-1 sm:py-3" @click="clearDate">
            清除日期
          </button>
          <button
            class="flex-1 rounded-lg bg-blue-500 py-1 text-white sm:py-3"
            @click="
              $emit('confirm', {
                date: tempBookingDate.date,
                minDate: tempBookingDate.minDate,
                maxDate: tempBookingDate.maxDate,
                nightsNum: nightsNum
              })
            "
          >
            確定預訂
          </button>
        </div>
      </div>
      <!-- sm -->
      <div class="md:hidden">
        <div v-if="!showPeopleNum">
          <h3 class="room-title-deco-sm relative ms-2 ps-4">請選擇日期</h3>
          <VDatePicker
            :key="tempBookingDate.key"
            v-model.range.string="tempBookingDate.date"
            color="blue"
            :masks="masks"
            :first-day-of-week="1"
            :min-date="tempBookingDate.minDate"
            :max-date="tempBookingDate.maxDate"
            :rows="2"
            :columns="1"
            expanded
            title-position="left"
            borderless
          />
          <div class="flex gap-4">
            <button class="flex-1 rounded-lg border border-gray-300 py-1" @click="clearDate">
              清除日期
            </button>
            <button class="flex-1 rounded-lg bg-blue-500 py-1 text-white" @click="toggleExpanded">
              確定日期
            </button>
          </div>
        </div>
        <div v-else>
          <h3 class="room-title-deco-sm relative mb-2 ps-4">入住日期</h3>
          <div class="mb-6 flex space-x-4">
            <div class="flex-1">
              <label
                for="start-date"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >入住</label
              >
              <input
                id="start-date"
                type="text"
                :value="tempBookingDate.date.start"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                readonly
              />
            </div>
            <div class="flex-1">
              <label
                for="end-date"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >退房</label
              >
              <input
                id="end-date"
                type="text"
                :value="tempBookingDate.date.end"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                readonly
              />
            </div>
          </div>
          <div class="room-title-deco-sm relative mb-6 flex items-center justify-between ps-4">
            <h3>入住天數</h3>
            <span class="font-bold">{{ nightsNum }} 晚</span>
          </div>
          <div class="room-title-deco-sm relative mb-6 flex items-center justify-between ps-4">
            <h3>入住人數</h3>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <button @click="orderStore.peopleNum > 1 && orderStore.peopleNum--">
                  <Icon name="mdi:minus-circle" class="h-6 w-6 font-bold text-primary-300" />
                </button>
                <span class="font-bold">{{ orderStore.peopleNum }}</span>
                <button @click="orderStore.peopleNum < props.maxPeople && orderStore.peopleNum++">
                  <Icon name="mdi:plus-circle" class="h-6 w-6 text-primary-300" />
                </button>
              </div>
            </div>
          </div>
          <div class="mb-6 flex items-center space-x-2">
            <Icon name="mdi:alert-decagram" class="h-4 w-4 text-primary-300" />
            <p class="text-sm text-black">最多 {{ props.maxPeople }} 人居住，不接受寵物入住。</p>
          </div>
          <div class="flex gap-4">
            <button
              class="flex-1 rounded-lg border border-gray-300 py-1 sm:py-2"
              @click="$emit('close')"
            >
              重新選擇日期
            </button>
            <button
              class="flex-1 rounded-lg bg-blue-500 py-1 text-white sm:py-2"
              @click="
                $emit('confirm', {
                  date: tempBookingDate.date,
                  minDate: tempBookingDate.minDate,
                  maxDate: tempBookingDate.maxDate,
                  nightsNum: nightsNum
                })
              "
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>
