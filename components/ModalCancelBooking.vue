<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

const props = defineProps<{
  orderId: ComputedRef
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'close'): void
}>()
</script>

<template>
  <VueFinalModal
    class="flex items-center justify-center bg-black/30 backdrop-blur-sm"
    content-class="max-w-3xl w-full p-4 bg-white space-y-4 rounded-3xl shadow-lg"
    content-transition="vfm-fade"
    overlay-transition="vfm-fade"
    @click="$emit('close')"
  >
    <div class="">
      <!-- Modal header -->
      <div class="flex items-center justify-between rounded-t border-b p-4">
        <h3 v-if="props.orderId">訂單編號：{{ props.orderId }}</h3>
        <button
          type="button"
          class="ms-auto inline-flex items-center justify-center text-gray-400 hover:text-black"
          @click="$emit('close')"
        >
          <Icon name="mdi:close" class="h-6 w-6" />
        </button>
      </div>
      <!-- Modal body -->
      <div class="p-10">
        <p class="text-xl font-semibold leading-relaxed">確認取消此房型的預訂嗎？</p>
      </div>
      <!-- Modal footer -->
      <div class="flex items-center space-x-4 rounded-b border-t border-gray-200 p-4">
        <button class="btn-outline flex-1" @click="$emit('close')">關閉視窗</button>
        <button class="btn-outline-cancel flex-1" @click="$emit('confirm')">確認取消</button>
      </div>
    </div>
  </VueFinalModal>
</template>
