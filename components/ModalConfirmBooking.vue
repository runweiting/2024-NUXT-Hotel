<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import type { DateTimeProps } from '~/types/Orders'

const props = defineProps<{
  dateTime: DateTimeProps
}>()

defineEmits<{
  (e: 'confirm', dateTime: DateTimeProps): void
  (e: 'close'): void
}>()

const daysCount = ref(0)
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
  tempBookingDate.date.start = null
  tempBookingDate.date.end = null
  tempBookingDate.key++
}
// 根據所選日期範圍初始化 daysCount
watch(
  () => tempBookingDate.date,
  (dateRange) => {
    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start).getTime()
      const endDate = new Date(dateRange.end).getTime()
      const oneDay = 24 * 60 * 60 * 1000
      daysCount.value = Math.round(Math.abs((startDate - endDate) / oneDay))
    } else {
      daysCount.value = 0
    }
  },
  { immediate: true }
)
console.log('Modal tempBookingDate', tempBookingDate)
</script>

<template>
  <VueFinalModal
    class="flex items-center justify-center bg-black/30 backdrop-blur-sm"
    content-class="max-w-3xl w-full p-10 bg-white space-y-4 rounded-3xl shadow-lg"
    content-transition="vfm-fade"
    overlay-transition="vfm-fade"
    @click="$emit('close')"
  >
    <div class="p-6">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-3xl font-bold">{{ daysCount }} 晚</h3>
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
        class="border-0"
        borderless
      />
      <div class="mt-6 flex space-x-4">
        <button class="flex-1 rounded-lg border border-gray-300 py-3" @click="clearDate">
          清除日期
        </button>
        <button
          class="flex-1 rounded-lg bg-blue-500 py-3 text-white"
          @click="
            $emit('confirm', {
              date: tempBookingDate.date,
              minDate: tempBookingDate.minDate,
              maxDate: tempBookingDate.maxDate,
              daysCount: daysCount
            })
          "
        >
          確定日期
        </button>
      </div>
    </div>
  </VueFinalModal>
</template>
